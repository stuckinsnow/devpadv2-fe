/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./src/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  purge: {
    enabled: true,
    content: ['./src/app/_components/RichText/**', './src/app/(pages)/posts/[slug]/page.tsx', './src/app/**/*'], // Path to your HTML file
  },
  theme: {
    extend: {},
  },
  plugins: [],
} 