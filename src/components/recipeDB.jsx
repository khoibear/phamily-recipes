import { useEffect, useState } from "react";

import RecipeList from "./recipeList";
import RecipeForm from "./recipeForm";
import { getRecipes, getUsers, addRecipe, updateRecipe, deleteRecipe } from "./firebaseUtils";

const RecipeDB = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editRecipeTitle, setEditRecipeTitle] = useState("");
    const [editRecipeInstructions, setEditRecipeInstructions] = useState("");
    const [editRecipeIngredientList, setEditRecipeIngredientList] = useState([]);
    const [editRecipeHealthy, setEditRecipeHealthy] = useState(false);
    const [editRecipeImageURL, setEditRecipeImageURL] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const recipes = await getRecipes();
            setRecipeList(recipes);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsers();
            setUserList(users);
        };
        fetchData();
    }, []);

    const onSubmitRecipe = async (
        newRecipeTitle,
        newRecipeInstructions,
        newRecipeIngredientList,
        isNewRecipeHealthy,
        newRecipeImageURL,
        selectedUser
    ) => {
        try {
            const recipeData = {
                title: newRecipeTitle,
                instructions: newRecipeInstructions,
                ingredients: newRecipeIngredientList,
                healthy: isNewRecipeHealthy,
                imageURL: newRecipeImageURL,
                user: selectedUser,
            };
            if (editRecipeId) {
                // Update existing recipe
                await updateRecipe(editRecipeId, recipeData);
            } else {
                // Add new recipe
                await addRecipe(recipeData);
            }
            // Clear edit form state
            setEditRecipeId(null);
            setEditRecipeTitle("");
            setEditRecipeInstructions("");
            setEditRecipeIngredientList([]);
            setEditRecipeHealthy(false);
            setEditRecipeImageURL("");
            setSelectedUser("");
            // Update recipe list
            const recipes = await getRecipes();
            setRecipeList(recipes);
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteRecipe = async (recipeId) => {
        try {
            await deleteRecipe(recipeId);
            // Update recipe list
            const recipes = await getRecipes();
            setRecipeList(recipes);
        } catch (error) {
            console.error(error);
        }
    };

    const onEditRecipe = async (recipe) => {
        setEditRecipeId(recipe.id);
        setEditRecipeTitle(recipe.title);
        setEditRecipeInstructions(recipe.instructions);
        setEditRecipeIngredientList(recipe.ingredients);
        setEditRecipeHealthy(recipe.healthy);
        setEditRecipeImageURL(recipe.imageURL);
        setSelectedUser(recipe.user);
    };

    const onCancelEdit = () => {
        // Clear edit form state
        setEditRecipeId(null);
        setEditRecipeTitle("");
        setEditRecipeInstructions("");
        setEditRecipeIngredientList([]);
        setEditRecipeHealthy(false);
        setEditRecipeImageURL("");
        setSelectedUser("");
    };

    return (
        <div>
            <h1>Recipe Database</h1>
            <RecipeList
                recipeList={recipeList}
                onDeleteRecipe={onDeleteRecipe}
                onEditRecipe={onEditRecipe}
            />
            <RecipeForm
                onSubmitRecipe={onSubmitRecipe}
                onCancelEdit={onCancelEdit}
                editRecipeTitle={editRecipeTitle}
                editRecipeInstructions={editRecipeInstructions}
                editRecipeIngredientList={editRecipeIngredientList}
                editRecipeHealthy={editRecipeHealthy}
                editRecipeImageURL={editRecipeImageURL}
                selectedUser={selectedUser}
                userList={userList}
            />
        </div>
    );
};

export default RecipeDB;