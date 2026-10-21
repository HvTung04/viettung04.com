'use client';

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from '@/i18n/routing';
import type { GraphData, GraphNode } from './layout';

const LIGHT = {
  bg: '#fdfcfc',
  ink: '#201d1d',
  hairline: 'rgba(15, 0, 0, 0.35)',
  accent: '#007aff',
};

const DARK = {
  bg: '#1a1a1a',
  ink: '#e5e5e5',
  hairline: 'rgba(229, 229, 229, 0.28)',
  accent: '#4d9fff',
};

const CORE_RADIUS = 0.3;
const TECH_RADIUS = 0.13;
const PROJECT_RADIUS = 0.21;

function radiusFor(node: GraphNode): number {
  if (node.kind === 'core') return CORE_RADIUS;
  if (node.kind === 'project') return PROJECT_RADIUS;
  return TECH_RADIUS;
}

function GraphGeometry({ data, palette }: { data: GraphData; palette: typeof LIGHT }) {
  const hairlineGeometry = useMemo(() => {
    const positions = new Float32Array(data.edges.length * 6);
    const byId = new Map(data.nodes.map((n) => [n.id, n.position]));
    let cursor = 0;
    for (const edge of data.edges) {
      const a = byId.get(edge.from);
      const b = byId.get(edge.to);
      if (!a || !b) continue;
      positions.set([a[0], a[1], a[2], b[0], b[1], b[2]], cursor);
      cursor += 6;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [data]);

  return (
    <lineSegments geometry={hairlineGeometry}>
      <lineBasicMaterial
        color={palette.hairline}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Node({
  node,
  palette,
  hovered,
  onHover,
  onSelect,
}: {
  node: GraphNode;
  palette: typeof LIGHT;
  hovered: boolean;
  onHover: (node: GraphNode | null, event: ThreeEvent<PointerEvent>) => void;
  onSelect: (node: GraphNode) => void;
}) {
  const baseRadius = radiusFor(node);
  const targetScale = hovered ? baseRadius * 1.7 : baseRadius;
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Ease toward the target scale instead of snapping.
    let frame = 0;
    const tick = () => {
      const mesh = meshRef.current;
      if (mesh) {
        const current = mesh.scale.x;
        const next = current + (targetScale - current) * 0.35;
        mesh.scale.setScalar(next);
        if (Math.abs(next - targetScale) > 0.001) frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetScale]);

  const color =
    hovered || node.kind === 'project'
      ? palette.accent
      : palette.ink;

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      scale={baseRadius}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(node, event);
      }}
      onPointerMove={(event) => {
        event.stopPropagation();
        if (hovered) onHover(node, event);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(null, event);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node);
      }}
    >
      <sphereGeometry args={[1, 20, 20]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.1, 8.2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <OrbitControls
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      minDistance={4.5}
      maxDistance={13}
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.55}
    />
  );
}

export default function NeuralGraphCanvas({ data }: { data: GraphData }) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; flip: boolean } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleHover = useCallback(
    (node: GraphNode | null, event: ThreeEvent<PointerEvent>) => {
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
    },
    []
  );

  const handleSelect = useCallback(
    (node: GraphNode) => {
      if (node.kind === 'project' && node.projectSlug) {
        router.push(`/projects/${node.projectSlug}`);
      }
    },
    [router]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ cursor: hovered ? 'pointer' : 'grab' }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: palette.bg, touchAction: 'pan-y' }}
      >
        <fog attach="fog" args={[palette.bg, 9, 17]} />
        <GraphGeometry data={data} palette={palette} />
        {data.nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            palette={palette}
            hovered={hovered?.id === node.id}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        ))}
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
          [{hovered.kind === 'project' ? 'PROJECT' : hovered.kind === 'core' ? 'CORE' : 'TECH'}]{' '}
          {hovered.label}
          {hovered.kind === 'tech' && hovered.category ? ` · ${hovered.category}` : ''}
        </div>
      )}
    </div>
  );
}
