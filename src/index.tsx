import 'hacktimer';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './App/error-boundary/error-boundary';
import { store } from './App/redux/store';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ErrorBoundary>
		</Provider>
	</React.StrictMode>,
);
