import { useEffect, useState } from 'react'
import { getRandomRecipe, getRecipesByIngredient } from './api'
import MealList from './components/MealList'
import Notebook from './components/Notebook'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [notebook, setNotebook] = useState(
    JSON.parse(localStorage.getItem('notebook')) || []);

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Load random recipes on page load
  useEffect(() => {
    getRandomRecipe(3).then(setRecipes);
  }, []);

  // Save recipe to Notebook
  function saveToNotebook(recipe) {
    const exists = notebook.find((r) => r.idMeal === recipe.idMeal);
    if (exists) {
      alert('${recipe.strMeal} is already in your notebook.');
      return;
    }

    const updated = [...notebook, recipe];
    setNotebook(updated);
    localStorage.setItem('notebook', JSON.stringify(updated));
  }

  // Search by ingredient
  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    const result = await getRecipesByIngredient(query);
    setTimeout(() => {
      setRecipes(result?.slice(0, 3) || []);
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      <h1>Find Me Something to Cook</h1>

      <input
        type="text"
        placeholder='Enter an ingredient (e.g., chicken)'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setRecipes([])}>Clear</button>
      <button onClick={() => getRandomRecipe(3).then(setRecipes)}>Refresh</button>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <h3>Looking for something yummy...please wait</h3>
        </div>
      ) : (
        <MealList recipes={recipes} onSave={saveToNotebook} />
      )}

      <h2>Your Notebook</h2>
      <Notebook notebook={notebook} onDelete={deleteFromNotebook} />
    </div>
  );
}


export default App