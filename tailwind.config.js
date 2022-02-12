module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
			mobile: '300px',
			sm: '500px',
			md: '720px',
			lg: '960px',
			xl: '1024px',
			xxl: '1280px',
		},
		extend: {
			colors: {
				twitter: '#1DA1F2',
				reddit: '#DE3E02',
				gray: {
					200: '#222222',
					400: '#434343',
					900: '#aaaaaa',
				},
				gradientLightStart: '#e1fad4',
				gradientLightStop: '#72b39f',
			},
		},
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
};
