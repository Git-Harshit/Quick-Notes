# Quick Notes

A simple web application to note things down. Keeping it locally on Browser.

Note: This project has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

- [Node JS](https://nodejs.org) (node v20.6.0)
    - [npm](https://www.npmjs.com/) (v10.1.0)
        - [React](https://reactjs.org/) - [create-react-app](https://github.com/facebook/create-react-app) [(v5.0.1)](https://www.npmjs.com/package/create-react-app/v/5.0.1)
        - [Bootstrap](https://getbootstrap.com/) [(v5.3.2)](https://www.npmjs.com/package/bootstrap/v/5.3.2)
        - [Bootstrap Icons](https://icons.getbootstrap.com/) [(v1.11.1)](https://www.npmjs.com/package/bootstrap-icons/v/1.11.1)
        - (Development Dependency) [SASS](https://sass-lang.com/) [(v1.68)](https://www.npmjs.com/package/sass/v/1.68.0)

### Trying Development Dependency

Syntactically Awesome Style Sheets (SASS) is a development dependency as was saved using `--save-dev` flag ('-D' for shorthand notation) with 'npm install'. It is included to support .sass and .scss SASS formats with Bootstrap. In case an .scss file has to be converted into its equivalent .css file, use `npx sass <input.scss> <output.css>` command. This is just suggested for assessment and is not needed to be separately done to setup files with these formats.
For example, to check the .css source for src/App.scss file, use command ```npx sass src/App.scss src/App.css```.

If 'sass' npm module is pre-installed globally (using '-g' flag with `npm install` command before), 'npx' command will not be needed and 'sass' can be directly used instead of 'npx sass'.

## Features

Key highlights of this application are:

- Add a new note
- Edit, Delete a note
- Delete all notes
- Dark theme
- Save notes locally on device with Browsers local storage
- Export Notes in JavaScript Object Notation (JSON) file format

## Usage

### One-time setup
Install above dependencies, if haven't already. Prefer using the exact same versions as specified to guarantee source compatibility on device. Then, follow the given steps:

1. Open a Terminal in the source directory.
2. Run
    ``` bash
    npm install
    ```
    or `npm i` to install node module dependencies locally. To ensure clean installation, use `npm clean install` or `npm ci` to discard any module that is already installed in the project directory and newly install all dependencies.

### Source assessment

Open a terminal in the source directory, and use below commands as intended.

1.  ``` bash
    npm start
    ```
    or `npm run start`

    Runs the app in the development mode.\
    Open [http://localhost:3000/Quick-Notes](http://localhost:3000/Quick-Notes) to view it in browser.

    The page will reload on changes to any project file.\
    Any lint errors will also be shown in terminal/console.

2.  ``` bash
    npm test
    ```
    or `npm run test`

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

This project is currently under development and is available in a ready state. Contributions of all kind are welcome to this project. Go ahead and start a discussion, raise an issue or create a Pull Request. :rocket:
