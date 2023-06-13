import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';

import { startLogout } from '../../store/auth';
import { useDispatch } from 'react-redux';

export const NavBar = ({ drawerWidth = 240, toggleDrawer, open }) => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(startLogout());
	};

	const onSideBarClick = () => {
		toggleDrawer();
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				width: open
					? { sm: `calc(100% - ${drawerWidth}px)` }
					: {
							sm: '100%',
					  },
				ml: { sm: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					edge="start"
					sx={{ mr: 2 }}
					onClick={onSideBarClick}
				>
					{!open && <MenuOutlined />}
					{/* icono de las 3 rayas horizontales */}
				</IconButton>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6" noWrap component="div">
						{' '}
						JournalApp
					</Typography>
					<IconButton color="error" onClick={onLogout}>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
