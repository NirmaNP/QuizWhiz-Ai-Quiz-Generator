import { useState } from "react";
import { Edit3, Save, X } from "lucide-react";

export default function ProfileTab({
  formData,
  setFormData,
  quizStats,
  updateProfile,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateProfile(formData.name, formData.bio, formData.avatarImageURL);
    window.location.href = "/account";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between space-x-4 items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Full Name Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-1 py-1.5 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 dark:text-white py-1.5 px-1 min-h-[2.25rem] flex items-center">
              {formData.name || (
                <span className="text-gray-400 dark:text-gray-500">Not provided</span>
              )}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          {isEditing ? (
            <div className="w-full px-1 py-1.5 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-700 dark:text-white">
              {formData.email}
            </div>
          ) : (
            <div className="flex items-center gap-2 py-1.5 px-1 min-h-[2.25rem]">
              <p className="text-gray-900 dark:text-white">{formData.email}</p>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                Verified
              </span>
            </div>
          )}
        </div>

        {/* Bio Field */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
          </label>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows="1"
              className="w-full px-1 py-1.5 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 dark:text-white py-1.5 px-1 whitespace-pre-line min-h-[1rem] flex items-start">
              {formData.bio || (
                <span className="text-gray-400 dark:text-gray-500">No bio added</span>
              )}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 pt-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors w-full sm:w-auto"
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Quiz Activity
        </h3>
        <div className="space-y-3">
          {quizStats.recentQuizzes.length === 0 ? (
            <div className="p-4 bg-gray-50 dark:bg-black/70 rounded-lg text-center">
              <p className="text-gray-500 dark:text-gray-400">No recent quiz activity found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Take a quiz to see your results here
              </p>
            </div>
          ) : (
            quizStats.recentQuizzes.slice(0, 5).map((quiz, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 shadow-md dark:bg-black/80 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{quiz.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {quiz.difficulty} • {quiz.date}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    quiz.score >= 90
                      ? "bg-green-900/20 text-green-800"
                      : quiz.score >= 80
                      ? "bg-blue-900/20 text-blue-800"
                      : quiz.score >= 70
                      ? "bg-yellow-900/20 text-yellow-800"
                      : "bg-red-900/20 text-red-800"
                  }`}
                >
                  {quiz.score}%
                </div>
              </div>
            ))
          )}
        </div>
        {quizStats.recentQuizzes.length > 5 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Showing 5 most recent quizzes out of {quizStats.recentQuizzes.length}
          </p>
        )}
      </div>
    </div>
  );
}
