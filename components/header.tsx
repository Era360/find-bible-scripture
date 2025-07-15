import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Image from "next/image";

// Local imports
import { useAuth } from "@/utils/use-auth";
import { auth } from "@/firebase";
import Avatar from "./avatar/avatar";

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
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Avatar user_image={auth_.user.photoURL} />
                  <span className="font-medium body-2">
                    {auth_.user.displayName?.split(" ")[0] || "User"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    signOut(auth);
                    navigate.push("/search");
                  }}
                  className="p-2 text-red-600 button button-ghost hover:text-red-700"
                  aria-label="Sign out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </button>
              </div>
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
                <div>
                  <div className="flex items-center px-3 py-2 space-x-2">
                    <Avatar user_image={auth_.user.photoURL} />
                    <span className="body-2">
                      {auth_.user.displayName?.split(" ")[0] || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut(auth);
                      navigate.push("/search");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 menu-item hover:text-red-700"
                  >
                    Sign out
                  </button>
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
