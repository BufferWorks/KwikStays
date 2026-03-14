"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const HERO_SESSION_KEY = "kwikstays_hero_played";
const FRAME_COUNT = 300;
const PRIORITY_FRAMES = 30; // Load these first before showing anything

const getFrameSrc = (i) => {
    const n = i.toString().padStart(3, "0");
    return `/herosectionframes/ezgif-frame-${n}.webp`;
};

const HeroImageSequence = ({ children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef(new Array(FRAME_COUNT).fill(null));
    const currentFrameRef = useRef(0);
    const rafRef = useRef(null);

    const [isReady, setIsReady] = useState(false);        // true when first batch loaded
    const [loadProgress, setLoadProgress] = useState(0);
    const [alreadyPlayed] = useState(() => {
        if (typeof window === "undefined") return false;
        return sessionStorage.getItem(HERO_SESSION_KEY) === "true";
    });

    // ── Draw canvas ──────────────────────────────────────────────
    const renderFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        // If requested frame not loaded yet, find nearest loaded one
        let img = imagesRef.current[index];
        if (!img) {
            // Search backwards for nearest loaded frame
            for (let i = index - 1; i >= 0; i--) {
                if (imagesRef.current[i]) { img = imagesRef.current[i]; break; }
            }
        }
        if (!img) return;

        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let rW, rH, oX, oY;

        if (canvasAspect > imgAspect) {
            rW = canvas.width; rH = canvas.width / imgAspect;
            oX = 0; oY = (canvas.height - rH) / 2;
        } else {
            rW = canvas.height * imgAspect; rH = canvas.height;
            oX = (canvas.width - rW) / 2; oY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, oX, oY, rW, rH);
    }, []);

    // ── Load a single image ──────────────────────────────────────
    const loadImage = useCallback((index) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = getFrameSrc(index + 1); // frames are 1-indexed
            img.onload = () => {
                imagesRef.current[index] = img;
                resolve();
            };
            img.onerror = () => resolve();
        });
    }, []);

    // ── Main loading strategy ────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const run = async () => {
            // PHASE 1: Load priority frames (1–30) fast, in parallel
            const priorityBatch = [];
            for (let i = 0; i < PRIORITY_FRAMES; i++) {
                priorityBatch.push(loadImage(i));
            }
            await Promise.all(priorityBatch);

            // Reveal canvas with first frame
            renderFrame(0);
            setIsReady(true);
            setLoadProgress(Math.round((PRIORITY_FRAMES / FRAME_COUNT) * 100));

            // PHASE 2: Load remaining frames in small chunks (don't block UI)
            const chunkSize = 20;
            let loaded = PRIORITY_FRAMES;

            for (let start = PRIORITY_FRAMES; start < FRAME_COUNT; start += chunkSize) {
                const end = Math.min(start + chunkSize, FRAME_COUNT);
                const chunk = [];
                for (let i = start; i < end; i++) chunk.push(loadImage(i));
                await Promise.all(chunk);

                loaded += (end - start);
                setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));

                // Yield to browser between chunks
                await new Promise((r) => setTimeout(r, 0));
            }

            // Mark session as played when full sequence loads (for alreadyPlayed mode too)
            // sessionStorage is only set when user actually SCROLLS through — see scroll handler
        };

        run();
    }, [loadImage, renderFrame]);

    // ── Resize handler ──────────────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(currentFrameRef.current);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [renderFrame]);

    // ── Scroll handler (only for first-time animation) ──────────
    useEffect(() => {
        if (!isReady || alreadyPlayed) return;

        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollDistance = containerRef.current.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;

            let progress = Math.max(0, Math.min(1, scrolled / scrollDistance));
            const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
            currentFrameRef.current = frameIndex;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));

            if (progress >= 1) {
                sessionStorage.setItem(HERO_SESSION_KEY, "true");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isReady, alreadyPlayed, renderFrame]);

    // ── Static mode (already played this session) ────────────────
    if (alreadyPlayed) {
        return (
            <div className="relative h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        );
    }

    // ── Full animation mode (first visit) ───────────────────────
    return (
        <div ref={containerRef} className="relative h-[800vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading pill — only while priority frames aren't ready */}
                {!isReady && (
                    <div className="absolute inset-0 flex items-center justify-center z-40 bg-black">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                            <p className="text-white/70 text-sm">Loading... {loadProgress}%</p>
                        </div>
                    </div>
                )}

                {/* Background loading indicator (after ready, while rest loads) */}
                {isReady && loadProgress < 100 && (
                    <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        <div className="w-3 h-3 rounded-full border border-orange-500 border-t-transparent animate-spin" />
                        <p className="text-xs text-white/60">{loadProgress}%</p>
                    </div>
                )}

                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none md:via-black/10" />
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HeroImageSequence;
