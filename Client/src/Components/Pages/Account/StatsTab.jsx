import { Clock, BarChart3, Trophy } from "lucide-react";

export default function StatsTab({ quizStats, topicStats }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Statistics</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard value={quizStats.totalQuizzes} label="Total Quizzes" color="blue" />
        <StatCard value={`${quizStats.averageScore}%`} label="Average Score" color="green" />
        <StatCard value={`${quizStats.bestScore}%`} label="Best Score" color="purple" />
        <StatCard value={quizStats.currentStreak} label="Day Streak" color="orange" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
          <div className="space-y-4">
            {topicStats.map((item, index) => (
              <TopicProgress 
                key={index}
                topic={item.topic}
                quizzes={item.quizzes}
                score={item.score}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Statistics</h3>
          <div className="space-y-4">
            <TimeStatItem 
              icon={Clock}
              iconColor="blue"
              label="Total Time Spent"
              value={quizStats.timeSpent}
            />
            <TimeStatItem 
              icon={BarChart3}
              iconColor="green"
              label="Average per Quiz"
              value={quizStats.avgTimeSpent}
            />
            <TimeStatItem 
              icon={Trophy}
              iconColor="purple"
              label="Fastest Completion"
              value={quizStats.fastestQuizTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className={`p-6 rounded-lg ${colorClasses[color]}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function TopicProgress({ topic, quizzes, score }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-gray-900">{topic}</div>
        <div className="text-sm text-gray-500">{quizzes} quizzes taken</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900">{score}%</div>
        <div className="w-20 bg-gray-200 rounded-full h-2">
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
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Icon className={iconColors[iconColor]} size={20} />
        <span className="text-gray-700">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}