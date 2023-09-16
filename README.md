# Quick Notes

A simple web application to note things down. Keeping it locally on Browser.

Note: This project has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

- [Node JS](https://nodejs.org) (node v20.6.0)
    - [npm](https://www.npmjs.com/) (v10.1.0)
    - [React](https://reactjs.org/) - [create-react-app](https://github.com/facebook/create-react-app) (v5.0.1)

## Features

- Add a new note
- Save notes locally on device with Browsers local storage
- Delete all notes

## Usage

### One-time setup
Install above dependencies, if haven't already. Prefer using the exact same versions as specified to guarantee source compatibility on device. Then, follow the given steps:

1. Open a Terminal in the source directory.
2. Run
``` bash
npm i
```
 or `npm install` to install node module dependencies locally.

### Source assessment

Open a terminal in the source directory, and use below commands as intended.

1. `npm start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in browser.

The page will reload on changes to any project file.\
Any lint errors will also be shown in terminal/console.

2. `npm test` or `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Source Build

If the above assessment seems fine and source is ready to be built into static files, use the below command in project directory:

``` bash
npm run build
```

This builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
This App is ready to be deployed!

## Additional references by [React Documentation](https://react.dev)

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the bundle size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [npm-run-build fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

This project is currently under development and is available in a pre-ready state. Contributions of all kind are welcome to this project. Go ahead and start a discussion, raise an issue or create a Pull Request.
