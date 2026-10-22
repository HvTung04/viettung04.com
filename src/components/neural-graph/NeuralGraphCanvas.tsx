'use client';

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from '@/i18n/routing';
import type { GraphData, GraphNode } from './layout';

const LIGHT = {
  bg: '#fdfcfc',
  ink: '#201d1d',
  hairline: 'rgba(15, 0, 0, 0.45)',
  accent: '#007aff',
};

const DARK = {
  bg: '#1a1a1a',
  ink: '#e5e5e5',
  hairline: 'rgba(229, 229, 229, 0.35)',
  accent: '#4d9fff',
};

const CORE_RADIUS = 0.34;
const TECH_RADIUS = 0.16;
const PROJECT_RADIUS = 0.26;

const PACKET_COUNT = 26;
const PACKET_SPEED = [0.25, 0.6] as const;
const RIPPLE_LIFETIME = 1.6;

type Ripple = {
  pos: [number, number, number];
  start: number;
  accent: boolean;
  scale: number;
};

export type HudCopy = {
  system: string;
  nodes: string;
  links: string;
  packets: string;
  signal: string;
  map: string;
  mapped: string;
  hoverProjects: string;
  drag: string;
};

function radiusFor(node: GraphNode): number {
  if (node.kind === 'core') return CORE_RADIUS;
  if (node.kind === 'project') return PROJECT_RADIUS;
  return TECH_RADIUS;
}

function lineGeometry(points: number[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(points), 3)
  );
  return geometry;
}

/**
 * Deterministic PRNG (mulberry32). Star positions and packet routes must be
 * pure functions of the seed: re-renders must not reshuffle the field, and
 * React's compiler treats Math.random() in render as impure.
 */
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useAdjacency(data: GraphData) {
  return useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of data.edges) {
      if (!map.has(edge.from)) map.set(edge.from, new Set());
      if (!map.has(edge.to)) map.set(edge.to, new Set());
      map.get(edge.from)!.add(edge.to);
      map.get(edge.to)!.add(edge.from);
    }
    return map;
  }, [data]);
}

/* ---------------------------------------------------------------- particles */

