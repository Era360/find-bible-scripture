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
        <title>Contribute to Find Bible Scripture | Join Our Mission</title>
        <meta
          name="description"
          content="Join our mission to make biblical study accessible worldwide. Learn how to contribute to Find Bible Scripture project."
        />
      </Head>

      <Header />

      <main className="container flex-grow max-w-4xl px-4 py-8 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 heading-1">Want to contribute?</h1>
          <p className="body-1 text-azure-600 dark:text-azure-300">
            Join us in making biblical study accessible for everyone
          </p>
        </div>

        <div className="p-8 mb-8 bg-white border card dark:bg-azure-900 border-azure-200 dark:border-azure-800">
          <h2 className="mb-6 heading-3">How You Can Contribute</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">🐛 Report Issues</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Found a bug or issue? Help us improve by reporting it on
                  GitHub.
                </p>
              </div>
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">✨ Suggest Features</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Have ideas for new features? We&apos;d love to hear your
                  suggestions!
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">💻 Contribute Code</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Submit pull requests to help enhance the application's
                  functionality.
                </p>
              </div>
              <div className="p-4 bg-white border card-1 dark:bg-azure-900 border-azure-200 dark:border-azure-800">
                <h3 className="mb-2 heading-5">📖 Improve Documentation</h3>
                <p className="body-2 text-azure-700 dark:text-azure-200">
                  Help us create better documentation and guides for users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 mb-8 card">
          <h2 className="mb-6 heading-3">Getting Started - Detailed Setup</h2>

          {/* Prerequisites */}
          <div className="mb-8">
            <h3 className="mb-4 heading-4">📋 Prerequisites</h3>
            <div className="p-4 mb-4 bg-azure-50 border-l-4 border-azure-400 dark:bg-azure-900/50 dark:border-azure-500">
              <p className="mb-2 body-2 text-azure-800 dark:text-azure-200">
                Before you begin, ensure you have the following installed:
              </p>
              <ul className="space-y-1 body-2 text-azure-700 dark:text-azure-300">
                <li>
                  • <strong>Node.js</strong> (version 18.0 or higher)
                </li>
                <li>
                  • <strong>npm</strong> or <strong>yarn</strong> package
                  manager
                </li>
                <li>
                  • <strong>Git</strong> for version control
                </li>
                <li>
                  • A <strong>Firebase account</strong> (free tier available)
                </li>
                <li>
                  • An <strong>OpenAI API account</strong> (paid service
                  required)
                </li>
              </ul>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                1
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Fork & Clone the Repository</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Start by forking the project repository to your GitHub
                  account, then clone it locally.
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    git clone
                    https://github.com/YOUR_USERNAME/find-bible-scripture.git
                    <br />
                    cd find-bible-scripture
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                2
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Install Dependencies</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Install all required packages using npm or yarn.
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    npm install
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                3
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Set Up Environment Variables</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Create a{" "}
                  <code className="px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">
                    .env.local
                  </code>{" "}
                  file in the root directory:
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    # Firebase Configuration
                    <br />
                    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
                    <br />
                    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
                    <br />
                    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
                    <br />
                    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
                    <br />
                    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
                    <br />
                    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
                    <br />
                    <br />
                    # OpenAI Configuration
                    <br />
                    OPENAI_API_KEY=your_openai_api_key
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                4
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Firebase Setup</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Configure Firebase for authentication and database:
                </p>
                <ul className="space-y-2 body-2 text-azure-700 dark:text-azure-200">
                  <li>
                    • Create a Firebase project at{" "}
                    <a
                      href="https://console.firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-azure-600 hover:text-azure-800 dark:text-azure-400 dark:hover:text-azure-200"
                    >
                      Firebase Console
                    </a>
                  </li>
                  <li>
                    • Enable Google Authentication in the Authentication section
                  </li>
                  <li>• Create a Firestore database in test mode</li>
                  <li>
                    • Copy configuration values to your{" "}
                    <code className="px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">
                      .env.local
                    </code>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                5
              </div>
              <div className="flex-1">
                <h3 className="heading-5">OpenAI API Setup</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Get your OpenAI API key for scripture search functionality:
                </p>
                <ul className="space-y-2 body-2 text-azure-700 dark:text-azure-200">
                  <li>
                    • Create account at{" "}
                    <a
                      href="https://platform.openai.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-azure-600 hover:text-azure-800 dark:text-azure-400 dark:hover:text-azure-200"
                    >
                      OpenAI Platform
                    </a>
                  </li>
                  <li>• Add billing information (required for API access)</li>
                  <li>
                    • Generate API key and add to{" "}
                    <code className="px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">
                      .env.local
                    </code>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                6
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Run Development Server</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Start the development server to test your setup:
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    npm run dev
                  </code>
                </div>
                <p className="mt-2 body-2 text-azure-600 dark:text-azure-400">
                  The application will be available at{" "}
                  <code className="px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">
                    http://localhost:3000
                  </code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                7
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Create Your Branch & Make Changes</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Create a new branch for your feature or fix:
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    git checkout -b feature/your-feature-name
                    <br />
                    # Make your changes
                    <br />
                    git add .<br />
                    git commit -m "Add your meaningful commit message"
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-full">
                8
              </div>
              <div className="flex-1">
                <h3 className="heading-5">Submit Pull Request</h3>
                <p className="mb-3 body-2 text-azure-700 dark:text-azure-200">
                  Push your changes and create a pull request:
                </p>
                <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    git push origin feature/your-feature-name
                  </code>
                </div>
                <p className="mt-2 body-2 text-azure-600 dark:text-azure-400">
                  Then create a pull request on GitHub with a clear description
                  of your changes.
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
