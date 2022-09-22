/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				'sm': {'max': '576px'},
				'md': {'max': '768px'},
				'lg': {'max': '1024px'},

			}
		},
	},
	plugins: [
		require("tailwind-scrollbar-hide")
	],
}
