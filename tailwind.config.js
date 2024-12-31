/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			fira: [
  				'Fira Sans',
  				'sans-serif'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			extrabold: 800,
  			bold: 700,
  			semibold: 500,
  			medium: 400,
  			regular: 300,
  			light: 200
  		},
  		blur: {
  			xs: '2px'
  		},
  		colors: {
  			royalBlue: '#4169E1',
  			emeraldGreen: '#50C878'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
