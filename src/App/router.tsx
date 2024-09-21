import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './containers/game/game';
import { Home } from './containers/home/home';
import { SubmitQuestion } from './containers/submit-question';

export const Router = (): ReactElement => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/game" element={<Game />} />
		<Route path="/submit-question" element={<SubmitQuestion />} />
	</Routes>
);
