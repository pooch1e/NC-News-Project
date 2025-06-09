# NC-News-Project - Backend API

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![Express](https://img.shields.io/badge/Express-v4-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-orange)
![Jest](https://img.shields.io/badge/Jest-v29-purple)

A robust backend API for a Reddit-style news platform, built with Node.js and Express. This project provides comprehensive article, topic, user, and comment management functionality.

Hosted at : https://nc-news-api-qa14.onrender.com/api
Please note - as I am currently hosting on the free version of Render, the application can take a minute to build the server. I'll soon be switching to Vercell.

Public Repo: https://github.com/pooch1e/NC-News-Project

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
- [ToDo](#toDo)
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
Root
│   ├── controllers/       # Route controllers
│   ├── db/                # Database connection and setup
│   ├── models/            # Data models
│   ├── routes/            # API route definitions COMING
│   |── errors/            # Error handling util functions
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

```js
npm install
```

# Database Setup

DB SCHEMA

    +------------+           +-----------+            +-----------------+
    |  topics    |           |   users   |            |     articles    |
    +------------+           +-----------+            +-----------------+
    | slug (PK)  |<--+       | username  |<-----+     | article_id (PK) |
    | desc       |   |       | name      |      |     | title           |
    | img_url    |   |       | avatar    |      |     | topic (FK)      +
    +------------+   |       +-----------+      |     | author (FK)     +
                     |                          |     | body            |
                     |                          |     | created_at      |
                     |                          |     | votes           |
                     |                          |     | article_img_url |
                     |                          |     +-----------------+
                     |                          |
                     |                          |
                     |                          |     +------------------+
                     |                          |     |   comments       |
                     |                          |     +----------------- +
                     |                          +-----| comment_id (PK)  |
                     +--------------------------------| article_id (FK)  +
                                                    +-| author (FK)      +
                                                      | body             |
                                                      | votes            |
                                                      | created_at       |
                                                      +------------------+

                             +-------------------+
                             |   user_topics     |
                             +-------------------+
                             | user_topic_id (PK)|
                             | username (FK)     |
                             | topic (FK)        |
                             +-------------------+

## Setup: Environment Files

Run `npm install` to install dependencies, which includes dotenv
The connections file has been set up for you

To connect to your local databases, you need to create two environment files in the root directory:

- `.env.development`
- `.env.test`

Each file should contain a single line specifying the relevant database name. For example:

**.env.development**

```
PGDATABASE=dev_database_name
```

**.env.test**

```
PGDATABASE=test_database_name
```

Ensure you replace these names with your database names.

Make sure these files are **not** committed to version control (they are already included in `.gitignore`).

You will also need to ensure your PostgreSQL server is running and that both databases exist locally.

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

Ensure Jest is installed

```js
npm test
```

# Deployment

This application can be deployed to any Node.js hosting platform.
For production:
Set NODE_ENV=production in your environment variables
Ensure proper database connection strings

# ToDo

1. Finish pagination with page count
2. Add pagination to comments
3. Add post for topics
4. Add delete for articles

# Contributing

Contributions are welcome and feedback would be amazing! Please follow these steps:
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
- Add screenshots
- Listing known issues
