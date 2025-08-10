module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#171E2D",
        accent: "#7C3AED",
        success: "#16A34A",
        danger: "#DC2626"
      },
      spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 10: 40 },
      borderRadius: { xl: 12, "2xl": 16 },
      fontFamily: { sans: ["Inter"] }
    }
  }
};
