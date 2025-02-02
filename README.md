# FAQ Manager

> A backend service for managing FAQs with translation support.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [License](#license)

## Introduction

The FAQ Manager is a Node.js application that allows users to manage Frequently Asked Questions (FAQs) with support for translations. It uses MongoDB for data storage and Redis for caching translated FAQs.

![Screenshot 2025-02-02 163019](https://github.com/user-attachments/assets/39742254-c7cf-4558-ac90-af1f9edc8d02)


## Features

- Add, update, delete, and fetch FAQs.
- Support for multilingual FAQs using Google Translate.
- Caching of translated FAQs using Redis.
- Secure handling of HTML content with `sanitize-html`.

## Installation

**Manual**

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend-test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_url
   ```

4. **Start the application:**
   ```bash
   npm start
   ```


**Docker**

1. **Build the Docker image:**
   ```bash
   docker build -t faq-manager .
2. **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 faq-manager
3. **Using Docker Compose:**
   ```bash
   docker-compose up

## Usage

Access the application:
Open your browser and go to `http://localhost:3000` to access the FAQ Manager interface.

## API Endpoints

- **GET /api/faqs:** Retrieve all FAQs, optionally with translations.
- **POST /api/faqs:** Add a new FAQ.
- **PUT /api/faqs/:id:** Update an existing FAQ.
- **DELETE /api/faqs/:id:** Delete an FAQ.

## Environment Variables

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The connection string for MongoDB.
- `REDIS_URL`: The connection string for Redis.

## Testing

To run tests, use the following command:
```bash
npm test
```

## License

This project is licensed under the MIT License.
