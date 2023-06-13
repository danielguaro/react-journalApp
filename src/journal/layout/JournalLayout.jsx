import { NavBar, SideBar } from '../components';

import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import { useState } from 'react';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
	const [open, setOpen] = useState(false);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	return (
		<Box
			sx={{ display: 'flex' }}
			className="animate__animated animate__fadeIn animate__faster"
		>
			{/* Navbar drawerWidth*/}
			<NavBar
				drawerWidth={drawerWidth}
				toggleDrawer={toggleDrawer}
				open={open}
			/>

			{/* Sidebar drawerWidth*/}
			<SideBar
				drawerWidth={drawerWidth}
				toggleDrawer={toggleDrawer}
				open={open}
			/>

			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				{/* Toolbar */}
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
