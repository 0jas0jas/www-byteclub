import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects `/` to `/fr` or `/en` based on Accept-Language (default: fr),
// and maps localized paths like /fr/confidentialite.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
