module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
				white: '#ffffff',
				black: '#000000',
				gray: {
					200: '#222222',
					900: '#aaaaaa',
				},
				twitter: '#1DA1F2',
			},
		},
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
};
