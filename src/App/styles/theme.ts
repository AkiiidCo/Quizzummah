import { DeprecatedThemeOptions, adaptV4Theme, createTheme } from '@mui/material/styles';
import { GlobalColors } from './global-styles';

// ###########
// DARK
// ###########

export const darkOverridings: DeprecatedThemeOptions = {
	palette: {
		mode: 'dark',
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
			// hint: GlobalColors.white2,
		},
	},
};

const DarkTheme = createTheme(adaptV4Theme(darkOverridings));

// #########
// Light
// #########

export const lightOverridings: DeprecatedThemeOptions = {
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
			// hint: GlobalColors.white1,
		},
	},
};

const LightTheme = createTheme(adaptV4Theme(lightOverridings));

export default { light: LightTheme, dark: DarkTheme };
