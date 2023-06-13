import { Navigate, Route, Routes } from 'react-router-dom';

import { JournalPage } from '../pages/JournalPage';

export const JournalRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<JournalPage />} />

			{/* Cualquier otra ruta, dirigir a */}
			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	);
};
