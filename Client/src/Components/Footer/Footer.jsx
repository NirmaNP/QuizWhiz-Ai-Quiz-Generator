import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    localStorage.setItem("selectedTopic", category);
    navigate("/Quiz");
  };

  const toggleCategory = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const categories = [
    { name: "Science", topics: ["Physics", "Chemistry", "Biology"] },
    { name: "Technology", topics: ["Programming", "AI", "Web Dev"] },
    { name: "History", topics: ["World History", "Ancient Civilizations"] },
    { name: "General Knowledge", topics: ["Countries", "Current Affairs"] },
  ];

  return (
    <footer className="text-center text-lg-start bg-gray-100 text-gray-700 dark:bg-black/90 dark:text-gray-300">
      <section className="">
        <div className="container text-center text-md-start pt-5">
          <div className="row">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 dark:text-white">
                <i className="fas fa-brain me-3"></i>Quiz Whiz
              </h6>
              <p className="mb-0">
                Test your knowledge with Quiz Whiz! Engage in exciting quizzes
                and challenge yourself.
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 dark:text-white">
                Categories
              </h6>
              <div className="d-flex flex-column">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="position-relative"
                    onMouseEnter={() =>
                      window.innerWidth > 768 &&
                      setActiveCategory(category.name)
                    }
                    onMouseLeave={() =>
                      window.innerWidth > 768 && setActiveCategory(null)
                    }
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className="text-reset btn btn-link p-0 text-decoration-none text-start hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {category.name}
                      </button>
                      <button
                        className="btn btn-sm d-md-none text-gray-700 dark:text-gray-300"
                        onClick={() => toggleCategory(category.name)}
                        aria-expanded={expandedCategory === category.name}
                      >
                        {expandedCategory === category.name ? "−" : "+"}
                      </button>
                    </div>

                    {(activeCategory === category.name ||
                      expandedCategory === category.name) && (
                      <div
                        className="rounded-md p-2 border shadow-md bg-gray-100 dark:bg-gray-950 border-gray-300 dark:border-gray-200"
                        style={{
                          position:
                            window.innerWidth > 768 ? "absolute" : "static",
                          zIndex: 1000,
                          width: window.innerWidth > 768 ? "100%" : "auto",
                        }}
                      >
                        {category.topics.map((topic) => (
                          <div
                            key={topic}
                            className="rounded px-2 transition-colors hover:bg-gray-900/0"
                          >
                            <button
                              onClick={() => handleCategoryClick(topic)}
                              className="text-sm font-medium w-full text-left text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {topic}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 dark:text-white">
                Links
              </h6>
              <p>
                <a
                  href="#!"
                  className="text-reset hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Leaderboard
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset hover:text-blue-600 dark:hover:text-blue-400"
                >
                  How to Play
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Terms
                </a>
              </p>
              <p>
                <span
                  className="cursor-pointer text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => navigate("/help")}
                >
                  FAQ / Support
                </span>
              </p>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
              <h6 className="text-uppercase fw-bold mb-4 dark:text-white">
                Contact
              </h6>
              <p className="mb-1">
                <i className="fas fa-envelope me-2 block"></i>
                support@quizwhiz.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center px-10 py-4 sm:p-3 bg-gray-200 dark:bg-black/50">
        <p className="mb-1">
          Created and maintained by{" "}
          <a
            href="https://github.com/princypandya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Princy Pandya
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Nikhil-9876"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Nikhil Solanki
          </a>
        </p>
        <span className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Quiz Whiz
        </span>
      </div>
    </footer>
  );
}

export default Footer;
