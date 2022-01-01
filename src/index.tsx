import 'hacktimer';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './App/error-boundary/error-boundary';
import { store } from './App/redux/store';
import theme from './App/styles/theme';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components/macro';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<BrowserRouter>
					<StylesProvider injectFirst>
						<CssBaseline />
						<MuiThemeProvider theme={theme.dark}>
							<ThemeProvider theme={theme.dark}>
								<App />
							</ThemeProvider>
						</MuiThemeProvider>
					</StylesProvider>
				</BrowserRouter>
			</ErrorBoundary>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
