"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href?: string;
  external?: boolean;
}

const sectionLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const pageDropdownItems: NavLink[] = [
  { label: "All Projects", href: "/projects" },
  { label: "Contact Page", href: "/contact" },
];

function Dropdown({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavLink[];
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 overflow-hidden"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:bg-violet-50 dark:focus-visible:bg-violet-500/10 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHomePage = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section — uses scroll position instead of IntersectionObserver
  // This is more reliable for sections of varying heights
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["about", "skills", "services", "projects", "contact"];

    const getActiveSection = () => {
      const scrollY = window.scrollY + 120; // offset for header height

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", getActiveSection, { passive: true });
    getActiveSection(); // run on mount
    return () => window.removeEventListener("scroll", getActiveSection);
  }, [isHomePage]);

  // Outside click closes mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = useCallback(
    (link: NavLink) => {
      if (link.external) {
        window.open(link.href, "_blank", "noopener,noreferrer");
        setMenuOpen(false);
        return;
      }
      if (link.href?.startsWith("#")) {
        if (isHomePage) {
          const el = document.getElementById(link.href.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveSection(link.href.substring(1));
          }
        } else {
          router.push(`/${link.href}`);
        }
      } else if (link.href) {
        router.push(link.href);
      }
      setMenuOpen(false);
    },
    [isHomePage, router]
  );

  const isActiveLink = (link: NavLink) => {
    if (link.external) return false;
    if (link.href?.startsWith("#")) {
      return isHomePage && activeSection === link.href.substring(1);
    }
    return pathname === link.href;
  };

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-violet-600 focus:text-white focus:font-medium focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>

      <header
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/50 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 shadow-lg backdrop-blur-xl"
            : "border-b border-slate-100/50 dark:border-slate-800/30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-violet-500 to-purple-500 origin-left"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded transition-colors duration-200"
            >
              Bilal<span className="text-violet-500">.</span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              aria-label="Main navigation"
            >
              {sectionLinks.map((link) => {
                const isActive = isActiveLink(link);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavigation(link)}
                    className={`relative px-3 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      isActive
                        ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              <Dropdown
                label="Pages"
                items={pageDropdownItems}
                onNavigate={() => setMenuOpen(false)}
              />
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all duration-200"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Hire Me — desktop */}
              <button
                onClick={() => handleNavigation({ label: "Contact", href: "#contact" })}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:scale-[0.97] active:from-violet-700 active:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 text-white font-medium text-sm lg:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-violet-500/25"
              >
                Hire Me
              </button>

              {/* Hamburger — mobile */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
                <nav
                  className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1"
                  aria-label="Mobile navigation"
                >
                  {sectionLinks.map((link) => {
                    const isActive = isActiveLink(link);
                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNavigation(link)}
                        className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all duration-200 ${
                          isActive
                            ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-500 dark:hover:text-violet-400"
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}

                  {/* Pages — indented */}
                  <div className="pl-4 space-y-1 border-l-2 border-violet-500/30 ml-2">
                    {pageDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href!}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full px-4 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.98] transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Hire Me */}
                  <button
                    onClick={() => handleNavigation({ label: "Contact", href: "#contact" })}
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 text-white font-medium text-base transition-all duration-200 shadow-md"
                  >
                    Hire Me
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}