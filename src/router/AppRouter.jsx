import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../ui';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
	const status = useCheckAuth();

	if (status === 'checking') {
		return <CheckingAuth />;
	}

	return (
		<Routes>
			{/* Login y registro */}
			{/* cualquier path que tenga auth/ derivado con algo, estará yendo al AuthRoutes */}
			{/* Proteccion de rutas */}
			{status === 'authenticated' ? (
				<Route path="/*" element={<JournalRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />

			{/* <Route path="/auth/*" element={<AuthRoutes />} /> */}
			{/* JournalApp */}
			{/* Cualquier otra ruta estará entrando por JournalRoutes */}
			{/* <Route path="/*" element={<JournalRoutes />} /> */}
		</Routes>
	);
};
