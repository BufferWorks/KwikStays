import React from "react";
import { MapPin, Search, ArrowRight } from "lucide-react";

/**
 * CityDestinations Component
 * @param {Object} props
 * @param {Array} props.cities - List of city objects
 */
const CityDestinations = ({ cities = [] }) => {
    return (
        <section className="py-12 md:py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                            <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">Explore</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Trending Getaways
                        </h2>
                        <p className="text-gray-500 mt-2 max-w-lg text-sm md:text-lg font-light">
                            Discover the most loved destinations by our community of travelers.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="hidden md:inline-flex group items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:border-orange-200 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        View all cities
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </a>
                </div>

                {/* Grid (Desktop) / Scroll (Mobile) */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    {cities.map((city, idx) => (
                        <a
                            key={city._id}
                            href={`/hotels/${city.city?.slug || ""}`}
                            className={`group relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 block shrink-0
                                min-w-[150px] aspect-[3/4] snap-start border border-gray-100 md:border-transparent
                                md:min-w-0
                                ${idx === 0
                                    ? "md:col-span-2 lg:col-span-2 md:row-span-2 aspect-[3/4] md:aspect-[4/3] lg:aspect-auto"
                                    : "md:aspect-[3/4]"
                                }
                            `}
                        >
                            <img
                                src={city.heroImage}
                                alt={city.displayName}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 transform transition-transform duration-300">
                                <h3 className={`font-bold text-white mb-1 leading-none ${idx === 0 ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                                    {city.displayName}
                                </h3>

                                <div className="hidden md:block space-y-1 overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                    <div className="w-12 h-1 bg-orange-500 rounded-full mb-2"></div>
                                    <p className="text-gray-300 text-sm font-medium">Starting from <span className="text-white font-bold">₹999</span></p>
                                </div>

                                <p className="md:hidden text-gray-300 text-[10px] font-medium mt-1">From ₹999</p>
                            </div>

                            {/* Hover Icon (Desktop only) */}
                            <div className="hidden md:flex absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowRight size={18} className="text-white -rotate-45" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityDestinations;
