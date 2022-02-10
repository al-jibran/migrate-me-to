module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
			mobile: '300px',
			sm: '500px',
			md: '640px',
			lg: '768px',
			xl: '1024px',
			'2xl': '1280px',
		},
		extend: {
			colors: {
				twitter: '#1DA1F2',
				reddit: '#DE3E02',
				gray: {
					200: '#222222',
					900: '#aaaaaa',
				},
			},
		},
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
};
