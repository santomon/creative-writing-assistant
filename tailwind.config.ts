import { type Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT"

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
})