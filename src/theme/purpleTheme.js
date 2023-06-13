import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

// Creación de la constante
// createTheme tiene un tema por defecto, pero se sobreescribe con lo que quiera
export const purpleTheme = createTheme({
	palette: {
		primary: {
			main: '#262254',
		},
		secondary: {
			main: '#543884',
		},
		error: {
			main: red.A400,
		},
	},
});
