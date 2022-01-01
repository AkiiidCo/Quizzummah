import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

export const Router = (): ReactElement => (
	<Routes>
		<Route path="/" element={<div>Home</div>} />
		<Route path="/game" element={<div>Game</div>} />
	</Routes>
);
