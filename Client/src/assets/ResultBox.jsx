import React from 'react'

function ResultBox(props) {
  const percentage = (props.score / props.total) * 100;

  const borderColor = percentage >= 80
    ? 'border-green-500'
    : percentage >= 50
    ? 'border-yellow-500'
    : 'border-red-500';

  return (
    <div className={`border-2 ${borderColor} rounded-xl m-4 p-4 shadow-md flex justify-between items-center space-x-6`}>

      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">Date</span>
        <span className="font-semibold">{props.date}</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">Topic</span>
        <span className="font-semibold">{props.topic}</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">Difficulty</span>
        <span className="font-semibold">{props.difficulty}</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">Time Taken</span>
        <span className="font-semibold">{props.timeTaken}</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">Score</span>
        <span className="font-semibold">{props.score} / {props.total} ({percentage.toFixed(0)}%)</span>
      </div>

    </div>
  );
}

export default ResultBox
