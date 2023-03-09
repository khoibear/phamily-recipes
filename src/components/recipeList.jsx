import React from "react";

const RecipeList = ({
  recipeList,
  deleteRecipe,
  editRecipe,
  editRecipeId,
  cancelEditRecipe,
  selectedUser,
  setSelectedUser,
  userList,
  editRecipeTitle,
  editRecipeInstructions,
  editRecipeIngredientList,
  editRecipeHealthy,
  editRecipeImageURL
}) => {

  return (
    <div>
      <ul>
        {recipeList && recipeList.map((recipe) => (
          <li key={recipe.id}>
            {editRecipeId === recipe.id ? (
              <div>
                <input
                  value={recipe.title}
                  onChange={(e) => editRecipeTitle(e.target.value)}
                />
                <input
                  value={recipe.instructions}
                  onChange={(e) => editRecipeInstructions(e.target.value)}
                />
                <input
                  value={recipe.ingredients}
                  onChange={(e) => editRecipeIngredientList(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={recipe.healthy}
                  onChange={(e) => editRecipeHealthy(e.target.checked)}
                />
                <input
                  value={recipe.imageURL}
                  onChange={(e) => editRecipeImageURL(e.target.value)}
                />
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select user</option>
                  {userList.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
                <button onClick={() => editRecipe(recipe.id)}>Save</button>
                <button onClick={cancelEditRecipe}>Cancel</button>
              </div>
            ) : (
              <div>
                {recipe.title}
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                <button onClick={() => editRecipe(recipe)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
