import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    //if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;
    //if token is there or its a new auth request
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    //if they don't have token and requesting a protected route
    if (!token && pathname !== "/Login") {
        return NextResponse.redirect("/Login");
    }
}
