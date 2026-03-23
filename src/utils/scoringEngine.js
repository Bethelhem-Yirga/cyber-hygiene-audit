// src/utils/scoringEngine.js
export const calculateScore = (responses, questions) => {
  let totalEarned = 0;
  let totalPossible = 0;
  const categoryScores = {};

  // Group by category (passwords, 2fa, updates, etc.)
  const categorized = responses.reduce((acc, response) => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return acc;

    if (!acc[question.category]) {
      acc[question.category] = { earned: 0, possible: 0 };
    }

    acc[question.category].earned += response.score;
    acc[question.category].possible += question.weight * 10;
    return acc;
  }, {});

  // Calculate percentages
  Object.keys(categorized).forEach(category => {
    const { earned, possible } = categorized[category];
    categoryScores[category] = Math.round((earned / possible) * 100);
    totalEarned += earned;
    totalPossible += possible;
  });

  const overallScore = Math.round((totalEarned / totalPossible) * 100);
  const recommendations = generateRecommendations(categoryScores, responses);

  return { overallScore, categoryScores, recommendations };
};