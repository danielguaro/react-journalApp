import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

import { AuthLayout } from '../layout/AuthLayout';
import { Link as RouterLink } from 'react-router-dom';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';

const formData = {
	email: '',
	password: '',
	displayName: '',
};

// Para personalizar nuevas funciones que tendrían que ir dentro del useForm()
const formValidations = {
	email: [(value) => value.includes('@'), 'El correo debe tener una @'],
	password: [
		(value) => value.length >= 6,
		'El password debe tener minimo 6 caracteres',
	],
	displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);
	const isCheckingAuthentication = useMemo(
		() => status === 'checking',
		[status]
	);

	const [formSubmitted, setFormSubmitted] = useState(false);

	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	const onSubmitForm = (e) => {
		e.preventDefault();
		// console.log(email, password, displayName);
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<AuthLayout title="Crear Cuenta">
			<form
				onSubmit={onSubmitForm}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Pepe Perez"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="correo"
							type="email"
							placeholder="ejemplo@ejemplo.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="contraseña"
							type="password"
							placeholder="contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isCheckingAuthentication}
							>
								Crear cuenta
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
