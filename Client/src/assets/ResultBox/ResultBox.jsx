import React, { useState, useRef, useEffect } from "react";
import "./ResultBox.css";
import Modal from "../Modal/Modal";

function ResultBox(props) {
  const modalRef = useRef(null);
  const percentage = (props.score / props.total) * 100;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const borderColor =
    percentage >= 80
      ? "border-green-500 dark:border-green-600"
      : percentage >= 50
      ? "border-yellow-500 dark:border-yellow-600"
      : "border-red-500 dark:border-red-600";

  // Check if we have detailed results in props
  const hasDetailedResults = props.questions && props.questions.length > 0;

  useEffect(() => {
    if (showDetailsModal && modalRef.current) {
      const topOffset =
        modalRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [showDetailsModal]);

  const resultBoxRef = useRef(null);
  const scrollPosition = useRef(0);

  const handleOpen = () => {
    scrollPosition.current = window.scrollY;
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
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition.current, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div
        className={`border-2 ${borderColor} rounded-xl m-4 p-6 shadow-md flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:shadow-lg transition-shadow dark:bg-black/50`}
        ref={resultBoxRef}
      >
        {/* Equal-width columns */}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Date
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200 block mt-1">
            {props.date}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Topic
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200 block mt-1">
            {props.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Difficulty
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200 block mt-1 capitalize">
            {props.difficulty}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Time Taken
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200 block mt-1">
            {props.timeTaken}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Score
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200 block mt-1">
            {props.score} / {props.total}{" "}
            <span className="text-sm dark:text-gray-300">({percentage.toFixed(0)}%)</span>
          </span>
        </div>

        {/* Button row */}
        <div className="w-full md:w-auto md:flex-none mt-4 md:mt-0">
          <button
            onClick={() => {
              handleOpen();
              setShowDetailsModal(true);
            }}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm font-medium w-full sm:w-auto"
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
            <div className="detailed-results-content  dark:bg-black">
              {props.questions.map((question, index) => (
                <div
                  key={index}
                  className={`detailed-question ${
                    question.isCorrect
                      ? "correct light:bg-green-100 dark:bg-green-900/20"
                      : question.userAnswer === "Not answered"
                      ? "unanswered light:bg-yellow-100 dark:bg-yellow-700/20"
                      : "incorrect light:bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  <h3 className=" dark:text-gray-200">
                    Question {index + 1}: {question.questionText}
                  </h3>

                  <div className="all-options">
                    {question.options.map((option, optIndex) => {
                      const optionLabel = String.fromCharCode(65 + optIndex);
                      const isUserAnswer = option === question.userAnswer;
                      const isCorrectAnswer = option === question.correctAnswer;

                      return (
                        <div
                          key={optIndex}
                          className={`
                            option 
                             dark:bg-black 
                            light:text-black dark:text-gray-200 
                            ${isCorrectAnswer ? 'correct-option light:bg-green-100 light:border-green-500 dark:bg-green-800/30 dark:border-green-600' : ''}
                            ${isUserAnswer && !isCorrectAnswer ? 'wrong-selection light:bg-red-100 light:border-red-500 dark:bg-red-800/30 dark:border-red-600' : ''}
                          `}
                        >
                          <span className="option-label dark:bg-black">{optionLabel}.</span>{" "}
                          {option}
                          {isCorrectAnswer && !isUserAnswer && (
                            <span className="correct-indicator light:color-green">✓ Correct</span>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <span className="wrong-indicator light:color-red">
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

                  <div className="answer-feedback ">
                    {question.isCorrect ? (
                      <span className="feedback-correct  dark:text-green-400">
                        ✓ You answered correctly!
                      </span>
                    ) : question.userAnswer === "Not answered" ? (
                      <span className="feedback-unanswered dark:text-yellow-400">
                        ⚠ You didn't answer this question
                      </span>
                    ) : (
                      <span className="feedback-incorrect dark:text-red-400">
                        ✗ Your answer was incorrect. The correct answer was:{" "}
                        <strong className="dark:text-red">{question.correctAnswer}</strong>
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