

const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRecipe = async (ingredients) => {
  const prompt = `
  Create a detailed recipe using the following ingredients: ${ingredients.join(', ')}.
  Format the response as JSON with the following structure:
  {
    "title": "Recipe Title",
    "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "notes": "Optional notes or serving suggestions",
    "prepTime": "Preparation time in minutes",
    "cookTime": "Cooking time in minutes",
    "totalTime": "Total time in minutes",
    "servings": "Number of servings",
    "difficulty": "Difficulty level (e.g., Easy, Medium, Hard)",
    "dietaryInfo": "Information such as Vegetarian, Vegan, Gluten-Free, etc."
  }
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    const startIndex = content.indexOf("{");
    const endIndex = content.lastIndexOf("}");
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Invalid JSON response from API");
    }
    const jsonString = content.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error in OpenAI API request:", error.message);
    throw new Error("Failed to generate recipe using OpenAI API");
  }
};

exports.getIngredientSuggestions = async (text) => {
  const prompt = `
    Provide a list of ingredients related to the query: "${text}".
    Ensure the response is a valid JSON array. Do not include any explanation or comments.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\[.*\]/s); // match JSON array

    if (!jsonMatch) {
      throw new Error("Invalid JSON response from API");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error parsing ingredients:", error.message);
    throw new Error("Failed to generate ingredient suggestions");
  }
};
