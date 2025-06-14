import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { useNavigate } from "react-router-dom";

export default function SettingsTab() {
  const notificationItems = [
    {
      label: "Quiz reminders",
      description: "Get reminded to take daily quizzes",
      enabled: true,
    },
    {
      label: "Score updates",
      description: "Notifications when you achieve new high scores",
      enabled: true,
    },
    {
      label: "New quiz alerts",
      description: "Be notified when new quizzes are available",
      enabled: false,
    },
    {
      label: "Achievement notifications",
      description: "Get notified when you earn badges",
      enabled: false,
    },
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl p-3 font-bold text-gray-900 dark:text-white">
        Account Settings
      </h2>

      <div className="space-y-8">
        <SecuritySection />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-3 mb-1">
            Notifications
          </h3>
          <div className="space-y-4">
            {notificationItems.map((item, index) => (
              <NotificationToggle
                key={index}
                label={item.label}
                description={item.description}
                enabled={item.enabled}
              />
            ))}
          </div>
        </div>

        <PrivacySection />

        <DataManagementSection />
      </div>
    </div>
  );
}

function SecuritySection() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  return (
    <div>
      <h3 className="text-lg font-semibold p-3 text-gray-900 dark:text-white mb-1">Security</h3>
      <div>
        <div className="flex mb-3 items-center shadow-md justify-between space-x-4 bg-gray-50 dark:bg-black/70 rounded-lg p-4">
          <div>
            <h4 className="font-medium text-base text-gray-900 dark:text-white">Password</h4>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>

          <ChangePasswordModal
            show={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
          />
        </div>
        <div className="flex items-center shadow-md justify-between space-x-4 bg-gray-50 dark:bg-black/70 rounded-lg p-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add extra security to your account
            </p>
          </div>
          <button className="px-4 py-2 mb-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ label, description, enabled: initialEnabled }) {
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/70 shadow-md rounded-lg">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <div
          className={`relative w-11 h-6 rounded-full transition-colors ${
            enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    </div>
  );
}

function PrivacySection() {
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(true);
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-3 mb-1">Privacy</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/70 shadow-md rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white ">Profile Visibility</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Control who can see your profile
            </p>
          </div>
          <select className="text-sm sm:text-base w-32 sm:w-auto px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-black/70 text-gray-900 dark:text-white">
            <option className="text-sm">Public</option>
            <option className="text-sm">Friends Only</option>
            <option className="text-sm">Private</option>
          </select>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/70 shadow-md  rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Leaderboard Participation</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Show your scores on public leaderboards
            </p>
          </div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={leaderboardEnabled}
              onChange={() => setLeaderboardEnabled(!leaderboardEnabled)}
            />
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                leaderboardEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  leaderboardEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function DataManagementSection() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleClearHistory = async () => {
    try {
      const response = await fetch("/api/results/ClearUserResults", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Your quiz result history has been cleared.");
      } else {
        alert("Failed to clear history: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("Error while clearing history:", error);
      alert("An error occurred while clearing your history.");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-3 mb-1">
        Data Management
      </h3>
      <div className="space-y-4">
        <button
          onClick={handleClearHistory}
          className="w-full text-left p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
        >
          <h4 className="font-medium text-gray-900 dark:text-white">Clear Result History</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Delete all your past quiz results and statistics
          </p>
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
        >
          <h4 className="font-medium text-yellow-900 dark:text-yellow-200">Logout</h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Sign out of your account and clear session
          </p>
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full text-left p-4 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
        >
          <h4 className="font-medium text-red-900 dark:text-red-200">Delete Account</h4>
          <p className="text-sm text-red-600 dark:text-red-300">
            Permanently remove your account and all data
          </p>
        </button>

        <DeleteAccountModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}
