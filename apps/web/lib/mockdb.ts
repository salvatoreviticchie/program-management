export type Stage = "intake" | "review" | "committee" | "approved" | "declined";

export type GrantRecord = {
  id: string;
  organization: string;
  program: string;
  amount: number;
  owner: string;
  stage: Stage;
  submittedAt: string;
  note?: string;
};

export const grantsDb: GrantRecord[] = [
  {
    id: "GR-1042",
    organization: "River Youth Collective",
    program: "STEM Labs Expansion",
    amount: 85000,
    owner: "Maya R.",
    stage: "review",
    submittedAt: "2026-03-09",
    note: "Strong logic model; budget clarification pending.",
  },
  {
    id: "GR-1043",
    organization: "Northside Food Hub",
    program: "Community Pantry Ops",
    amount: 120000,
    owner: "Luca V.",
    stage: "committee",
    submittedAt: "2026-03-07",
    note: "High community need and clear implementation plan.",
  },
  {
    id: "GR-1044",
    organization: "Greenway Schools Network",
    program: "Climate Literacy Program",
    amount: 65000,
    owner: "Maya R.",
    stage: "intake",
    submittedAt: "2026-03-10",
    note: "Awaiting final supporting documents.",
  },
  {
    id: "GR-1045",
    organization: "Bridge Mentors",
    program: "Mentorship Cohort 2026",
    amount: 93000,
    owner: "Andre C.",
    stage: "approved",
    submittedAt: "2026-03-05",
    note: "Approved pending contract signature.",
  },
];
