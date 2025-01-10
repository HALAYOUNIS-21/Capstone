import axios from "axios";

const BASE_URL = "https://opentdb.com/api.php";

// Fetch Questions with Debugging and Validation
export const fetchQuestions = async (category, difficulty, amount) => {
  try {
    // Validation for parameters
    if (!category || !difficulty || !amount) {
      throw new Error("Invalid parameters. Please select category, difficulty, and amount.");
    }

    const response = await axios.get(
      `${BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    console.log("📥 Fetched Questions:", response.data); // Debugging log

    // Handle different response codes
    if (response.data.response_code !== 0) {
      switch (response.data.response_code) {
        case 1:
          throw new Error("No results. Please try a different combination.");
        case 2:
          throw new Error("Invalid parameter. Check the inputs.");
        case 3:
          throw new Error("Token not found.");
        case 4:
          throw new Error("Token empty.");
        default:
          throw new Error("Unknown error occurred.");
      }
    }

    return response?.data?.results || [];
  } catch (error) {
    console.error("❗ Error fetching questions:", error.message || error);
    return [];
  }
};

// Fetch Categories with Debugging and Validation
export const fetchCategories = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");

    console.log("📥 Fetched Categories:", response.data); // Debugging log

    if (!response?.data?.trivia_categories) {
      throw new Error("Failed to load categories.");
    }

    return response.data.trivia_categories;
  } catch (error) {
    console.error("❗ Error fetching categories:", error.message || error);
    return [];
  }
};