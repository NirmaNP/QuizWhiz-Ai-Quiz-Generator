import { Trophy } from "lucide-react";

export default function AchievementsTab() {
  const achievements = [
    { name: "Quiz Master", description: "Complete 100 quizzes", earned: true },
    { name: "Perfect Score", description: "Get 100% on any quiz", earned: false },
    { name: "Speed Demon", description: "Complete quiz in under 2 minutes", earned: true },
    { name: "Scholar", description: "Average score above 85%", earned: true },
    { name: "Consistent", description: "30-day streak", earned: false },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Progress to Next Achievement</h3>
        <p className="text-blue-700 mb-3">Perfect Score - Get 100% on any quiz</p>
        <div className="w-full bg-blue-200 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full" style={{ width: "85%" }} />
        </div>
        <p className="text-sm text-blue-600 mt-2">85% - Your highest score so far is 98%</p>
      </div>
    </div>
  );
}

function AchievementCard({ achievement }) {
  return (
    <div
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
              achievement.earned ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {achievement.name}
          </h3>
          <p
            className={`text-sm ${
              achievement.earned ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {achievement.description}
          </p>
        </div>
        {achievement.earned && (
          <div className="text-green-600 font-semibold text-sm">Earned!</div>
        )}
      </div>
    </div>
  );
}