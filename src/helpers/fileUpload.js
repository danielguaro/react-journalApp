export const fileUpload = async (file) => {
	if (!file) throw new Error('No tenemos ningún archivo a subir');
	// utilizo la URL que use en el POSTMAN de ensayo
	const cloudUrl = 'https://api.cloudinary.com/v1_1/dvumboqn7/upload';
	// La creación de from-data
	const formData = new FormData();
	// Ahora para agregar la llave de valores que necesito
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		// Para implementar el method post
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});
		if (!resp.ok) throw new Error('No se pudo subir imagen');
		const cloudResp = await resp.json();
		return cloudResp.secure_url;
	} catch (error) {
		throw new Error(error.message);
	}
};
