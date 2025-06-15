import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./Quiz.css";

function Quiz() {
  const URL = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.GEMINI_API_KEY;
  const [config, setConfig] = useState({
    topic: "",
    difficulty: "easy",
    numQuestions: 5,
    timerType: "individual",
    timerDuration: 10,
  });

  const [showConfigModal, setShowConfigModal] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(config.timerDuration);
  const [totalTime, setTotalTime] = useState(
    config.timerDuration * config.numQuestions
  );
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [actualTimeTaken, setActualTimeTaken] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nextButtonRef = useRef(null);

  const progress = (currentQuestionIndex / questions.length) * 100;

  useEffect(() => {
    const savedTopic = localStorage.getItem("selectedTopic");
    const savedDifficulty = localStorage.getItem("selectedDifficulty");
    const savedNumQuestions = localStorage.getItem("numQuestions");

    if (savedTopic || savedDifficulty || savedNumQuestions) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        ...(savedTopic && { topic: savedTopic }),
        ...(savedDifficulty && { difficulty: savedDifficulty }),
        ...(savedNumQuestions && { numQuestions: parseInt(savedNumQuestions) }),
      }));
    }
  }, []);

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    setConfig((prevConfig) => ({ ...prevConfig, topic: newTopic }));
    localStorage.setItem("selectedTopic", newTopic);
  };

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    setConfig((prevConfig) => ({ ...prevConfig, difficulty: newDifficulty }));
    localStorage.setItem("selectedDifficulty", newDifficulty);
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value);
    setConfig((prevConfig) => ({
      ...prevConfig,
      numQuestions: newNumQuestions,
    }));
    localStorage.setItem("numQuestions", newNumQuestions.toString());
  };

  const handleCompletion = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (!apiKey) throw new Error("API Key is missing");

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate ${config.numQuestions} multiple-choice questions (MCQs) with difficulty level "${config.difficulty}" on the topic "${config.topic}". Return JSON only in the format:
                  [
                    {
                      "id": 1,
                      "text": "Question text?",
                      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                      "correctAnswer": "Option X"
                    },
                    ...
                  ]`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      rawText = rawText.replace(/```json|```/g, "").trim();

      let aiQuestions = [];
      try {
        aiQuestions = JSON.parse(rawText);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        throw new Error("Invalid AI-generated question format");
      }

      if (!Array.isArray(aiQuestions) || aiQuestions.length === 0) {
        throw new Error("Empty or invalid AI-generated questions");
      }

      setQuestions(aiQuestions);
      localStorage.setItem("quizQuestions", JSON.stringify(aiQuestions));
      setIsLoading(false);
      return aiQuestions;
    } catch (err) {
      console.error("Error in handleCompletion:", err.message);
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  const handleConfigSubmit = async () => {
    setError(null);
    setIsLoading(true);

    let parsedQuestions = [];
    const storedQuestions = localStorage.getItem("quizQuestions");

    try {
      const aiQuestions = await handleCompletion();

      if (aiQuestions && aiQuestions.length > 0) {
        parsedQuestions = aiQuestions;
      } else if (storedQuestions) {
        parsedQuestions = JSON.parse(storedQuestions);
      } else {
        parsedQuestions = Array.from(
          { length: config.numQuestions },
          (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1}: What is the answer?`,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 1",
          })
        );
      }

      setQuestions(parsedQuestions);
      setShowConfigModal(false);
      setQuizStarted(true);
      setTimer(config.timerDuration);
      setTotalTime(
        config.timerType === "individual"
          ? config.timerDuration * config.numQuestions
          : config.timerDuration * 60
      );
      setStartTime(new Date());
      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setQuizFinished(false);
    } catch (error) {
      console.error("Error parsing questions:", error);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = useCallback(
    async (answers) => {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      setActualTimeTaken(timeTaken);
      setQuizFinished(true);
      setQuizStarted(false);

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const finalScore = answers.filter(
          (answer, index) => answer === questions[index]?.correctAnswer
        ).length;

        // Create a detailed results object
        const detailedResults = {
          date: new Date().toISOString(),
          topic: config.topic,
          difficulty: config.difficulty,
          timeTaken: timeTaken,
          score: finalScore,
          totalQuestions: questions.length,
          questions: questions.map((question, index) => ({
            questionText: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            userAnswer: answers[index] || "Not answered",
            isCorrect: answers[index] === question.correctAnswer,
          })),
        };

        setQuizResults(detailedResults);

        const saveResponse = await axios.post(
          `${URL}/results/SaveQuizResults`,
          detailedResults,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        console.log("Results saved successfully:", saveResponse.data);
        console.log(detailedResults);
      } catch (error) {
        console.error("Error in finishQuiz:", error);
      }
    },
    [config, questions, startTime, URL]
  );

  const goToNextQuestion = useCallback(() => {
  if (isTransitioning) return;
  
  setIsTransitioning(true);
  setTimer(0); // Clear any existing timer
  
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => {
        if (prev >= questions.length - 1) return prev;
        return prev + 1;
      });
      if (config.timerType === "individual") {
        setTimer(config.timerDuration);
      }
      setSelectedOption(null);
    } else {
      finishQuiz(userAnswers);
    }
    setIsTransitioning(false);
  }, 500);
}, [currentQuestionIndex, questions.length, config.timerDuration, config.timerType, finishQuiz, userAnswers, isTransitioning]);


  const handleTimeUp = useCallback(() => {
  if (isTransitioning) return;
  
  setIsTransitioning(true);
  setTimer(0);
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => {
        // Ensure we don't go beyond the last question
        if (prev >= questions.length - 1) return prev;
        return prev + 1;
      });
      if (config.timerType === "individual") {
        setTimer(config.timerDuration);
      }
      setSelectedOption(null);
    } else {
      finishQuiz(userAnswers);
    }
    setIsTransitioning(false);
  }, 500);
}, [currentQuestionIndex, questions.length, config.timerDuration, finishQuiz, userAnswers, isTransitioning]);

  const handleAnswerSelect = (answer) => {
    if (isTransitioning) return;

    setSelectedOption(answer);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Enter" &&
        quizStarted &&
        !quizFinished &&
        !showConfigModal
      ) {
        goToNextQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextQuestion, quizStarted, quizFinished, showConfigModal]);

  useEffect(() => {
  let interval = null;
  
  if (quizStarted && !quizFinished && !isTransitioning) {
    interval = setInterval(() => {
      if (config.timerType === "individual") {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setTotalTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimeout(() => finishQuiz(userAnswers), 0); // Schedule for next tick
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
  }
  
  return () => {
    if (interval) clearInterval(interval);
  };
}, [quizStarted, quizFinished, config.timerType, isTransitioning, handleTimeUp, finishQuiz, userAnswers]);

  useEffect(() => {
    if (quizStarted && !quizFinished && !isTransitioning) {
      if (config.timerType === "individual" && timer === 0) {
        handleTimeUp();
      } else if (config.timerType === "collective" && totalTime === 0) {
        finishQuiz(userAnswers);
      }
    }
  }, [timer,totalTime,quizStarted,quizFinished,config.timerType,handleTimeUp,finishQuiz,userAnswers,isTransitioning,
  ]);

  const calculateScore = () => {
    return userAnswers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculatePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  const getFeedback = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  return (
        <div className="quiz-page-wrapper z-0 dark:bg-black dark:text-white ">
      {showConfigModal && (
          <div className="quiz-modal dark:border-gray-700 dark:bg-gray-950 shadow-lg">
            <span className="text-transparent bg-clip-text bg-gradient-to-r quiz-modal-title from-blue-500 to-indigo-600">
              Quiz Configuration
            </span>
            {error && <div className="quiz-error-message">{error}</div>}

            <label className="quiz-label dark:text-white">
              Topic:
              <input
                type="text"
                value={config.topic}
                onChange={handleTopicChange}
                className="quiz-input dark:bg-black/50 dark:text-white dark:placeholder-gray-300 "
                placeholder="Enter a topic for your quiz"
              />
            </label>
            <label className="quiz-label dark:text-white">
              Difficulty:
              <select
                value={config.difficulty}
                onChange={handleDifficultyChange}
                className="quiz-input dark:bg-black/50 dark:text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label className="quiz-label dark:text-white">
              Number of Questions:
              <input
                type="number"
                value={config.numQuestions}
                onChange={handleNumQuestionsChange}
                className="quiz-input dark:bg-black/50 dark:text-white"
              />
            </label>

            <label className="quiz-label dark:text-white">
              Timer Type:
              <select
                value={config.timerType}
                onChange={(e) => setConfig({ ...config, timerType: e.target.value })}
                className="quiz-input dark:bg-black/50 dark:text-white"
              >
                <option value="individual">Individual</option>
                <option value="collective">Collective</option>
              </select>
            </label>

            <label className="quiz-label dark:text-white">
              Timer Duration ({config.timerType === "individual" ? "seconds" : "minutes"}):
              <input
                type="number"
                value={config.timerDuration}
                onChange={(e) => setConfig({ ...config, timerDuration: parseInt(e.target.value) })}
                className="quiz-input dark:bg-black/50 dark:text-white"
              />
            </label>

            <button
              onClick={handleConfigSubmit}
              className="quiz-button dark:bg-green-500 dark:hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="quiz-spinner-container">
                  <div className="quiz-spinner"></div>
                  Generating Questions...
                </div>
              ) : (
                "Start Quiz"
              )}
            </button>

            {isLoading && (
              <div className="quiz-generating-message">
                Please wait while we generate your quiz questions...
              </div>
            )}
          </div>
      )}

      {quizStarted && !quizFinished && (
        <div className="quiz-container shadow-md dark:bg-white/5">
          <div className="quiz-progress-container">
            <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <h2 className="quiz-question-title">
            <span className="quiz-question-number">
              {currentQuestionIndex + 1}
            </span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>

          <p className="quiz-question-text dark:text-white">
            {questions[currentQuestionIndex]?.text}
          </p>

          <div className="quiz-options-container">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`quiz-option-button ${
                  selectedOption === option ? "quiz-option-selected" : ""
                } dark:bg-black dark:hover:bg-gray-600 dark:text-white`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            ref={nextButtonRef}
            onClick={goToNextQuestion}
            className="quiz-next-button dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>

          <p className="quiz-keyboard-hint dark:text-gray-400">
            Press Enter to go to the next question
          </p>

          {config.timerType === "individual" ? (
            <p className="quiz-timer dark:text-red-400">
              Time Remaining: {timer} seconds
            </p>
          ) : (
            <p className="quiz-timer dark:text-red-400">
              Total Time Remaining: {formatTime(totalTime)}
            </p>
          )}
        </div>
      )}

      {quizFinished && (
        <div className="quiz-results-container dark:bg-black dark:text-white">
          <div className="quiz-results-card dark:bg-white/5 dark:text-white">
            <h2 className="quiz-results-title">Quiz Results</h2>

            <div className="quiz-score-circle dark:bg-black dark:border-gray-600">
              <div className="quiz-score-inner dark:bg-black">
                <span className="quiz-score-value  dark:text-white">
                  {calculateScore()}/{questions.length}
                </span>
                <span className="quiz-score-percentage ">
                  {calculatePercentage()}%
                </span>
              </div>
            </div>

            <div className="quiz-feedback">{getFeedback()}</div>

            <div className="quiz-results-details dark:bg-white/5">
              <div className="quiz-result-item">
                <span className="quiz-result-label  dark:text-white">Topic:</span>
                <span className="quiz-result-value  dark:text-white">
                  {config.topic || "General"}
                </span>
              </div>

              <div className="quiz-result-item">
                <span className="quiz-result-label  dark:text-white">Difficulty:</span>
                <span className="quiz-result-value dark:text-white"  >{config.difficulty}</span>
              </div>

              <div className="quiz-result-item">
                <span className="quiz-result-label  dark:text-white">Time taken:</span>
                <span className="quiz-result-value  dark:text-white">
                  {actualTimeTaken.toFixed(2)} seconds
                </span>
              </div>
            </div>

            {!localStorage.getItem("token") && (
              <div className="quiz-not-logged-in-message  dark:bg-transparent">
                You're not logged in. These results won't be saved to your
                profile.
              </div>
            )}

            <button
              onClick={() => {
                setShowConfigModal(true);
                setQuizFinished(false);
              }}
              className="quiz-button quiz-new-button dark:bg-green-500 dark:hover:bg-green-600"
            >
              New Quiz
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default Quiz;
