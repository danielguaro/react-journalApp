import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
	const dispatch = useDispatch();

	// Para que el titulo no pase de una linea
	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + '...' : title;
	}, [title]);

	const onClickNote = () => {
		// Ya que no es un llamado asincrono el que necesito, no necesito realizar un thunk, por lo que puedo llamar el reducer directamente desde el journalSlice.js
		dispatch(setActiveNote({ title, body, id, date, imageUrls }));
	};

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton onClick={onClickNote}>
					<ListItemIcon>
						<TurnedInNot />
					</ListItemIcon>
					<Grid container>
						<ListItemText primary={newTitle} />
						<ListItemText secondary={body} />
					</Grid>
				</ListItemButton>
			</ListItem>
		</>
	);
};
