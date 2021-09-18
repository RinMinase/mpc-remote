<h1 align="center"> ReactJS Test Application </h1>

<p align="center">
    <a href="https://david-dm.org/RinMinase/react-typescript">
        <img alt="David-DM" src="https://img.shields.io/david/RinMinase/react-typescript?style=for-the-badge">
    </a>
    <a href="https://david-dm.org/RinMinase/react-typescript">
        <img alt="David-DM" src="https://img.shields.io/david/dev/RinMinase/react-typescript?label=dev%20dependencies&style=for-the-badge">
    </a>
</p>
<p align="center">
    <a href="https://app.netlify.com/sites/react-typescript/deploys">
        <img alt="Netlify-Status" src="https://img.shields.io/netlify/88317caa-b87d-446d-8cbc-ce3fdda1d0ac?logo=netlify&style=for-the-badge">
    </a>
</p>

## Introduction
A lightweight `React` + `Redux` + `TypeScript` + `SCSS` + `Material-UI` application created without using `create-react-app` deployed using `Netlify`.

### Why TypeScript?
- TypeScript simplifies JavaScript code, making it easier to read and understand
- Better code structuring and object-oriented programming techniques
- Better development through compile-time checking
- React compiled with Babel can be written in ES6+, so why not go for a step higher and use TypeScript
- It has static type checking or type annotations, which reduces chances of undesired results from invalid types being passed or used
- It improves the capabilites of some IDEs, improving autocomplete and code navigation features
- It supports API documentation which may be of help on development

## Getting Started

### Running the project
1. [Download](https://nodejs.org/en/) the latest Node version. This is marked as `<version number> Current`. Install it on your machine.

2. _(Optional)_ [Download](https://yarnpkg.com/latest.msi) Yarn. This is a faster package manager than the default `npm` one.

3. Clone the project

    ```
    git clone https://github.com/RinMinase/react-typescript.git
    cd react-typescript
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
    │   ├── core/                       # Core components
    │   ├── <component>/                # Project component
    │   ├── global.d.ts                 # Project type definitions
    │   ├── global.scss                 # Main stylesheet
    │   ├── index.html                  # Main template file
    │   ├── index.tsx                   # Main scripts
    │   ├── reducers.ts                 # Root reducer file
    │   └── routes.tsx                  # Route definitions
    ├── tsconfig.json                   # TypeScript configuration file
    └── webpack.config.ts               # Webpack configuration file

#### Component Structure
    <component>/
     │   └── components/                # Sub-components folder
     │       └── <component name>.tsx   # Sub-component
     ├── actions.tsx                    # Component actions and types
     ├── index.scss                     # Component stylesheet
     ├── index.tsx                      # Component entry file
     └── reducers.tsx                   # Component reducers

#### Display Structure
     ___________________
    |  _______________  | <App />
    | |_______________| |  ├─ <Nav />
    |  _______________  |  │
    | |               | |  └─ <Container />
    | |               | |      └─ <Route />
    | |_______________| |
    |___________________|

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
| `yarn deploy`       | Build netlify deployment code                                                          |

## Built with
* <img width=20 height=20 src="https://reactjs.org/favicon.ico"> [React 17](https://reactjs.org/) - Web Framework
* <img width=20 height=20 src="https://redux.js.org/img/favicon/favicon.ico"> [Redux](https://reactjs.org/) - State Container Management
* <img width=20 height=20 src="https://www.typescriptlang.org/favicon-32x32.png"> [TypeScript](https://www.typescriptlang.org/) - Language syntax and compiler
* <img width=20 height=20 src="https://material-ui.com/static/favicon.ico"> [Material-UI](https://material-ui.com/) - Web Layouting
* <img width=20 height=20 src="https://sass-lang.com/favicon.ico"> [Sassy CSS (SCSS)](https://sass-lang.com/) - CSS pre-processor
* <img width=20 height=20 src="https://webpack.js.org/icon_192x192.png"> [Webpack 5](https://webpack.js.org/) - Project bundler
* <img width=20 height=20 src="https://www.netlify.com/img/global/favicon/favicon-32x32.png"> [Netlify](https://www.netlify.com/) - Continuous Deployment (CD) service
* <img width=20 height=20 src="https://terser.org/img/terser-square-logo.png"> [Terser](https://terser.org/) - ES6+ (JavaScript) mangler and compression toolkit
* <img width=20 height=20 src="https://yarnpkg.com/icons/icon-48x48.png"> [Yarn](https://yarnpkg.com/) - Package Manager
