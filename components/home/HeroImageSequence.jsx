"use client";

import React, { useRef, useEffect, useState } from "react";

const HeroImageSequence = ({ children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const frameCount = 300;

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/herosectionframes/ezgif-frame-${frameNumber}.webp`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Initial draw
        const renderFrame = (index) => {
            const img = images[index];
            if (img) {
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
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const scrollDistance = container.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;

            let progress = scrolled / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(progress * frameCount)
            );

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        window.addEventListener("scroll", handleScroll);
        renderFrame(0);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [images, isLoaded]);

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
                {/* Simple gradient overlay */}
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
