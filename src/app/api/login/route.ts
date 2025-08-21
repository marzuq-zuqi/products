// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       return NextResponse.json({ error: errorData.message || "Invalid credentials" }, { status: 401 });
//     }

//     const data = await res.json();
//     const token = data.token;

//     if (!token) {
//       return NextResponse.json({ error: "Token missing from backend response" }, { status: 500 });
//     }

//     // Set the token as HttpOnly cookie
//     // const cookieStore = await cookies();
//     // cookieStore.set("auth_token", token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === "production",
//     //   path: "/",
//     //   maxAge: 60 * 60 * 24,
//     // });

//     // return NextResponse.json({ message: "Login successful" });

//     const response = NextResponse.json({ message: "Login successful" });
//     response.cookies.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    const data = await res.json();
    const token = data.token;

    if (!token) {
      return NextResponse.json(
        { error: "Token missing from backend response" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
