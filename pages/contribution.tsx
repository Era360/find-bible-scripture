import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Contribution() {
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
        <title>Contributing | Find Bible Scripture</title>
        <meta
          name="description"
          content="Learn how to contribute to Find Bible Scripture project. Help us make Bible study more accessible for everyone."
        />
      </Head>

      <Header />

      <main className="container flex-grow max-w-4xl px-4 py-8 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 heading-1">Whant to contribute?</h1>
          <p className="body-1 text-azure-600 dark:text-azure-300">
            Help make Bible study more accessible for everyone
          </p>
        </div>

        <div className="p-8 mb-8 bg-white border card dark:bg-azure-900 border-azure-200 dark:border-azure-800">
          <h2 className="mb-6 heading-3">How You Can Contribute</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">🐛 Bug Reports</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Found a bug? Report it on our GitHub issues page.
                </p>
              </div>
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">✨ Feature Requests</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Have an idea for improvement? We&apos;d love to hear it!
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">💻 Code Contributions</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Submit pull requests to help improve the codebase.
                </p>
              </div>
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">📖 Documentation</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Help us improve our documentation for new users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 mb-8 card">
          <h2 className="mb-6 heading-3">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                1
              </div>
              <div>
                <h3 className="heading-5">Fork the Repository</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Fork the project on GitHub to your own account.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                2
              </div>
              <div>
                <h3 className="heading-5">Clone & Setup</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Clone your fork and set up the development environment.
                </p>
                <div className="p-3 mt-2 font-mono text-sm card-1">
                  git clone
                  https://github.com/YOUR-USERNAME/find-bible-scripture.git
                  <br />
                  cd find-bible-scripture
                  <br />
                  npm install
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                3
              </div>
              <div>
                <h3 className="heading-5">Create a Branch</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Create a new branch for your feature or bug fix.
                </p>
                <div className="p-3 mt-2 font-mono text-sm card-1">
                  git checkout -b feature/your-feature-name
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                4
              </div>
              <div>
                <h3 className="heading-5">Make Changes & Test</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Make your changes and test them thoroughly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                5
              </div>
              <div>
                <h3 className="heading-5">Submit Pull Request</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Push your changes and submit a pull request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-8 md:grid-cols-2">
          <div className="p-6 card">
            <h3 className="mb-4 heading-4">📋 Development Guidelines</h3>
            <ul className="space-y-2 body-2 text-azure-700 dark:text-azure-200">
              <li>• Follow TypeScript best practices</li>
              <li>• Use meaningful commit messages</li>
              <li>• Write tests for new features</li>
              <li>• Follow the existing code style</li>
              <li>• Update documentation when needed</li>
            </ul>
          </div>

          <div className="p-6 card">
            <h3 className="mb-4 heading-4">🎯 Areas for Contribution</h3>
            <ul className="space-y-2 body-2 text-azure-700 dark:text-azure-200">
              <li>• UI/UX improvements</li>
              <li>• Search algorithm enhancements</li>
              <li>• Performance optimizations</li>
              <li>• Mobile responsiveness</li>
              <li>• Accessibility improvements</li>
            </ul>
          </div>
        </div>

        <div className="p-8 text-center card">
          <h3 className="mb-4 heading-3">📞 Get In Touch</h3>
          <p className="mb-6 body-1 text-azure-700 dark:text-azure-200">
            Have questions about contributing? Feel free to reach out!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/makindajack/find-bible-scripture"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary animate-press"
            >
              GitHub Repository
            </a>
            <a
              href="https://github.com/makindajack/find-bible-scripture/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary animate-press"
            >
              Report Issues
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
