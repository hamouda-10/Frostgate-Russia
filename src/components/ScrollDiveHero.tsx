import { useEffect, useRef } from 'react';
import type { Lang } from '../data/russiaData';

// 13 exact proxied Higgsfield WebP URLs from the Frostgate Kitchen brief
const PROXY = (filename: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
    `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${filename}`,
  )}&w=2688&q=85`;

const ASSETS = {
  sky: PROXY('hf_20261124_032051_b03be317-55bc-49c0-9643-583fc5604213.png'),
  side: PROXY('hf_20261124_032150_6a19ddba-1bad-419f-9e29-dca0828c11eb.png'),
  stairs: PROXY('hf_20261124_050711_a8f1e754-6cb0-4763-b6a4-e7acd19f6d16.png'),
  hall: PROXY('hf_20261124_032131_a39a98b6-be3d-473c-a0a1-5ad2850557e7.png'),
  people: PROXY('hf_20261124_050913_015b6505-badf-4834-b44e-dca4af03c966.png'),
  larch: PROXY('hf_20261124_032234_5b1a89ba-826e-4bdd-9416-0faf5b650f82.png'),
  pav: PROXY('hf_20261124_032301_6b8aa813-522f-412c-b90d-0bfaf40c7590.png'),
  mid: PROXY('hf_20261124_032324_f9cb6fb0-9f9d-4f42-adcb-cfeae0e153da.png'),
  near: PROXY('hf_20261124_032346_c94ad70e-0a0f-4a4e-99f8-39e0200da791.png'),
  lake: PROXY('hf_20261124_032412_9f658303-9bca-4653-a7e8-7fcb3788f887.png'),
  walls: PROXY('hf_20261124_032423_d01ee5a9-9ec6-424c-93bb-9972ecf2f3cf.png'),
  arch: PROXY('hf_20261124_025152_784dec8b-ad51-476d-9e19-dbca11ca8d01.png'),
  flags: PROXY('hf_20261124_032437_291e3d42-e769-437c-abcf-ecf2965a8feb.png'),
} as const;

const TB = 0.42;
const H0 = 0.42;
const H1 = 0.58;

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/**
 * Monotone cubic Hermite spline through (0, A), (0.42, B), (1, C)
 * with tangent 0 at A and C, and weighted harmonic mean tangent at B.
 */
function spline(u: number, A: number, B: number, C: number): number {
  const d0 = (B - A) / H0;
  const d1 = (C - B) / H1;
  const mB = d0 * d1 > 0 ? 1 / (H0 / d0 + H1 / d1) : 0;

  if (u <= TB) {
    const t = u / H0;
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    return h00 * A + h01 * B + h11 * H0 * mB;
  } else {
    const t = (u - TB) / H1;
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    return h00 * B + h10 * H1 * mB + h01 * C;
  }
}

function setMask(el: HTMLElement | null, value: string) {
  if (!el) return;
  el.style.maskImage = value;
  el.style.webkitMaskImage = value;
}

function buildSoftMask(bandTop: number | null, y: number, fade: number, fadeSpeed = 6): string {
  const f = fade > 0 ? fade * Math.min(1, Math.max(0, -y) * fadeSpeed) : 0;
  if (bandTop === null) {
    if (f <= 0.001) return 'none';
    const stop = Math.max(0, 100 - f).toFixed(2);
    return `linear-gradient(to bottom, #000 0%, #000 ${stop}%, transparent 100%)`;
  }
  const topFadeEnd = (bandTop + 1.2).toFixed(2);
  if (f <= 0.001) {
    return `linear-gradient(to bottom, transparent ${bandTop}%, #000 ${topFadeEnd}%, #000 100%)`;
  }
  const bottomStart = Math.max(bandTop + 1.2, 100 - f).toFixed(2);
  return `linear-gradient(to bottom, transparent ${bandTop}%, #000 ${topFadeEnd}%, #000 ${bottomStart}%, transparent 100%)`;
}

