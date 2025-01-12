import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/Quiz.css";  // ✅ Import Quiz-specific styles

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false); // ✅ Show correct/incorrect answer
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // ✅ Feedback Message

  const location = useLocation();
  const navigate = useNavigate();

  const { category, categoryName, difficulty, amount } = location.state || {};

  // ✅ Shuffle answer options
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // ✅ Fetch quiz questions
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
        const delay = Math.pow(2, retryCount) * 1000;
        console.warn(`Retrying in ${delay / 1000} seconds...`);
        setTimeout(() => fetchQuestions(retryCount + 1), delay);
      } else {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions. Please try again later.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (category && difficulty && amount) {
      fetchQuestions();
    }
  }, [category, difficulty, amount]);

  // ✅ Handle Answer Selection
  const handleAnswerSelect = (option) => {
    if (!showAnswer) {
      setSelectedAnswer(option);
    }
  };

  // ✅ Handle Next Question or Show Answer
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!showAnswer) {
      setShowAnswer(true);

      // ✅ Set Feedback Message
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setFeedbackMessage("Correct! Great job!");
      } else {
        setFeedbackMessage(`Oops! The correct answer was: ${currentQuestion.correctAnswer}`);
      }

    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setFeedbackMessage(""); // ✅ Reset feedback
      } else {
        const correctAnswersCount = questions.filter(
          (q, index) => selectedAnswer === q.correctAnswer
        ).length;

        navigate("/results", {
          state: {
            score: correctAnswersCount,
            total: questions.length,
          },
        });
      }
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ Quiz Title Section */}
      <section className="quiz-title-section">
        <h1 className="quiz-title">Quiz Time!</h1>
        <p className="quiz-details">
          <strong>Category:</strong> {categoryName} | <strong>Difficulty:</strong>{" "}
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
        <h2 className="quiz-details">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
      </section>

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
            className={`quiz-option
              ${selectedAnswer === option ? "selected" : ""}
              ${
                showAnswer && option === currentQuestion.correctAnswer
                  ? "correct"
                  : showAnswer && selectedAnswer === option
                  ? "incorrect"
                  : ""
              }
            `}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>

      {/* ✅ Feedback Message */}
      {showAnswer && (
        <div className={`feedback-message ${selectedAnswer === currentQuestion.correctAnswer ? "correct" : "incorrect"}`}>
          {feedbackMessage}
        </div>
      )}

      {/* ✅ Next or Show Answer Button */}
      <button
        onClick={handleNextQuestion}
        disabled={!selectedAnswer && !showAnswer}
        className="next-button"
      >
        {showAnswer
          ? currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"
          : "Check Answer"}
      </button>
    </div>
  );
};

export default Quiz;