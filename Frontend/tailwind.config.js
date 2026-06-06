/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0A3D62",
        secondary: "#1E8449",
        accent: "#F4D03F",

        ethiopia: {
          green: "#078930",
          yellow: "#FCDD09",
          red: "#DA121A",
        },

        bg: "#F5F7FA",
        card: "#FFFFFF",
        input: "#EEF1F4",

        textPrimary: "#1C1C1E",
        textSecondary: "#6B7280",
        textLight: "#9CA3AF",

        success: "#2ECC71",
        error: "#E74C3C",
        warning: "#F39C12",
        info: "#3498DB",
      },
    
    },
  },
  plugins: [],
}