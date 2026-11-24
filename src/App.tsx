/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ScrollDiveHero } from './components/ScrollDiveHero';
import { RussiaTourismPortal } from './components/RussiaTourismPortal';
import type { Lang } from './data/russiaData';

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const lenisRef = useRef<Lenis | null>(null);
  const heroRenderRef = useRef<((force?: boolean) => void) | null>(null);

  const getScrollY = useCallback(() => {
    if (lenisRef.current) {
      return lenisRef.current.scroll;
    }
    return window.scrollY || window.pageYOffset || 0;
  }, []);

  const registerRenderCallback = useCallback((fn: (force?: boolean) => void) => {
    heroRenderRef.current = fn;
  }, []);

  // Initialize Lenis smooth scroll driven manually inside our own requestAnimationFrame loop
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (now: number) => {
      lenis.raf(now);
      if (heroRenderRef.current) {
        heroRenderRef.current(false);
      }
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  return (
    <>
      <ScrollDiveHero
        lang={lang}
        onNavigateSection={handleNavigateSection}
        getScrollY={getScrollY}
        registerRenderCallback={registerRenderCallback}
      />
      <RussiaTourismPortal
        lang={lang}
        onToggleLang={handleToggleLang}
        onNavigateSection={handleNavigateSection}
      />
    </>
  );
}
