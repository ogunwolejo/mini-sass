import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

// Define public routes (no authentication needed)
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/auth(.*)", // All auth routes and subpaths
  "/api/webhook(.*)", // Clerk webhook
  // Add other public routes here
]);

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return await auth.protect({
      // Customize the redirect URL if needed (default is Clerk's sign-in)
      redirectUrl: "/auth/sign-in",
      // Optional: Return to original page after sign-in
      returnBackUrl: request.url,
    });
  }

  // Default behavior for other routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
