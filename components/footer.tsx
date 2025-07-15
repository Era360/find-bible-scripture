import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className=" surface">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Copyright */}
        <div className="">
          <p className="text-center text-azure-600 body-2 dark:text-azure-400">
            © {new Date().getFullYear()} Find Bible Scripture | Built with ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
