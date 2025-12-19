function Notebook({ notebook, onDelete }) {
    if (!notebook || notebook.length === 0) {
        return <p>Your Notebook is empty.</p>;
}

return (
    <div className="notebook">
        {notebook.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
                <h3>{recipe.strMeal}</h3>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                <a
                href={`https://www.themealdb.com/meal.php?c=${recipe.idMeal}`}
                target="_blank"
                className="recipe-link"
                >
                View Recipe
                </a>
                <button className="delete-recipe-button" onClick={() => onDelete(recipe.idMeal)}>
                    Delete from Notebook
                </button>
                </div>
        ))}
    </div>
);
}
export default Notebook;