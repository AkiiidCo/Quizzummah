import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './containers/game/game';
import { Home } from './containers/home/home';

export const Router = (): ReactElement => (
	<Routes>
		{/* <Route path="/" element={<Home />} /> */}
		{/* <Route path="/game" element={<Game />} /> */}
		<Route path="/" element={<Game />} />
	</Routes>
);
