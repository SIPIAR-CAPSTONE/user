import { CPR_STEPS_DATA } from "./cprStepsData";

export const SEARCH_DATA = [
  { id: 1, title: "Hands-on CPR Guide Training", route: "LearnCpr" },
  {
    id: 2,
    title: "How to Perform CPR",
    route: "DocumentMaterial",
    params: { data: CPR_STEPS_DATA },
  },
  {
    id: 3,
    title: "QUIZ: How to Perform CPR",
    route: "Quiz",
    params: { id: "1" },
  },
];
