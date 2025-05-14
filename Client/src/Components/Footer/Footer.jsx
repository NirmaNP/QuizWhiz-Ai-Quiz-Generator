import React from 'react';

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start b-0 bg-body-tertiary text-muted">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-brain me-3"></i>Quiz Whiz
                </h6>
                <p>
                  Test your knowledge with Quiz Whiz! Engage in exciting quizzes, challenge 
                  your friends, and sharpen your mind with a variety of topics.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Categories</h6>
                <p><a href="#!" className="text-reset">Science</a></p>
                <p><a href="#!" className="text-reset">Technology</a></p>
                <p><a href="#!" className="text-reset">History</a></p>
                <p><a href="#!" className="text-reset">General Knowledge</a></p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
                <p><a href="#!" className="text-reset">Leaderboard</a></p>
                <p><a href="#!" className="text-reset">How to Play</a></p>
                <p><a href="#!" className="text-reset">Terms & Conditions</a></p>
                <p><a href="#!" className="text-reset">Help & Support</a></p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-envelope me-3"></i> support@quizwhiz.com</p>
                <p><i className="fas fa-globe me-3"></i> www.quizwhiz.com</p>
                <p><i className="fas fa-phone me-3"></i> +91 98765 43210</p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © {new Date().getFullYear()} Quiz Whiz | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default Footer;
