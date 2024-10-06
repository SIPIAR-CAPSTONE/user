//get current date in format: "July 1, 2024"
export function getFormattedCurrentDate() {
  const today = new Date();
  const formattedCurrentDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return formattedCurrentDate;
}

//get the percentage of selected scoreType and score
//example: getScorePercentage(compressionHistory, "overallScore", "green")
export function getScorePercentage(records, scoreType, score) {
  const totalRecords = records.length;
  const scoreCount = records.filter(
    (record) => record.scores[scoreType] === score
  ).length;

  if (totalRecords === 0 || scoreCount === 0) {
    return 0;
  }

  const scorePercentage = getPercentage(scoreCount, totalRecords);
  return scorePercentage;
}

// Get the count of records with a specific color score
export function countScore(records, scoreType, score) {
  if (records.length === 0) return 0;
  return records.filter((record) => record.scores[scoreType] === score).length;
}

//get the total duration of rocords by getting the last record time
export function getTotalTimeDuration(records) {
  const lastRecordItem = records[records.length - 1];

  if (!records || !lastRecordItem || records.length === 0) {
    return 0;
  }
  const totalDuration = lastRecordItem?.time;
  return totalDuration;
}

export function getPercentage(value, totalValue) {
  return Number(((value / totalValue) * 100).toFixed(0));
}

export function getAnswerScore(answerId, currentCorrectAnswerId) {
  if (answerId === "missed") return "missed";
  else if (answerId === currentCorrectAnswerId) return "correct";
  else return "wrong";
}

export function isLastQuestion(currentQuestionIndex, quiz) {
  return currentQuestionIndex < quiz.length - 1;
}
