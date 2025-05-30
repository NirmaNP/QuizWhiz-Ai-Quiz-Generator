import { useEffect, useState } from "react";
import {  User,  Settings,  Trophy,  BarChart3,  Clock,  Mail,  Lock,  Eye,  EyeOff,  Camera,  Edit3,  Save,  X,} from "lucide-react";
import axios from "axios";
import SetAvatar from "./Avatars";

export default function Account() {
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    createdAt: "",
    avatarImageURL:""
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
          avatarImageURL:response.data.avatarImageURL
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
    computeQuizStats();
    getTopicStats();
  }, [results]);

  if (loading)
    return <div className="text-center">Loading quiz statistics...</div>;
  if (error)
    return <div className="text-center text-danger">Error: {error}</div>;

  const achievements = [
    { name: "Quiz Master", description: "Complete 100 quizzes", earned: true },
    {
      name: "Perfect Score",
      description: "Get 100% on any quiz",
      earned: false,
    },
    {
      name: "Speed Demon",
      description: "Complete quiz in under 2 minutes",
      earned: true,
    },
    { name: "Scholar", description: "Average score above 85%", earned: true },
    { name: "Consistent", description: "30-day streak", earned: false },
  ];

  const updateProfile = async (name, bio, selectedAvatarUrl) => {
    try {
      const response = await axios.put(
        `${URL}/user/updateuser`,
        { name, bio , selectedAvatarUrl},
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
    formData.avatarImageURL=url
    setShowAvatarModal(false);
    console.log("Selected avatar URL:", url);
    handleSave();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    updateProfile(formData.name, formData.bio, formData.avatarImageURL);
  };
  
  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white hover:bg-blue-400' 
          : 'text-gray-600 hover:bg-blue-400 bg-blue-300' 
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24  rounded-full flex items-center">
                <img src={formData.avatarImageURL} alt="Me" />
              </div>
              <button 
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => setShowAvatarModal(true)}>
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {formData.name}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Member since{" "}
                {new Date(formData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {quizStats.averageScore}%
              </div>
              <div className="text-sm text-gray-500">Average Score</div>
            </div>
          </div>
        </div>
        
        
        {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SetAvatar 
              onAvatarSelect={handleAvatarSelect}
              onClose={() => setShowAvatarModal(false)}
              currentAvatar={formData.avatarImageURL}
            />
          </div>
        </div>
      )}

        {/* Navigation Tabs */}
        <div className="flex mb-6 overflow-x-auto container justify-between">
          <TabButton id="profile" label="Profile" icon={User} />
          <TabButton id="stats" label="Statistics" icon={BarChart3} />
          <TabButton id="achievements" label="Achievements" icon={Trophy} />
          <TabButton id="settings" label="Settings" icon={Settings} />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === "profile" && (
            <div className="p-6">
              <div className="flex justify-between space-x-4 items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <p
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {formData.email}
                    </p>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 py-2">{formData.email}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{formData.bio}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Quiz Activity
                </h3>
                <div className="space-y-3">
                  {quizStats.recentQuizzes.map((quiz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {quiz.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {quiz.difficulty} • {quiz.date}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          quiz.score >= 90
                            ? "bg-green-100 text-green-800"
                            : quiz.score >= 80
                            ? "bg-blue-100 text-blue-800"
                            : quiz.score >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {quiz.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quiz Statistics
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {quizStats.totalQuizzes}
                  </div>
                  <div className="text-sm text-gray-600">Total Quizzes</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {quizStats.averageScore}%
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {quizStats.bestScore}%
                  </div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {quizStats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance by Category
                  </h3>
                  <div className="space-y-4">
                    {topicStats.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.topic}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.quizzes} quizzes taken
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {item.score}%
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Time Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="text-blue-600" size={20} />
                        <span className="text-gray-700">Total Time Spent</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {quizStats.timeSpent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="text-green-600" size={20} />
                        <span className="text-gray-700">Average per Quiz</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {quizStats.avgTimeSpent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Trophy className="text-purple-600" size={20} />
                        <span className="text-gray-700">
                          Fastest Completion
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {quizStats.fastestQuizTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Achievements & Badges
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-full ${
                          achievement.earned
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Trophy size={20} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            achievement.earned
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            achievement.earned
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="text-green-600 font-semibold text-sm">
                          Earned!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Progress to Next Achievement
                </h3>
                <p className="text-blue-700 mb-3">
                  Perfect Score - Get 100% on any quiz
                </p>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  85% - Your highest score so far is 98%
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Security
                  </h3>
                  <div className="ml-5 mr-5">
                    <div className="flex items-center justify-between space-x-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-base text-gray-900">Password</h4>
                      </div>
                      <button className="px-4  text-blue-600 bg-transparent border mb-4 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Change Password
                      </button>
                    </div>
                    <div className="flex items-center justify-between space-x-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-500">
                          Add extra security to your account
                        </p>
                      </div>
                      <button className="px-4 py-2 mb-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Quiz reminders",
                        description: "Get reminded to take daily quizzes",
                      },
                      {
                        label: "Score updates",
                        description:
                          "Notifications when you achieve new high scores",
                      },
                      {
                        label: "New quiz alerts",
                        description:
                          "Be notified when new quizzes are available",
                      },
                      {
                        label: "Achievement notifications",
                        description: "Get notified when you earn badges",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {item.label}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            defaultChecked={index < 2}
                          />
                          <div
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              index < 2 ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                index < 2 ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Privacy
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Profile Visibility
                        </h4>
                        <p className="text-sm text-gray-500">
                          Control who can see your profile
                        </p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Leaderboard Participation
                        </h4>
                        <p className="text-sm text-gray-500">
                          Show your scores on public leaderboards
                        </p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          defaultChecked
                        />
                        <div className="relative w-11 h-6 bg-blue-600 rounded-full transition-colors">
                          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-5" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Data Management
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium text-gray-900">
                        Export My Data
                      </h4>
                      <p className="text-sm text-gray-500">
                        Download all your quiz data and statistics
                      </p>
                    </button>
                    <button className="w-full text-left p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <h4 className="font-medium text-red-900">
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-600">
                        Permanently remove your account and all data
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
