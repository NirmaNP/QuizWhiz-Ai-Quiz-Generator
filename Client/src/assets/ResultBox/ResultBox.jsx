import React, { useState, useRef, useEffect } from "react";
import "./ResultBox.css";
import Modal from "../Modal/Modal";

function ResultBox(props) {
  const modalRef = useRef(null);
  const percentage = (props.score / props.total) * 100;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const borderColor =
    percentage >= 80
      ? "border-green-500"
      : percentage >= 50
      ? "border-yellow-500"
      : "border-red-500";

  // Check if we have detailed results in props
  const hasDetailedResults = props.questions && props.questions.length > 0;

  useEffect(() => {
    if (showDetailsModal && modalRef.current) {
      // Scroll with some margin from top
      const topOffset =
        modalRef.current.getBoundingClientRect().top + window.scrollY - 80; // 80px if your header is fixed
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [showDetailsModal]);

  const resultBoxRef = useRef(null);
  const scrollPosition = useRef(0);

  const handleOpen = () => {
    // Store the current scroll position (not the element position)
    scrollPosition.current = window.scrollY;
    console.log(scrollPosition);

    setShowDetailsModal(true);

    setTimeout(() => {
      if (modalRef.current) {
        const topOffset =
          modalRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 100);
  };

  const handleClose = () => {
    setShowDetailsModal(false);

    // Restore scroll after fade-out animation ends
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition.current, behavior: "smooth" });
    }, 100); // match modal fade-out duration
  };

  return (
    <>
      <div
        className={`border-2 ${borderColor} rounded-xl m-4 p-6 shadow-md flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:shadow-lg transition-shadow`}
        ref={resultBoxRef}
      >
        {/* Equal-width columns */}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Date
          </span>
          <span className="font-medium text-gray-800 block mt-1">
            {props.date}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Topic
          </span>
          <span className="font-medium text-gray-800 block mt-1">
            {props.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Difficulty
          </span>
          <span className="font-medium text-gray-800 block mt-1 capitalize">
            {props.difficulty}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Time Taken
          </span>
          <span className="font-medium text-gray-800 block mt-1">
            {props.timeTaken}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Score
          </span>
          <span className="font-medium text-gray-800 block mt-1">
            {props.score} / {props.total}{" "}
            <span className="text-sm">({percentage.toFixed(0)}%)</span>
          </span>
        </div>

        {/* Button row */}
        <div className="w-full md:w-auto md:flex-none mt-4 md:mt-0">
          <button
            onClick={() => {
              handleOpen();
              setShowDetailsModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
            disabled={!hasDetailedResults}
            title={!hasDetailedResults ? "Detailed results not available" : ""}
          >
            View Details
          </button>
        </div>
      </div>

      {hasDetailedResults && (
        <div ref={modalRef}>
          <Modal
            isOpen={showDetailsModal}
            onClose={() => {
              handleClose();
              setShowDetailsModal(false);
            }}
            title="Detailed Quiz Results"
            width="90vw"
            maxHeight="90vh"
          >
            <div className="detailed-results-content">
              {props.questions.map((question, index) => (
                <div
                  key={index}
                  className={`detailed-question ${
                    question.isCorrect
                      ? "correct"
                      : question.userAnswer === "Not answered"
                      ? "unanswered"
                      : "incorrect"
                  }`}
                >
                  <h3>
                    Question {index + 1}: {question.questionText}
                  </h3>

                  <div className="all-options">
                    {question.options.map((option, optIndex) => {
                      const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D
                      const isUserAnswer = option === question.userAnswer;
                      const isCorrectAnswer = option === question.correctAnswer;

                      return (
                        <div
                          key={optIndex}
                          className={`
                    option 
                    ${isCorrectAnswer ? "correct-option" : ""}
                    ${isUserAnswer && !isCorrectAnswer ? "wrong-selection" : ""}
                    ${isUserAnswer ? "user-selected" : ""}
                  `}
                        >
                          <span className="option-label">{optionLabel}.</span>{" "}
                          {option}
                          {isCorrectAnswer && !isUserAnswer && (
                            <span className="correct-indicator">✓ Correct</span>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <span className="wrong-indicator">
                              ✗ Your choice
                            </span>
                          )}
                          {isUserAnswer && isCorrectAnswer && (
                            <span className="correct-indicator">
                              ✓ Correct (Your choice)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="answer-feedback">
                    {question.isCorrect ? (
                      <span className="feedback-correct">
                        ✓ You answered correctly!
                      </span>
                    ) : question.userAnswer === "Not answered" ? (
                      <span className="feedback-unanswered">
                        ⚠ You didn't answer this question
                      </span>
                    ) : (
                      <span className="feedback-incorrect">
                        ✗ Your answer was incorrect. The correct answer was:{" "}
                        <strong>{question.correctAnswer}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ResultBox;
