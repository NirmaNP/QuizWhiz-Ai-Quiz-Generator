import React from 'react'

function avatar() {
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    AJ
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
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
    </>
  )
}

export default avatar