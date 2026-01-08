"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield } from "lucide-react"; // Importing icons for better UI, matching the theme if possible or just standard

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    router.push("/auth/login");
                }
            })
            .catch((err) => {
                console.error("Failed to fetch user", err);
                router.push("/auth/login");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </main>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <main className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900">My Account</h1>

                    <div className="space-y-6">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-white rounded-full shadow-sm mr-4 text-blue-500">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Name</p>
                                <p className="font-medium text-lg text-gray-900">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-white rounded-full shadow-sm mr-4 text-green-500">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Email</p>
                                <p className="font-medium text-lg text-gray-900">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-white rounded-full shadow-sm mr-4 text-purple-500">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Login Method</p>
                                <p className="font-medium text-lg text-gray-900 capitalize">
                                    {user.provider || "email"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                        Bookings and payments will appear here once you start booking stays.
                    </div>
                </div>
            </div>
        </main>
    );
}
