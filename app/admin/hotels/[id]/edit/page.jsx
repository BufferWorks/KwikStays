"use client";

import HotelForm from "../../create/_components/HotelForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditHotelPage() {
    const params = useParams();
    const id = params?.id;
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await fetch(`/api/hotels/by-id/${id}`);
                if (!res.ok) throw new Error("Hotel not found");
                const data = await res.json();
                setHotel(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotel();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="p-8 text-center text-gray-500">
                Hotel not found or error loading data.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="mb-8">
                <Link href={`/admin/hotels/${id}`} className="flex items-center text-sm text-gray-500 hover:text-primary mb-2">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back to Hotel Details
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Hotel</h1>
                <p className="mt-2 text-gray-500">
                    Update the details, pricing, and media for {hotel.name}.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <HotelForm initialData={hotel} />
            </div>
        </div>
    );
}
