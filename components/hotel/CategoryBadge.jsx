import { Crown, Briefcase, Wallet } from "lucide-react";

export default function CategoryBadge({ categories = [] }) {
    const hasBusiness = categories.some(
        (c) =>
            c.slug?.toLowerCase().includes("business") ||
            c.name?.toLowerCase().includes("business")
    );
    const hasLuxury = categories.some(
        (c) =>
            c.slug?.toLowerCase().includes("luxury") ||
            c.slug?.toLowerCase().includes("premium") ||
            c.name?.toLowerCase().includes("luxury") ||
            c.name?.toLowerCase().includes("premium")
    );
    const hasBudget = categories.some(
        (c) =>
            c.slug?.toLowerCase().includes("budget") ||
            c.name?.toLowerCase().includes("budget")
    );

    if (hasBusiness) {
        return (
            <div className="flex items-center gap-1.5 bg-gray-900 px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wide">
                <Briefcase size={12} className="text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    Business Stay
                </span>
            </div>
        );
    }
    if (hasLuxury) {
        return (
            <div className="flex items-center gap-1.5 bg-gray-900 px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wide">
                <Crown size={12} className="text-[#f5c518]" />
                <span className="bg-gradient-to-r from-[#f5c518] to-[#e0a800] bg-clip-text text-transparent">
                    Premium Stay
                </span>
            </div>
        );
    }
    if (hasBudget) {
        return (
            <div className="flex items-center gap-1.5 bg-gray-900 px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wide">
                <Wallet size={12} className="text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                    Budget Stay
                </span>
            </div>
        );
    }
    return null;
}
