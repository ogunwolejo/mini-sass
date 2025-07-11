import {clerkMiddleware} from "@clerk/nextjs/server";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

//const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for static files and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  //const session = request.cookies.get("session")?.value;
  //const credential = session ? await decrypt(session) : null;
  //const isAuthenticated = !!credential;

  // Handle root path redirect
  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL(isAuthenticated ? "/dashboard" : "/login", request.url));
  // }

  // Redirect to login if trying to access protected route without auth
  // if (protectedRoutes.some((route) => pathname.startsWith(route))) {
  //   if (!isAuthenticated) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   const headers = new Headers(request.headers);
  //   headers.set("x-middleware-validated", "true");
  //   return NextResponse.next({headers});
  // }

  return NextResponse.next();
}

export default clerkMiddleware();
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
