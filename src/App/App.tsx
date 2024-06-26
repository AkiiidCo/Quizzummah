import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/scroll-to-top';
import './App.css';
import { RootState, useAppSelector } from './redux/store';
import styled from 'styled-components';
import { GlobalColors, Rules } from './styles/global-styles';
import { Router } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactGA from 'react-ga4';

function App() {
	const [_t, i18n] = useTranslation();
	const language = useAppSelector((state: RootState) => state.settings.language);

	useEffect(() => {
		ReactGA.initialize('G-HPW5JN9T3P');
	}, []);

	useEffect(() => {
		// i18n.changeLanguage(language);
	}, [i18n, language]);

	return (
		<Body className="app" rtl={language === 'ar' ? true : undefined}>
			<ToastContainer theme="dark" autoClose={3000} pauseOnHover={false} position={'bottom-right'} closeButton={false} />
			<ScrollToTop />
			<Router />
		</Body>
	);
}

export default App;

export const Body: any = styled.div<{ rtl: boolean }>`
	/* background: ${GlobalColors.newPurple}; */
	width: 100%;
	font-size: 16px;
	display: flex;
	flex-direction: column;
	-webkit-app-region: no-drag !important;

	* {
		/* transition: all .3s ease-in-out; */
		box-sizing: border-box;
		direction: ${({ rtl }) => rtl && 'rtl'};
	}

	button {
		border-radius: ${Rules.radiusButtonCTA};
	}

	a {
		text-decoration: none;
		color: inherit;
		&:visited {
			color: inherit;
		}
	}

	ul {
		list-style-type: square;
	}

	@media screen and (min-width: 360px) {
		font-size: 12px;
	}

	@media screen and (min-width: 600px) {
		font-size: 14px;
	}

	@media screen and (min-width: 700px) {
	}

	@media screen and (min-width: 768px) {
	}

	@media screen and (min-width: 920px) {
		font-size: 15px;
	}

	@media screen and (min-width: 1000px) {
	}
`;
