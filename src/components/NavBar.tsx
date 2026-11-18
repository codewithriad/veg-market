import { useEffect, useId, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import {
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/useCart";

// Types
type NavbarProps = {
  wishlistCount?: number;
};

type BadgeProps = {
  count: number;
  className?: string;
};

// Navigation links
const links = [
  { href: "/track-order", label: "Track Order", icon: MapPin },
  { href: "/login", label: "Sign In", icon: User },
];

// Badge component
const Badge = ({ count, className = "" }: BadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={`absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white ${className}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

// Main Navbar
const Navbar = ({ wishlistCount = 0 }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 4);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchId = useId();

  // Current search query comes directly from URL
  const currentQuery = searchParams.get("q") || "";

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on route changes without synchronously
  // updating React state inside an effect.
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;

      setMenuOpen(false);
      setSearchOpen(false);
    }
  }, [location.pathname]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Search submit
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const query = String(formData.get("search") || "").trim();

    if (!query) {
      navigate("/products");
      setSearchOpen(false);
      return;
    }

    // Reset old category filters to prevent
    // irrelevant category + search combinations.
    navigate(`/products?q=${encodeURIComponent(query)}`);

    setSearchOpen(false);
  };

  // Styles
  const iconButton =
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  const navLink =
    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700";

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-emerald-100/80 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-[0_5px_25px_-12px_rgba(6,78,59,0.25)]" : ""
        }`}
      >
        <div className="relative mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex h-[68px] items-center justify-between gap-3 lg:h-[82px]">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className={`${iconButton} lg:hidden`}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              aria-label="Veg Market Home"
              className="flex shrink-0 items-center"
            >
              <img
                src="/nav-logo.png"
                alt="Veg Market"
                className="h-10 w-auto object-contain sm:h-11 lg:h-14"
                width={160}
                height={56}
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 xl:flex">
              <Link to="/" className={navLink}>
                Home
              </Link>

              <Link to="/products" className={navLink}>
                Shop
              </Link>

              <Link to="/about" className={navLink}>
                About Us
              </Link>

              <Link to="/contact" className={navLink}>
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="navbar-search"
                className={`${iconButton} ${
                  searchOpen ? "bg-emerald-50 text-emerald-700" : ""
                }`}
              >
                {searchOpen ? <X size={21} /> : <Search size={21} />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist ${wishlistCount} items`}
                title="Wishlist"
                className={`${iconButton} hidden sm:flex`}
              >
                <Heart size={21} />
                <Badge count={wishlistCount} />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart ${cartCount} items`}
                className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-emerald-600 px-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md sm:px-5"
              >
                <span className="relative">
                  <ShoppingBag size={19} />
                  <Badge count={cartCount} />
                </span>

                <span className="hidden sm:inline">Cart</span>
              </Link>

              {/* Desktop Account */}
              <Link
                to="/login"
                aria-label="Sign in to your account"
                title="My Account"
                className={`${iconButton} hidden lg:flex`}
              >
                <User size={21} />
              </Link>
            </div>
          </div>

          {/* Expandable Absolute Search */}
          <div
            id="navbar-search"
            className={`absolute left-0 right-0 top-full z-50 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
              searchOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0 pointer-events-none"
            }`}
          >
            <div className="mx-auto max-w-3xl rounded-b-2xl border border-t-0 border-emerald-100 bg-white p-4 shadow-xl">
              <form
                role="search"
                onSubmit={handleSearch}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                  />

                  <label htmlFor={searchId} className="sr-only">
                    Search products
                  </label>

                  <input
                    ref={searchInputRef}
                    id={searchId}
                    name="search"
                    type="search"
                    defaultValue={currentQuery}
                    placeholder="Search fresh vegetables, fruits..."
                    className="w-full rounded-full border border-emerald-100 bg-emerald-50/60 py-3 pl-11 pr-4 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </form>

              <p className="mt-2 px-3 text-xs text-stone-400">
                Find fresh products from Veg Market
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <aside className="absolute left-0 top-0 flex h-full w-[300px] max-w-[85%] flex-col bg-white p-5 shadow-2xl">
            {/* Drawer Header */}
            <div className="mb-8 flex items-center justify-between border-b border-emerald-100 pb-5">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <img
                  src="/nav-logo.png"
                  alt="Veg Market"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className={iconButton}
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Links */}
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home", icon: Menu },
                {
                  href: "/products",
                  label: "Shop All Products",
                  icon: ShoppingBag,
                },
                ...links,
                {
                  href: "/wishlist",
                  label: "My Wishlist",
                  icon: Heart,
                },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon size={20} className="text-emerald-700" />
                  {label}

                  {href === "/wishlist" && wishlistCount > 0 && (
                    <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Bottom Cart */}
            <div className="mt-auto border-t border-emerald-100 pt-5">
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={20} />
                  My Shopping Cart
                </span>

                <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
                  {cartCount}
                </span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
