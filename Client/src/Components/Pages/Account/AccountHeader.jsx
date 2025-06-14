import { Camera } from "lucide-react";

export default function AccountHeader({ formData, quizStats, onAvatarClick }) {
  return (
    <div className=" dark:bg-gray-800/50 rounded-lg shadow-md p-4 sm:p-6 mb-6 transition-colors">
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center">
            <img
              src={formData.avatarImageURL}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button
            className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={onAvatarClick}
          >
            <Camera size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* User Info Section */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            {formData.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
            Member since{" "}
            {new Date(formData.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex-shrink-0 text-right ml-auto pl-2 sm:pl-0">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {quizStats.averageScore}%
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Average Score
          </div>
        </div>
      </div>
    </div>
  );
}
