import {
	addNewEmptyNote,
	deleteNoteById,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} from './journalSlice';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { fileUpload, loadNotes } from '../../helpers';

import { FirebaseDB } from '../../firebase/config';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		// info General de necesitaré
		// uid
		//console.log(getState()); // Tiene toda la data del usuario que necesite
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			imageUrls: [],
			date: new Date().getTime(),
		};
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

		const setDocResp = await setDoc(newDoc, newNote);

		// Creando la propiedad id a newNote
		newNote.id = newDoc.id;
		// dispatch
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

// Para traer la data de firebase
// el uid del usuario no lo pido como parametro ps ya lo tenemos dentro del store
export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		if (!uid) throw new Error('El UID del usuario no existe');
		// console.log(uid);

		// Llamando el Helper creado (loadNotes.js)
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		// debo eliminar el id del llamado de note
		const noteToFireStore = { ...note };
		delete noteToFireStore.id;
		// ref al doc
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });
		dispatch(updateNote(note));
	};
};

// Para el registro de imagenes
export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());
		// Para evitar el uso de tanto código aquí creo un helper/fileUpload.js
		//await fileUpload(files[0]); // Esto solo llama el primer archivo que escoja
		// Para poder hacer multiples peticiones de forma simultanea
		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}
		const photosUrl = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photosUrl));
	};
};

// Implementación del delete para las imagenes
export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const { active: note } = getState().journal;
		// console.log({ uid, note });

		// Cosas propias de Firebase
		// Creando la referencia al doc
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef); // Con esto ya NO va a existir en firebase, pero seguirá en el store

		// Para retirarlo del store, debo emplear un dispatch
		dispatch(deleteNoteById(note.id));
	};
};
