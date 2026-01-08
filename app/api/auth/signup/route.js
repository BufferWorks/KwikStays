import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";
import { setAuthCookie } from "@/lib/auth/authCookies";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    provider: "email",
  });

  const token = signToken({ userId: user._id });

  const res = NextResponse.json({ success: true });
  setAuthCookie(res, token);
  return res;
}
