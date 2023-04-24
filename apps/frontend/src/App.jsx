import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Login, Registration, Profile } from './pages';
import { ProtectedRoute, Layout } from './components';
import './styles.scss';

function App() {
	const router = useRoutes([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Login />,
				},
				{
					path: '/registration',
					element: <Registration />,
				},
				{
					path: '/profile',
					element: (
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					),
				},
			],
		},
	]);
	return router;
}

export default App;
