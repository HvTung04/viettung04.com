'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { GraphData } from './layout';
import type { HudCopy } from './NeuralGraphCanvas';

export type { HudCopy };

// Client-only: the whole three.js tree stays out of the server bundle and out
// of the page's JavaScript until the section scrolls into view.
const NeuralGraphCanvas = dynamic(() => import('./NeuralGraphCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function NeuralGraphClient({
  data,
  hud,
}: {
  data: GraphData;
  hud: HudCopy;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full" aria-hidden="true">
      {shouldMount ? <NeuralGraphCanvas data={data} hud={hud} /> : null}
    </div>
  );
}
