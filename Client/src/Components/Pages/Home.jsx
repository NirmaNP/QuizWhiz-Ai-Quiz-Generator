import { React, useState, useEffect } from "react";
import { FaBrain, FaClock, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FAQ from "./FAQ";

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
    

    if (!config.selectedTopic.trim()) {
      alert("Please enter a quiz topic before generating.");
      return;
    }
    handleTopicClick(config.selectedTopic);
  };

  const faqs = [
      {
        question: "How are quiz questions generated?",
        answer:
          "Our AI creates unique questions based on your selected topic using verified sources.",
      },
      {
        question: "Can I save my quiz progress?",
        answer: "Yes! Your progress is automatically saved between sessions.",
      },
      {
        question: "Are there difficulty levels?",
        answer:
          "Currently we adapt difficulty automatically based on your performance.",
      },
    ];

  return (
    <div className="bg-blue-50">
      {/* Page 1: Existing Content */}
      <div className="container mx-auto bg-opacity-10 backdrop-blur-lg rounded-2xl p-10 max-w-8xl text-center font-roboto">
        {/* Heading Section */}
        <h1 className="text-6xl font-extrabold mb-6 text-black">
          Welcome to <span className="text-blue-400">QuizWhiz!</span>
        </h1>
        <p className="text-2xl text-black/90 mb-4">
          Your AI-powered quiz companion 🎯
        </p>

        <div className="space-y-6">
          <p className="text-lg text-black/80 leading-relaxed">
            At <strong className="font-semibold text-blue-600">QuizWhiz</strong>
            , we believe learning should be exciting, engaging, and effortless.
            Our smart AI generates unique quizzes every time you click "Start,"
            designed to challenge you and sharpen your knowledge across diverse
            topics. Whether you're here to boost your grades, prepare for
            competitive exams, or just have some fun while learning something
            new.
          </p>
          <p className="text-lg text-black/80 leading-relaxed">
            Dive into subjects you love or explore something unexpected! From
            Science and Tech to History and Literature, there’s always a quiz
            waiting to keep your brain active and entertained.
          </p>
        </div>

        <p className="text-blue-500 font-medium mt-6">
          Ready to test yourself? Let’s make learning an adventure!
        </p>
        <br />
        <div className="flex items-center justify-center mt-6 flex-col">
          <div className="flex w-full max-w-5xl group transition-all duration-300 hover:scale-105 focus-within:scale-105 rounded-full ring-2 ring-blue-400 ring-opacity-20 focus-within:ring-0 focus-within:shadow-[0_0_10px_2px_rgba(79,109,255,0.3),0_0_20px_5px_rgba(79,109,255,0.2),0_0_30px_10px_rgba(79,109,255,0.1)]">
            <input
              type="text"
              value={config.selectedTopic}
              onChange={(e) =>
                setConfig({ ...config, selectedTopic: e.target.value })
              }
              placeholder="Enter your quiz topic..."
              className="flex-grow px-6 py-3 rounded-l-full border border-blue-200 bg-white/20 text-black placeholder-black/90 backdrop-blur-md focus:outline-none transition-colors duration-300 group-hover:bg-white/30 focus:bg-white/30 focus:shadow-[0_0_10px_2px_rgba(79,109,255,0.3),0_0_20px_5px_rgba(79,109,255,0.2),0_0_30px_10px_rgba(79,109,255,0.1)]"
            />
            <button
              className="px-8 py-3 bg-blue-400 text-black font-semibold rounded-r-full shadow-md border border-blue-400 transition-colors duration-300 group-hover:bg-blue-500 focus:bg-blue-500"
              onClick={handleGenerateClick}
            >
              Generate
            </button>
          </div>
          <br />

          <p className="mt-4 text-black/80 text-sm">
            Try one of these popular topics:
          </p>

          <div className="mt-4 flex flex-wrap gap-3 justify-center">
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
                onClick={() => handleTopicClick(topic)}
                className="px-5 py-2.5 bg-white/10 text-black font-medium rounded-full border border-blue-300 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover:border-blue-400 transition-all duration-300 text-sm backdrop-blur-md"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-16 p-10 max-w-8xl text-center font-roboto">
        <h2 className="text-4xl font-bold mb-8 text-black">
          Why Quizzes Are Effective
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <FaBrain className="text-6xl text-blue-600" /> {/* Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Active Recall
            </h3>
            <p className="text-lg text-black/80 mb-6">
              Quizzes force your brain to actively retrieve information,
              strengthening memory retention. Research shows that active recall
              is one of the most effective ways to learn.
            </p>
            <p className="mt-4 text-sm text-black/60">
              Source: <em>Roediger & Butler (2011)</em>
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <FaClock className="text-6xl text-blue-600" /> {/* Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Spaced Repetition
            </h3>
            <p className="text-lg text-black/80 mb-6">
              Regularly taking quizzes helps reinforce learning over time.
              Spaced repetition is proven to improve long-term retention of
              knowledge.
            </p>
            <p className="mt-4 text-sm text-black/60">
              Source: <em>Cepeda et al. (2008)</em>
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <FaChartLine className="text-6xl text-blue-600" /> {/* Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Immediate Feedback
            </h3>
            <p className="text-lg text-black/80 mb-6">
              Quizzes provide instant feedback, helping you identify gaps in
              your knowledge and focus on areas that need improvement.
            </p>
            <p className="mt-4 text-sm text-black/60">
              Source: <em>Butler & Roediger (2008)</em>
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold mt-16 mb-8 text-black">
          Why Choose QuizWhiz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              AI-Powered Quizzes
            </h3>
            <p className="text-lg text-black/80">
              Our advanced AI generates unique quizzes tailored to your
              interests and skill level, ensuring a fresh and engaging
              experience every time.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Diverse Topics
            </h3>
            <p className="text-lg text-black/80">
              Explore a wide range of subjects, from Science and History to Pop
              Culture and Literature. There's something for everyone!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Track Your Progress
            </h3>
            <p className="text-lg text-black/80">
              Monitor your performance over time and see how much you've
              improved with detailed analytics and insights.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold mt-16 mb-8 text-black">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center space-y-4">
            <img
              src="https://th.bing.com/th/id/OIP.JnxswwUcoUAqsk_fXEBwRgHaHa?rs=1&pid=ImgDetMain"
              alt="Sarah's photo"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/70 shadow-sm"
            />
            <p className="text-lg text-black/80 italic">
              "QuizWhiz has completely changed the way I learn. The quizzes are
              fun, challenging, and always keep me engaged!"
            </p>
            <p className="text-black/90 font-semibold">
              — Sarah, College Student
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center space-y-4">
            <img
              alt="John's photo"
              src="https://img.freepik.com/premium-photo/student-photo_403587-292.jpg"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/70 shadow-sm"
            />
            <p className="text-lg text-black/80 italic">
              "I love how easy it is to explore new topics. QuizWhiz makes
              learning feel like a game!"
            </p>
            <p className="text-black/90 font-semibold">
              — John, Lifelong Learner
            </p>
          </div>
        </div>

        <Link
          to=""
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-block m-4 bg-blue-400 text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-500 hover:scale-105 transition-transform"
        >
          Start Your First Quiz
        </Link>
      </div>
    </div>

  );
}

export default Home;
