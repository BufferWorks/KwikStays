import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId)
      .select("name email avatar provider wishlist")
      .lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    // Silently handle expected auth errors (expired/invalid tokens)
    // Clear the stale cookie so the browser doesn't keep sending it
    const isExpectedError =
      err.name === "TokenExpiredError" || err.name === "JsonWebTokenError";

    if (!isExpectedError) {
      console.error("Auth me error:", err);
    }

    const response = NextResponse.json({ user: null }, { status: 200 });

    // Clear the expired cookie
    if (isExpectedError) {
      response.cookies.set("auth_token", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
      });
    }

    return response;
  }
}
