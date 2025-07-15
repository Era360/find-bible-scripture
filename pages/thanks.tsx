import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkTheme(darkModeQuery.matches);

      const handleColorSchemeChange = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
      };

      darkModeQuery.addEventListener("change", handleColorSchemeChange);

      return () => {
        darkModeQuery.removeEventListener("change", handleColorSchemeChange);
      };
    }
  }, []);

  const logoSrc = isDarkTheme
    ? "/images/bible/svg/light.svg"
    : "/images/bible/svg/dark.svg";

  return (
    <div className="flex flex-col min-h-screen surface">
      <Head>
        <title>About the Team | Find Bible Scripture</title>
        <meta
          name="description"
          content="Meet the team behind Find Bible Scripture - a tool to discover the Bible in a whole new way."
        />
      </Head>

      <Header />

      <main className="container flex-grow max-w-4xl px-4 py-8 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 heading-1">Thanks to</h1>
          <p className="text-azure-600 body-1 dark:text-azure-300">
            People behind Find Bible Scripture
          </p>
        </div>

        <div className="p-8 mb-8 bg-white border border-azure-200 card dark:bg-azure-900 dark:border-azure-800">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-shrink-0">
              <Image
                src="https://github.com/Era360.png"
                alt="Elia Mkumbo"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              <h2 className="mb-2 heading-3">Elia Mkumbo</h2>
              <p className="mb-4 text-azure-600 body-2 dark:text-azure-300">
                Lead Developer
              </p>
              <p className="mb-4 text-azure-700 body-1 dark:text-azure-200">
                Lead developer behind the core functionality and architecture of
                Find Bible Scripture. Passionate about creating robust
                applications that help people engage with scripture in
                meaningful ways.
              </p>
              <a
                href="https://github.com/Era360"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary animate-press"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        <div className="p-8 mb-8 bg-white border border-azure-200 card dark:bg-azure-900 dark:border-azure-800">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-shrink-0">
              <Image
                src="https://github.com/makindajack.png"
                alt="Jackson Makinda"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              <h2 className="mb-2 heading-3">Jackson Makinda</h2>
              <p className="mb-4 text-azure-600 body-2 dark:text-azure-300">
                UX/UI Designer & Developer
              </p>
              <p className="mb-4 text-azure-700 body-1 dark:text-azure-200">
                Focused on creating an intuitive and beautiful user experience
                through thoughtful design and frontend development. Combines
                design expertise with development skills to make Bible study
                more accessible.
              </p>
              <a
                href="https://github.com/makindajack"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary animate-press"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-8 md:grid-cols-2">
          <div className="p-6 bg-white border border-azure-200 card dark:bg-azure-900 dark:border-azure-800">
            <h3 className="mb-4 heading-4">🛠️ Technologies Used</h3>
            <ul className="space-y-3 text-azure-700 body-2 dark:text-azure-200">
              <li className="flex items-center space-x-2">
                <Image
                  src="https://nextjs.org/favicon.ico"
                  alt="Next.js"
                  width={16}
                  height={16}
                />
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-secondary)]"
                >
                  Next.js & React
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://www.typescriptlang.org/favicon-32x32.png"
                  alt="TypeScript"
                  width={16}
                  height={16}
                />
                <a
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-secondary)]"
                >
                  TypeScript
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://tailwindcss.com/favicons/favicon-32x32.png"
                  alt="Tailwind CSS"
                  width={16}
                  height={16}
                />
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-secondary)]"
                >
                  Tailwind CSS
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://firebase.google.com/favicon.ico"
                  alt="Firebase"
                  width={16}
                  height={16}
                />
                <a
                  href="https://firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-secondary)]"
                >
                  Firebase Authentication
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://openai.com/favicon.ico"
                  alt="OpenAI"
                  width={16}
                  height={16}
                />
                <a
                  href="https://openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-secondary)]"
                >
                  OpenAI API
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-azure-200 card dark:bg-azure-900 dark:border-azure-800">
            <h3 className="mb-4 heading-4">🎯 Project Goals</h3>
            <ul className="space-y-2 text-azure-700 body-2 dark:text-azure-200">
              <li>• Make Bible study more accessible</li>
              <li>• Provide intelligent search capabilities</li>
              <li>• Create an intuitive user experience</li>
              <li>• Support multiple translations</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
