import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Components/Dropdown";
import Header from "../Components/Header";  // ✅ Imported Header component

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionAmount, setQuestionAmount] = useState(4);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories dynamically from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        console.log("Categories Fetched:", data.trivia_categories);
        setCategories(data.trivia_categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle starting the quiz
  const handleStartQuiz = () => {
    if (!selectedCategory || !selectedDifficulty) {
      alert("Please select both a category and difficulty to proceed!");
      return;
    }

    // ✅ Find the category name based on the selected category ID
    const categoryName = categories.find(
      (cat) => cat.id === Number(selectedCategory)
    )?.name;

    console.log("Navigating with:", selectedCategory, categoryName, selectedDifficulty, questionAmount);

    // ✅ Pass category name to the Quiz screen
    navigate("/quiz", {
      state: {
        category: selectedCategory,
        categoryName,  // ✅ Pass category name
        difficulty: selectedDifficulty.toLowerCase(),
        amount: questionAmount,
      },
    });
  };

  return (
    <div className="main-container">
      {/* ✅ Reusable Header Component */}
      <Header />

      {/* Title Section */}
      <section className="title-section">
        <h1 className="title">Welcome to QuizMaster!</h1>
        <p className="description">
          Test your knowledge on a variety of topics. Choose your category, set the difficulty, and challenge yourself!
        </p>
      </section>

      {/* Main Flex Layout */}
      <div className="flex-container">
        {/* Left Section - Instructions */}
        <div className="instructions">
          <h2>How to Play:</h2>
          <ol>
            <li>Choose a category and difficulty level.</li>
            <li>Select the number of questions for your quiz.</li>
            <li>Answer each question and click 'Next' to proceed.</li>
            <li>Your final score will be displayed at the end!</li>
          </ol>
        </div>

        {/* Right Section - Quiz Controls */}
        <div className="quiz-controls">
          {/* Quiz Category */}
          <div className="input-box">
            <label className="input-label">Pick Quiz Category</label>
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <Dropdown
                label={
                  categories.find((cat) => cat.id === Number(selectedCategory))?.name || "Select Category"
                }
                options={categories.map((category) => ({
                  id: category.id,
                  name: category.name,
                }))}
                onSelect={(category) => setSelectedCategory(Number(category.id))}
              />
            )}
          </div>

          {/* Question Difficulty */}
          <div className="input-box">
            <label className="input-label">Question Difficulty</label>
            <Dropdown
              label={
                selectedDifficulty
                  ? selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
                  : "Select Difficulty"
              }
              options={[
                { id: "easy", name: "Easy" },
                { id: "medium", name: "Medium" },
                { id: "hard", name: "Hard" },
              ]}
              onSelect={(difficulty) => setSelectedDifficulty(difficulty.id)}
            />
          </div>

          {/* Question Number */}
          <div className="input-box">
            <label className="input-label">Question No.</label>
            <div className="number-controls">
              <button
                className="number-button"
                onClick={() => setQuestionAmount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <div className="number-display">{questionAmount}</div>
              <button
                className="number-button"
                onClick={() => setQuestionAmount((prev) => Math.min(50, prev + 1))}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Quiz Button */}
      <div className="next-button-container">
        <button className="next-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;