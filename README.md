<h1 align="center"> MPC-HC Remote </h1>

<p align="center">
    <a href="https://david-dm.org/RinMinase/mpc-remote">
        <img alt="David-DM" src="https://img.shields.io/david/RinMinase/mpc-remote?style=for-the-badge">
    </a>
    <a href="https://david-dm.org/RinMinase/mpc-remote">
        <img alt="David-DM" src="https://img.shields.io/david/dev/RinMinase/mpc-remote?label=dev%20dependencies&style=for-the-badge">
    </a>
</p>

## Introduction
A lightweight MPC-HC remote to be opened on the browser on your mobile phone.

![UI Image](https://github.com/RinMinase/mpc-remote/blob/main/.github/UI.png?raw=true)

## Getting Started

### Using the project
Installations Required:
- Node
- _(Optional)_ Yarn

1. Fire up your terminal inside the project folder.

2. Build the project by running:

    ```
    npm run build
    ```

    **Note:** If you have installed Yarn, run these instead:

    ```
    yarn build
    ```

3. This should generate a `/dist` folder inside the project folder.

4. Open up your file explorer and navigate to where `MPC-HC` is installed

    This is typically found on either folders:

    ```
    C:\Program Files\MPC-HC
    ```

    ```
    C:\Program Files (x86)\MPC-HC
    ```

5. Create a `webroot` folder inside the `MPC-HC` folder

6. Copy contents of the `/dist` folder generated earlier from the build from #3 inside the webroot folder

7. Open up the options of `MPC-HC` under `View > Options`

8. Navigate to `Web Interface` and check `Listen on port`

9. Open any video file

10. Open your browser on your phone then navigate to `localhost:<port stated on Listen on port>`


### Running the project
1. [Download](https://nodejs.org/en/) the latest Node version. This is marked as `<version number> Current`. Install it on your machine.

2. _(Optional)_ [Download](https://yarnpkg.com/latest.msi) Yarn. This is a faster package manager than the default `npm` one.

3. Clone the project

    ```
    git clone https://github.com/RinMinase/mpc-remote.git
    cd mpc-remote
    ```

4. Install the dependencies then run the project

    ```
    npm install
    npm start
    ```

    **Note:** If you have installed Yarn, run these instead:

    ```
    yarn install
    yarn start
    ```

5. Fire up your browser and go to `localhost:3000`


### Project Structure
    .
    ├── assets/                         # Project assets
    ├── src/                            # Project source code
    │   ├── home/
    │   │   ├── actions.ts              # Main component http actions
    │   │   ├── index.scss              # Main component stylesheet
    │   │   └── index.tsx               # Main component
    │   ├── global.d.ts                 # Project type definitions
    │   ├── global.scss                 # Main stylesheet
    │   ├── index.html                  # Main template file
    │   └── index.tsx                   # Main scripts
    ├── tsconfig.json                   # TypeScript configuration file
    └── webpack.config.ts               # Webpack configuration file


### Building the project
Installations Required:
- Node
- _(Optional)_ Yarn

1. Fire up your terminal inside the project folder.

2. Build the project by running:

    ```
    npm run build
    ```

    **Note:** If you have installed Yarn, run these instead:

    ```
    yarn build
    ```

3. This should generate a `/dist` folder inside the project folder.


### Project tasks

Task automation is based on [Yarn scripts](https://yarnpkg.com/lang/en/docs/cli/run/) or [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                | Description                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| `yarn start`        | Run **development server** on `http://localhost:3000/` with file watching on changes   |
| `yarn build`        | Build production code                                                                  |


## Built with
* <img width=20 height=20 src="https://reactjs.org/favicon.ico"> [React 17](https://reactjs.org/) - Web Framework
* <img width=20 height=20 src="https://www.typescriptlang.org/favicon-32x32.png"> [TypeScript](https://www.typescriptlang.org/) - Language syntax and compiler
* <img width=20 height=20 src="https://sass-lang.com/favicon.ico"> [Sassy CSS (SCSS)](https://sass-lang.com/) - CSS pre-processor
* <img width=20 height=20 src="https://webpack.js.org/icon_192x192.png"> [Webpack 5](https://webpack.js.org/) - Project bundler
* <img width=20 height=20 src="https://terser.org/img/terser-square-logo.png"> [Terser](https://terser.org/) - ES6+ (JavaScript) mangler and compression toolkit
