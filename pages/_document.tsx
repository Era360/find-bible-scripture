import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  let description =
    "Discover bible references for your favorite stories, events, and parables with find-bible-scripture.netlify.app. Easy to use";
  let ogimage = "https://find-bible-scripture.netlify.app/bible_with_cup.jpg";
  let sitename = "Find Bible Scripture";
  let title = "Find Bible Scripture | Discover the Bible in a whole new way";

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={sitename} />
        <meta
          property="og:url"
          content="https://find-bible-scripture.netlify.app/"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogimage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://find-bible-scripture.netlify.app/"
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogimage} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
