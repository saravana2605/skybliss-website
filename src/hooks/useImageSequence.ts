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
    // Stage 1: Hotel Aishwarya Grand building - focus on upper floors / 4th floor rooftop
    src: SKYBLISS_IMAGES.fullBuilding,
    focusX: 0.5,
    focusY: 0.22,
    scaleStart: 1.05,
    scaleEnd: 1.25,
    panX: 0,
    panY: 30,
  },
  {
    // Stage 2: Grand illuminated ground entrance & arrival portico
    src: SKYBLISS_IMAGES.entrance,
    focusX: 0.5,
    focusY: 0.58,
    scaleStart: 1.0,
    scaleEnd: 1.15,
    panX: 0,
    panY: -20,
  },
  {
    // Stage 3: Signature open-sky rooftop resto lounge with ambient tables & night sky
    src: SKYBLISS_IMAGES.rooftop,
    focusX: 0.5,
    focusY: 0.42,
    scaleStart: 1.02,
    scaleEnd: 1.18,
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
  const lastProgressRef = useRef<number>(-1);

  // Preload images
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
  }, []);

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
      if (!img.complete || img.naturalWidth === 0 || alpha <= 0.005) return;

      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Base cover scale
      const baseScale = Math.max(cw / iw, ch / ih);
      const zoom = stage.scaleStart + (stage.scaleEnd - stage.scaleStart) * localT;
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

      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "#0c0c0b";
      ctx.fillRect(0, 0, cw, ch);

      const images = imagesRef.current;
      if (!images || images.length === 0) return;

      // Stage progression mapping:
      // Stage 0 (Building): p in [0, 0.45]
      // Transition 0 -> 1: p in [0.30, 0.50]
      // Stage 1 (Entrance): p in [0.40, 0.75]
      // Transition 1 -> 2: p in [0.65, 0.85]
      // Stage 2 (Rooftop): p in [0.75, 1.0]

      if (p <= 0.45) {
        const localT = p / 0.45;
        if (images[0]) drawStage(ctx, images[0], STAGES[0], localT, 1, cw, ch);
      }

      if (p > 0.30 && p < 0.85) {
        // Entrance stage
        let alpha = 1;
        if (p < 0.48) {
          alpha = (p - 0.30) / 0.18;
        } else if (p > 0.68) {
          alpha = 1 - (p - 0.68) / 0.17;
        }
        const localT = (p - 0.30) / 0.55;
        if (images[1]) drawStage(ctx, images[1], STAGES[1], localT, alpha, cw, ch);
      }

      if (p >= 0.65) {
        // Rooftop stage
        const alpha = p < 0.85 ? (p - 0.65) / 0.20 : 1;
        const localT = (p - 0.65) / 0.35;
        if (images[2]) drawStage(ctx, images[2], STAGES[2], localT, alpha, cw, ch);
      }
    },
    [canvasRef, drawStage]
  );

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
