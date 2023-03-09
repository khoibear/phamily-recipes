import { collection, addDoc, doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getRecipes = async () => {
    const recipesCollectionRef = collection(db, "Recipes");
    const snapshot = await onSnapshot(recipesCollectionRef);
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};

export const getUsers = () => {
    const users = [
      { id: 'userJohn', name: 'John' },
      { id: 'userTina', name: 'Tina' },
      { id: 'userKevin', name: 'Kevin' },
      { id: 'userJerry', name: 'Jerry' }
    ];
    
    return users;
  };

export const addRecipe = async (recipeData) => {
    const recipesCollectionRef = collection(db, "Recipes");
    await addDoc(recipesCollectionRef, recipeData);
};

export const updateRecipe = async (recipeId, recipeData) => {
    const recipeDoc = doc(db, "Recipes", recipeId);
    await updateDoc(recipeDoc, recipeData);
};

export const deleteRecipe = async (recipeId) => {
    const recipeDoc = doc(db, "Recipes", recipeId);
    await deleteDoc(recipeDoc);
};