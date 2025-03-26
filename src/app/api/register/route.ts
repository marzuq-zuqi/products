import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const users: { email: string; password: string }[] = [];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