export interface ScrollDiveHeroProps {
  lang: Lang;
  onNavigateSection: (sectionId: string) => void;
  getScrollY: () => number;
  registerRenderCallback: (fn: (force?: boolean) => void) => void;
}

export function ScrollDiveHero({
  lang,
  onNavigateSection,
  getScrollY,
  registerRenderCallback,
}: ScrollDiveHeroProps) {
  const diveRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // All 19 image refs + cave/caveIn container refs
  const skyRef = useRef<HTMLImageElement>(null);
  const sideRef = useRef<HTMLImageElement>(null);
  const stairsBaseRef = useRef<HTMLImageElement>(null);
  const hallRef = useRef<HTMLImageElement>(null);
  const stairs2Ref = useRef<HTMLImageElement>(null);
  const people2Ref = useRef<HTMLImageElement>(null);
  const stairs3Ref = useRef<HTMLImageElement>(null);
  const people3Ref = useRef<HTMLImageElement>(null);
  const larchLRef = useRef<HTMLImageElement>(null);
  const larchRRef = useRef<HTMLImageElement>(null);
  const pavRef = useRef<HTMLImageElement>(null);
  const midLRef = useRef<HTMLImageElement>(null);
  const midRRef = useRef<HTMLImageElement>(null);
  const nearLRef = useRef<HTMLImageElement>(null);
  const nearRRef = useRef<HTMLImageElement>(null);
  const caveRef = useRef<HTMLDivElement>(null);
  const caveInRef = useRef<HTMLDivElement>(null);
  const lakeRef = useRef<HTMLImageElement>(null);
  const wallsRef = useRef<HTMLImageElement>(null);
  const archRef = useRef<HTMLImageElement>(null);
  const flagsRef = useRef<HTMLImageElement>(null);

  const lastPRef = useRef<number>(-1);

  useEffect(() => {
    const renderAtP = (rawP: number) => {
      const p = clamp(rawP, 0, 1);
      const u = clamp((p - 0.03) / 0.94, 0, 1);

      // Frame pan on screens where 16:9 frame is taller than viewport
      const frameEl = frameRef.current;
      if (frameEl) {
        const spare = window.innerHeight - frameEl.offsetHeight;
        const panY = spare < 0 ? spare * 0.6 * spline(u, 0, 1, 1) : 0;
        frameEl.style.transform = `translate3d(-50%, ${panY.toFixed(2)}px, 0)`;
      }

      // Layer transforms & dynamic soft bottom fades
      const ySky = spline(u, 0, 0, -0.12);
      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(0, ${(ySky * 100).toFixed(4)}%, 0)`;
      }

      const ySide = spline(u, 0, -0.15, -0.6);
      if (sideRef.current) {
        sideRef.current.style.transform = `translate3d(0, ${(ySide * 100).toFixed(4)}%, 0)`;
        setMask(sideRef.current, buildSoftMask(null, ySide, 10, 6));
      }

      const yStairsBase = spline(u, 0, -0.1, -0.6);
      if (stairsBaseRef.current) {
        stairsBaseRef.current.style.transform = `translate3d(0, ${(yStairsBase * 100).toFixed(4)}%, 0)`;
      }

      const yHall = spline(u, 0, -0.1, -0.6);
      if (hallRef.current) {
        hallRef.current.style.transform = `translate3d(0, ${(yHall * 100).toFixed(4)}%, 0)`;
      }

      const yBand2 = spline(u, 0, -0.15, -0.63);
      if (stairs2Ref.current) {
        stairs2Ref.current.style.transform = `translate3d(0, ${(yBand2 * 100).toFixed(4)}%, 0)`;
        setMask(stairs2Ref.current, buildSoftMask(66, yBand2, 5, 40));
      }
      if (people2Ref.current) {
        people2Ref.current.style.transform = `translate3d(0, ${(yBand2 * 100).toFixed(4)}%, 0)`;
      }

      const yBand3 = spline(u, 0, -0.2, -0.66);
      if (stairs3Ref.current) {
        stairs3Ref.current.style.transform = `translate3d(0, ${(yBand3 * 100).toFixed(4)}%, 0)`;
        setMask(stairs3Ref.current, buildSoftMask(72, yBand3, 7, 30));
      }
      if (people3Ref.current) {
        people3Ref.current.style.transform = `translate3d(0, ${(yBand3 * 100).toFixed(4)}%, 0)`;
      }

      const yLarch = spline(u, 0, -0.2, -0.8);
      const maskLarch = buildSoftMask(null, yLarch, 30, 6);
      if (larchLRef.current) {
        larchLRef.current.style.transform = `translate3d(-7%, ${(yLarch * 100).toFixed(4)}%, 0)`;
        setMask(larchLRef.current, maskLarch);
      }
      if (larchRRef.current) {
        larchRRef.current.style.transform = `translate3d(7%, ${(yLarch * 100).toFixed(4)}%, 0)`;
        setMask(larchRRef.current, maskLarch);
      }

      const yPav = spline(u, 0, -0.2, -0.85);
      if (pavRef.current) {
        pavRef.current.style.transform = `translate3d(0, ${(yPav * 100).toFixed(4)}%, 0)`;
        setMask(pavRef.current, buildSoftMask(null, yPav, 14, 6));
      }

      const yMid = spline(u, 0, -0.27, -0.95);
      const maskMid = buildSoftMask(null, yMid, 18, 6);
      if (midLRef.current) {
        midLRef.current.style.transform = `translate3d(-5%, ${(yMid * 100).toFixed(4)}%, 0)`;
        setMask(midLRef.current, maskMid);
      }
      if (midRRef.current) {
        midRRef.current.style.transform = `translate3d(5%, ${(yMid * 100).toFixed(4)}%, 0)`;
        setMask(midRRef.current, maskMid);
      }

      const yNear = spline(u, 0, -0.36, -1.2);
      const maskNear = buildSoftMask(null, yNear, 34, 6);
      if (nearLRef.current) {
        nearLRef.current.style.transform = `translate3d(-6%, ${(yNear * 100).toFixed(4)}%, 0)`;
        setMask(nearLRef.current, maskNear);
      }
      if (nearRRef.current) {
        nearRRef.current.style.transform = `translate3d(6%, ${(yNear * 100).toFixed(4)}%, 0)`;
        setMask(nearRRef.current, maskNear);
      }

      // Arch: translateY 1.00 -> 0.16 -> -0.07, scale 1 -> 1 -> 1.75 (origin 50% 100%)
      const ay = spline(u, 1.0, 0.16, -0.07);
      const as = spline(u, 1, 1, 1.75);
      if (archRef.current) {
        archRef.current.style.transform = `translate3d(0, ${(ay * 100).toFixed(4)}%, 0) scale(${as.toFixed(5)})`;
        if (u > TB) {
          const tC = clamp((u - TB) / H1, 0, 1);
          const fb = 26 * clamp(tC / 0.35, 0, 1);
          const stop = Math.max(0, 100 - fb).toFixed(2);
          setMask(
            archRef.current,
            `linear-gradient(to bottom, #000 0%, #000 ${stop}%, transparent 100%)`,
          );
        } else {
          setMask(archRef.current, 'none');
        }
      }

      // Cave interior: translateY 0.22 -> 0.20 -> 0, scale 0.8 -> 0.8 -> 1
      const cy = spline(u, 0.22, 0.2, 0);
      const cs = spline(u, 0.8, 0.8, 1);
      if (caveInRef.current) {
        caveInRef.current.style.transform = `translate3d(0, ${(cy * 100).toFixed(4)}%, 0) scale(${cs.toFixed(5)})`;
      }

      // Cave soft moving seal mask
      const seal = (1 + (0.6 - 1) * as + ay) * 100;
      const feather = 11 * as;
      if (caveRef.current) {
        if (seal - feather >= 100) {
          caveRef.current.style.visibility = 'hidden';
        } else {
          caveRef.current.style.visibility = 'visible';
          const s0 = (seal - feather).toFixed(2);
          const s1 = seal.toFixed(2);
          setMask(
            caveRef.current,
            `linear-gradient(to bottom, transparent ${s0}%, #000 ${s1}%)`,
          );
        }
      }

      // Flags: y 0.14 -> 0.14 -> 0, opacity ramps 0 -> 1 between u=0.55 and u=0.90
      const yFlags = spline(u, 0.14, 0.14, 0);
      const flagsOp = clamp((u - 0.55) / (0.9 - 0.55), 0, 1);
      if (flagsRef.current) {
        flagsRef.current.style.transform = `translate3d(0, ${(yFlags * 100).toFixed(4)}%, 0)`;
        flagsRef.current.style.opacity = flagsOp.toFixed(4);
      }
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateFromScroll = (force = false) => {
      if (reducedMotion) {
        renderAtP(0.42);
        return;
      }
      const diveEl = diveRef.current;
      if (!diveEl) return;
      const denom = Math.max(1, diveEl.offsetHeight - window.innerHeight);
      const p = clamp((getScrollY() - diveEl.offsetTop) / denom, 0, 1);
      if (force || Math.abs(p - lastPRef.current) > 0.00001) {
        lastPRef.current = p;
        renderAtP(p);
      }
    };

    registerRenderCallback(updateFromScroll);

    // Render once at p=0 (or 0.42 for reduced motion) immediately before first frame
    if (reducedMotion) {
      renderAtP(0.42);
      document.documentElement.classList.add('ready');
    } else {
      renderAtP(0);
      lastPRef.current = 0;

      // Wait for all 19 layer images decode() to settle OR 5s failsafe
      const imgs = [
        skyRef.current,
        sideRef.current,
        stairsBaseRef.current,
        hallRef.current,
        stairs2Ref.current,
        people2Ref.current,
        stairs3Ref.current,
        people3Ref.current,
        larchLRef.current,
        larchRRef.current,
        pavRef.current,
        midLRef.current,
        midRRef.current,
        nearLRef.current,
        nearRRef.current,
        lakeRef.current,
        wallsRef.current,
        archRef.current,
        flagsRef.current,
      ].filter((el): el is HTMLImageElement => Boolean(el));

      let settled = false;
      const markReady = () => {
        if (settled) return;
        settled = true;
        document.documentElement.classList.add('ready');
        updateFromScroll(true);
      };

      const failsafe = window.setTimeout(markReady, 5000);
      Promise.allSettled(
        imgs.map((img) => (typeof img.decode === 'function' ? img.decode() : Promise.resolve())),
      ).finally(() => {
        window.clearTimeout(failsafe);
        markReady();
      });
    }

    const onResize = () => updateFromScroll(true);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [getScrollY, registerRenderCallback]);

  const navLeft =
    lang === 'ar'
      ? [
          { label: 'الوجهات', target: 'destinations' },
          { label: 'المعرض', target: 'gallery' },
          { label: 'المسارات', target: 'routes' },
        ]
      : [
          { label: 'DESTINATIONS', target: 'destinations' },
          { label: 'GALLERY', target: 'gallery' },
          { label: 'ROUTES', target: 'routes' },
        ];

  const navRight =
    lang === 'ar'
      ? [
          { label: 'المواسم', target: 'seasons' },
          { label: 'خطط رحلتك', target: 'planner' },
          { label: 'الدليل', target: 'guide' },
        ]
      : [
          { label: 'SEASONS', target: 'seasons' },
          { label: 'PLANNER', target: 'planner' },
          { label: 'GUIDE', target: 'guide' },
        ];

  return (
    <main className="dive" id="dive" ref={diveRef}>
      <div className="stage">
        <div className="card" id="card">
          <div className="frame" id="frame" ref={frameRef}>
            {/* 1. sky */}
            <img
              ref={skyRef}
              src={ASSETS.sky}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
            />
            {/* 2. side */}
            <img
              ref={sideRef}
              src={ASSETS.side}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
            />
            {/* 3. stairs (base, full image) */}
            <img
              ref={stairsBaseRef}
              src={ASSETS.stairs}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
            />
            {/* 4. hall */}
            <img
              ref={hallRef}
              src={ASSETS.hall}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
            />
            {/* 5. stairs band 2 */}
            <img
              ref={stairs2Ref}
              src={ASSETS.stairs}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 66%, #000 67.2%, #000 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 66%, #000 67.2%, #000 100%)',
              }}
            />
            {/* 6. people band 2 (static mask: strip 66.8% - 68%) */}
            <img
              ref={people2Ref}
              src={ASSETS.people}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent 66.5%, #000 66.8%, #000 68%, transparent 68.3%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 66.5%, #000 66.8%, #000 68%, transparent 68.3%)',
              }}
            />
            {/* 7. stairs band 3 */}
            <img
              ref={stairs3Ref}
              src={ASSETS.stairs}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 72%, #000 73.2%, #000 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 72%, #000 73.2%, #000 100%)',
              }}
            />
            {/* 8. people band 3 (static mask: visible from 67.5% feathered to 68% down) */}
            <img
              ref={people3Ref}
              src={ASSETS.people}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 67.5%, #000 68%, #000 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 67.5%, #000 68%, #000 100%)',
              }}
            />
            {/* 9. larch (left & right halves, pushed ±7%) */}
            <img
              ref={larchLRef}
              src={ASSETS.larch}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
            <img
              ref={larchRRef}
              src={ASSETS.larch}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 0 0 50%)' }}
            />
            {/* 10. pav */}
            <img
              ref={pavRef}
              src={ASSETS.pav}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
            />
            {/* 11. mid (left & right halves, pushed ±5%) */}
            <img
              ref={midLRef}
              src={ASSETS.mid}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
            <img
              ref={midRRef}
              src={ASSETS.mid}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 0 0 50%)' }}
            />
            {/* 12. near (left & right halves, pushed ±6%) */}
            <img
              ref={nearLRef}
              src={ASSETS.near}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
            <img
              ref={nearRRef}
              src={ASSETS.near}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{ clipPath: 'inset(0 0 0 50%)' }}
            />

            {/* 13. div.cave (lake inside cave-in, walls directly inside cave) */}
            <div className="cave" ref={caveRef}>
              <div className="cave-in" ref={caveInRef}>
                <img
                  ref={lakeRef}
                  src={ASSETS.lake}
                  alt=""
                  decoding="async"
                  draggable={false}
                  className="layer"
                />
              </div>
              <img
                ref={wallsRef}
                src={ASSETS.walls}
                alt=""
                decoding="async"
                draggable={false}
                className="layer"
              />
            </div>

            {/* 14. arch */}
            <img
              ref={archRef}
              src={ASSETS.arch}
              alt=""
              decoding="async"
              draggable={false}
              className="layer layer-arch"
            />

            {/* 15. flags (static top mask: transparent 1%, opaque 13%) */}
            <img
              ref={flagsRef}
              src={ASSETS.flags}
              alt=""
              decoding="async"
              draggable={false}
              className="layer"
              style={{
                opacity: 0,
                maskImage: 'linear-gradient(to bottom, transparent 1%, #000 13%, #000 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 1%, #000 13%, #000 100%)',
              }}
            />
          </div>

          {/* Centred bottom navigation row (exact Frostgate mountain SVG mark + smooth Lenis anchors) */}
          <nav className="hero-nav" aria-label="Main">
            {navLeft.map((item, idx) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                data-lang={lang}
                style={{ ['--nav-i' as string]: idx }}
                className="hero-nav-item hero-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(item.target);
                }}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#dive"
              aria-label="Frostgate Kitchen home"
              style={{ ['--nav-i' as string]: 3 }}
              className="hero-nav-item hero-nav-logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('top');
              }}
            >
              <svg
                viewBox="0 0 48 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 21 L15 4 L24 14 L31 7 L47 21" />
                <path d="M10 21 L15 15 L19 21" />
                <path d="M27 21 L31 16 L36 21" />
              </svg>
            </a>

            {navRight.map((item, idx) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                data-lang={lang}
                style={{ ['--nav-i' as string]: idx + 4 }}
                className="hero-nav-item hero-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(item.target);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
