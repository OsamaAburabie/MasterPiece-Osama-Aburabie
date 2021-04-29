module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        btn: "var(--color-bg-btn)",
        btnsec: "var(--color-bg-btnsec)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        btn: "var(--color-text-btn)",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://scontent.famm7-1.fna.fbcdn.net/v/t31.18172-8/23632407_1481745538541088_4407289845242811931_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=dSLcRgMjUS0AX8gZHI1&_nc_ht=scontent.famm7-1.fna&oh=5620320886b55336b91e17781818940f&oe=6097FDF7')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-rtl"), require("tailwind-scrollbar")],
};
