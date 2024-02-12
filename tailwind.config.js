/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			primary: '#FF4076',
			secondary: '#923553',
			dark: '#FF4076',
			white1: '#ffffff',
			white2: '#ffffff',
			white3: '#ffffff',
			darkBlue: '#101443',
			darkBlue90: '#282C56',
			white: '#FFFFFF',
			lightBlue: '#2992CE',
			lightBlueSeparator: '#C9E4F3',
			variationRed: '#FF5555',
			variationPurple: '#C30098',
			variationBlue: '#55E0FF',
			variationDarkBlue: '#55ADFF',
			variationGreen: '#00DA71',
			answerGreen: '#75C6A4',
			answerRed: '#FA7E7E',
		},
		extend: {
			gridTemplateColumns: {
				'auto-fit-xs': 'repeat( auto-fit, minmax(13rem, 1fr) )',
				'auto-fit-lg': 'repeat( auto-fit, minmax(32rem, 1fr) )',
				'auto-fill-xs': 'repeat( auto-fill, minmax(12rem, 1fr) )',
				'auto-fill-sm': 'repeat( auto-fill, minmax(16rem, 1fr) )',
				'auto-fill-lg': 'repeat( auto-fill, minmax(32rem, 1fr) )',
			},
			boxShadow: {
				card: '0px 0px 10px 0px #00000040',
			},
			width: {
				300: '300px',
			},
		},
	},
	plugins: [],
};
