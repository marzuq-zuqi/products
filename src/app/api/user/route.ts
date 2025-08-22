// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
//     return NextResponse.json({ user: decoded });
//   } catch (error) {
//     console.error("Invalid token", error);
//     return NextResponse.json({ user: null }, { status: 401 });
//   }
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json({ user: data });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
