# NC News Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-Testing-red.svg)](https://jestjs.io/)

A robust RESTful backend API for a Reddit-style news platform, built with Node.js, Express, and PostgreSQL. This project provides comprehensive article, topic, user, and comment management functionality with full CRUD operations.

## 🌐 Live Demo

**Hosted API:** [https://nc-news-api-qa14.onrender.com/](https://nc-news-api-qa14.onrender.com/)

> **Note:** Currently hosted on Render's free tier, so initial requests may take ~1 minute to spin up the server. Migration to Vercel planned for improved performance.

**Public Repository:** [https://github.com/pooch1e/NC-News-Project](https://github.com/pooch1e/NC-News-Project)

## 📋 Table of Contents

- [Features](#features)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## ✨ Features

### Core Functionality
- **Complete CRUD Operations** for articles, comments, users, and topics
- **Advanced Filtering** by topic, author, and date ranges
- **Flexible Sorting** by votes, comment count, creation date, author, and title
- **Robust Error Handling** with comprehensive HTTP status codes
- **Data Validation** and sanitization for all inputs

### Technical Features
- RESTful API design principles
- PostgreSQL database with optimized queries
- Comprehensive test coverage with Jest
- Environment-based configuration
- Custom error handling middleware
- CORS support for cross-origin requests

## 🗄️ Database Schema

```
┌─────────────┐         ┌─────────────┐         ┌─────────────────┐
│   topics    │         │    users    │         │    articles     │
├─────────────┤         ├─────────────┤         ├─────────────────┤
│ slug (PK)   │◄────┐   │ username    │◄────┐   │ article_id (PK) │
│ description │     │   │ name        │     │   │ title           │
│ img_url     │     │   │ avatar_url  │     │   │ topic (FK)      │
└─────────────┘     │   └─────────────┘     │   │ author (FK)     │
                    │                       │   │ body            │
                    │                       │   │ created_at      │
                    │                       │   │ votes           │
                    │                       │   │ article_img_url │
                    │                       │   └─────────────────┘
                    │                       │            │
                    │                       │            │
┌─────────────────┐ │                       │   ┌────────▼────────┐
│  user_topics    │ │                       │   │    comments     │
├─────────────────┤ │                       │   ├─────────────────┤
│ user_topic_id   │ │                       └───┤ comment_id (PK) │
│ username (FK)   ├─┘                           │ article_id (FK) │
│ topic (FK)      ├─────────────────────────────┤ author (FK)     │
└─────────────────┘                             │ body            │
                                                │ votes           │
                                                │ created_at      │
                                                └─────────────────┘
```

## 📁 Project Structure

```
nc-news-project/
├── controllers/           # Route controllers and business logic
│   ├── articles.js
│   ├── comments.js
│   ├── topics.js
│   └── users.js
├── db/                   # Database connection and setup
│   ├── connection.js
│   ├── seeds/
│   └── data/
├── models/               # Data models and database queries
│   ├── articles.model.js
│   ├── comments.model.js
│   ├── topics.model.js
│   └── users.model.js
├── errors/               # Error handling utilities
│   └── index.js
├── __tests__/            # Test suites
│   ├── app.test.js
│   └── utils.test.js
├── app.js                # Express application setup
├── listen.js             # Server startup
├── endpoints.json        # API endpoint documentation
├── .env.example          # Environment variables template
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18.0.0 or higher
- **PostgreSQL** v15.0.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pooch1e/NC-News-Project.git
   cd NC-News-Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Database Setup

1. **Create local databases:**
   ```bash
   createdb nc_news_dev
   createdb nc_news_test
   ```

2. **Set up environment files:**
   
   Create two environment files in the root directory:

   **`.env.development`**
   ```
   PGDATABASE=nc_news_dev
   ```

   **`.env.test`**
   ```
   PGDATABASE=nc_news_test
   ```

   > **Important:** These files are gitignored and should not be committed to version control.

3. **Seed the database:**
   ```bash
   npm run seed
   # or
   yarn run seed
   ```

## 📖 API Documentation

### Base URL
```
https://nc-news-api-qa14.onrender.com/api
```

### Available Endpoints

For complete API documentation with request/response examples, please refer to the `endpoints.json` file or visit the hosted API root endpoint.

**Quick Reference:**
- `GET /api` - API information and available endpoints
- `GET /api/topics` - Get all topics
- `GET /api/articles` - Get all articles (with filtering and sorting)
- `GET /api/articles/:article_id` - Get article by ID
- `GET /api/articles/:article_id/comments` - Get comments for an article
- `POST /api/articles/:article_id/comments` - Add comment to article
- `PATCH /api/articles/:article_id` - Update article votes
- `DELETE /api/comments/:comment_id` - Delete a comment
- `GET /api/users` - Get all users

## 🛠️ Development

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:9090` by default.

### Available Scripts

```bash
npm run setup-dbs    # Set up local databases
npm run seed         # Seed database with sample data
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run test suite
```

## 🧪 Testing

This project uses Jest for comprehensive testing including unit tests, integration tests, and endpoint testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage
- Endpoint testing for all API routes
- Error handling validation
- Database model testing
- Utility function testing

## 🚢 Deployment

### Environment Variables

For production deployment, ensure the following environment variables are set:

```bash
NODE_ENV=production
DATABASE_URL=your_production_database_url
PORT=your_preferred_port
```

### Hosting Platforms

This application is compatible with:
- Render (currently used)
- Vercel (planned migration)
- Heroku
- Railway
- Any Node.js hosting platform

## 🗺️ Roadmap

### Planned Features
- [ ] Complete pagination implementation with page count
- [ ] Add pagination support for comments
- [ ] POST endpoint for creating new topics
- [ ] DELETE endpoint for articles
- [ ] Rate limiting and API authentication
- [ ] Enhanced search functionality
- [ ] Real-time notifications

### Improvements
- [ ] Migration to Vercel for better performance
- [ ] Add OpenAPI/Swagger documentation
- [ ] Implement caching strategies
- [ ] Add comprehensive logging
- [ ] Performance monitoring integration

## 🤝 Contributing

Contributions are welcome and feedback is greatly appreciated! To contribute:

1. **Fork** the repository
2. **Create** a new feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🙏 Acknowledgements

Special thanks to:
- **Northcoders Team:** Rose, Stephen, Mezz, and Alex for their guidance and support
- **Simon** for providing the soundtrack to development
- The open-source community for the excellent tools and libraries

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [pooch1e](https://github.com/pooch1e)**

For questions, suggestions, or collaboration opportunities, feel free to reach out!