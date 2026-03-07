# POSTS RESTFUL API

Simple RESTful API for managing posts built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

## Getting started

### Prerequisites

- Node.js LTS installed
- A MongoDB instance (local or hosted)

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```bash
DB_CONNECTION=mongodb://localhost:27017/rest_api_posts
PORT=4000
```

### Run the API

- **Development (with auto-reload):**

```bash
npm run dev
```

- **Production:**

```bash
npm start
```

The server will start on `http://localhost:4000` by default.

## API Endpoints

Base URL: `http://localhost:4000`

- **GET** `/` – health check, returns `"We are on home"`.
- **GET** `/posts` – fetch all posts.
- **POST** `/posts` – create a new post.
  - Body: `{ "title": "string", "description": "string" }`
- **GET** `/posts/:postId` – fetch a single post by id.
- **PATCH** `/posts/:postId` – update a post title.
  - Body: `{ "title": "string" }`
- **DELETE** `/posts/:postId` – delete a post.

## API documentation (Swagger / OpenAPI)

After starting the server, open:

- `http://localhost:4000/api-docs` – interactive Swagger UI

The underlying OpenAPI spec lives in `openapi.json`.

## Tooling

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Tests:** `npm test`

## Docker & deployment

### Build and run with Docker

```bash
docker build -t rest-api-posts .
docker run -p 4000:4000 --env-file .env rest-api-posts
```

### Deploy to Render

- Ensure your code is pushed to GitHub with the included `render.yaml`.
- In Render, create a **New Web Service** from this repository.
- Render will read `render.yaml` and configure the service:
  - Build command: `npm install`
  - Start command: `npm start`
- In the Render dashboard, set the environment variable:
  - `DB_CONNECTION` – your MongoDB connection string.
- Render sets `PORT` automatically; the app already respects it via `process.env.PORT`.

## Repository details (suggested)

- **Description:** `Simple RESTful API for managing posts with Node.js, Express, and MongoDB.`
- **Topics:** `nodejs express mongodb rest-api backend tutorial`


