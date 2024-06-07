const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tasksRouter = require('./routes/tasks');
const db = require('./database');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware!
app.use(express.json());
app.use(cors());

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
