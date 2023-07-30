import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };

    const colorSchemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    colorSchemeMediaQuery.addEventListener("change", handleColorSchemeChange);

    return () => {
      colorSchemeMediaQuery.removeEventListener(
        "change",
        handleColorSchemeChange
      );
    };
  }, []);

  const logoSrc = isDarkTheme
    ? "/images/bible/svg/light.svg"
    : "/images/bible/svg/dark.svg";

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>
          Find Bible Scripture | Discover the Bible in a whole new way
        </title>
      </Head>

      <Header />

      <h1>contribution</h1>
    </div>
  );
}
