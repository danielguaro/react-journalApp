import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import {
	startGoogleSignIn,
	startLoginWithEmailPassword,
} from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { useMemo } from 'react';

// Para evitar que se genere un ciclo infinito por los cambios en mi hook useForm.js ( que escucha los cambios en el initialState)
const formData = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const { status, errorMessage } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const { email, password, onInputChange } = useForm(formData);

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailPassword(email, password));
	};

	const onGoogleSignIn = () => {
		console.log('onGoogleSignIn');
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="correo"
							type="email"
							placeholder="ejemplo@ejemplo.com"
							fullWidth
							value={email}
							name="email"
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="contraseña"
							type="password"
							placeholder="contraseña"
							fullWidth
							value={password}
							name="password"
							onChange={onInputChange}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isAuthenticating}
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
