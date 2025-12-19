import { useEffect, useState } from 'react'
import { getRandomRecipes, getRecipesByIngredient } from './api'
import MealList from './components/MealList'
import Notebook from './components/Notebook'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [notebook, setNotebook] = useState(
    JSON.parse(localStorage.getItem('notebook')) || []
  );

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Load random recipes on page load
  useEffect(() => {
    getRandomRecipes(3).then((data) => {
      setRecipes(Array.isArray(data) ? data : []);
    });
  }, []);

  // Delete recipe from Notebook
  function deleteFromNotebook(idMeal) {
    const updated = notebook.filter((r) => r.idMeal !== idMeal);
    setNotebook(updated);
    localStorage.setItem('notebook', JSON.stringify(updated));
  }

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
  }

  // Search by ingredient
  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    const result = await getRecipesByIngredient(query);

    setTimeout(() => {
      const limited = Array.isArray(result) ? result.slice(0, 3) : [];
      setRecipes(limited);
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      <h1>Find Me Something to Cook</h1>

      <section className="search-section">
        <input
          type="text"
          placeholder="Enter an ingredient (e.g., chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="search-buttons">
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button onClick={() => setRecipes([])}>Clear</button>
          <button onClick={() => getRandomRecipes(3).then(setRecipes)}>Refresh</button>
        </div>
      </section>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <h3>Looking for something yummy...please wait</h3>
        </div>
      ) : (
        <MealList recipes={recipes} onSave={saveToNotebook} />
      )}

      <h2>Your Notebook</h2>
      <h3>Your favorite recipes will be saved here</h3>
      <Notebook notebook={notebook} onDelete={deleteFromNotebook} />
    </div>
  );
}

export default App;