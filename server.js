require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4000;
const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
  // Fail fast if DB connection string is missing
  // eslint-disable-next-line no-console
  console.error('Missing DB_CONNECTION environment variable.');
  process.exit(1);
}

mongoose
  .connect(DB_CONNECTION)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connected to DB at ${DB_CONNECTION}`);
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is live at port ${PORT}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to DB', error);
    process.exit(1);
  });

