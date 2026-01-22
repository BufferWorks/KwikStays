"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchBar from "@/components/home/HomeSearchBar";
import { Search } from "lucide-react";

// Sticky Search Header (Mobile Only)
const StickySearchHeader = ({ isVisible }) => {
    return (
        <div
            className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <div className="px-4 py-3 bg-white shadow-lg border-b border-gray-100">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-orange-500" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20 text-sm font-medium text-gray-800 placeholder:text-gray-400"
                        placeholder="Search for city, location or hotel"
                    />
                </div>
            </div>
        </div>
    );
};

export default function HomeSearchSection({ children }) {
    const [isStickySearchVisible, setIsStickySearchVisible] = useState(false);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const searchBarEl = searchBarRef.current;
        if (!searchBarEl) return;

        const handleScroll = () => {
            const searchBarTop = searchBarEl.offsetTop;
            // logic for sticky header on mobile
            if (window.scrollY > searchBarTop + 100) {
                setIsStickySearchVisible(true);
            } else {
                setIsStickySearchVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <StickySearchHeader isVisible={isStickySearchVisible} />
            <div className="flex flex-col relative">
                {/* Hero is passed as Children */}
                {children}

                {/* Overlapping Search Bar Container */}
                <div className="relative z-30 px-4 -mt-8 md:-mt-24 lg:-mt-28 w-full max-w-6xl mx-auto">
                    <div className="animate-fade-in-up delay-100">
                        <SearchBar ref={searchBarRef} />
                    </div>
                </div>
            </div>
        </>
    );
}
