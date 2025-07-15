/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "github.com",
      "nextjs.org",
      "www.typescriptlang.org",
      "tailwindcss.com",
      "firebase.google.com",
      "openai.com"
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
