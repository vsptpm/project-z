# Image Uploading Platform with React
#### Video Demo:  <URL HERE>
#### Description:
This React application serves as an image uploading platform with authentication features, allowing users to sign in, sign up, add posts, and comment on posts.

## Features

- **Authentication**: Users can sign in and sign up to access the platform.
  
- **Add Post**: Users can add posts with images to the platform.

- **View Posts**: The main route (`/`) displays a list of posts in descending order based on the timestamp.

- **Comment on Posts**: Each post has a comment section where users can add comments.

- **Search Posts**: The route (`/search/:searchTerm`) provides a search page (placeholder text).

## Technologies Used

- **React**: The frontend is built using React.
  
- **Firebase**: Firebase is used for backend services, including the Firestore database for storing posts and the Authentication service for user authentication.

- **React Router**: Used for handling different routes within the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
