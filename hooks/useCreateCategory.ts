// useAddCategory.js
import { useState } from "react";
import axios from "axios";
import { EventType } from "react-hook-form";

const useAddCategory = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState(null);

  const addCategory = async (e:React.FormEvent,newCategory:string) => {
    e.preventDefault()
    try {
      setIsAddingCategory(true);
      console.log(newCategory)
      // Make a POST request to your server to add the new category
      const response = await axios.post("/api/add-category", {
        category: newCategory,
      });

      // Handle the response as needed
      console.log("New category added:", response.data);

      // Close the modal or reset the form
      setError(null); // Clear any previous errors
    } catch (error:any) {
      console.error("Error adding new category:", error);
      setError(error); // Set error state
    }
    finally{
        setIsAddingCategory(false);
    }
  };

  return {
    isAddingCategory,
    error,
    addCategory,
    startAddingCategory: () => setIsAddingCategory(true),
    stopAddingCategory: () => setIsAddingCategory(false),
  };
};

export default useAddCategory;
