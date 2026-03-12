"use client";

import React, { useRef, useEffect, useState } from "react";

const HERO_SESSION_KEY = "kwikstays_hero_played";

const HeroImageSequence = ({ children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef([]); // Use ref to avoid re-renders during load
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);

    const frameCount = 300;

    // Check session on mount
    useEffect(() => {
        const played = sessionStorage.getItem(HERO_SESSION_KEY) === "true";
        setAlreadyPlayed(played);
    }, []);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;
            const imagePromises = [];

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/herosectionframes/ezgif-frame-${frameNumber}.webp`;

                const p = new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                        resolve();
                    };
                    img.onerror = () => resolve();
                });

                imagePromises.push(p);
                loadedImages.push(img);
            }

            await Promise.all(imagePromises);
            imagesRef.current = loadedImages;
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Rendering & scroll logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || imagesRef.current.length === 0) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const renderFrame = (index) => {
            const img = imagesRef.current[index];
            if (!img || !img.width) return;

            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;

            let renderWidth, renderHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                renderWidth = canvas.width;
                renderHeight = canvas.width / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - renderHeight) / 2;
            } else {
                renderWidth = canvas.height * imgAspect;
                renderHeight = canvas.height;
                offsetX = (canvas.width - renderWidth) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-render current frame after resize
            if (alreadyPlayed) {
                renderFrame(frameCount - 1);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // If already played this session: just render last frame statically
        if (alreadyPlayed) {
            renderFrame(frameCount - 1);
            return () => window.removeEventListener("resize", handleResize);
        }

        // First time: attach scroll handler
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const scrollDistance = container.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;

            let progress = scrolled / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));

            // When animation finishes, mark as played in session
            if (progress >= 1) {
                sessionStorage.setItem(HERO_SESSION_KEY, "true");
            }

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        window.addEventListener("scroll", handleScroll);
        renderFrame(0);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoaded, alreadyPlayed]);

    // If already played → render as a static full-screen section (no scroll track)
    if (alreadyPlayed) {
        return (
            <div className="relative h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        );
    }

    // First time → full 800vh scroll animation
    return (
        <div ref={containerRef} className="relative h-[800vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!isLoaded && (
                    <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                        <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
                        <p className="text-sm font-medium text-white/90">Loading Experience... {loadProgress}%</p>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none md:via-black/10"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HeroImageSequence;
