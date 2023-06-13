import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	// Para que se actualicen Todos los valores al tener un cambio
	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	// Implementar validación en el formularo
	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) return false;
		}

		return true;
	}, [formValidation]);

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	// Para poder evaluar cumplimiento de mis variables
	const createValidators = () => {
		const formCheckedValues = {};

		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMessage = 'Este campo es requerido'] =
				formValidations[formField];
			formCheckedValues[`${formField}Valid`] = fn(formState[formField])
				? null
				: errorMessage;
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};