function StarField({ palette, count }: { palette: typeof LIGHT; count: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const [nearGeo, farGeo] = useMemo(() => {
    const rand = prng(1337);
    const make = (n: number, rMin: number, rMax: number) => {
      const positions: number[] = [];
      for (let i = 0; i < n; i++) {
        const radius = rMin + rand() * (rMax - rMin);
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(2 * rand() - 1);
        positions.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
      }
      return lineGeometry(positions);
    };
    const nearCount = Math.floor(count * 0.6);
    return [make(nearCount, 5.5, 9), make(count - nearCount, 9, 13)];
  }, [count]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.children[0].rotation.y += delta * 0.012;
    group.children[1].rotation.y -= delta * 0.008;
    group.children[1].rotation.x += delta * 0.004;
  });

  return (
    <group ref={groupRef}>
      <points geometry={nearGeo}>
        <pointsMaterial
          size={0.055}
          color={palette.ink}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points geometry={farGeo}>
        <pointsMaterial
          size={0.07}
          color={palette.ink}
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------- edges */

function Edges({
  data,
  palette,
  highlightIds,
}: {
  data: GraphData;
  palette: typeof LIGHT;
  highlightIds: Set<string>;
}) {
  const positions = useMemo(() => {
    const byId = new Map(data.nodes.map((n) => [n.id, n.position]));
    const points: number[] = [];
    for (const edge of data.edges) {
      const a = byId.get(edge.from);
      const b = byId.get(edge.to);
      if (!a || !b) continue;
      points.push(...a, ...b);
    }
    return points;
  }, [data]);

  const baseGeometry = useMemo(() => lineGeometry(positions), [positions]);

  const highlightPositions = useMemo(() => {
    const byId = new Map(data.nodes.map((n) => [n.id, n.position]));
    const points: number[] = [];
    for (const edge of data.edges) {
      if (!highlightIds.has(edge.from) || !highlightIds.has(edge.to)) continue;
      const a = byId.get(edge.from);
      const b = byId.get(edge.to);
      if (!a || !b) continue;
      points.push(...a, ...b);
    }
    return points;
  }, [data, highlightIds]);

  const highlightGeometry = useMemo(
    () => (highlightPositions.length > 0 ? lineGeometry(highlightPositions) : null),
    [highlightPositions]
  );

  return (
    <>
      <lineSegments geometry={baseGeometry}>
        <lineBasicMaterial
          color={palette.hairline}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </lineSegments>
      {highlightGeometry && (
        <lineSegments geometry={highlightGeometry}>
          <lineBasicMaterial
            color={palette.accent}
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </>
  );
}

/* ----------------------------------------------------------------- packets */

function Packets({ data, palette }: { data: GraphData; palette: typeof LIGHT }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Runtime randomness (respawn speeds) lives outside render, via a ref.
  const packetRandRef = useRef(prng(9001));

  const { geometry, material } = useMemo(
    () => ({
      geometry: new THREE.SphereGeometry(0.05, 8, 8),
      material: new THREE.MeshBasicMaterial({ color: palette.accent }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    material.color.set(palette.accent);
  }, [material, palette]);

  const packets = useMemo(() => {
    const rand = prng(4242);
    const byId = new Map(data.nodes.map((n) => [n.id, n.position]));
    const valid = data.edges.filter((e) => byId.has(e.from) && byId.has(e.to));
    return Array.from({ length: PACKET_COUNT }, () => {
      const edge = valid[Math.floor(rand() * valid.length)];
      const [from, to] =
        rand() > 0.5 ? [edge.from, edge.to] : [edge.to, edge.from];
      return {
        from: byId.get(from)!,
        to: byId.get(to)!,
        t: rand(),
        speed:
          PACKET_SPEED[0] + rand() * (PACKET_SPEED[1] - PACKET_SPEED[0]),
      };
    });
  }, [data]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const elapsed = state.clock.elapsedTime;
    const rand = packetRandRef.current;

    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      packet.t += packet.speed * delta;
      if (packet.t > 1) {
        packet.t = 0;
        packet.speed =
          PACKET_SPEED[0] +
          rand() * (PACKET_SPEED[1] - PACKET_SPEED[0]);
      }
      const ease = packet.t * packet.t * (3 - 2 * packet.t);
      dummy.position.set(
        packet.from[0] + (packet.to[0] - packet.from[0]) * ease,
        packet.from[1] + (packet.to[1] - packet.from[1]) * ease,
        packet.from[2] + (packet.to[2] - packet.from[2]) * ease
      );
      const pulse = 1 + Math.sin(elapsed * 6 + i) * 0.25;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, PACKET_COUNT]}
      frustumCulled={false}
    />
  );
}

/* ----------------------------------------------------------------- ripples */

function Ripples({
  ripplesRef,
  nowRef,
  palette,
}: {
  ripplesRef: React.RefObject<Ripple[]>;
  nowRef: React.RefObject<number>;
  palette: typeof LIGHT;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const now = state.clock.elapsedTime;
    if (nowRef) nowRef.current = now;

    const ripples = (ripplesRef.current ?? []).filter(
      (ripple) => now - ripple.start < RIPPLE_LIFETIME
    );
    if (ripplesRef) ripplesRef.current = ripples;

    // Sync mesh count to live ripples.
    while (group.children.length < ripples.length) {
      const material = new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(new THREE.RingGeometry(0.96, 1, 48), material));
    }
    while (group.children.length > ripples.length) {
      const mesh = group.children[0] as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      group.remove(mesh);
    }

    ripples.forEach((ripple, i) => {
      const mesh = group.children[i] as THREE.Mesh;
      const age = Math.max(now - ripple.start, 0);
      const t = Math.min(age / RIPPLE_LIFETIME, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.color.set(ripple.accent ? palette.accent : palette.ink);
      mesh.visible = true;
      mesh.position.set(ripple.pos[0], ripple.pos[1], ripple.pos[2]);
      mesh.scale.setScalar(0.2 + eased * ripple.scale);
      mesh.lookAt(state.camera.position);
      material.opacity = 0.55 * (1 - t);
    });
  });

  return <group ref={groupRef} />;
}

/* ------------------------------------------------------------------- nodes */

function Nodes({
  data,
  palette,
  hoveredId,
  flashIds,
  onHover,
  onSelect,
}: {
  data: GraphData;
  palette: typeof LIGHT;
  hoveredId: string | null;
  flashIds: Set<string>;
  onHover: (node: GraphNode | null, event: ThreeEvent<PointerEvent>) => void;
  onSelect: (node: GraphNode, position: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseScales = useMemo(
    () => data.nodes.map((node) => radiusFor(node)),
    [data]
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const elapsed = state.clock.elapsedTime;

    group.children.forEach((child, i) => {
      const base = baseScales[i];
      const node = data.nodes[i];
      const hovered = node.id === hoveredId;
      const target = hovered ? base * 1.8 : base;
      const breathe =
        1 + Math.sin(elapsed * (node.kind === 'project' ? 2.2 : 1.4) + i * 0.9) * 0.09;
      const current = child.scale.x;
      const next = current + (target * breathe - current) * 0.18;
      child.scale.setScalar(next);
    });
  });

  return (
    <group ref={groupRef}>
      {data.nodes.map((node) => {
        const isActive =
          node.id === hoveredId ||
          flashIds.has(node.id) ||
          node.kind === 'project';
        return (
          <mesh
            key={node.id}
            position={node.position}
            scale={radiusFor(node)}
            onPointerOver={(event) => {
              event.stopPropagation();
              onHover(node, event);
            }}
            onPointerMove={(event) => {
              event.stopPropagation();
              if (hoveredId === node.id) onHover(node, event);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              onHover(null, event);
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(node, node.position);
            }}
          >
            <sphereGeometry args={[1, 20, 20]} />
            <meshBasicMaterial color={isActive ? palette.accent : palette.ink} />
          </mesh>
        );
      })}
    </group>
  );
}

/* --------------------------------------------------------------------- rig */

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const intro = useRef({ active: true, start: 0, interacted: false });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.1, 13.2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state) => {
    const c = controlsRef.current;
    if (!c) return;
    const clock = state.clock.elapsedTime;

    if (intro.current.active) {
      if (intro.current.start === 0) intro.current.start = clock;
      const t = Math.min((clock - intro.current.start) / 2.2, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      camera.position.set(0, 1.1, 13.2 - eased * 5.6);
      if (t >= 1 || intro.current.interacted) intro.current.active = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      minDistance={4.5}
      maxDistance={15}
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.55}
      onStart={() => {
        intro.current.interacted = true;
        intro.current.active = false;
      }}
    />
  );
}

/* -------------------------------------------------------------------- HUD */

function Hud({
  data,
  palette,
  discovered,
  copy,
}: {
  data: GraphData;
  palette: typeof LIGHT;
  discovered: number;
  copy: HudCopy;
}) {
  const [signal, setSignal] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setSignal(2 + Math.floor(Math.random() * 4));
    }, 700);
    return () => clearInterval(id);
  }, []);

  const projectCount = data.nodes.filter((n) => n.kind === 'project').length;
  const techCount = data.nodes.filter((n) => n.kind === 'tech').length;
  const complete = discovered >= projectCount && projectCount > 0;

  const style = {
    background: palette.bg,
    borderColor: palette.ink,
    color: palette.ink,
  } as const;

  return (
    <>
      <div
        className="pointer-events-none absolute top-3 left-3 z-10 border px-3 py-2 font-mono text-[10px] leading-relaxed select-none"
        style={style}
      >
        <div className="font-bold">[ {copy.system} ]</div>
        <div>
          {copy.nodes}: {techCount} · {copy.links}: {data.edges.length} · {copy.packets}:{' '}
          {PACKET_COUNT}
        </div>
        <div>
          {copy.signal}: [{'#'.repeat(signal)}{'-'.repeat(5 - signal)}]
        </div>
        <div className={complete ? '' : 'opacity-70'}>
          {complete
            ? `[ ✓ ] ${copy.mapped}`
            : `${copy.map}: ${discovered}/${projectCount} ${copy.hoverProjects}`}
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-3 right-3 z-10 border px-2 py-1 font-mono text-[9px] uppercase tracking-widest select-none opacity-70"
        style={style}
      >
        {copy.drag}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ canvas */

export default function NeuralGraphCanvas({
  data,
  hud,
}: {
  data: GraphData;
  hud: HudCopy;
}) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [starCount, setStarCount] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 700 : 1500
  );
  useEffect(() => {
    const onResize = () =>
      setStarCount(window.innerWidth < 768 ? 700 : 1500);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [tooltip, setTooltip] = useState<{ x: number; y: number; flip: boolean } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const nowRef = useRef<number>(0);
  const adjacency = useAdjacency(data);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const palette = isDark ? DARK : LIGHT;

  const spawnRipple = useCallback(
    (pos: [number, number, number], accent: boolean, scale = 2.8) => {
      ripplesRef.current = [
        ...ripplesRef.current.slice(-8),
        { pos, start: nowRef.current, accent, scale },
      ];
    },
    []
  );

  // Heartbeat: a sonar pulse leaves the core node on a fixed cadence.
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => spawnRipple([0, 0, 0], false, 4.2), 2600);
    return () => clearInterval(id);
  }, [reducedMotion, spawnRipple]);

  const handleHover = useCallback(    (node: GraphNode | null, event: ThreeEvent<PointerEvent>) => {
      setHovered(node);
      const container = containerRef.current;
      if (!container || !node) {
        setTooltip(null);
        return;
      }
      const rect = container.getBoundingClientRect();
      const x = event.nativeEvent.clientX - rect.left;
      setTooltip({
        x,
        y: event.nativeEvent.clientY - rect.top,
        flip: x > rect.width - 230,
      });

      if (node.kind === 'project' && node.id) {
        setDiscovered((prev) => {
          if (prev.has(node.id)) return prev;
          const next = new Set(prev);
          next.add(node.id);
          return next;
        });
      }
    },
    []
  );

  const handleSelect = useCallback(
    (node: GraphNode, position: [number, number, number]) => {
      // Ripple + neighbourhood flash for any node, navigation for projects.
      spawnRipple(position, node.kind === 'project', node.kind === 'core' ? 4.2 : 2.8);

      const neighbours = adjacency.get(node.id);
      if (neighbours) {
        setFlashIds(new Set(neighbours));
        setTimeout(() => setFlashIds(new Set()), 800);
      }

      if (node.kind === 'project' && node.projectSlug) {
        setTimeout(() => router.push(`/projects/${node.projectSlug}`), 350);
      }
    },
    [adjacency, router, spawnRipple]
  );

  const highlightIds = useMemo(() => {
    const set = new Set<string>();
    if (hovered) {
      set.add(hovered.id);
      for (const id of adjacency.get(hovered.id) ?? []) set.add(id);
    }
    for (const id of flashIds) {
      set.add(id);
      for (const n of adjacency.get(id) ?? []) set.add(n);
    }
    return set;
  }, [hovered, flashIds, adjacency]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ cursor: hovered ? 'pointer' : 'grab' }}
    >
      <Hud data={data} palette={palette} discovered={discovered.size} copy={hud} />

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: palette.bg, touchAction: 'pan-y' }}
      >
        <fog attach="fog" args={[palette.bg, 9, 17]} />
        <StarField palette={palette} count={starCount} />
        <Edges data={data} palette={palette} highlightIds={highlightIds} />
        <Packets data={data} palette={palette} />
        <Ripples ripplesRef={ripplesRef} nowRef={nowRef} palette={palette} />
        <Nodes
          data={data}
          palette={palette}
          hoveredId={hovered?.id ?? null}
          flashIds={flashIds}
          onHover={handleHover}
          onSelect={handleSelect}
        />
        <gridHelper
          args={[36, 24, palette.ink, palette.ink]}
          position={[0, -4.6, 0]}
          material-transparent
          material-opacity={0.12}
        />
        <Rig reducedMotion={reducedMotion} />
      </Canvas>

      {hovered && tooltip && (
        <div
          className="pointer-events-none absolute z-10 border px-2 py-1 font-mono text-[11px]"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 34,
            background: palette.bg,
            borderColor: palette.ink,
            color: palette.ink,
            whiteSpace: 'nowrap',
            transform: tooltip.flip ? 'translateX(-110%)' : undefined,
          }}
        >
          [
          {hovered.kind === 'project' ? 'PROJECT' : hovered.kind === 'core' ? 'CORE' : 'TECH'}
          ] {hovered.label}
          {hovered.kind === 'tech' && hovered.category ? ` · ${hovered.category}` : ''}
          {hovered.kind === 'project' && discovered.has(hovered.id) ? ' · [x]' : ''}
        </div>
      )}
    </div>
  );
}
