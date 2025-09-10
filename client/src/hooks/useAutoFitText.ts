import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

type Options = {
  /** Max number of lines the text may use. */
  maxLines?: number;
  /** Minimum font-size in px. Defaults to 12. */
  minFontSizePx?: number;
  /** Optional maximum font-size. Defaults to the computed font-size of the element. */
  maxFontSizePx?: number;
  /** Rerun fitting when this value changes (e.g., the text). */
  deps?: unknown[];
};

/**
 * Auto-resizes the font-size of an element so its content fits within a max line count.
 * Works even when the visible element uses CSS line-clamp by measuring with an offscreen clone.
 */
export function useAutoFitText<T extends HTMLElement = HTMLElement>(options: Options = {}) {
  const { maxLines = 2, minFontSizePx = 12, maxFontSizePx, deps = [] } = options;

  const elRef = useRef<T | null>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const roRef = useRef<ResizeObserver | null>(null);
  const moRef = useRef<MutationObserver | null>(null);

  const measureAndFit = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

  // Clear inline font-size so we can recompute the CSS max size on widen
  el.style.fontSize = '';

  // Compute current styles to mirror in the measuring node (post-clear)
  const baseStyles = getComputedStyle(el);
  let startFontPx = maxFontSizePx ?? parseFloat(baseStyles.fontSize || '16');
  // Nudge start slightly up to avoid getting stuck below CSS clamp max due to rounding
  startFontPx = Math.max(startFontPx, Math.ceil(startFontPx));
  // If we somehow can't compute sizing, bail
    if (!isFinite(startFontPx) || startFontPx <= 0) return;

    // Prepare a hidden measuring element (offscreen, no clamp)
    const meas = document.createElement('div');
  meas.textContent = el.textContent ?? '';
    // Copy text-related styles for fidelity
    const copyProps = [
      'fontFamily',
      'fontWeight',
      'fontStyle',
      'letterSpacing',
      'textTransform',
      'textIndent',
      'wordSpacing',
      'whiteSpace',
      'wordBreak',
      'overflowWrap',
      'textRendering',
      'hyphens',
    ] as const;
    copyProps.forEach((p) => {
      (meas.style as any)[p] = (baseStyles as any)[p];
    });
  meas.style.position = 'fixed';
    meas.style.top = '-9999px';
    meas.style.left = '0';
    meas.style.visibility = 'hidden';
    meas.style.pointerEvents = 'none';
    meas.style.whiteSpace = 'normal';
    meas.style.display = 'block';
    meas.style.boxSizing = 'border-box';
  meas.style.margin = '0';
  meas.style.padding = '0';
  meas.style.border = '0';

    // Use the actual available width of the element (content-box)
  const width = Math.floor(el.clientWidth || el.getBoundingClientRect().width);
  meas.style.width = `${width}px`;
    meas.style.lineHeight = baseStyles.lineHeight; // preserve the 1.2 unitless ratio

    document.body.appendChild(meas);

    const fitsAt = (fontPx: number) => {
      meas.style.fontSize = `${fontPx}px`;
      // Allowed height in px for maxLines
      const lhPx = parseFloat(getComputedStyle(meas).lineHeight || `${fontPx * 1.2}`) || fontPx * 1.2;
      const allowed = lhPx * maxLines + 0.5; // small epsilon
      const needed = meas.scrollHeight;
      return needed <= allowed;
    };

    // Binary search from min..start (or max override)
    let lo = minFontSizePx;
    let hi = Math.max(startFontPx, minFontSizePx);

    // Fast path: if the starting size fits, keep it
    if (fitsAt(hi)) {
  el.style.fontSize = `${hi}px`;
      document.body.removeChild(meas);
      return;
    }

    // Otherwise, search for the largest size that fits
    let best = lo;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (fitsAt(mid)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

  el.style.fontSize = `${best}px`;
    document.body.removeChild(meas);
  }, [maxLines, minFontSizePx, maxFontSizePx, ...deps]);

  // Fit on mount and whenever deps change (layout effect to avoid flicker)
  useLayoutEffect(() => {
    measureAndFit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measureAndFit]);

  // Observe size and text changes
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // ResizeObserver for width changes
    const ro = new ResizeObserver(() => {
      // Throttle via rAF to avoid bursts
      requestAnimationFrame(measureAndFit);
    });
    roRef.current = ro;
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);

    // MutationObserver for text changes
    const mo = new MutationObserver(() => {
      requestAnimationFrame(measureAndFit);
    });
    moRef.current = mo;
    mo.observe(el, { childList: true, characterData: true, subtree: true });

    cleanupRef.current = () => {
      ro.disconnect();
      mo.disconnect();
    };
    return () => cleanupRef.current();
  }, [measureAndFit]);

  const setRef = useCallback((node: T | null) => {
    elRef.current = node;
  }, []);

  return setRef;
}
