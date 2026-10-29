"use client";

import { UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination" },
  { label: "Add-Destination", href: "/add-destination", active: false },
  { label: "My-Bookings", href: "/my-bookings" },
  { label: "My-Destination", href: "/my-destination" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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

  return (
    <header className="bg-white">
      <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <nav className="hidden items-center gap-6 text-[15px] font-medium md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-cyan-600 underline decoration-2 underline-offset-4"
                  : "transition-colors hover:text-cyan-600"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-2xl mx-6 font-bold text-cyan-600 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Wanderlast
        </Link>

        <div className="flex items-center gap-5 text-[15px] lg:gap-8">
          {isPending ? (
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              {/* Profile photo */}
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-gray-200 transition-colors hover:border-cyan-600"
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

              {/* User dropdown */}
              {menuOpen && (
                <div className="absolute right-0 top-full z-50 w-64 pt-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
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
                        <p className="truncate font-semibold text-gray-900">
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
                      className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100 hover:text-cyan-600"
                    >
                      <UserIcon className="size-4" />
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 transition-colors hover:bg-gray-100"
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
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-cyan-600"
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
