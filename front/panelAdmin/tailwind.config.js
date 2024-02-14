/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
const tailwind = withMT({
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
})
export default tailwind