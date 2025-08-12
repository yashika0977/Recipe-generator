// === server/routes/recipeRoutes.js ===
const express = require('express');
const { getRecipe, getIngredients } = require('../controllers/recipeController');

const router = express.Router();

router.post('/generate', getRecipe);
router.post("/suggestions",getIngredients)

module.exports = router;
