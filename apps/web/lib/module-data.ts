export type ModuleKey =
  | "crm"
  | "fundraising"
  | "programs"
  | "grants"
  | "mel"
  | "portal"
  | "admin";

export type ModuleRecord = {
  id: string;
  title: string;
  owner: string;
  status: string;
  updatedAt: string;
};

export type ModuleConfig = {
  key: ModuleKey;
  title: string;
  subtitle: string;
  columns: Array<{ key: keyof ModuleRecord; label: string }>;
  records: ModuleRecord[];
};

export const moduleConfigs: Record<ModuleKey, ModuleConfig> = {
  crm: {
    key: "crm",
    title: "CRM",
    subtitle: "Constituents, relationships, and activity timeline.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Constituent" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Stage" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "CRM-101", title: "Hope Foundation", owner: "Luca", status: "Qualified", updatedAt: "2026-03-10" },
      { id: "CRM-102", title: "North Collective", owner: "Maya", status: "Engaged", updatedAt: "2026-03-11" },
    ],
  },
  fundraising: {
    key: "fundraising",
    title: "Fundraising",
    subtitle: "Campaigns, pledges, and donor pipelines.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Campaign" },
      { key: "owner", label: "Lead" },
      { key: "status", label: "Status" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "FUN-201", title: "Spring Giving Drive", owner: "Andre", status: "Active", updatedAt: "2026-03-08" },
      { id: "FUN-202", title: "Major Donor Round", owner: "Luca", status: "Planning", updatedAt: "2026-03-11" },
    ],
  },
  programs: {
    key: "programs",
    title: "Programs",
    subtitle: "Program portfolios, cohorts, and delivery milestones.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Program" },
      { key: "owner", label: "Manager" },
      { key: "status", label: "Phase" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "PRO-301", title: "Youth STEM Labs", owner: "Maya", status: "Delivery", updatedAt: "2026-03-09" },
      { id: "PRO-302", title: "Mentor Network", owner: "Andre", status: "Scaling", updatedAt: "2026-03-10" },
    ],
  },
  grants: {
    key: "grants",
    title: "Grants",
    subtitle: "Applications, reviews, and approval workflows.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Application" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Stage" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "GRT-401", title: "River Youth Collective", owner: "Maya", status: "Review", updatedAt: "2026-03-11" },
      { id: "GRT-402", title: "Bridge Mentors", owner: "Andre", status: "Approved", updatedAt: "2026-03-07" },
    ],
  },
  mel: {
    key: "mel",
    title: "MEL",
    subtitle: "Monitoring, evaluation, and learning insights.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Indicator" },
      { key: "owner", label: "Analyst" },
      { key: "status", label: "Cycle" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "MEL-501", title: "Beneficiary Retention", owner: "Luca", status: "Q1", updatedAt: "2026-03-11" },
      { id: "MEL-502", title: "Outcome Scorecard", owner: "Maya", status: "Draft", updatedAt: "2026-03-08" },
    ],
  },
  portal: {
    key: "portal",
    title: "Portal",
    subtitle: "External applicants, reviewers, and partner interactions.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Submission" },
      { key: "owner", label: "Handler" },
      { key: "status", label: "State" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "POR-601", title: "Applicant Inbox", owner: "Ops Team", status: "Open", updatedAt: "2026-03-11" },
      { id: "POR-602", title: "Reviewer Queue", owner: "Ops Team", status: "Backlog", updatedAt: "2026-03-09" },
    ],
  },
  admin: {
    key: "admin",
    title: "Admin",
    subtitle: "Tenant settings, roles, and system controls.",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Setting" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "State" },
      { key: "updatedAt", label: "Updated" },
    ],
    records: [
      { id: "ADM-701", title: "Role Matrix", owner: "Admin", status: "Active", updatedAt: "2026-03-11" },
      { id: "ADM-702", title: "Audit Policies", owner: "Admin", status: "Review", updatedAt: "2026-03-06" },
    ],
  },
};
