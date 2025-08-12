// === server/controllers/recipeController.js ===
const { generateRecipe, getIngredientSuggestions } = require('../utils/openaiClient');

exports.getRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  try {
    const recipe = await generateRecipe(ingredients);
    console.log("recipe",recipe)
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating recipe' });
  }
};

exports.getIngredients = async (req, res) => {
  console.log("Req body",req.body)
  const { value } = req.body;
  try {
    const recipe = await getIngredientSuggestions(value);
    res.json({ ingredients:recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating recipe' });
  }
};
