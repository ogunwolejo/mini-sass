import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isAuthRoute = createRouteMatcher(["/auth(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isStaticAsset = (pathname: string) =>
  pathname.startsWith("/_next") || pathname.includes(".");

export default clerkMiddleware(async (auth, request) => {
  const {isAuthenticated} = await auth();
  const {pathname} = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    if (!isAuthRoute(request)) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("redirect_url", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next(); // Allow access to /auth/*
  }

  if (isAuthenticated) {
    if (isAuthRoute(request)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
