
import { updateSession } from './utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let hostname = req.headers.get("host")!;

  // Special case for Vercel preview deployment URLs
  if (hostname.includes("---") && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // Apply session update middleware for specific paths
  if (path.startsWith("/dashboard") || path.startsWith("/editor") || path === "/login" || path === "/register") {
    return await updateSession(req);
  }

  console.log("hostname", hostname);
  // Rewrite based on the hostname and ensure production domains are properly used
  if (hostname === `localhost:3000`) {
    // Development environment: Allow local URLs
    return NextResponse.rewrite(new URL(`${path}`, req.url));
  }

  // Production environment: Rewrite URLs to the correct domain
  if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL(`/${path}`, req.url));
  }

  // Check for the domain with UI prefix, and rewrite accordingly
  if (hostname === `ui.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(new URL(`/${path}`, req.url));
  }

  // Default rewrite for other domains: `/[domain]/[slug]`
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register", "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};



// import { getToken } from "next-auth/jwt"
// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req })
//     const isAuth = !!token
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith("/login") ||
//       req.nextUrl.pathname.startsWith("/register")

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/dashboard", req.url))
//       }

//       return null
//     }

//     if (!isAuth) {
//       let from = req.nextUrl.pathname;
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search;
//       }

//       return NextResponse.redirect(
//         new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
//       );
//     }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true
//       },
//     },
//   }
// )