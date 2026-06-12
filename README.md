# REST API — Posts

A RESTful API for managing blog posts built with Node.js, Express, and MongoDB. Implements full CRUD operations with authentication middleware.

> **Note:** Authentication is not yet implemented. All endpoints are currently open. JWT-based auth middleware is planned for a future release.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | HTTP framework |
| MongoDB | Database |
| Mongoose | ODM / schema validation |
| dotenv | Environment variable loading |
| cors | Cross-origin resource sharing |
| swagger-ui-express | Interactive API docs at `/api-docs` |
| Jest + Supertest | Testing |

---

## API Endpoints

Base URL: `http://localhost:4000`

| Method | Endpoint | Description | Auth Required | Request Body | Response |
|---|---|---|---|---|---|
| GET | `/` | Health check | No | — | `"We are on home"` |
| GET | `/posts` | Fetch all posts | No | — | `Post[]` |
| POST | `/posts` | Create a new post | No | `{ title, description }` | `Post` (201) |
| GET | `/posts/:postId` | Fetch a single post | No | — | `Post` |
| PATCH | `/posts/:postId` | Update a post's title | No | `{ title }` | Mongoose update result |
| DELETE | `/posts/:postId` | Delete a post | No | — | Mongoose delete result |

### Post schema

```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "date": "ISO 8601 timestamp"
}
```

---

## Local Setup

### Prerequisites

- Node.js LTS
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone and install

```bash
git clone https://github.com/Engr-BenitoIshimwe/REST-API-POSTS.git
cd REST-API-POSTS
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Required | Description |
|---|---|---|
| `DB_CONNECTION` | Yes | MongoDB connection URI, e.g. `mongodb://localhost:27017/rest_api_posts` |
| `PORT` | No | Port the server listens on (default: `4000`) |
| `JWT_SECRET` | Planned | Secret for signing JWT tokens (not used yet) |

### 3. Start the server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:4000`.  
Interactive Swagger docs: `http://localhost:4000/api-docs`

---

## Example curl Commands

```bash
# Health check
curl http://localhost:4000/

# Get all posts
curl http://localhost:4000/posts

# Create a post
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "description": "Hello world"}'

# Get a single post
curl http://localhost:4000/posts/<postId>

# Update a post's title
curl -X PATCH http://localhost:4000/posts/<postId> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:4000/posts/<postId>
```

---

## Testing

```bash
npm test
```

Tests use Jest + Supertest with an in-memory mock of the Mongoose model — no live database required.

---

## Linting & Formatting

```bash
npm run lint
npm run format
```

---

## Planned Improvements

- **Authentication** — JWT-based middleware to protect write endpoints (POST, PATCH, DELETE)
- **Input validation** — Input validation with express-validator is planned

---

## Docker

```bash
docker build -t rest-api-posts .
docker run -p 4000:4000 --env-file .env rest-api-posts
```

## Deploy to Render

Push to GitHub with the included `render.yaml`. In Render, create a **New Web Service** from this repository and set `DB_CONNECTION` in the environment variables dashboard. `PORT` is set automatically by Render.
