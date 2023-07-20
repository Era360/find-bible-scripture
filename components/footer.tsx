import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="container mx-auto mb-6 md:mb-12">
      <div className="flex items-center justify-center gap-3 p-4 mx-auto border-2 rounded-2xl w-fit dark:border-azure-100/10 border-azure-900/5 bg-azure-900/5 dark:backdrop-blur-xl dark:bg-azure-50/10">
        <Link
          href="https://github.com/Era360/find-bible-scripture"
          target="_blank"
          className="group"
        >
          <svg
            aria-hidden="true"
            className="h-6 dark:fill-azure-300 fill-azure-400 dark:group-hover:fill-azure-50 group-hover:fill-azure-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path d="M44 24a20 20 0 0 1-14 19v-5a6 6 0 0 0-1.9-4.3c5.3-1 7.9-4 7.9-9.7 0-2.5-.5-4.4-1.5-5.9.5-1.7.7-4.1-.5-6.1-2.4 0-4 1.4-5 2.5a21.5 21.5 0 0 0-10 .1 6.6 6.6 0 0 0-5-2.6c-1.4 2.3-.8 4.7-.3 6.1A9.9 9.9 0 0 0 12 24c0 5.7 2.6 8.7 7.9 9.7-.7.6-1.2 1.4-1.5 2.3H16c-1.4 0-2-.6-2.8-1.7a5 5 0 0 0-2.6-2c-.5 0-.8.4-.4.7 1.6 1.2 1.7 3 2.3 4.2.6 1.1 1.8 1.8 3.1 1.8H18v4a20 20 0 1 1 26-19z" />
          </svg>
        </Link>
        <Link
          href="https://twitter.com/eliah_mkumbo"
          target="_blank"
          className="group"
        >
          <svg
            aria-hidden="true"
            className="h-6 dark:fill-azure-300 fill-azure-400 dark:group-hover:fill-azure-50 group-hover:fill-azure-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path d="M44.7 10.3a1 1 0 0 0-1.1-.2h-.2l-.4.3 1-2.1a1 1 0 0 0-1.5-1.2c-1.2.7-2.3 1.2-3.4 1.6A9.5 9.5 0 0 0 23 15.5v.5h-1C12.3 14.7 9.5 8.1 9.4 8a1.5 1.5 0 0 0-2.5-.6C6.7 7.6 5 9.4 5 13a9 9 0 0 0 2.6 6.1 9 9 0 0 1-1.1-.7A1.5 1.5 0 0 0 4 19.6c0 .2.5 4.2 5 7.3l-.8.1a1.5 1.5 0 0 0-.9 2.4c.1.1 2 2.7 6.3 4.1-2.3.8-5.4 1.5-9.1 1.5a1.5 1.5 0 0 0-1.1 2.5c.1.2 4 4.5 14.1 4.5C34.2 42 42 26.5 42 16v-.9c2-2 2.9-3.6 2.9-3.7a1 1 0 0 0-.2-1.1z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
