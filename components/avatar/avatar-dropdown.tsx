import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import Avatar from "./avatar";
import useOnClickOutside from "../hooks/useClickOutside";
import UpgradeModal from "../upgrade-modal";

interface AvatarDropdownProps {
  user: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
    setHelpMenuOpen(false);
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate.push("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setHelpMenuOpen(false);
  };

  const toggleHelpMenu = () => {
    setHelpMenuOpen(!helpMenuOpen);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Avatar Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center p-1 rounded-full hover:bg-azure-100 dark:hover:bg-azure-800 transition-colors"
          aria-label="User menu"
        >
          <Avatar user_image={user.photoURL} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-azure-900 rounded-lg shadow-lg z-50 animate-fadeIn">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-azure-200 dark:border-azure-700">
              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-lg font-medium text-azure-900 dark:text-azure-100 truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-azure-600 dark:text-azure-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {/* Upgrade Plan */}
              <button
                onClick={() => {
                  setUpgradeModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-azure-700 dark:text-azure-300 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-azure-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Upgrade Plan
              </button>

              {/* Help Menu */}
              <div className="relative">
                <button
                  onClick={toggleHelpMenu}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-azure-700 dark:text-azure-300 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-3 text-azure-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      helpMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Help Submenu */}
                {helpMenuOpen && (
                  <div className="ml-7">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement help center functionality
                        console.log("Help center clicked");
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-azure-600 dark:text-azure-400 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
                    >
                      Help Center
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement terms functionality
                        console.log("Terms clicked");
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-azure-600 dark:text-azure-400 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
                    >
                      Terms & Conditions
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement privacy policy functionality
                        console.log("Privacy policy clicked");
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-azure-600 dark:text-azure-400 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </>
  );
};

export default AvatarDropdown;
