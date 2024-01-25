import { createTheme, ThemeOptions } from '@mui/core/styles';
import { GlobalColors } from './global-styles';

// ###########
// DARK
// ###########

export const darkOverridings: ThemeOptions = {
	palette: {
		type: 'dark',
		primary: {
			light: GlobalColors.primary,
			main: GlobalColors.primary,
			dark: GlobalColors.dark,
			contrastText: GlobalColors.white1,
		},
		secondary: {
			light: GlobalColors.secondary,
			main: GlobalColors.secondary,
			dark: GlobalColors.secondary,
			contrastText: GlobalColors.white1,
		},
		text: {
			primary: GlobalColors.white1,
			secondary: GlobalColors.white3,
			disabled: GlobalColors.white3,
			hint: GlobalColors.white2,
		},
	},
};

const DarkTheme = createTheme(darkOverridings);

// #########
// Light
// #########

export const lightOverridings: ThemeOptions = {
	palette: {
		primary: {
			main: GlobalColors.primary,
			contrastText: GlobalColors.white1,
		},
		secondary: {
			main: GlobalColors.secondary,
			contrastText: GlobalColors.white1,
		},
		text: {
			primary: GlobalColors.white1,
			secondary: GlobalColors.white1,
			disabled: GlobalColors.white1,
			hint: GlobalColors.white1,
		},
	},
};

const LightTheme = createTheme(lightOverridings);

export default { light: LightTheme, dark: DarkTheme };
