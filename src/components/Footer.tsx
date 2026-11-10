import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#F3F8F0] text-[#163D26]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:pt-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#DCE8D9] pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="mb-5 inline-block">
              <img
                src="/nav-logo.png"
                alt="Veg Market"
                className="h-28 w-auto object-contain"
              />
            </a>

            <p className="max-w-xs text-sm leading-7 text-[#607568]">
              Bringing nature's goodness to your doorstep. Fresh vegetables,
              healthy choices, and better living — directly from local farmers.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: FaFacebook, href: "https://facebook.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaLinkedin, href: "https://linkedin.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Social media"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE8D9] bg-white text-[#15803D] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16A34A] hover:bg-[#16A34A] hover:text-white hover:shadow-lg hover:shadow-green-600/20"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#163D26]">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-[#607568]">
              {[
                ["Home", "/"],
                ["All Products", "/products"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
                ["My Account", "/login"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#16A34A]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#163D26]">
              Categories
            </h3>

            <ul className="space-y-4 text-sm text-[#607568]">
              {[
                ["Fresh Vegetables", "/products?category=vegetables"],
                ["Fresh Fruits", "/products?category=fruits"],
                ["Leafy Greens", "/products?category=leafy-greens"],
                ["Organic Products", "/products?category=organic"],
                ["Seasonal Products", "/products?category=seasonal"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#16A34A]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#163D26]">
              Get In Touch
            </h3>

            <ul className="space-y-5 text-sm text-[#607568]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[#16A34A]" size={19} />
                <span>Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-[#16A34A]" size={19} />
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="transition-colors hover:text-[#16A34A]"
                >
                  +880 1XXX-XXXXXX
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#16A34A]" size={19} />
                <a
                  href="mailto:frriyad111@gmail.com"
                  className="break-all transition-colors hover:text-[#16A34A]"
                >
                  frriyad111@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[#718477]">
            © {new Date().getFullYear()} Veg Market. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-[#718477]">
            <a
              href="/privacy-policy"
              className="transition-colors hover:text-[#16A34A]"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-[#16A34A]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
