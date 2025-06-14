import { useEffect, useState } from "react";
import axios from "axios";
import AccountHeader from "./AccountHeader";
import ProfileTab from "./ProfileTab";
import StatsTab from "./StatsTab";
// import AchievementsTab from "./AchievementsTab";
import SettingsTab from "./SettingsTab";
import AvatarModal from "./AvatarModal";
import { User, Settings, Trophy, BarChart3 } from "lucide-react";

export default function Account() {
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    createdAt: "",
    avatarImageURL: "",
  });

  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    currentStreak: 0,
    timeSpent: "0h 0m",
    avgTimeSpent: "0h 0m",
    fastestQuizTime: "0h 0m",
    recentQuizzes: [],
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    // { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const [topicStats, setTopicStats] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${URL}/user/getuser`, null, {
          headers: {
            "auth-token": token,
          },
        });
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          bio:
            response.data.bio ||
            "Passionate learner who enjoys challenging quizzes!",
          createdAt: response.data.createdAt,
          avatarImageURL: response.data.avatarImageURL,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
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
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchUserData();
    fetchData();
  }, []);

  useEffect(() => {
    const computeQuizStats = () => {
      const totalQuizzes = results.length;
      const totalScore = results.reduce(
        (sum, r) => sum + (r.score / r.totalQuestions) * 100,
        0
      );
      const averageScore = parseFloat((totalScore / totalQuizzes).toFixed(1));
      const bestScore = Math.max(
        ...results.map((r) => (r.score / r.totalQuestions) * 100)
      );

      let currentStreak = 0;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      for (let i = 0; i < results.length; i++) {
        const quizDate = new Date(results[i].date);
        const quizDay = new Date(
          quizDate.getFullYear(),
          quizDate.getMonth(),
          quizDate.getDate()
        );
        const diffDays = Math.floor((today - quizDay) / (1000 * 60 * 60 * 24));
        if (diffDays === i) {
          currentStreak++;
        } else {
          break;
        }
      }

      const totalSeconds = results.reduce((sum, r) => sum + r.timeTaken, 0);
      const timeSpent = formatTime(totalSeconds);

      const fastestQuizSeconds = Math.min(...results.map((r) => r.timeTaken));
      const fastestQuizTime = formatTime(fastestQuizSeconds);

      const avgTimeSeconds = totalSeconds / totalQuizzes;
      const avgTimeSpent = formatTime(avgTimeSeconds);

      const recentQuizzes = results.slice(0, 5).map((r) => ({
        name: r.topic,
        score: (r.score / r.totalQuestions) * 100,
        date: new Date(r.date).toISOString().split("T")[0],
        difficulty: r.difficulty,
        timeTaken: r.timeTaken,
      }));

      setQuizStats({
        totalQuizzes,
        averageScore,
        bestScore,
        currentStreak,
        timeSpent,
        fastestQuizTime,
        avgTimeSpent,
        recentQuizzes,
      });
    };

    const formatTime = (totalSeconds) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = Math.floor(totalSeconds % 60);
      return `${h}h ${m}m ${s}s`;
    };

    const getTopicStats = () => {
      const statsMap = {};

      results.forEach((result) => {
        const topic = result.topic || "General";
        if (!statsMap[topic]) {
          statsMap[topic] = {
            count: 0,
            totalScore: 0,
            totalQuestions: 0,
          };
        }

        statsMap[topic].count += 1;
        statsMap[topic].totalScore += result.score;
        statsMap[topic].totalQuestions += result.totalQuestions;
      });

      const computedStats = Object.entries(statsMap)
        .map(([topic, stats]) => ({
          topic,
          quizzes: stats.count,
          score: Math.round((stats.totalScore / stats.totalQuestions) * 100),
        }))
        .sort((a, b) => b.quizzes - a.quizzes);

      setTopicStats(computedStats);
    };

    if (results.length > 0) {
      computeQuizStats();
      getTopicStats();
    }
  }, [results]);

  const updateProfile = async (name, bio, selectedAvatarUrl) => {
    try {
      const response = await axios.put(
        `${URL}/user/updateuser`,
        { name, bio, selectedAvatarUrl },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      return response.data.user;
    } catch (err) {
      console.error("Update failed:", err.response?.data?.error);
      throw err;
    }
  };

  const handleAvatarSelect = (url) => {
    setFormData((prev) => ({ ...prev, avatarImageURL: url }));
    setShowAvatarModal(false);
    updateProfile(formData.name, formData.bio, url);
    window.location.href = "/account";
  };

  if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black text-gray-700 dark:text-gray-300">
      Loading quiz statistics...
    </div>
  );if (error)
    return <div className="text-center text-red-600 dark:text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
      <div className="max-w-6xl pt-4 mx-auto">
        <AccountHeader
          formData={formData}
          quizStats={quizStats}
          onAvatarClick={() => setShowAvatarModal(true)}
        />

        {showAvatarModal && (
          <AvatarModal
            currentAvatar={formData.avatarImageURL}
            onAvatarSelect={handleAvatarSelect}
            onClose={() => setShowAvatarModal(false)}
          />
        )}

        <div className="flex mb-6 overflow-x-auto container px-2 sm:px-0">
          <div className="flex space-x-2 min-w-full sm:min-w-0 sm:justify-evenly">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 sm:px-4 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 dark:text-gray-300 bg-gray-800/50 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2 text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className=" dark:bg-gray-800/50 rounded-lg shadow-md transition-colors">
          {activeTab === "profile" && (
            <ProfileTab
              formData={formData}
              setFormData={setFormData}
              quizStats={quizStats}
              updateProfile={updateProfile}
            />
          )}

          {activeTab === "stats" && (
            <StatsTab quizStats={quizStats} topicStats={topicStats} />
          )}

          {/* {activeTab === "achievements" && <AchievementsTab />} */}

          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
