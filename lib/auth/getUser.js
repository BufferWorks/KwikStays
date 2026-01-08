import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function getCurrentUser() {
  const token = cookies().get("auth_token")?.value;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    await connectDB();
    return await User.findById(decoded.userId).lean();
  } catch {
    return null;
  }
}
