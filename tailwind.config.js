/** @type {import('tailwindcss').Config} */
const node_env = process.env.STATE
const prodPath = node_env === 'production'? '/ordertracker' : node_env === 'staging' ? '/Xcelerator/OrderTracker': '';
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgba(28, 88, 148, 0.15)",
        accent: "#2D2D2F",
        blue: "#1C5894",
        green: "#166534",
        'bg-form': 'rgba(28, 88, 148, 0.1)'
        
      },
      backgroundImage: {
        "hero-pattern": `url('${prodPath}/bg.jpg')`,
        "footer-texture": `url('${prodPath}/img/footer-texture.png')`,
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
 