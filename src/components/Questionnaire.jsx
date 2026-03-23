// src/components/Questionnaire.jsx
import React, { useState } from 'react';
import { questions } from '../data/questions';

const Questionnaire = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer, score) => {
    const newResponses = [...responses, {
      questionId: questions[currentIndex].id,
      category: questions[currentIndex].category,
      answer,
      score
    }];
    setResponses(newResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      localStorage.setItem('auditResponses', JSON.stringify(newResponses));
      setShowResults(true);
    }
  };

  if (showResults) {
    const Results = React.lazy(() => import('./Results'));
    return (
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      }>
        <Results responses={responses} />
      </React.Suspense>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Progress section */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <span className="category-badge">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-lg font-semibold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question card */}
        <div className="question-card">
          <div className="flex items-center gap-3 mb-6">
            <span className="category-badge">
              {currentQuestion.category}
            </span>
            <span className="text-sm text-gray-400">
              Weight: {currentQuestion.weight}x
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleAnswer(option.text, option.value)}
                className="option-button"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option.text}</span>
                  <span className="text-sm text-gray-500 group-hover:text-green-400 transition-colors">
                    {option.value === 10 ? '✅ Best practice' : 
                     option.value === 5 ? '⚠️ Could improve' : '❌ Needs work'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Tip */}
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-sm text-gray-300">
              <span className="text-green-400 font-bold">💡 Tip:</span> Be honest! 
              This assessment is for your own benefit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;