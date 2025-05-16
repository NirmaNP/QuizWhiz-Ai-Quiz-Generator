import React, { useEffect, useState } from 'react';
import ResultBox from '../../assets/ResultBox';
import { useNavigate } from 'react-router-dom';
import { PieChart, BarChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Results.css'; 

function Results() {

  const URL = import.meta.env.VITE_API_URL;
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${URL}/user/getuser`, {
          method: 'POST',
          headers: {
            'auth-token': `${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!userResponse.ok) throw new Error("Failed to fetch user");
        const userData = await userResponse.json();
        setIsLoggedIn(true);

        const resultsResponse = await fetch(`${URL}/GetUserResults/${userData.email}`);
        
        if (!resultsResponse.ok) throw new Error("Failed to fetch results");
        const resultsData = await resultsResponse.json();

        setResults(resultsData);
      } catch (err) {
        console.error("Error:", err);
        setIsLoggedIn(false); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTopicsData = () => {
    const topicMap = {};
    
    results.forEach(result => {
      if (!topicMap[result.topic]) {
        topicMap[result.topic] = 1;
      } else {
        topicMap[result.topic]++;
      }
    });
    
    return Object.keys(topicMap).map(topic => ({
      name: topic,
      value: topicMap[topic],
      color: getRandomColor()
    }));
  };

  const getAccuracyTrendData = () => {
    const sortedResults = [...results].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    return sortedResults.map(result => ({
      date: formatDate(result.date),
      accuracy: (result.score / result.totalQuestions) * 100,
      score: result.score,
      total: result.totalQuestions
    }));
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const calculateStats = () => {
    if (results.length === 0) return null;
    
    const totalQuizzes = results.length;
    const totalCorrect = results.reduce((sum, result) => sum + result.score, 0);
    const totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);
    const avgAccuracy = (totalCorrect / totalQuestions) * 100;
    const totalTime = results.reduce((sum, result) => sum + result.timeTaken, 0);
    const avgTime = totalTime / totalQuizzes;
    
    return {
      totalQuizzes,
      avgAccuracy: avgAccuracy.toFixed(1),
      avgTime: formatTime(avgTime),
      bestTopic: getBestTopic(),
      improvement: calculateImprovement()
    };
  };

  const getBestTopic = () => {
    const topicStats = {};
    
    results.forEach(result => {
      if (!topicStats[result.topic]) {
        topicStats[result.topic] = {
          totalScore: result.score,
          totalQuestions: result.totalQuestions,
          count: 1
        };
      } else {
        topicStats[result.topic].totalScore += result.score;
        topicStats[result.topic].totalQuestions += result.totalQuestions;
        topicStats[result.topic].count++;
      }
    });
    
    let bestTopic = '';
    let highestAvg = 0;
    
    Object.keys(topicStats).forEach(topic => {
      const avg = (topicStats[topic].totalScore / topicStats[topic].totalQuestions) * 100;
      if (avg > highestAvg) {
        highestAvg = avg;
        bestTopic = topic;
      }
    });
    
    return {
      name: bestTopic,
      accuracy: highestAvg.toFixed(1)
    };
  };

  const calculateImprovement = () => {
    if (results.length < 2) return 'N/A';
    
    const sorted = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const segmentSize = Math.max(1, Math.floor(sorted.length * 0.2));
    const firstSegment = sorted.slice(0, segmentSize);
    const lastSegment = sorted.slice(-segmentSize);
    
    const firstAccuracy = firstSegment.reduce((sum, result) => 
      sum + (result.score / result.totalQuestions), 0) / firstSegment.length * 100;
    
    const lastAccuracy = lastSegment.reduce((sum, result) => 
      sum + (result.score / result.totalQuestions), 0) / lastSegment.length * 100;
    
    const improvement = lastAccuracy - firstAccuracy;
    
    return {
      value: Math.abs(improvement).toFixed(1),
      direction: improvement >= 0 ? 'increase' : 'decrease'
    };
  };

  if (loading) {
    return <div className="loading">Loading your results...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-container">
        <div className="not-logged-in-message">
          <h2>You need to be logged in to view your quiz results</h2>
          <p>Please log in to access your personal quiz history and analytics.</p>
          <div className="action-buttons">
            <button 
              className="login-button"
              onClick={() => navigate('/Login')}
            >
              Log In
            </button>
            <button 
              className="signup-button"
              onClick={() => navigate('/Register')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="no-results-container">
        <div className="no-results-message">
          <h2>No quiz results found</h2>
          <p>You haven't taken any quizzes yet. Complete your first quiz to see your analytics!</p>
          <button 
            className="take-quiz-button"
            onClick={() => navigate('/Quiz')}
          >
            Take Your First Quiz
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const topicsData = getTopicsData();
  const accuracyData = getAccuracyTrendData();

  return (
    <div className="results-container">
      <h1 className='text-2xl font-bold'>Your Quiz Analytics</h1>
      
      <div className="stats-overview">
        <h2 className='text-xl pl-1 mt-2'>Overall Performance</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Quizzes</h3>
            <p>{stats.totalQuizzes}</p>
          </div>
          <div className="stat-card">
            <h3>Average Accuracy</h3>
            <p>{stats.avgAccuracy}%</p>
          </div>
          <div className="stat-card">
            <h3>Avg Time/Quiz</h3>
            <p>{stats.avgTime}</p>
          </div>
          <div className="stat-card">
            <h3>Best Topic</h3>
            <p>{stats.bestTopic.name} ({stats.bestTopic.accuracy}%)</p>
          </div>
          <div className="stat-card">
            <h3>Improvement</h3>
            <p>
              {stats.improvement === 'N/A' ? 'N/A' : (
                <>
                  {stats.improvement.value}% {stats.improvement.direction === 'increase' ? '↑' : '↓'}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="charts-section">
        <div className="chart-container">
          <h2>Topics Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {topicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2>Accuracy Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Accuracy']}
                labelFormatter={(date) => `Date: ${date}`}
              />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <h2>Your Quiz Results</h2>
      <div className="results-list">
        {results.map((result, index) => (
          <ResultBox 
            key={result._id || index}
            score={result.score} 
            total={result.totalQuestions} 
            timeTaken={formatTime(result.timeTaken)}
            date={formatDate(result.date)}
            topic={result.topic} 
            difficulty={result.difficulty} 
          />
        ))}
      </div>
    </div>
  );
}

export default Results;