import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function MyBookingsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        redirect("/auth/login");
    }

    return (
        <main className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                    <h1 className="text-2xl font-bold mb-3">My Bookings</h1>
                    <p className="text-gray-500 mb-6">
                        You haven’t made any bookings yet.
                    </p>

                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-[#f8a11e] text-white rounded-lg font-bold"
                    >
                        Explore Hotels
                    </a>
                </div>
            </div>
        </main>
    );
}
