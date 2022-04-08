<div align="center">
  <h1>Migrate Me To</h1>
  <p>
    Easily transfer data from one account to another!
  </p>

<br />

<h4>
    <a href="https://migratemeto.netlify.app/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/al-jibran/migrate-me-to/issues/">Request Feature</a>
  </h4>
</div>

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [What I Learned](#what-i-learned)
  - [Tech Stack](#tech-stack)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

Have you ever had to delete your account on social media and make a new one but lost the people you followed, posts you saved, images you had? Migrate Me To is a web application that seeks to address this problem\*. It allows users to take their information from one account and automate the process of transferring it to another.

Note: This application is still a work in progress.

> `* Subjected to api limitations imposed by the services.`

### What I Learned:

1. Figma design tool to design principles for a web app.
2. Setting up a React project from scratch with webpack, typescript, babel, typescript, jest and cypress.
3. GitHub actions for CI/CD and always keeping it green.
4. The idea of bundling, code-splitting, tree-shaking and compressing bundle files.
5. What monorepos are.
6. How jest works with typescript.
7. A deeper understanding of how typescript emit files and how babel is different from typescript.
8. APIs of various social media app and their rate limits.
9. How Oauth flow works and what role API Key, API Secret and Request Token play in the application.
10. How to make secure API requests with sending a request to the backend instead of storing secret and sensitive values in the frontend.

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://webpack.js.org/">Webpack</a></li>
    <li><a href="https://www.reactjs.org/">React</a></li>
    <li><a href="https://typescriptlang.org/">Typescript</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    <li><a href="https://jestjs.io">Jest</a></li>
    <li><a href="https://cypress.io">Cypress</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.expressjs.com/">Express</a></li>
    <li><a href="https://typescriptlang.org/">Typescript</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
  </ul>
</details>

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following values to the .env file

### Frontend

`BACKEND_URL`: Url for the backend if you'll be building the app in production mode.
`BACKEND_URL_DEV`: Url for the backend if you'll be building the app development mode.

### Backend

To run the backend, you will need to add the following values to .env file

`SESSION_SECRET`: Any string to use as session key.
`TWITTER_CONSUMER_KEY`: CONSUMER/API Key from Twitter.
`TWITTER_CONSUMER_KEY_SECRET`: CONSUMER/API Key Secret from Twitter.

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses npm as package manager.

<!-- Installation -->

### Installation

### Frontend

Clone the project

```bash
  git clone https://github.com/al-jibran/migrate-me-to.git
```

Go to the project directory

```bash
  cd migrate-me-to
```

Install dependencies for the frontend:

```bash
  cd frontend
  npm install
```

Start the frontend

```bash
  npm start
```

### Backend

Install the backend with npm:

```bash
  cd backend
  npm install
```

Start the server (development mode)

```bash
  npm run dev
```

Start the server (production mode)

```bash
	npm run build
	npm run start:prod
```

<!-- Running Tests -->

### Running Tests

To run unit tests, run the following command in the frontend/backend

```bash
  npm test
```

To run the cypress test, go to e2e folder at the root of the project and run

```bash
   npm run cypress:open
```

<!-- Contact -->

## Contact

Al Jibran - [@LinkedIn](https://linkedin.com/in/al-jibran) - [@Portfolio](https://al-jibran.netlify.app)

<!-- Acknowledgments -->

## Acknowledgements

- [axios](https://github.com/axios/axios)
- [babel](https://github.com/babel/babel)
- [postcss](https://github.com/postcss/postcss)
