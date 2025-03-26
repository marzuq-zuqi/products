import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

interface User {
  email: string;
  password: string;
}

const users: User[] = []

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user: User | undefined = users.find((user) => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    (await cookies()).set("auth_token", "dummy-token", { httpOnly: true });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

