import React from "react";
import { Star, ArrowRight } from "lucide-react";
import HeroImageSequence from "./HeroImageSequence";

const Hero = () => {
    return (

        <div className="hidden md:block w-full">
            <HeroImageSequence>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-6xl mx-auto px-4 -mt-10 pointer-events-auto">

                    <h1 className="pt-10 text-6xl md:text-7xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-8 drop-shadow-2xl font-[family-name:var(--font-playfair)]">
                        Find Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f8a11e] via-[#ffc45e] to-[#ffffff] italic">
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

                {/* Animated Scroll Indicator - Also pinned */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                    <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-white/50 rounded-full"></div>
                </div>
            </HeroImageSequence>
        </div>
    );
};

export default Hero;
