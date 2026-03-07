const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiDocument = require('./openapi.json');

const postsRoute = require('./routes/posts');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.send('We are on home');
});

// API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Basic error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log the error in a real app; for now just send 500
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
