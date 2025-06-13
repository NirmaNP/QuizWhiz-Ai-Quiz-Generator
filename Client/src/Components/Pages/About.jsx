import {
  FaBrain,
  FaClock,
  FaChartLine,
  FaUserGraduate,
  FaBookOpen,
  FaLightbulb,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-44 h-44 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      {/* Hero Section */}
      <div className="relative z-10 w-full px-4 py-16 md:py-12 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Subheading with underline and hover dot */}
          <div className="mb-8 flex justify-center">
            <div className="group relative inline-block">
              <p className="text-base font-medium text-gray-600 flex items-center gap-2">
                <span className="relative">
                  Our Origin Story
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-500"></span>
                </span>
              </p>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-snug md:leading-tight mb-6">
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Smarter
            </span>{" "}
            Learning Experiences
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mx-auto w-full max-w-2xl">
            QuizWhiz was born from a simple idea: learning should adapt to you—
            not the other way around. We combine artificial intelligence with
            engaging design to make knowledge acquisition effortless and
            enjoyable.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaLightbulb className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-blue-100 mb-6">
                To make learning accessible, engaging, and effective for
                everyone - from students preparing for exams to lifelong
                learners exploring new topics.
              </p>
              <p className="text-blue-100">
                We believe education shouldn't be one-size-fits-all. That's why
                we built QuizWhiz to adapt to your unique learning style and
                pace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-20 bg-white/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              How QuizWhiz Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting started is simple and effective
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 h-full w-0.5 bg-gradient-to-b from-blue-500 to-indigo-600 top-0 md:left-1/2 md:-ml-0.5"></div>

              {/* Timeline items */}
              <div className="space-y-8">
                {[
                  {
                    icon: <FaBookOpen className="text-xl text-white" />,
                    title: "Choose Your Topic",
                    description:
                      "Select from hundreds of topics or enter your own custom subject",
                    bg: "bg-blue-500",
                  },
                  {
                    icon: <FaUserGraduate className="text-xl text-white" />,
                    title: "Set Difficulty",
                    description:
                      "Pick your challenge level or let our AI adapt to your skill",
                    bg: "bg-purple-500",
                  },
                  {
                    icon: <FaChartLine className="text-xl text-white" />,
                    title: "Track Progress",
                    description:
                      "See detailed analytics on your performance and growth",
                    bg: "bg-indigo-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-16 md:pl-0 md:flex md:odd:flex-row-reverse"
                  >
                    <div className="md:w-1/2 md:px-8">
                      <div
                        className={`${item.bg} w-10 h-10 rounded-full flex items-center justify-center absolute left-0 top-0 md:left-1/2 md:-ml-5`}
                      >
                        {item.icon}
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/90">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Meet The Creator
            </h2>
            <p className="text-xl text-gray-600">The mind behind QuizWhiz</p>
          </div>

          <div className="flex justify-evenly">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/90 max-w-md w-full">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                  alt="Creator"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nikhil Solanki
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  Founder & Developer
                </p>
                <p className="text-gray-600 text-center mb-6">
                  A passionate developer and lifelong learner who built QuizWhiz
                  to make education more engaging and effective.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Nikhil-9876"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nikhil-solanki-7817192a5/"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/90 max-w-md w-full">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                  alt="Creator"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Princy Pandya
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  Founder & Developer
                </p>
                <p className="text-gray-600 text-center mb-6">
                  A passionate developer and lifelong learner who built QuizWhiz
                  to make education more engaging and effective.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/princypandya"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/princy-pandya-691430291/"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 py-20 bg-white/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Technology
            </h2>
            <p className="text-xl text-gray-600">
              Built with modern tools for the best experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { name: "React", color: "text-blue-500" },
              { name: "Tailwind CSS", color: "text-cyan-500" },
              { name: "Node.js", color: "text-green-500" },
              { name: "MongoDB", color: "text-emerald-500" },
              { name: "GeminiAI API", color: "text-purple-500" },
              { name: "Render", color: "text-orange-500" },
              { name: "Next.js", color: "text-red-400" },
              { name: "Framer Motion", color: "text-pink-500" },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-white/90 text-center"
              >
                <span className={`font-medium ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are mastering new topics with
              QuizWhiz.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              Try QuizWhiz Now
            </a>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
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

export default About;
