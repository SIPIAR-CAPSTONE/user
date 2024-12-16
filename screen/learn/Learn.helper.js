import moment from "moment";

//get current date in format: "July 1, 2024"
export function getFormattedCurrentDate() {
  const today = moment();
  const formattedCurrentDate = moment(today).format("LL");

  return formattedCurrentDate;
}

//get the percentage of selected scoreType and score
//example: getScorePercentage(compressionHistory, "overallScore", "green")
export function getScorePercentage(records, scoreType, score) {
  const totalRecords = records?.length || 0;
  const scoreCount = records.filter(
    (record) => record[scoreType] === score
  )?.length || 0;

  if (totalRecords === 0 || scoreCount === 0) {
    return 0;
  }

  const scorePercentage = getPercentage(scoreCount, totalRecords);
  return scorePercentage;
}

// Get the count of records with a specific color score
export function countScore(records, scoreType, score) {
  if (records?.length === 0) return 0;

  return records.filter((record) => record[scoreType] === score)?.length;
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
  return currentQuestionIndex < quiz?.length - 1;
}
