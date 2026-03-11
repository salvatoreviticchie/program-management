"use client";

import { useMemo, useState } from "react";

type Stage = "intake" | "review" | "committee" | "approved" | "declined";

type GrantRecord = {
  id: string;
  organization: string;
  program: string;
  amount: number;
  owner: string;
  stage: Stage;
  submittedAt: string;
};

const grantsSeed: GrantRecord[] = [
  {
    id: "GR-1042",
    organization: "River Youth Collective",
    program: "STEM Labs Expansion",
    amount: 85000,
    owner: "Maya R.",
    stage: "review",
    submittedAt: "2026-03-09",
  },
  {
    id: "GR-1043",
    organization: "Northside Food Hub",
    program: "Community Pantry Ops",
    amount: 120000,
    owner: "Luca V.",
    stage: "committee",
    submittedAt: "2026-03-07",
  },
  {
    id: "GR-1044",
    organization: "Greenway Schools Network",
    program: "Climate Literacy Program",
    amount: 65000,
    owner: "Maya R.",
    stage: "intake",
    submittedAt: "2026-03-10",
  },
  {
    id: "GR-1045",
    organization: "Bridge Mentors",
    program: "Mentorship Cohort 2026",
    amount: 93000,
    owner: "Andre C.",
    stage: "approved",
    submittedAt: "2026-03-05",
  },
];

const nav = [
  "Home",
  "CRM",
  "Fundraising",
  "Programs",
  "Grants",
  "MEL",
  "Portal",
  "Admin",
];

const stageLabels: Record<Stage, string> = {
  intake: "Intake",
  review: "In Review",
  committee: "Committee",
  approved: "Approved",
  declined: "Declined",
};

const stageTone: Record<Stage, string> = {
  intake: "neutral",
  review: "info",
  committee: "warning",
  approved: "success",
  declined: "danger",
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage() {
  const [records, setRecords] = useState(grantsSeed);
  const [activeModule, setActiveModule] = useState("Grants");
  const [selectedId, setSelectedId] = useState(grantsSeed[0].id);
  const [search, setSearch] = useState("");
  const [selectedView, setSelectedView] = useState("Active pipeline");

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return records;

    return records.filter((row) => {
      return (
        row.id.toLowerCase().includes(term) ||
        row.organization.toLowerCase().includes(term) ||
        row.program.toLowerCase().includes(term) ||
        row.owner.toLowerCase().includes(term)
      );
    });
  }, [records, search]);

  const selected =
    filtered.find((record) => record.id === selectedId) ?? filtered[0] ?? records[0];

  const summary = useMemo(() => {
    const inReview = records.filter((row) => row.stage === "review").length;
    const committee = records.filter((row) => row.stage === "committee").length;
    const approved = records.filter((row) => row.stage === "approved").length;
    const totalPipeline = records
      .filter((row) => row.stage !== "declined")
      .reduce((acc, row) => acc + row.amount, 0);

    return { inReview, committee, approved, totalPipeline };
  }, [records]);

  function moveStage(direction: "next" | "previous") {
    if (!selected) return;
    const order: Stage[] = [
      "intake",
      "review",
      "committee",
      "approved",
      "declined",
    ];

    const current = order.indexOf(selected.stage);
    const nextIndex = direction === "next" ? current + 1 : current - 1;
    if (nextIndex < 0 || nextIndex >= order.length) return;

    const nextStage = order[nextIndex];
    setRecords((currentRows) =>
      currentRows.map((row) =>
        row.id === selected.id
          ? {
              ...row,
              stage: nextStage,
            }
          : row,
      ),
    );
  }

  return (
    <div className="enterprise-shell">
      <aside className="sidebar">
        <div className="brand">Nonprofit Ops</div>
        <nav>
          {nav.map((item) => (
            <button
              key={item}
              className={item === activeModule ? "active" : ""}
              onClick={() => setActiveModule(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="crumbs">Operations / {activeModule}</p>
            <h1>Grant Applications Pipeline</h1>
          </div>
          <div className="top-actions">
            <button>New Application</button>
            <button className="primary">Run AI Summary</button>
          </div>
        </header>

        <section className="kpis">
          <article>
            <span>In review</span>
            <strong>{summary.inReview}</strong>
          </article>
          <article>
            <span>Committee queue</span>
            <strong>{summary.committee}</strong>
          </article>
          <article>
            <span>Approved</span>
            <strong>{summary.approved}</strong>
          </article>
          <article>
            <span>Pipeline value</span>
            <strong>{money(summary.totalPipeline)}</strong>
          </article>
        </section>

        <section className="workspace">
          <div className="table-area panel">
            <div className="table-toolbar">
              <div className="left">
                <select
                  value={selectedView}
                  onChange={(event) => setSelectedView(event.target.value)}
                >
                  <option>Active pipeline</option>
                  <option>Needs review</option>
                  <option>Approved this month</option>
                </select>
                <div className="chips">
                  <span>Stage: All</span>
                  <span>Owner: My team</span>
                  <span>Amount: &gt;$50k</span>
                </div>
              </div>
              <input
                placeholder="Search id, org, program, owner"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Organization</th>
                  <th>Program</th>
                  <th>Amount</th>
                  <th>Owner</th>
                  <th>Stage</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={selected?.id === row.id ? "selected" : ""}
                    onClick={() => setSelectedId(row.id)}
                  >
                    <td>{row.id}</td>
                    <td>{row.organization}</td>
                    <td>{row.program}</td>
                    <td>{money(row.amount)}</td>
                    <td>{row.owner}</td>
                    <td>
                      <span className={`badge ${stageTone[row.stage]}`}>
                        {stageLabels[row.stage]}
                      </span>
                    </td>
                    <td>{row.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="detail-area panel">
            <h2>Record details</h2>
            {selected ? (
              <>
                <p className="record-id">{selected.id}</p>
                <h3>{selected.organization}</h3>
                <p>{selected.program}</p>

                <dl>
                  <div>
                    <dt>Stage</dt>
                    <dd>
                      <span className={`badge ${stageTone[selected.stage]}`}>
                        {stageLabels[selected.stage]}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>Amount</dt>
                    <dd>{money(selected.amount)}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{selected.owner}</dd>
                  </div>
                </dl>

                <div className="detail-actions">
                  <button onClick={() => moveStage("previous")}>Previous stage</button>
                  <button onClick={() => moveStage("next")}>Advance stage</button>
                </div>
              </>
            ) : (
              <p>No record selected.</p>
            )}
          </aside>

          <aside className="ai-area panel">
            <h2>AI Copilot</h2>
            <p>Context-aware assistant for grant ops.</p>
            <ul>
              <li>Summarize this application for committee review</li>
              <li>Draft clarifying questions for applicant</li>
              <li>Suggest risk flags based on submitted documents</li>
              <li>Generate internal note in friendly/professional tone</li>
            </ul>
            <button className="primary">Open Copilot</button>
            <p className="small">
              Agent Lite mode: all write actions require your confirmation.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}
