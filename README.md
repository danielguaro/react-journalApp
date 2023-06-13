# Journal App

Welcome to the Journal App! This is a web application that allows you to create an account, log in with your account credentials or directly with Google, and store your journal entries. Each journal entry consists of a title, description, and an optional entry images.

The application uses Firebase as the backend to store and manage the journal entries. It provides a seamless and secure experience for saving and retrieving your personal notes.

## Features

- User Authentication: Create an account and log in securely using email and password or Google authentication.
- Journal Creation: Easily create a new journal entry by providing a title, description, and optional image.
- Image Upload: Upload an image from your device to include in your journal entry.
- Save and Update: Use the "Save" button to store your journal entry in Firebase. You can also update existing entries.
- Intuitive User Interface: The user interface is designed to be user-friendly, allowing you to navigate and interact with ease.
- Responsive Design: The app is responsive and adapts to different screen sizes, providing a consistent experience across devices.

## Technologies Used

- React: JavaScript library for building the user interface.
- Firebase: Backend service for authentication and data storage.
- Material-UI: UI library for building responsive and visually appealing components.
- Redux: State management library for handling application state.
- Redux Thunk: Middleware for handling asynchronous actions in Redux.
- sweetalert2: JavaScript library for building alerts.

## Getting Started

To get started with the Journal App, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up a Firebase project and **obtain the necessary credentials.**
4. **Update the Firebase configuration in the app's code to use your own Firebase project.**
   4.1. Go to **src/firebase/config.js** to add the information required.
5. Run the app using `npm start`.
6. Access the app in your web browser at `http://localhost:3000`.

Make sure you have Node.js and npm installed on your machine.

## Credits

This application was created by [Daniel Guarín]. Feel free to contact me if you have any questions or suggestions for improvement.

## License

This project is licensed under the [MIT License](LICENSE).
