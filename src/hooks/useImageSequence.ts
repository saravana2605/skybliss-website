/**
 * useImageSequence
 * ─────────────────────────────────────────────────────────────────────────────
 * Preloads the Skybliss photography assets in parallel and provides an art-directed
 * drawFrame(progress) function that renders a cinematic multi-stage scroll journey
 * onto an HTML5 canvas with sub-pixel interpolation, Ken Burns movement, and crossfading.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { SKYBLISS_IMAGES } from "@/lib/constants";

export interface ImageSequenceState {
  loadProgress: number;
  isLoaded: boolean;
  drawFrame: (progressOrIndex: number) => void;
}

export interface StageConfig {
  src: string;
  focusX: number; // 0 to 1
  focusY: number; // 0 to 1
  scaleStart: number;
  scaleEnd: number;
  panX: number;
  panY: number;
}

const STAGES: StageConfig[] = [
  {
    // Stage 1: Hotel Aishwarya Grand main building & 4th floor rooftop vantage
    src: SKYBLISS_IMAGES.fullBuildingMain,
    focusX: 0.5,
    focusY: 0.28,
    scaleStart: 1.04,
    scaleEnd: 1.18,
    panX: 0,
    panY: 20,
  },
  {
    // Stage 2: Rooftop Dining & Signature Cocktails
    src: SKYBLISS_IMAGES.dining1,
    focusX: 0.5,
    focusY: 0.45,
    scaleStart: 1.02,
    scaleEnd: 1.15,
    panX: 0,
    panY: -15,
  },
  {
    // Stage 3: Signature Skybliss open-sky panoramic rooftop resto lounge
    src: SKYBLISS_IMAGES.skyblissTop,
    focusX: 0.5,
    focusY: 0.45,
    scaleStart: 1.02,
    scaleEnd: 1.16,
    panX: 0,
    panY: -15,
  },
];

export function useSkyblissHeroSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): ImageSequenceState {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastProgressRef = useRef<number>(0);

  const drawStage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      stage: StageConfig,
      localT: number,
      alpha: number,
      cw: number,
      ch: number
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0 || alpha <= 0.005) return false;

      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Base cover scale
      const baseScale = Math.max(cw / iw, ch / ih);
      const zoom = stage.scaleStart + (stage.scaleEnd - stage.scaleStart) * Math.min(1, Math.max(0, localT));
      const finalScale = baseScale * zoom;

      const drawW = iw * finalScale;
      const drawH = ih * finalScale;

      // Focus point coordinates
      const focusXInCanvas = cw * 0.5;
      const focusYInCanvas = ch * 0.5;

      const imgTargetX = iw * stage.focusX * finalScale;
      const imgTargetY = ih * stage.focusY * finalScale;

      const panShiftX = stage.panX * localT;
      const panShiftY = stage.panY * localT;

      let dx = focusXInCanvas - imgTargetX + panShiftX;
      let dy = focusYInCanvas - imgTargetY + panShiftY;

      // Prevent canvas empty edges
      dx = Math.min(0, Math.max(cw - drawW, dx));
      dy = Math.min(0, Math.max(ch - drawH, dy));

      ctx.drawImage(img, dx, dy, drawW, drawH);
      ctx.restore();
      return true;
    },
    []
  );

  const drawFrame = useCallback(
    (rawVal: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Normalize rawVal to 0–1 progress
      const p = Math.max(0, Math.min(1, rawVal > 1 ? rawVal / 100 : rawVal));
      lastProgressRef.current = p;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const images = imagesRef.current;

      // Helper to find any available loaded image as fallback
      const fallbackImg = images.find((im) => im && im.complete && im.naturalWidth > 0);

      // Layered Crossfading Architecture:
      // Base layer is ALWAYS drawn at alpha=1 so no black canvas background ever leaks through.
      if (p < 0.35) {
        // Stage 0 alone
        const localT = p / 0.35;
        const drawn = images[0] ? drawStage(ctx, images[0], STAGES[0], localT, 1, cw, ch) : false;
        if (!drawn && fallbackImg) drawStage(ctx, fallbackImg, STAGES[0], localT, 1, cw, ch);
      } else if (p < 0.48) {
        // Transition Stage 0 -> Stage 1:
        // Stage 0 stays at 100% opacity underneath, Stage 1 fades in on top
        const localT0 = 1;
        const localT1 = (p - 0.35) / 0.35;
        const alpha1 = (p - 0.35) / 0.13;

        const drawn0 = images[0] ? drawStage(ctx, images[0], STAGES[0], localT0, 1, cw, ch) : false;
        if (!drawn0 && fallbackImg) drawStage(ctx, fallbackImg, STAGES[0], localT0, 1, cw, ch);

        if (images[1]) drawStage(ctx, images[1], STAGES[1], localT1, alpha1, cw, ch);
      } else if (p < 0.68) {
        // Stage 1 alone
        const localT = (p - 0.35) / 0.35;
        const drawn = images[1] ? drawStage(ctx, images[1], STAGES[1], localT, 1, cw, ch) : false;
        if (!drawn && fallbackImg) drawStage(ctx, fallbackImg, STAGES[1], localT, 1, cw, ch);
      } else if (p < 0.80) {
        // Transition Stage 1 -> Stage 2:
        // Stage 1 stays at 100% opacity underneath, Stage 2 fades in on top
        const localT1 = 1;
        const localT2 = (p - 0.68) / 0.32;
        const alpha2 = (p - 0.68) / 0.12;

        const drawn1 = images[1] ? drawStage(ctx, images[1], STAGES[1], localT1, 1, cw, ch) : false;
        if (!drawn1 && fallbackImg) drawStage(ctx, fallbackImg, STAGES[1], localT1, 1, cw, ch);

        if (images[2]) drawStage(ctx, images[2], STAGES[2], localT2, alpha2, cw, ch);
      } else {
        // Stage 2 alone
        const localT = (p - 0.68) / 0.32;
        const drawn = images[2] ? drawStage(ctx, images[2], STAGES[2], localT, 1, cw, ch) : false;
        if (!drawn && fallbackImg) drawStage(ctx, fallbackImg, STAGES[2], localT, 1, cw, ch);
      }
    },
    [canvasRef, drawStage]
  );


  // Preload images and trigger immediate redraws as they finish loading
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    const total = STAGES.length;

    STAGES.forEach((stage, i) => {
      const img = new Image();
      img.src = stage.src;

      img.onload = () => {
        count++;
        setLoadProgress(count / total);
        drawFrame(lastProgressRef.current);
        if (count === total) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        count++;
        setLoadProgress(count / total);
        if (count === total) setIsLoaded(true);
      };

      loadedImages[i] = img;
    });

    imagesRef.current = loadedImages;
  }, [drawFrame]);

  return { loadProgress, isLoaded, drawFrame };
}

// Retain compatibility export
export function useImageSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  total: number = 300,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _srcFn?: (index: number) => string
): ImageSequenceState {
  return useSkyblissHeroSequence(canvasRef);
}
