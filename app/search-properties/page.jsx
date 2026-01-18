"use client";

import React from "react";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import { useState } from "react";
import { Home, Search, Briefcase, Heart, User } from "lucide-react";

function BottomNav() {
    const [activeTab, setActiveTab] = useState("Search");
    const navItems = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Search", icon: Search, href: "/search-properties" },
        { name: "Bookings", icon: Briefcase, href: "/my-bookings" },
        { name: "Wishlist", icon: Heart, href: "/wishlist" },
        { name: "Account", icon: User, href: "/account" },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.06)] border-t border-gray-200">
            <div className="flex justify-around h-16">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveTab(item.name)}
                        className="flex flex-col items-center justify-center w-full"
                    >
                        <item.icon
                            size={24}
                            className={`transition-colors ${activeTab === item.name
                                ? "text-red-500" // Active color from OYO image
                                : "text-gray-500"
                                }`}
                        />
                        <span
                            className={`text-xs font-medium transition-colors ${activeTab === item.name ? "text-red-500" : "text-gray-600"
                                }`}
                        >
                            {item.name}
                        </span>
                    </a>
                ))}
            </div>
        </nav>
    );
}


export default function SearchPropertiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <main className="max-w-md mx-auto w-full bg-white min-h-screen">
                <HomeSearchBar />
            </main>
            <BottomNav />
        </div>
    );
}
