import { collection, getDocs } from 'firebase/firestore/lite';

import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
	if (!uid) throw new Error('El UID del usuario no existe');
	// Para apuntar a la información de la colección de firebase
	const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
	// Para traer la colección
	const docs = await getDocs(collectionRef); // docs, sería la referencia a los documentos de firebase
	// Para tener la data debo llamar la función data que hay dentro
	const notes = []; // para almacenar la data
	docs.forEach((doc) => {
		// console.log(doc?.data()); // Devuelve el array con la info del firebase
		notes.push({ id: doc.id, ...doc?.data() });
	});
	// console.log(notes);
	return notes;
};
