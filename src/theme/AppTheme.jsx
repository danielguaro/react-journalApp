import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { purpleTheme } from './'; // Esta linea es por el tema que yo creo, inicialmente esto No va, por ende es cambiable

// componente HOC
export const AppTheme = ({ children }) => {
	return (
		<ThemeProvider theme={purpleTheme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
