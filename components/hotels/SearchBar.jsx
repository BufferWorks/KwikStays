"use client";

import { Search, Calendar, Users, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSearchSuggestions } from "@/lib/search/useSearchSuggestions";
import SearchSuggestions from "@/components/search/SearchSuggestions";

export default function SearchBar({ city }) {
  const [query, setQuery] = useState("");
  const [isMobileEditMode, setIsMobileEditMode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cities, localities } = useSearchSuggestions(query);
  const router = useRouter();
  const mobileInputRef = useRef(null);

  // Auto-focus input when entering mobile edit mode
  useEffect(() => {
    if (isMobileEditMode && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isMobileEditMode]);

  useEffect(() => {
    const handler = () => setShowSuggestions(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);


  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP SEARCH BAR (Visible on md+) */}
      {/* ========================================= */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
          {/* Location */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-auto">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex-1 relative">
              <label className="block text-xs font-medium text-gray-500">Location</label>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Where are you going?"
                className="w-full focus:outline-none placeholder:text-gray-400 font-medium text-gray-900"
              />
              {showSuggestions && (
                <SearchSuggestions cities={cities} localities={localities} onSelect={() => { setShowSuggestions(false); setQuery(""); }} />
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-auto">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500">Check-in - Check-out</label>
              <div className="text-sm font-medium text-gray-900">
                Today - Tomorrow
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full md:w-auto">
            <Users className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500">Guests</label>
              <div className="text-sm font-medium text-gray-900">
                2 Guests, 1 Room
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button

            className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
          >
            Search
          </button>

        </div>
      </div>

      {/* ========================================= */}
      {/* MOBILE HEADER (Visible on <md) */}
      {/* ========================================= */}
      <div className="md:hidden">
        {isMobileEditMode ? (
          /* Active Mobile Search Mode */
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="p-4 border-b flex items-center gap-3 shadow-sm">
              <button
                onClick={() => setIsMobileEditMode(false)}
                className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Search for a city or locality"
                  className="w-full text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                {/* Mobile Search Suggestions - Positioned absolutely below the header */}
                <div className="absolute top-full left-0 right-0 mt-2">
                  {showSuggestions && (
                    <SearchSuggestions
                      cities={cities}
                      localities={localities}
                      onSelect={() => {
                        setShowSuggestions(false);
                        setQuery("");
                        setIsMobileEditMode(false); // 👈 close mobile overlay (OYO behavior)
                      }}
                    />
                  )}
                </div>

              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-bold text-gray-400 uppercase"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Overlay background if needed, or just white space */}
            <div className="flex-1 bg-gray-50 p-4">
              {!query && (
                <div className="text-center text-gray-400 mt-10">
                  <p className="text-sm">Type to search for hotels</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Static Mobile Header */
          <div>
            <div className="px-4 py-3 bg-white">
              <div
                onClick={() => setIsMobileEditMode(true)}
                className="flex items-center gap-3 bg-gray-100/80 rounded-md px-3 py-2.5 border border-gray-200 shadow-sm active:bg-gray-200 transition-colors cursor-pointer"
              >
                {/* Back Arrow or Search Icon */}
                <Search className="w-4 h-4 text-gray-500" />

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {query || city || "Search Location"}, India
                  </div>
                  {/* Subtext: Dates & Guests */}
                  <div className="text-[10px] text-gray-500 truncate flex items-center gap-1">
                    <span>Today - Tomorrow</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                    <span>1 Room, 2 Guests</span>
                  </div>
                </div>

                {/* Edit / Filter Icon */}
                <div className="pl-3 border-l border-gray-300">
                  <div className="text-emerald-600 font-bold text-xs uppercase tracking-wide">
                    Edit
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Date/Guest Strip */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-gray-100 shadow-sm text-xs font-medium text-gray-600">
              <div className="flex text-center w-full">
                <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                  <span className="text-emerald-600 font-bold">Sat, 03 Jan</span>
                  <span className="text-[10px] text-gray-400">12:00 PM</span>
                </div>
                <div className="px-3 flex items-center justify-center">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-gray-500">1N</span>
                </div>
                <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                  <span className="text-rose-500 font-bold">Sun, 04 Jan</span>
                  <span className="text-[10px] text-gray-400">11:00 AM</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-gray-800 font-bold">1 Room</span>
                  <span className="text-[10px] text-gray-400">2 Guests</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}