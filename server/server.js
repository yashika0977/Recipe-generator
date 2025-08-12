// === server/server.js ===
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT =process.env.PORT ||  5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
