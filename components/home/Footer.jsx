import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

// Helper for Social Links
const SocialLink = ({ href, Icon }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-gray-700 hover:border-orange-400"
    >
        <Icon size={18} />
    </a>
);

// Helper for Footer Links
const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
            {children}
        </a>
    </li>
);

const Footer = () => {
    return (
        <footer className="hidden md:block bg-[#111827] text-white pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">

                            <span className="text-2xl font-bold tracking-tight">
                                Kwik<span className="text-orange-500">Stays</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Experience the joy of perfect stays. From cozy homestays to luxury resorts, we bring you the best accommodations across India.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" Icon={Instagram} />
                            <SocialLink href="#" Icon={Twitter} />
                            <SocialLink href="#" Icon={Linkedin} />
                            <SocialLink href="#" Icon={Facebook} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Top Destinations</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/hotels/delhi">Delhi Hotels</FooterLink>
                            <FooterLink href="/hotels/bangalore">Bangalore Stays</FooterLink>
                            <FooterLink href="/hotels/jaipur">Jaipur Resorts</FooterLink>
                            <FooterLink href="/hotels/delhi">Delhi Homestays</FooterLink>
                            <FooterLink href="/hotels/agra">Agra Hotels</FooterLink>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
                            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                            <FooterLink href="/faq">FAQs</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-orange-500 mt-0.5 shrink-0" />
                                <span>Shop No. 5 , KH No 147 , Semi Basement, Agra, India</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={18} className="text-orange-500 shrink-0" />
                                <span>+91 7709475075</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-orange-500 shrink-0" />
                                <span>kwikstays.in@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} KwikStays. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
