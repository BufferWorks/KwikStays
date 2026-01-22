import React from "react";
import { Star, ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="hidden md:block relative h-[80vh] min-h-[600px] overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover scale-105 animate-slow-zoom"
                />
                {/* Premium Gradient Overlay - Multi-layered for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-6xl mx-auto px-4 -mt-10">

                {/* Main Headline */}
                <h1 className="pt-10 text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none mb-8 drop-shadow-2xl">
                    Find Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f8a11e] via-[#ffc45e] to-[#ffffff]">
                        Perfect Escape
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-100 max-w-3xl font-light mb-12 leading-relaxed drop-shadow-md">
                    Discover handpicked luxury hotels, cozy homestays, and breathtaking resorts across India's most beautiful destinations.
                </p>

                {/* CTA Button (Optional visuals) */}
                <div className="flex gap-4">
                    {/* Could act as a scroll down trigger */}
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-white/50 rounded-full"></div>
            </div>
        </div>
    );
};

export default Hero;
