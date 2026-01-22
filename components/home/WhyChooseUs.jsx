import React from "react";
import { CheckCircle, BadgePercent, Star, Headphones, ShieldCheck, Zap } from "lucide-react";

const WhyChooseUs = () => {
    // Extended features for better layout
    const features = [
        {
            icon: ShieldCheck,
            title: "Safe & Sanitised",
            desc: "Certified hygiene protocols at every property.",
            color: "text-blue-500",
            bg: "bg-blue-50",
            colSpan: "md:col-span-2",
        },
        {
            icon: BadgePercent,
            title: "Best Price",
            desc: "Unbeatable rates guaranteed.",
            color: "text-green-500",
            bg: "bg-green-50",
            colSpan: "md:col-span-1",
        },
        {
            icon: Star,
            title: "4.8/5 Rated",
            desc: "Loved by 1M+ travelers.",
            color: "text-yellow-500",
            bg: "bg-yellow-50",
            colSpan: "md:col-span-1",
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            desc: "Real humans, always ready to help.",
            color: "text-purple-500",
            bg: "bg-purple-50",
            colSpan: "md:col-span-2",
        },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Text Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-6">
                            <Zap size={16} />
                            <span>The KwikStays Promise</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                            Why travelers <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                                choose us
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            We don't just book rooms; we curate experiences. Fromverified safety standards to budget-friendly luxury, we ensure your journey is perfect from check-in to check-out.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-900">1M+</span>
                                <span className="text-sm text-gray-500 font-medium">Bookings</span>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-900">500+</span>
                                <span className="text-sm text-gray-500 font-medium">Cities</span>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-900">4.8</span>
                                <span className="text-sm text-gray-500 font-medium">Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Bento Grid Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`group p-6 rounded-3xl border border-gray-100 bg-white/60 backdrop-blur-sm shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:bg-white transition-all duration-300 ${f.colSpan}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <f.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
