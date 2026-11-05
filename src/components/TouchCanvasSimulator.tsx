import React, { useRef, useState, useEffect } from 'react';
import { SensiConfig } from '../utils/sensiLogic';
import { Crosshair, Move, RefreshCw } from 'lucide-react';

interface TouchCanvasSimulatorProps {
  config: SensiConfig;
}

export const TouchCanvasSimulator: React.FC<TouchCanvasSimulatorProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState({
    rawDistanceX: 0,
    rawDistanceY: 0,
    scaledDistanceX: 0,
    scaledDistanceY: 0,
    dragAngle: 0,
    dragSpeed: 0,
  });

  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pointsRef = useRef<Array<{ rawX: number; rawY: number; scaledX: number; scaledY: number }>>([]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background: Deep Obsidian Black with subtle purple hint
    ctx.fillStyle = '#090412';
    ctx.fillRect(0, 0, width, height);

    // Draw coordinate grid
    ctx.strokeStyle = '#1b0d2e';
    ctx.lineWidth = 1;
    const gridSize = 30;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Center crosshair / fire button area
    const centerX = width / 2;
    const centerY = height * 0.65; // realistic fire button position on mobile

    ctx.strokeStyle = '#4c1d95';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#C084FC';
    ctx.font = '10px monospace';
    ctx.fillText('POSISI TOMBOL TEMBAK', centerX - 60, centerY + 55);

    // Draw paths if points exist
    const points = pointsRef.current;
    if (points.length > 1) {
      // 1. Raw touch path (physical finger swipe - white/silver dashed)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].rawX, points[0].rawY);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].rawX, points[i].rawY);
      }
      ctx.stroke();

      // 2. Scaled / Boosted Sensi Curve (Neon Violet/Purple glow)
      ctx.setLineDash([]);
      ctx.strokeStyle = '#C084FC';
      ctx.shadowColor = '#A855F7';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(points[0].scaledX, points[0].scaledY);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].scaledX, points[i].scaledY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Start marker
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(points[0].rawX, points[0].rawY, 5, 0, Math.PI * 2);
      ctx.fill();

      // End marker with indicator
      const last = points[points.length - 1];
      ctx.fillStyle = '#A855F7';
      ctx.beginPath();
      ctx.arc(last.scaledX, last.scaledY, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    drawScene();
  }, [config]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    dragStartRef.current = { x, y, time: performance.now() };
    pointsRef.current = [{ rawX: x, rawY: y, scaledX: x, scaledY: y }];
    drawScene();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    const start = dragStartRef.current;
    const deltaX = rawX - start.x;
    const deltaY = rawY - start.y;

    const multX = config.globalEnabled ? config.sensiX : 1.0;
    const multY = config.globalEnabled ? config.sensiY : 1.0;

    const scaledX = start.x + deltaX * (multX / 1.5);
    const scaledY = start.y + deltaY * (multY / 1.5);

    pointsRef.current.push({ rawX, rawY, scaledX, scaledY });

    const dt = Math.max(performance.now() - start.time, 1);
    const distRaw = Math.hypot(deltaX, deltaY);
    const angle = Math.round((Math.atan2(-deltaY, deltaX) * 180) / Math.PI);
    const speed = Math.round((distRaw / dt) * 100);

    setStats({
      rawDistanceX: Math.round(Math.abs(deltaX)),
      rawDistanceY: Math.round(Math.abs(deltaY)),
      scaledDistanceX: Math.round(Math.abs(deltaX * multX)),
      scaledDistanceY: Math.round(Math.abs(deltaY * multY)),
      dragAngle: angle,
      dragSpeed: speed,
    });

    drawScene();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    pointsRef.current = [];
    setStats({
      rawDistanceX: 0,
      rawDistanceY: 0,
      scaledDistanceX: 0,
      scaledDistanceY: 0,
      dragAngle: 0,
      dragSpeed: 0,
    });
    drawScene();
  };

  return (
    <div className="bg-[#12091f]/90 backdrop-blur-md border border-[#2d164a] rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-[#C084FC]" />
          <div>
            <h3 className="text-sm font-bold text-white">Simulator Sentuhan &amp; Kurva Drag (Live Test)</h3>
            <p className="text-[11px] text-[#9a89b0]">
              Coba geser/swipe di bawah untuk melihat perbedaan sentuhan fisik vs kurva Sensi X &amp; Y
            </p>
          </div>
        </div>
        <button
          onClick={handleClear}
          aria-label="Bersihkan Kanvas"
          className="flex items-center gap-1 text-xs text-[#9d8cb5] hover:text-white bg-[#1e0f33] px-2.5 py-1.5 rounded-lg border border-[#3b195f] transition"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Kanvas</span>
        </button>
      </div>

      {/* Simulator Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-[#2b1448] touch-none">
        <canvas
          ref={canvasRef}
          width={560}
          height={260}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-[240px] cursor-crosshair block"
        />

        {/* Legend Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-3 bg-[#0a0414]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#2b1347] text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-0.5 border-t border-dashed border-white inline-block" />
            <span>Fisik Jari Asli</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#C084FC] font-medium">
            <span className="w-3 h-1 bg-[#A855F7] rounded inline-block" />
            <span>Hasil Kurva Sensi (X: {config.sensiX}, Y: {config.sensiY})</span>
          </div>
        </div>

        {/* Drag Hint */}
        {pointsRef.current.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
            <Move className="w-8 h-8 text-[#A855F7]/50 animate-pulse mb-2" />
            <p className="text-xs font-semibold text-white/90">Klik &amp; Drag ke atas (Flick Shoot / Recoil Drag)</p>
            <p className="text-[11px] text-[#9a89b2]">Simulasikan tarikan tombol tembak Free Fire</p>
          </div>
        )}
      </div>

      {/* Live Readout Metrics */}
      <div className="grid grid-cols-4 gap-2 mt-3 text-center">
        <div className="bg-[#0c0517] p-2 rounded-lg border border-[#26133d]">
          <span className="text-[10px] text-[#9382ab] block">Fisik X &rarr; Y</span>
          <span className="text-xs font-mono font-bold text-white">
            {stats.rawDistanceX}px &bull; {stats.rawDistanceY}px
          </span>
        </div>
        <div className="bg-[#0c0517] p-2 rounded-lg border border-[#26133d]">
          <span className="text-[10px] text-[#C084FC] block">Output Kurva Boost</span>
          <span className="text-xs font-mono font-bold text-[#C084FC]">
            {stats.scaledDistanceX}px &bull; {stats.scaledDistanceY}px
          </span>
        </div>
        <div className="bg-[#0c0517] p-2 rounded-lg border border-[#26133d]">
          <span className="text-[10px] text-[#9382ab] block">Sudut Drag (Angle)</span>
          <span className="text-xs font-mono font-bold text-cyan-300">
            {stats.dragAngle}&deg; {stats.dragAngle > 70 && stats.dragAngle < 110 ? '(Headshot Zone)' : ''}
          </span>
        </div>
        <div className="bg-[#0c0517] p-2 rounded-lg border border-[#26133d]">
          <span className="text-[10px] text-[#9382ab] block">Kecepatan Flick</span>
          <span className="text-xs font-mono font-bold text-amber-300">{stats.dragSpeed} pts/s</span>
        </div>
      </div>
    </div>
  );
};
