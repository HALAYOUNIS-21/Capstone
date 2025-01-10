import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/quiz.css";  // ✅ Import Quiz-specific styles


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { category, categoryName, difficulty, amount } = location.state || {};

  // ✅ Shuffle answer options
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // ✅ Fetch quiz questions with Retry and Backoff
  const fetchQuestions = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      if (response.data.response_code !== 0) {
        throw new Error("No questions found for the selected options.");
      }

      const formattedQuestions = response.data.results.map((q) => ({
        question: q.question,
        options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        correctAnswer: q.correct_answer,
      }));

      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 5) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.warn(`Too many requests. Retrying in ${delay / 1000} seconds...`);
        setTimeout(() => fetchQuestions(retryCount + 1), delay);
      } else {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions. Please try again later.");
        setLoading(false);
      }
    }
  };

  // ✅ Fetch questions once on load
  useEffect(() => {
    if (category && difficulty && amount) {
      fetchQuestions();
    }
  }, [category, difficulty, amount]);

  // ✅ Handle Answer Selection
  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  // ✅ Handle Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      navigate("/results", {
        state: {
          score: questions.filter(
            (q, index) => selectedAnswer === q.correctAnswer
          ).length,
          total: questions.length,
        },
      });
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {/* ✅ Common Header */}
      <Header />

      {/* ✅ Quiz Header */}
      <h1 className="quiz-header">Quiz Time!</h1>
      <p className="quiz-details">
        <strong>Category:</strong> {categoryName} | <strong>Difficulty:</strong>{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </p>
      <h2 className="quiz-details">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>

      {/* ✅ Display Question */}
      <p
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        className="quiz-question"
      />

      {/* ✅ Display Answer Options */}
      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`quiz-option ${
              selectedAnswer === option ? "selected" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* ✅ Next or Submit Button */}
      <button
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
        className="quiz-button"
      >
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit Quiz"}
      </button>
    </div>
  );
};

export default Quiz;