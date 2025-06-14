import { Clock, BarChart3, Trophy } from "lucide-react";

export default function StatsTab({ quizStats, topicStats }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quiz Statistics</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard value={quizStats.totalQuizzes} label="Total Quizzes" color="blue" />
        <StatCard value={`${quizStats.averageScore}%`} label="Average Score" color="green" />
        <StatCard value={`${quizStats.bestScore}%`} label="Best Score" color="purple" />
        <StatCard value={quizStats.currentStreak} label="Day Streak" color="orange" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance by Category</h3>
          <div className="space-y-4">
            {topicStats.length === 0 ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">No category performance data available</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Complete quizzes in different categories to see your performance breakdown
                </p>
              </div>
            ) : (
              topicStats.map((item, index) => (
                <TopicProgress key={index} topic={item.topic} quizzes={item.quizzes} score={item.score} />
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Time Statistics</h3>
          <div className="space-y-4">
            <TimeStatItem icon={Clock} iconColor="blue" label="Total Time Spent" value={quizStats.timeSpent} />
            <TimeStatItem icon={BarChart3} iconColor="green" label="Average per Quiz" value={quizStats.avgTimeSpent} />
            <TimeStatItem icon={Trophy} iconColor="purple" label="Fastest Completion" value={quizStats.fastestQuizTime} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
  };

  return (
    <div className={`p-6 rounded-lg ${colorClasses[color]}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

function TopicProgress({ topic, quizzes, score }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 shadow-md dark:bg-black/70">
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{topic}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{quizzes} quizzes taken</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900 dark:text-white">{score}%</div>
        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function TimeStatItem({ icon: Icon, iconColor, label, value }) {
  const iconColors = {
    blue: "text-blue-600 dark:text-blue-300",
    green: "text-green-600 dark:text-green-300",
    purple: "text-purple-600 dark:text-purple-300",
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-md bg-gray-50 dark:bg-black/70 rounded-lg">
      <div className="flex items-center space-x-3">
        <Icon className={iconColors[iconColor]} size={20} />
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
