import { type OverallScore } from "../../hooks/cpr/useCpr.types";

export type Size = "lg" | "sm";

export type Color = OverallScore;

export type ColorStyle = Record<Color, { 
  backgroundColor: string; 
  borderColor: string 
}>