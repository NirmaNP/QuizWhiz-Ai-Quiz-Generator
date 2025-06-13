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
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-brain me-3"></i>Quiz Whiz
              </h6>
              <p className="mb-0">
                Test your knowledge with Quiz Whiz! Engage in exciting quizzes
                and challenge yourself.
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Categories</h6>
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
                        className="text-reset btn btn-link p-0 text-decoration-none text-start"
                      >
                        {category.name}
                      </button>
                      <button
                        className="btn btn-sm d-md-none"
                        onClick={() => toggleCategory(category.name)}
                        aria-expanded={expandedCategory === category.name}
                      >
                        {expandedCategory === category.name ? "−" : "+"}
                      </button>
                    </div>

                    {(activeCategory === category.name ||
                      expandedCategory === category.name) && (
                      <div
                        className="bg-gray-100 rounded-md p-2 border border-gray-200 shadow-xs"
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
                            className="hover:bg-gray-50 rounded px-2 transition-colors"
                          >
                            <button
                              onClick={() => handleCategoryClick(topic)}
                              className="text-gray-700 hover:text-blue-600 text-sm font-medium w-full text-left"
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
              <h6 className="text-uppercase fw-bold mb-4">Links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Leaderboard
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  How to Play
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Terms
                </a>
              </p>
              <p>
                <span
                  className="text-reset cursor-pointer"
                  onClick={() => navigate("/help")}
                >
                  FAQ / Support
                </span>
              </p>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p className="mb-1">
                <i className="fas fa-envelope me-2 block"></i>
                support@quizwhiz.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center px-10 py-4 sm:p-3 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <p className="mb-1">
          Created and maintained by{" "}
          <a
            href="https://github.com/princypandya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Princy Pandya
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Nikhil-9876"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Nikhil Solanki
          </a>
        </p>
        © {new Date().getFullYear()} Quiz Whiz
      </div>
    </footer>
  );
}

export default Footer;
