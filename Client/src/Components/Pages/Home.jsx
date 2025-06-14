import { React, useState, useEffect } from "react";
import {
  FaBrain,
  FaClock,
  FaChartLine,
  FaArrowRight,
  FaRegLightbulb,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    topic: "",
    difficulty: "",
    numQuestions: 10,
  });

  useEffect(() => {
    const storedTopic = localStorage.getItem("selectedTopic");
    const storedDifficulty = localStorage.getItem("selectedDifficulty");
    const storedNumQuestions = localStorage.getItem("numQuestions");

    setConfig((prevConfig) => ({
      ...prevConfig,
      topic: storedTopic || prevConfig.topic,
      difficulty: storedDifficulty || prevConfig.difficulty,
      numQuestions: storedNumQuestions
        ? parseInt(storedNumQuestions)
        : prevConfig.numQuestions,
    }));
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    localStorage.setItem("selectedTopic", topic);
    navigate("/Quiz");
  };

  const handleGenerateClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className=" bg-white dark:bg-black transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="relative z-10 dark:bg-black w-full px-4 py-8 sm:pl-20 md:py-24 text-center backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 mb-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-full border border-white/50 dark:border-gray-700 shadow-sm">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
              <IoMdRocket className="text-lg" /> The smart way to learn
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
            Learn Smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              QuizWhiz
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered quizzes tailored to your interests. Challenge yourself,
            track progress, and make learning fun!
          </p>

          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex w-full max-w-2xl group transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02] rounded-xl shadow-lg bg-white/50 dark:bg-slate-950 backdrop-blur-md border border-white/70 dark:border-gray-700 overflow-hidden">
              <input
                type="text"
                value={config.selectedTopic}
                onChange={(e) =>
                  setConfig({ ...config, selectedTopic: e.target.value })
                }
                placeholder="What do you want to learn today?"
                className="flex-grow px-6 py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              <button
                className="hidden sm:flex px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold items-center gap-2 transition-all hover:from-blue-600 hover:to-indigo-700"
                onClick={handleGenerateClick}
              >
                Start Quiz <FaArrowRight />
              </button>
            </div>
            <button
              className="mt-2 sm:hidden px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all hover:from-blue-600 hover:to-indigo-700"
              onClick={handleGenerateClick}
            >
              Start Quiz <FaArrowRight />
            </button>

            <div className="mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-3">Popular topics:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "Math Basics",
                  "World History",
                  "Physics Principles",
                  "Computer Science",
                  "Music Genres",
                  "Countries & Capitals",
                  "Biology Facts",
                  "Chemistry Elements",
                  "Literary Classics",
                  "Programming Fundamentals",
                  "English Grammar",
                  "Psychology 101",
                  "Space Exploration",
                  "Business Studies",
                  "Human Anatomy",
                  "Languages & Cultures",
                  "Current Affairs",
                  "Environmental Science",
                ].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setConfig({ ...config, selectedTopic: topic });
                      handleTopicClick(topic);
                    }}
                    className="px-4 py-2 bg-white/70 dark:bg-slate-950 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-black/90 dark:border-gray-900 shadow-sm hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all duration-200 text-sm backdrop-blur-sm hover:scale-105"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 dark:bg-black backdrop-blur-lg py-10 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why QuizWhiz Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Science-backed learning techniques built into every quiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <FaBrain className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Active Recall
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Quizzes force your brain to actively retrieve information,
                strengthening memory retention more effectively than passive
                review.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <em>Roediger & Butler (2011)</em>
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80 dark:border-gray-700">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <FaClock className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Spaced Repetition
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our system schedules reviews at optimal intervals to reinforce
                learning and combat the forgetting curve.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <em>Cepeda et al. (2008)</em>
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80 dark:border-gray-700">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <FaChartLine className="text-3xl text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Instant Feedback
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Immediate explanations help correct misunderstandings and
                solidify correct knowledge.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <em>Butler & Roediger (2008)</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 py-10 sm:py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Makes QuizWhiz Special
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              More than just another quiz app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-lg border border-white/80 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FaRegLightbulb className="text-xl text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    AI-Powered Questions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our advanced AI generates fresh, relevant questions tailored
                    to your knowledge level and interests.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-lg border border-white/80 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Adaptive Learning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The system adjusts question difficulty based on your
                    performance for optimal challenge.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-lg border border-white/80 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Progress Tracking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Detailed analytics show your improvement over time across
                    all topics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-lg border border-white/80 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-cyan-600 dark:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Secure & Private
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your data stays yours. We don't sell or share your learning
                    history with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 dark:bg-black py-10 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands who are learning smarter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/90 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="Sarah"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Medical Student</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "QuizWhiz has been a game-changer for my medical school studies.
                The spaced repetition algorithm helps me retain complex
                information much better than traditional flashcards."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/90 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="Michael"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Michael Chen</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "As a developer, I use QuizWhiz to stay sharp on algorithms and
                new technologies. The AI generates surprisingly relevant
                questions that actually help me prepare for interviews."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are mastering new topics faster
              with QuizWhiz.
            </p>
            <button
              onClick={handleGenerateClick}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-300 flex items-center mx-auto"
            >
              Start Learning Now <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Home;