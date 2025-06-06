# NC-News-Project - Backend API

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![Express](https://img.shields.io/badge/Express-v4-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-orange)
![Jest](https://img.shields.io/badge/Jest-v29-purple)

A robust backend API for a Reddit-style news platform, built with Node.js and Express. This project provides comprehensive article, topic, user, and comment management functionality.

Hosted at : https://nc-news-api-qa14.onrender.com/api
Please note - as currently on free version, it can take a minute to build the server

Public Repo:

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Development](#development)
  - [Running the Server](#running-the-server)
  - [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- **Complete CRUD Operations**:
  - Create, read, update, and delete articles, comments, users, and topics
  - Filtering by topic, author, and date
  - Sorting by votes, comments, date, author, comment count and title
- **Error Handling**:
  - Comprehensive status codes
  - Custom error handling
- **Testing**:
  - Endpoint test coverage
  - Unit and integration tests

## Project Structure

nc-news-project/

```bash
nc-news-project/
├── root/
│   ├── controllers/       # Route controllers
│   ├── db/                # Database connection and setup
│   ├── models/            # Data models
│   ├── routes/            # API route definitions COMING
│   └── app.js             # Express application setup
├── tests/                 # Test suites
├── .env.example           # Environment variables template
├── endpoints.json         # directory of endpoints and exmamples
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL v15+
- Yarn (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NC-News-Project.git
   cd NC-News-Project
   ```

Install dependencies:

```bash
yarn install
```

# or

```js
npm install
```

# Database Setup

Create a new PostgreSQL database
Run migrations:

```bash
yarn run seed
```

Configuration

# API Documentation

For complete API documentation, please refer to the API Reference or run the server.

# Development

Running the Server
Start the development server:

```bash
yarn dev
```

# or

```js
npm run dev
```

Testing
Run the test suite:

```bash
yarn test
```

# or

```js
npm test
```

# Deployment

This application can be deployed to any Node.js hosting platform.
For production:
Set NODE_ENV=production in your environment variables
Ensure proper database connection strings

Contributing
Contributions are welcome! Please follow these steps:
Fork the repository
Create a new feature branch
Commit your changes
Push to the branch
Submit a pull request

# Acknowledgements

Thank you to the NC team, Rose, Stephen, Mezz and Alex.
Thank you to Simon for the music.

# License

This project is licensed under the MIT License - see the LICENSE file for details.

Possible to add....

- Adding actual API documentation
- add screenshots
- Listing known issues
