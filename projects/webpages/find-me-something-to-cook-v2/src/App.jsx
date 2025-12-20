import { useEffect, useState } from 'react';
import { getRandomRecipes, getRecipesByIngredient } from './api';
import MealList from './components/MealList';
import Notebook from './components/Notebook';
import RecipeModal from './components/RecipeModal';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [notebook, setNotebook] = useState(
    JSON.parse(localStorage.getItem('notebook')) || []
  );

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Load random recipes on page load
  useEffect(() => {
    getRandomRecipes(3).then((data) => {
      setRecipes(Array.isArray(data) ? data : []);
    });
  }, []);

  // Save recipe to Notebook
  function saveToNotebook(recipe) {
    const exists = notebook.find((r) => r.idMeal === recipe.idMeal);

    if (exists) {
      alert(`${recipe.strMeal} is already in your notebook.`);
      return;
    }

    const updated = [...notebook, recipe];
    setNotebook(updated);
    localStorage.setItem('notebook', JSON.stringify(updated));

    alert(`${recipe.strMeal} has been saved to your Notebook!`);
  }

  // Delete recipe from Notebook
  function deleteFromNotebook(idMeal) {
    const updated = notebook.filter((r) => r.idMeal !== idMeal);
    setNotebook(updated);
    localStorage.setItem('notebook', JSON.stringify(updated));
  }

  // Search by ingredient
  async function handleSearch() {
    if (!query.trim()) {
      alert("Please enter an ingredient to search.");
      return;
    }

    try {
      setLoading(true);
      const result = await getRecipesByIngredient(query);

      if (!Array.isArray(result) || result.length === 0) {
        setRecipes([]);
        alert("Oops! Not sure how to cook that...");
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setRecipes(result.slice(0, 3));
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Oops! The kitchen is burning. Try again later.");
      setLoading(false);
    }
  }

  return (
    <div>

      {/* Header */}
      <h1>Find Me Something to Cook</h1>
      <p className="instruction-text">
        📌 Instruction: Type the ingredient, random recipes will appear. You can view the recipe and click outside the recipe pop-up to close it (or click the "x" button). You can add your favorite recipes to the Notebook section and delete any recipe you don't want.</p>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Search Section */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Enter an ingredient (e.g., chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="search-buttons">
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button onClick={() => setRecipes([])}>Clear Results</button>
          <button onClick={() => getRandomRecipes(3).then(setRecipes)}>
            Refresh Random Recipes
          </button>
        </div>
      </section>

      {/* Recipe Results */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <h3>Looking for something yummy...please wait</h3>
        </div>
      ) : (
        <>
          <h2>Random Recipes</h2>
          <MealList
            recipes={recipes}
            onSave={saveToNotebook}
            onView={(recipe) => setSelectedRecipe(recipe)}
          />
        </>
      )}

      {/* Notebook Section */}
      <h2>Your Notebook</h2>
      <h3>Your favorite recipes will be saved here</h3>

      <Notebook
        notebook={notebook}
        onDelete={deleteFromNotebook}
        onView={(recipe) => setSelectedRecipe(recipe)}
      />

      {/* Footer */}
      <footer>
        <p>
          &copy; 2025 Find Me Something to Cook by Gia Cat Nguyen Tran.
          A study project using TheMealDB API.
        </p>
      </footer>
    </div>
  );
}

export default App;