"use client";

import { X } from "lucide-react";

const sortOptions = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Guest Rating",
];

export function SortSelect({ value, onChange }) {
    return (
        <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By</span>
            <select
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                {sortOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function SortModal({ isOpen, onClose, currentSort, onSortChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Overlay click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full bg-white rounded-t-2xl shadow-xl animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Sort By</h3>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-4 space-y-2 pb-8">
                    {sortOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onSortChange(option);
                                onClose();
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${currentSort === option
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "text-gray-700 hover:bg-gray-50 border border-transparent"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
