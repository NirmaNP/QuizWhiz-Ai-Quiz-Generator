import { useState } from "react";
import { Edit3, Save, X } from "lucide-react";

export default function ProfileTab({ formData, setFormData, quizStats, updateProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateProfile(formData.name, formData.bio, formData.avatarImageURL);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between space-x-4 items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 py-2">{formData.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          {isEditing ? (
            <p className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quiz Activity</h3>
        <div className="space-y-3">
          {quizStats.recentQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{quiz.name}</h4>
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
  );
}