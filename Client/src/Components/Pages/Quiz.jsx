import React, { useState, useEffect } from "react";

function Quiz() {
  const [config, setConfig] = useState({
    topic: "",
    difficulty: "easy",
    numQuestions: 5,
    timerType: "individual",
    timerDuration: 10, // Default timer duration in seconds for individual mode
  });
  const [showConfigModal, setShowConfigModal] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(config.timerDuration); // Individual timer in seconds
  const [totalTime, setTotalTime] = useState(config.timerDuration * config.numQuestions); // Global timer in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleConfigSubmit = () => {
    const mockQuestions = Array.from({ length: config.numQuestions }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: What is the answer?`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
    }));
    setQuestions(mockQuestions);
    setShowConfigModal(false);
    setQuizStarted(true);
    setTimer(config.timerDuration); // Set individual timer in seconds
    setTotalTime(
      config.timerType === "individual"
        ? config.timerDuration * config.numQuestions // Individual mode: total time in seconds
        : config.timerDuration * 60 // Collective mode: total time in seconds (minutes converted to seconds)
    );
  };

  const handleAnswerSelect = (answer) => {
    setSelectedOption(answer);
    setTimeout(() => {
      setUserAnswers([...userAnswers, answer]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (config.timerType === "individual") {
          setTimer(config.timerDuration); // Reset individual timer in seconds
        }
        setSelectedOption(null); // Reset selected option for the next question
      } else {
        finishQuiz();
      }
    }, 1500); // Delay to show the glow effect before moving to the next question
  };

  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const interval = setInterval(() => {
        if (config.timerType === "individual") {
          setTimer((prev) => prev - 1); // Decrease individual timer in seconds
        } else {
          setTotalTime((prev) => prev - 1); // Decrease global timer in seconds
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizStarted, quizFinished, config.timerType]);

  useEffect(() => {
    if (quizStarted && !quizFinished) {
      if (config.timerType === "individual" && timer === 0) {
        handleTimeUp();
      } else if (config.timerType === "collective" && totalTime === 0) {
        finishQuiz();
      }
    }
  }, [timer, totalTime, quizStarted, quizFinished, config.timerType]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(config.timerDuration); // Reset individual timer in seconds
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return userAnswers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;
  };

  // Helper function to format time in minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div style={styles.pageWrapper}>
      {showConfigModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Quiz Configuration</h2>
            <label style={styles.label}>
              Topic:
              <input
                type="text"
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Difficulty:
              <select
                value={config.difficulty}
                onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                style={styles.input}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label style={styles.label}>
              Number of Questions:
              <input
                type="number"
                value={config.numQuestions}
                onChange={(e) =>
                  setConfig({ ...config, numQuestions: parseInt(e.target.value) })
                }
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Timer Type:
              <select
                value={config.timerType}
                onChange={(e) => setConfig({ ...config, timerType: e.target.value })}
                style={styles.input}
              >
                <option value="individual">Individual</option>
                <option value="collective">Collective</option>
              </select>
            </label>
            <label style={styles.label}>
              Timer Duration ({config.timerType === "individual" ? "seconds" : "minutes"}):
              <input
                type="number"
                value={config.timerDuration}
                onChange={(e) =>
                  setConfig({ ...config, timerDuration: parseInt(e.target.value) })
                }
                style={styles.input}
              />
            </label>
            <button onClick={handleConfigSubmit} style={styles.button}>
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {quizStarted && !quizFinished && (
        <div style={styles.quizFullPage}>
          <h2 style={styles.questionTitle}>Question {currentQuestionIndex + 1}</h2>
          <p style={styles.questionText}>{questions[currentQuestionIndex]?.text}</p>
          <div style={styles.optionsContainer}>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                style={{
                  ...styles.optionButton,
                  ...(selectedOption === option ? styles.glow : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {config.timerType === "individual" ? (
            <p style={styles.timer}>Time Remaining: {timer} seconds</p>
          ) : (
            <p style={styles.timer}>Total Time Remaining: {formatTime(totalTime)}</p>
          )}
        </div>
      )}

      {quizFinished && (
        <div style={styles.quizFullPage}>
          <h2 style={styles.resultTitle}>Quiz Finished!</h2>
          <p style={styles.resultText}>
            Your Score: {calculateScore()} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f7fafc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "40px",
    position: "relative",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2d3748",
  },
  label: {
    display: "block",
    margin: "10px 0",
    fontSize: "16px",
    color: "#4a5568",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #e2e8f0",
    fontSize: "16px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4299e1",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  quizFullPage: {
    width: "100%",
    textAlign: "left",
  },
  questionTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2d3748",
  },
  questionText: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#4a5568",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionButton: {
    padding: "12px 24px",
    backgroundColor: "#edf2f7",
    border: "1px solid #e2e8f0",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textAlign: "left",
  },
  glow: {
    animation: "glow 1.5s infinite",
    borderColor: "#4299e1",
  },
  timer: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#e53e3e",
  },
  resultTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2d3748",
  },
  resultText: {
    fontSize: "20px",
    color: "#4a5568",
  },
};

export default Quiz;