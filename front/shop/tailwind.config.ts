import withMT from "@material-tailwind/react/utils/withMT";
const config = withMT({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-light": "rgb(114, 114, 114)",
        "p-dark": "rgb(39, 39, 38)",
        "span-light": "rgb(158, 158, 158)",
        "span-dark": "rgb(45, 45, 45)",
        "h1-light": "rgb(172, 172, 172)",
        "h1-dark": "rgb(77, 77, 77)",
      },
      backgroundColor: {
        "custom-light": "rgb(255 255 255 / 76%)",
        "custom-dark": "rgb(20 21 24)",
      },
    },
  },

  plugins: [],
});
export default config;
