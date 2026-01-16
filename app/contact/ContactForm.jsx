"use client";

import { useState } from "react";
import {
    MessageSquare,
    Send,
    CheckCircle2,
} from "lucide-react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 🔹 Later: send to API / email service
        await new Promise((r) => setTimeout(r, 1200));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-[#f8a11e]" size={24} />
                Send us a Message
            </h2>

            {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-[#f8a11e] font-bold hover:underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="name"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f8a11e]"
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f8a11e]"
                        />
                    </div>

                    <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f8a11e]"
                    >
                        <option value="" disabled>Select a topic</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="support">Support Issue</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                    </select>

                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f8a11e]"
                    />

                    <button
                        disabled={isSubmitting}
                        className="w-full bg-[#f8a11e] text-white font-bold py-4 rounded-lg hover:bg-[#e0901a] flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? "Processing..." : <>Send Message <Send size={18} /></>}
                    </button>
                </form>
            )}
        </div>
    );
}
