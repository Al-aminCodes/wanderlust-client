"use client";

import { UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Destination", href: "/my-destination" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="bg-gray-900">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        {/* Navigation links */}
        <nav className="hidden items-center gap-5 text-sm font-medium md:flex lg:gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 transition-colors duration-200 ${
                  active ? "text-cyan-400" : "text-white hover:text-cyan-300"
                }`}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Brand */}
        <Link
          href="/"
          className="mx-4 font-serif text-2xl font-bold text-cyan-400 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Wanderlaust
        </Link>

        {/* Authentication / profile */}
        <div className="flex items-center gap-4 text-sm text-white lg:gap-6">
          {isPending ? (
            <div className="size-8 animate-pulse rounded-full bg-gray-700" />
          ) : user ? (
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-gray-600 transition hover:border-cyan-400"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserIcon className="size-4" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-50 w-64 pt-2">
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-gray-900 shadow-xl">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "Profile"}
                          className="size-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-11 items-center justify-center rounded-full bg-gray-100">
                          <UserIcon className="size-5 text-gray-500" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-3 border-t" />

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100 hover:text-cyan-700"
                    >
                      <UserIcon className="size-4" />
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive(link.href)
                      ? "text-cyan-400"
                      : "text-white hover:text-cyan-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
