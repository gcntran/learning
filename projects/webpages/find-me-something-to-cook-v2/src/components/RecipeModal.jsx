function RecipeModal({ recipe, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="modal-close" onClick={onClose}>×</button>

                <h2>{recipe.strMeal}</h2>

                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="modal-image"
                />

                <h3>Ingredients</h3>
                <ul>
                    {Object.keys(recipe)
                        .filter(key => key.startsWith("strIngredient") && recipe[key])
                        .map((key, index) => {
                            const ingredient = recipe[key];
                            const measure = recipe[`strMeasure${index + 1}`];
                            return (
                                <li key={key}>
                                    {ingredient} {measure ? `- ${measure}` : ""}
                                </li>
                            );
                        })}
                </ul>

                <h3>Instructions</h3>
                <p>{recipe.strInstructions}</p>

            </div>
        </div>
    );
}

export default RecipeModal;