import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the request was already processed by this middleware to prevent infinite loops
  if (request.headers.has("x-locale")) {
    const response = NextResponse.next();

    // Process Supabase auth session
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });
      await supabase.auth.getUser();
    }
    return response;
  }

  // 2. Identify the locale based on the route prefix
  const isEnglish = pathname.startsWith("/en/") || pathname === "/en";
  const locale = isEnglish ? "en" : "de";

  // 3. Set the custom request header 'x-locale'
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  let response: NextResponse;

  // 4. Perform rewrite if English, otherwise regular pass-through with modified headers
  if (isEnglish) {
    const targetPath = pathname === "/en" ? "/" : pathname.replace(/^\/en/, "");
    const rewriteUrl = new URL(targetPath, request.url);
    rewriteUrl.search = request.nextUrl.search;

    response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 5. Initialize Supabase and handle cookies correctly
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });

    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
