import { useEffect, useId, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useCart } from "../context/useCart";

// Types
type NavbarProps = {
  cartCount?: number;
  wishlistCount?: number;
};

type BadgeProps = {
  count: number;
  className?: string;
};

// Navigation links
const links = [
  { href: "/track-order", label: "Track order", icon: MapPin },
  { href: "/login", label: "Sign in", icon: User },
];

// Badge component
const Badge = ({ count, className = "" }: BadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={`absolute flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ${className}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

// Search component

const SearchBar = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const id = useId();

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const term = String(formData.get("search") || "").trim();

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form role="search" onSubmit={onSubmit} className={className}>
      <label htmlFor={id} className="sr-only">
        Search products, districts or categories
      </label>

      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600/70"
        />

        <input
          id={id}
          name="search"
          type="search"
          defaultValue={query}
          placeholder="Search products, districts..."
          className="w-full rounded-full border border-emerald-100 bg-emerald-50/60 py-2.5 pl-11 pr-4 text-sm text-stone-800 placeholder:text-stone-400 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15"
        />
      </div>
    </form>
  );
};

// Main Navbar

const Navbar = ({ wishlistCount = 0 }: NavbarProps) => {
  const { cartCount } = useCart();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(() => window.scrollY > 4);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mobile drawer: body scroll lock + Escape key
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    // Native browser KeyboardEvent
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reusable styles
  const iconBtn =
    "relative rounded-full p-2.5 text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  const textLink =
    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur transition-shadow motion-reduce:transition-none ${
          scrolled ? "shadow-[0_4px_20px_-8px_rgba(6,78,59,0.25)]" : ""
        }`}
      >
        <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
          {/* Main Navigation Row */}
          <div className="flex h-16 items-center gap-4 lg:h-20 lg:gap-8">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className={`${iconBtn} -ml-2 lg:hidden`}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              aria-label="Go to homepage"
              className="flex shrink-0 items-center max-lg:mx-auto"
            >
              <img
                src="/nav-logo.png"
                alt="Logo"
                width={160}
                height={48}
                fetchPriority="high"
                className="h-9 w-auto object-contain lg:h-20"
              />
            </Link>

            {/* Desktop Search */}
            <SearchBar className="mx-auto hidden w-full max-w-2xl flex-1 lg:block" />

            {/* Desktop Actions */}
            <nav
              aria-label="Account"
              className="hidden shrink-0 items-center gap-1 lg:flex"
            >
              {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href} className={textLink} title={label}>
                  <Icon className="h-5 w-5 text-emerald-700/80" />

                  <span className="hidden xl:inline">{label}</span>
                </Link>
              ))}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={textLink}
                aria-label={`Wishlist, ${wishlistCount} items`}
                title="Wishlist"
              >
                <span className="relative">
                  <Heart className="h-5 w-5 text-emerald-700/80" />

                  <Badge count={wishlistCount} className="-right-2.5 -top-2" />
                </span>

                <span className="hidden xl:inline">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart, ${cartCount} items`}
                className="ml-2 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <span className="relative">
                  <ShoppingBag className="h-5 w-5" />

                  <Badge count={cartCount} className="-right-3 -top-2.5" />
                </span>

                <span>Cart</span>
              </Link>
            </nav>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className={`${iconBtn} -mr-2 lg:hidden`}
            >
              <ShoppingBag className="h-6 w-6" />

              <Badge count={cartCount} className="right-0.5 top-0.5" />
            </Link>
          </div>

          {/* Mobile / Tablet Search */}
          <SearchBar className="pb-3 lg:hidden" />
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-stone-900/40"
          />

          {/* Drawer Content */}
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85%] flex-col bg-white p-4 shadow-2xl">
            {/* Drawer Header */}
            <div className="mb-4 flex items-center justify-between">
              <img
                src="/nav-logo.png"
                alt="Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className={iconBtn}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex flex-col gap-1">
              {[
                ...links,
                {
                  href: "/wishlist",
                  label: "Wishlist",
                  icon: Heart,
                },
                {
                  href: "/cart",
                  label: "Cart",
                  icon: ShoppingBag,
                },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon className="h-5 w-5 text-emerald-700/80" />

                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
