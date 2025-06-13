import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  BarChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaChartPie,
  FaChartBar,
  FaTrophy,
  FaClock,
  FaRegChartBar,
  FaSignInAlt,
  FaUserPlus,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";
import ResultBox from "../../../assets/ResultBox/ResultBox";

function Results() {
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoggedIn(true);
        const resultsResponse = await fetch(`${URL}/results/GetUserResults`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!resultsResponse.ok) throw new Error("Failed to fetch results");
        const resultsData = await resultsResponse.json();
        setResults(resultsData);
        console.log(resultsData)
      } catch (err) {
        console.error("Error:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTopicsData = () => {
    const topicMap = {};

    results.forEach((result) => {
      if (!topicMap[result.topic]) {
        topicMap[result.topic] = 1;
      } else {
        topicMap[result.topic]++;
      }
    });

    return Object.keys(topicMap).map((topic) => ({
      name: topic,
      value: topicMap[topic],
      color: getRandomColor(),
    }));
  };

  const getAccuracyTrendData = () => {
    const sortedResults = [...results].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sortedResults.map((result) => ({
      date: formatDate(result.date),
      accuracy: (result.score / result.totalQuestions) * 100,
      score: result.score,
      total: result.totalQuestions,
    }));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const calculateStats = () => {
    if (results.length === 0) return null;

    const totalQuizzes = results.length;
    const totalCorrect = results.reduce((sum, result) => sum + result.score, 0);
    const totalQuestions = results.reduce(
      (sum, result) => sum + result.totalQuestions,
      0
    );
    const avgAccuracy = (totalCorrect / totalQuestions) * 100;
    const totalTime = results.reduce(
      (sum, result) => sum + result.timeTaken,
      0
    );
    const avgTime = totalTime / totalQuizzes;

    return {
      totalQuizzes,
      avgAccuracy: avgAccuracy.toFixed(1),
      avgTime: formatTime(avgTime),
      bestTopic: getBestTopic(),
      improvement: calculateImprovement(),
    };
  };

  const getBestTopic = () => {
    const topicStats = {};

    results.forEach((result) => {
      if (!topicStats[result.topic]) {
        topicStats[result.topic] = {
          totalScore: result.score,
          totalQuestions: result.totalQuestions,
          count: 1,
        };
      } else {
        topicStats[result.topic].totalScore += result.score;
        topicStats[result.topic].totalQuestions += result.totalQuestions;
        topicStats[result.topic].count++;
      }
    });

    let bestTopic = "";
    let highestAvg = 0;

    Object.keys(topicStats).forEach((topic) => {
      const avg =
        (topicStats[topic].totalScore / topicStats[topic].totalQuestions) * 100;
      if (avg > highestAvg) {
        highestAvg = avg;
        bestTopic = topic;
      }
    });

    return {
      name: bestTopic,
      accuracy: highestAvg.toFixed(1),
    };
  };

  const calculateImprovement = () => {
    if (results.length < 2) return "N/A";

    const sorted = [...results].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const segmentSize = Math.max(1, Math.floor(sorted.length * 0.2));
    const firstSegment = sorted.slice(0, segmentSize);
    const lastSegment = sorted.slice(-segmentSize);

    const firstAccuracy =
      (firstSegment.reduce(
        (sum, result) => sum + result.score / result.totalQuestions,
        0
      ) /
        firstSegment.length) *
      100;

    const lastAccuracy =
      (lastSegment.reduce(
        (sum, result) => sum + result.score / result.totalQuestions,
        0
      ) /
        lastSegment.length) *
      100;

    const improvement = lastAccuracy - firstAccuracy;

    return {
      value: Math.abs(improvement).toFixed(1),
      direction: improvement >= 0 ? "increase" : "decrease",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/90 max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            Loading your results...
          </h2>
          <p className="text-gray-600 mt-2">
            Crunching the numbers for your analytics
          </p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/90 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSignInAlt className="text-2xl text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Access Your Analytics
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to view your personalized quiz results and track your
            learning progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/Login")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FaSignInAlt /> Log In
            </button>
            <button
              onClick={() => navigate("/Register")}
              className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <FaUserPlus /> Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/90 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaRocket className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No Results Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't taken any quizzes yet. Start your learning journey now!
          </p>
          <button
            onClick={() => navigate("/Quiz")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <FaRocket /> Take First Quiz
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const topicsData = getTopicsData();
  const accuracyData = getAccuracyTrendData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-5 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-left">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
              Your Analytics
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500 mb-3"></div>
          </div>

          <p className="text-gray-600 max-w-2xl text-left">
            Track your progress, identify strengths, and discover areas to
            improve
          </p>
        </div>
        {/* Stats Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/90 p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaChartLine className="text-indigo-500" /> Performance Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<FaTrophy className="text-yellow-500" />}
              title="Total Quizzes"
              value={stats.totalQuizzes}
              color="bg-yellow-50"
            />
            <StatCard
              icon={<FaChartPie className="text-blue-500" />}
              title="Avg Accuracy"
              value={`${stats.avgAccuracy}%`}
              color="bg-blue-50"
            />
            <StatCard
              icon={<FaClock className="text-purple-500" />}
              title="Avg Time"
              value={stats.avgTime}
              color="bg-purple-50"
            />
            <StatCard
              icon={<FaTrophy className="text-green-500" />}
              title="Best Topic"
              value={`${stats.bestTopic.name}`}
              subValue={`${stats.bestTopic.accuracy}%`}
              color="bg-green-50"
            />
            <StatCard
              icon={
                <FaChartBar
                  className={
                    stats.improvement.direction === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
              }
              title="Improvement"
              value={
                stats.improvement === "N/A"
                  ? "N/A"
                  : `${stats.improvement.value}%`
              }
              trend={stats.improvement.direction}
              color={
                stats.improvement.direction === "increase"
                  ? "bg-green-50"
                  : "bg-red-50"
              }
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/90 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaChartPie className="text-indigo-500" /> Topics Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {topicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} quizzes`, "Count"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/90 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaChartBar className="text-indigo-500" /> Accuracy Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis
                    stroke="#666"
                    label={{
                      value: "Accuracy (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#666",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #eee",
                      borderRadius: "8px",
                      backdropFilter: "blur(4px)",
                    }}
                    formatter={(value) => [`${value}%`, "Accuracy"]}
                    labelFormatter={(date) => `Date: ${date}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/90 ">
          <h2 className="text-2xl font-semibold text-gray-900 ml-4 mt-4">
            Your Quiz History
          </h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <ResultBox
                key={result._id || index}
                score={result.score}
                total={result.totalQuestions}
                timeTaken={formatTime(result.timeTaken)}
                date={formatDate(result.date)}
                topic={result.topic}
                difficulty={result.difficulty}
                questions={result.questions} 
              />
            ))}
          </div>
          <div className="mt-6 ml-6">
            <div className="flex space-x-4 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">80% and above</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">79% to 50%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Below 50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ icon, title, value, subValue, trend, color }) {
  return (
    <div
      className={`${color} p-4 rounded-lg border border-white/70 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-white rounded-lg shadow-xs">{icon}</div>
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "increase" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Results;
