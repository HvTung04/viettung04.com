/**
 * Deterministic layout for the homepage neural graph.
 * Runs on the server; the client receives plain arrays.
 */

export type GraphNode = {
  id: string;
  label: string;
  kind: 'core' | 'tech' | 'project';
  category?: string;
  projectSlug?: string;
  /** [x, y, z] */
  position: [number, number, number];
};

export type GraphEdge = { from: string; to: string; accent?: boolean };

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const RING_RADIUS = 2.5;
const CLUSTER_RADIUS = 0.72;
const PROJECT_RADIUS = 4.05;

function norm(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Places technologies in one ring per category, projects on an outer ring,
 * and links projects to the technologies they actually use.
 */
export function buildGraphData(
  technologies: { id: string; name: string; category: string }[],
  projects: {
    id: string;
    slug: string;
    title: string;
    techStack: { name: string }[];
  }[]
): GraphData {
  const nodes: GraphNode[] = [
    {
      id: 'core',
      label: 'VIET TUNG',
      kind: 'core',
      position: [0, 0, 0],
    },
  ];

  const edges: GraphEdge[] = [];
  const techIdByName = new Map<string, string>();

  const categories = new Map<string, typeof technologies>();
  for (const tech of technologies) {
    const list = categories.get(tech.category) ?? [];
    list.push(tech);
    categories.set(tech.category, list);
  }

  const orderedCategories = [...categories.entries()];

  orderedCategories.forEach(([category, techs], catIndex) => {
    const catAngle = (catIndex / Math.max(orderedCategories.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const cx = Math.cos(catAngle) * RING_RADIUS;
    const cy = Math.sin(catAngle) * RING_RADIUS;

    techs.forEach((tech, techIndex) => {
      const techAngle =
        (techIndex / Math.max(techs.length, 1)) * Math.PI * 2 + catIndex;
      const x = cx + Math.cos(techAngle) * CLUSTER_RADIUS;
      const y = cy + Math.sin(techAngle) * CLUSTER_RADIUS;
      const z = Math.sin(techIndex * 1.7 + catIndex) * 0.22;

      nodes.push({
        id: tech.id,
        label: tech.name,
        kind: 'tech',
        category,
        position: [x, y, z],
      });
      techIdByName.set(norm(tech.name), tech.id);

      // Chain the cluster so each category reads as a constellation.
      if (techIndex > 0) {
        edges.push({ from: techs[techIndex - 1].id, to: tech.id });
      }
    });

    // Spoke from the core to the first node of every cluster.
    if (techs.length > 0) {
      edges.push({ from: 'core', to: techs[0].id });
    }
  });

  projects.forEach((project, projectIndex) => {
    const angle =
      (projectIndex / Math.max(projects.length, 1)) * Math.PI * 2 + Math.PI / 5;
    const x = Math.cos(angle) * PROJECT_RADIUS;
    const y = Math.sin(angle) * PROJECT_RADIUS;
    const z = projectIndex % 2 === 0 ? 0.45 : -0.45;

    nodes.push({
      id: project.id,
      label: project.title,
      kind: 'project',
      projectSlug: project.slug,
      position: [x, y, z],
    });

    // Project spokes go to the core in the accent colour.
    edges.push({ from: 'core', to: project.id, accent: true });

    // Link the project to the technologies it actually uses.
    for (const stackItem of project.techStack) {
      const techId = techIdByName.get(norm(stackItem.name));
      if (techId) edges.push({ from: project.id, to: techId, accent: true });
    }
  });

  return { nodes, edges };
}
