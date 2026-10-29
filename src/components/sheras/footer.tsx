import { ArrowUpRightIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "My Profile", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const contactItems = [
  { label: "786 901 1622", href: "tel:7869011622" },
  { label: "info@wanderland.com", href: "mailto:info@wanderland.com" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

function LinkList({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm tracking-wider text-white uppercase">{title}</h3>
      <ul className="mt-6 flex flex-col gap-5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[15px] text-neutral-200 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 pt-16 pb-8 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-serif text-5xl font-bold text-white md:text-7xl lg:text-8xl">
          Wanderlast
        </p>
        <p className="mt-3 text-base text-neutral-400 md:text-lg">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm tracking-wider text-white uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form action="#" className="mt-5 flex max-w-xs bg-neutral-800">
              <Input
                type="email"
                placeholder="Enter email"
                className="h-12 min-w-0 flex-1 rounded-none border-0 px-4 text-white placeholder:text-neutral-400 focus-visible:ring-0 md:text-base"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-12 shrink-0 items-center justify-center text-white transition-colors hover:text-cyan-400"
              >
                <ArrowUpRightIcon className="size-5" />
              </button>
            </form>
          </div>

          <LinkList title="Quick Links" items={quickLinks} />
          <LinkList title="Support" items={supportLinks} />

          <div>
            <h3 className="text-sm tracking-wider text-white uppercase">
              Contact Us
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[15px] text-neutral-200 transition-colors hover:text-cyan-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row md:mt-16">
          <p className="text-sm text-neutral-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-neutral-300 transition-colors hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
