import 'sweetalert2/dist/sweetalert2.css';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import {
	DeleteOutline,
	SaveOutlined,
	UploadOutlined,
} from '@mui/icons-material';
import {
	setActiveNote,
	startDeletingNote,
	startSaveNote,
	startUploadingFiles,
} from '../../store/journal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';

import { ImageGallery } from '../components';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';

export const NoteView = () => {
	const dispatch = useDispatch();

	// note es como quiero que sea conocido el active (para mayor entendimiento)
	const {
		active: note,
		messageSaved,
		isSaving,
	} = useSelector((state) => state.journal);
	// Para usar la nota activa
	const { body, title, id, date, imageUrls, onInputChange, formState } =
		useForm(note);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		// return newDate.toUTCString();
		const timeZone = 'America/Bogota';

		const options = {
			timeZone,
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		};

		const formatter = new Intl.DateTimeFormat('es-CO', options);
		const formattedDate = formatter.format(newDate);
		return formattedDate;
	}, [date]);

	// Para emplear la simulación de un click
	const fileInputRef = useRef();

	useEffect(() => {
		// No requiere un think, pq no es asincrono
		dispatch(setActiveNote(formState));
	}, [formState]);

	// Para la implementación de sweetAler2
	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Nota actualizada', messageSaved, 'success');
		}
	}, [messageSaved]);

	const onSaveNote = () => {
		dispatch(startSaveNote());
	};

	const onFileInputChange = ({ target }) => {
		if (target.files === 0) return;
		dispatch(startUploadingFiles(target.files));
	};

	const onDelete = () => {
		dispatch(startDeletingNote());
	};

	return (
		<Grid
			container
			className="animate__animated animate__fadeIn animate__faster"
			direction="row"
			justifyContent="space-between"
			sx={{ mb: 1 }}
			alignItems="center"
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid>
				<input
					type="file"
					multiple
					onChange={onFileInputChange}
					style={{ display: 'none' }}
					// Para mantener la referencia al ref
					ref={fileInputRef}
				/>

				<IconButton
					color="primary"
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					disabled={isSaving}
					onClick={onSaveNote}
					color="primary"
					sx={{ padding: 2 }}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					sx={{ border: 'none', mb: 1 }}
					name="title"
					value={title}
					onChange={onInputChange}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedió hoy?"
					minRows={5}
					name="body"
					value={body}
					onChange={onInputChange}
				/>
			</Grid>
			{/* Implementación del botón para borrar */}
			<Grid container justifyContent="end">
				<Button onClick={onDelete} sx={{ padding: 2 }} color="error">
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>
			{/* image gallery */}
			<ImageGallery images={note?.imageUrls} />
		</Grid>
	);
};
