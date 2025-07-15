import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Image from "next/image";

// Local imports
import { useAuth } from "@/utils/use-auth";
import { auth } from "@/firebase";
import Avatar from "./avatar/avatar";
import AvatarDropdown from "./avatar/avatar-dropdown";

function Header() {
  const auth_ = useAuth();
  const navigate = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Always follow system preference
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(darkModeQuery.matches);
    document.documentElement.classList.toggle("dark", darkModeQuery.matches);

    // Listen for system theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
      document.documentElement.classList.toggle("dark", e.matches);
    };

    darkModeQuery.addEventListener("change", handleThemeChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full surface">
      <div
        className="container px-4 mx-auto sm:px-6 lg:px-8"
        ref={mobileMenuRef}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                className="w-auto h-8"
                src={
                  isDarkTheme
                    ? "/images/logo/brand-logo-light.svg"
                    : "/images/logo/brand-logo.svg"
                }
                width={32}
                height={32}
                alt="Find Bible Scripture"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden space-x-2 md:flex">
            <Link href="/" className="nav-item">
              Home
            </Link>
            {auth_.user && (
              <Link href="/search" className="nav-item">
                Search
              </Link>
            )}
            <Link href="/thanks" className="nav-item">
              About
            </Link>
            <Link href="/contribution" className="nav-item">
              Contribute
            </Link>
          </nav>

          {/* User Authentication - Desktop */}
          <div className="items-center hidden space-x-3 md:flex">
            {auth_.user ? (
              <AvatarDropdown user={auth_.user} />
            ) : (
              <Link href="/search" className="button button-primary">
                Start Searching
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 button button-ghost"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="w-full mt-2 menu">
              <Link
                href="/"
                className="block w-full text-left menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/search"
                className="block w-full text-left menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              {auth_.user && (
                <Link
                  href="/search"
                  className="block w-full text-left menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Chat
                </Link>
              )}
              <Link
                href="/thanks"
                className="block w-full text-left menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contribution"
                className="block w-full text-left menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contribute
              </Link>

              <hr className="divider" />

              {/* Mobile Auth Section */}
              {auth_.user ? (
                <div className="px-3 py-2">
                  <AvatarDropdown user={auth_.user} />
                </div>
              ) : (
                <Link
                  href="/search"
                  className="justify-center w-full button button-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
