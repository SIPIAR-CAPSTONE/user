import { type TimingScore, type Score } from "../../hooks/cpr/useCpr.types";

export type ScoreProps = {
  score: Score | null
}

export type ScoringBarProps = ScoreProps;

export type DepthScoreUIProps = ScoreProps;

export type TimingScoreUIProps = {
  score: TimingScore | null
}