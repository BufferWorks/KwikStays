import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyGoogleToken } from "@/lib/auth/google";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }

    const payload = await verifyGoogleToken(idToken);
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // First-time Google signup
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        provider: "google",
      });
    }

    const token = signToken({
      userId: user._id,
      email: user.email,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Google auth error:", err);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
