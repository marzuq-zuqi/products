import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
console.log("Token from cookies: ", token);

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
