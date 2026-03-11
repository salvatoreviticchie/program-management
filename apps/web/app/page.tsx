"use client";

import { useEffect, useMemo, useState } from "react";
import type { GrantRecord, Stage } from "../lib/mockdb";

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
  const [records, setRecords] = useState<GrantRecord[]>([]);
  const [activeModule, setActiveModule] = useState("Grants");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedView, setSelectedView] = useState("Active pipeline");
  const [tone, setTone] = useState<"friendly" | "professional" | "short">("professional");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/grants");
      const payload = await res.json();
      setRecords(payload.data ?? []);
      if (payload.data?.length) setSelectedId(payload.data[0].id);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return records;

    return records.filter((row) =>
      [row.id, row.organization, row.program, row.owner].some((field) =>
        field.toLowerCase().includes(term),
      ),
    );
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

  async function patchSelected(payload: Partial<GrantRecord>) {
    if (!selected) return;
    const res = await fetch(`/api/grants/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setRecords((curr) => curr.map((row) => (row.id === selected.id ? data.data : row)));
  }

  async function moveStage(direction: "next" | "previous") {
    if (!selected) return;
    const order: Stage[] = ["intake", "review", "committee", "approved", "declined"];
    const current = order.indexOf(selected.stage);
    const nextIndex = direction === "next" ? current + 1 : current - 1;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    await patchSelected({ stage: order[nextIndex] });
  }

  async function rewriteNote() {
    if (!selected) return;
    const text = selected.note || `${selected.organization} - ${selected.program}`;
    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });
    const payload = await res.json();
    await patchSelected({ note: payload.data.rewritten });
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
            <button className="primary" onClick={rewriteNote}>Run AI Summary</button>
          </div>
        </header>

        <section className="kpis">
          <article><span>In review</span><strong>{summary.inReview}</strong></article>
          <article><span>Committee queue</span><strong>{summary.committee}</strong></article>
          <article><span>Approved</span><strong>{summary.approved}</strong></article>
          <article><span>Pipeline value</span><strong>{money(summary.totalPipeline)}</strong></article>
        </section>

        <section className="workspace">
          <div className="table-area panel">
            <div className="table-toolbar">
              <div className="left">
                <select value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
                  <option>Active pipeline</option><option>Needs review</option><option>Approved this month</option>
                </select>
                <div className="chips"><span>Stage: All</span><span>Owner: My team</span><span>Amount: &gt;$50k</span></div>
              </div>
              <input placeholder="Search id, org, program, owner" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <table>
              <thead><tr><th>ID</th><th>Organization</th><th>Program</th><th>Amount</th><th>Owner</th><th>Stage</th><th>Submitted</th></tr></thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className={selected?.id === row.id ? "selected" : ""} onClick={() => setSelectedId(row.id)}>
                    <td>{row.id}</td><td>{row.organization}</td><td>{row.program}</td><td>{money(row.amount)}</td><td>{row.owner}</td>
                    <td><span className={`badge ${stageTone[row.stage]}`}>{stageLabels[row.stage]}</span></td><td>{row.submittedAt}</td>
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
                  <div><dt>Stage</dt><dd><span className={`badge ${stageTone[selected.stage]}`}>{stageLabels[selected.stage]}</span></dd></div>
                  <div><dt>Amount</dt><dd>{money(selected.amount)}</dd></div>
                  <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
                </dl>
                <div className="detail-actions"><button onClick={() => moveStage("previous")}>Previous stage</button><button onClick={() => moveStage("next")}>Advance stage</button></div>
              </>
            ) : <p>No record selected.</p>}
          </aside>

          <aside className="ai-area panel">
            <h2>AI Copilot</h2>
            <p>Context-aware assistant for grant ops.</p>
            <label>
              Tone
              <select value={tone} onChange={(e) => setTone(e.target.value as "friendly" | "professional" | "short")}>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="short">Short</option>
              </select>
            </label>
            <button className="primary" onClick={rewriteNote}>Rewrite selected note</button>
            <p className="small">{selected?.note ?? "No note yet."}</p>
          </aside>
        </section>
      </main>
    </div>
  );
}
