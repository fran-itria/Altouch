/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    altouch: {
      colors: {
        primary: "#041433",
        secondary: "#1D7544",
        tertiary: "#00311D",
        table: "#1E1E1E",
        text: 'white',
        textFinish: 'black',
        tabBarActiveColor: "white",
        tabBarInactiveColor: "black",
    }
  },
    extend: {},
  },
  plugins: [],
}

