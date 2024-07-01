/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./src/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  purge: {
    enabled: true,
    content: ['./src/app/_components/RichText/**', './src/app/(pages)/posts/[slug]/page.tsx', './src/app/_components/PaginationButton/index.tsx', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
} 