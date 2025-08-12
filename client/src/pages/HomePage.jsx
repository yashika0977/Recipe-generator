import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import IngredientInput from '../components/IngredientInput';
import RecipeOutput from '../components/RecipeOutput';
import './HomePage.css'; // Importing CSS for additional styles

const HomePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add some ingredients!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://ai-recipe-gen-iota.vercel.app/api/recipes/generate', {
        ingredients,
      });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      toast.error('Error generating recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
     
      <main className="main-content">
      <header className="header">
        <h1 className="app-title">CookMate AI</h1>
        <p className="subtitle">Your AI-powered recipe assistant</p>
      </header>
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleGenerate={handleGenerate}
        />
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        {recipe && <RecipeOutput recipe={recipe} />}
      </main>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
