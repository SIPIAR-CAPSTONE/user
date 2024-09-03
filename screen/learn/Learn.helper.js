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

// Calculate the average depth attempt from a list of records
export function getAverageOfTotalDepth(records) {
  const totalDepth = records.reduce(
    (sum, record) => sum + record.score.depthAttempt,
    0
  );
  const averageDepth = totalDepth / records.length;
  return Number(averageDepth.toFixed(2));
}

export function getTimingPercentage(records) {
  const totalRecords = records.length;
  const perfectTimingCount = records.filter(
    (record) => record.score.timingScore === "green"
  ).length;

  if (totalRecords === 0 || perfectTimingCount === 0) {
    return 0;
  }

  const percentage = (perfectTimingCount / totalRecords) * 100;
  return Number(percentage.toFixed(0));
}

// Calculate the percentage of records with a specific color score
export function getColorOverallScorePercentage(records, color) {
  const totalCount = records.length;
  const colorCount = records.filter(
    (record) => record.score.overallScore === color
  ).length;

  const percentage = (colorCount / totalCount) * 100;
  return Number(percentage.toFixed(0));
}

//get the total duration of rocords by getting the last record time
export function getTotalTimeDuration(records) {
  const lastRecord = records[records.length - 1];

  if (!records || !lastRecord) {
    return 0;
  }

  return lastRecord?.time;
}

// Get the count of records with a specific color score
export function countColorOverallScore(records, color) {
  return records.filter((record) => record.score.overallScore === color).length;
}
