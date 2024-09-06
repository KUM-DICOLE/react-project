/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm:"480px",
      md:"768px",
      lg:"1200px",
      xl:"1400px",
    },
    extend: {
      colors: {
        myBlue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: (theme) => ({
        pattern:
        "url('https://th.bing.com/th/id/OIP.BzH_3k-t3gzwZs8K2q1mNQHaNL?w=202&h=328&c=7&r=0&o=5&dpr=1.5&pid=1.7')",

      }),
},
  },
  plugins: [],
}

