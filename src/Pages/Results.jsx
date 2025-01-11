import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/results.css"; // Import results-specific styles

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, total = 0 } = location.state || {};
  const successThreshold = total / 2;
  const isPerfectScore = score === total;
  const isZeroScore = score === 0;
  const isSuccess = score > successThreshold;

  // ✅ Dynamic messages based on performance
  const titleMessage = isPerfectScore
    ? "Congratulations! You aced it!"
    : isZeroScore
    ? "Keep trying! You'll get better."
    : isSuccess
    ? "Congratulations! You did great!"
    : "Keep trying! You can do it!";

  const subMessage = isPerfectScore
    ? "You're a trivia master!"
    : isZeroScore
    ? "Practice makes perfect!"
    : isSuccess
    ? "You're a trivia master!"
    : "Practice makes perfect!";

  // ✅ Dynamic colors for title and background
  const backgroundColor = isSuccess ? "#AADCBF" : "#F9BDBD"; // Background color
  const titleColor = isSuccess ? "#416A52" : "#EA5555";      // Title color
  const subtitleColor = isSuccess ? "#416A52" : "#EA5555";   // Subtitle color
  const scoreTextColor = isSuccess ? "#416A52" : "#EA5555";  // Score text color
  const restartButton = isSuccess  ? "#416A52" : "#EA5555";  //button color 

  const resultStyles = {
    backgroundColor: backgroundColor,
  };

  // ✅ Dynamic Feedback Icon
  const feedbackIcon = isSuccess
    ? "/images/trophy.svg"  // Trophy for success
    : "/images/skull.svg";  // Skull for failure

  // ✅ Restart Quiz Handler
  const handleRestartQuiz = () => {
    navigate("/");
  };

  return (
    <div className="results-container" style={resultStyles}>
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ Results Content */}
      <section className="results-content">
        {/* ✅ Feedback Icon */}
        <img
          src={feedbackIcon}
          alt={isSuccess ? "Trophy Icon" : "Skull Icon"}
          className="result-icon"
        />

        {/* ✅ Title with Dynamic Color */}
        <h1 className="results-title" style={{ color: titleColor }}>
          {titleMessage}
        </h1>

        {/* ✅ Subtitle with Dynamic Color */}
        <h2 className="results-subtitle" style={{ color: subtitleColor }}>
          {subMessage}
        </h2>

        {/* ✅ Score Text with Dynamic Color */}
        <p className="score-text" style={{ color: scoreTextColor }}>
          You scored {score} / {total}!
        </p>

        {/* ✅ Restart Button */}
        <button onClick={handleRestartQuiz} className="restart-button">
          Try Again
        </button>
      </section>
    </div>
  );
};

export default Results;