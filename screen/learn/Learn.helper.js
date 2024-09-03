export function getAverageDepthAttempt(records) {
  const totalDepth = records.reduce(
    (sum, record) => sum + record.score.depthAttempt,
    0
  );
  return Number((totalDepth / records.length).toFixed(2));
}

export function getColorScorePercentage(records, color) {
  const totalCount = records.length;
  const colorCount = records.reduce((count, record) => {
    return count + (record.score.overallScore === color ? 1 : 0);
  }, 0);
  return Number(((colorCount / totalCount) * 100).toFixed(0));
}

export function getColorScoreCount(reocrds, color) {
  return reocrds.filter((item) => item.score.overallScore === color).length;
}

export function getAvgOverallScorePercentage(records) {
  const totalCount = records.length;
  const greenCount = records.reduce((count, record) => {
    return count + (record.score.overallScore === "green" ? 1 : 0);
  }, 0);
  return Number(((greenCount / totalCount) * 100).toFixed(0));
}
