import React, { useState, useEffect } from "react";
import { getUsers } from "./firebaseUtils";


const RecipeForm = ({
    onSubmitRecipe,
    editRecipeId,
    editRecipeInstructions,
    editRecipeIngredientList,
    editRecipeTitle,
    editRecipeHealthy,
    editRecipeImageURL,
    cancelEditRecipe,
}) => {
    const [newRecipeTitle, setNewRecipeTitle] = useState("");
    const [newRecipeInstructions, setNewRecipeInstructions] = useState("");
    const [newRecipeIngredientList, setNewRecipeIngredientList] = useState("");
    const [isNewRecipeHealthy, setIsNewRecipeHealthy] = useState(false);
    const [newRecipeImageURL, setNewRecipeImageURL] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers(); // call the getUsers function to fetch the list of users
            setUsers(users); // update the users state with the fetched list of users
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitRecipe(
            newRecipeTitle,
            newRecipeInstructions,
            newRecipeIngredientList,
            isNewRecipeHealthy,
            newRecipeImageURL,
            selectedUser
        );
        setNewRecipeTitle("");
        setNewRecipeInstructions("");
        setNewRecipeIngredientList("");
        setIsNewRecipeHealthy(false);
        setNewRecipeImageURL("");
    };

    const handleCancelEdit = (e) => {
        e.preventDefault();
        cancelEditRecipe();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={newRecipeTitle}
                        onChange={(e) => setNewRecipeTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Instructions:
                    <textarea
                        value={newRecipeInstructions}
                        onChange={(e) => setNewRecipeInstructions(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Ingredient List:
                    <textarea
                        value={newRecipeIngredientList}
                        onChange={(e) => setNewRecipeIngredientList(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Is it healthy?
                    <input
                        type="checkbox"
                        checked={isNewRecipeHealthy}
                        onChange={(e) => setIsNewRecipeHealthy(e.target.checked)}
                    />
                </label>
                <br />
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={newRecipeImageURL}
                        onChange={(e) => setNewRecipeImageURL(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    User:
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Choose a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                {editRecipeId ? (
                    <div>
                        <button onClick={handleCancelEdit}>Cancel Edit</button>
                    </div>
                ) : null}
                <button type="submit">{editRecipeId ? "Save" : "Create"}</button>
            </form>
        </div>
    );
};

export default RecipeForm;
