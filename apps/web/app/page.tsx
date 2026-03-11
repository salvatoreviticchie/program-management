import Link from "next/link";
import { moduleConfigs, type ModuleKey } from "../lib/module-data";

const moduleOrder: ModuleKey[] = [
  "crm",
  "fundraising",
  "programs",
  "grants",
  "mel",
  "portal",
  "admin",
];

export default function HomePage() {
  return (
    <main style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ marginBottom: 20 }}>
        <p style={{ margin: 0, color: "#64748b" }}>Program Management Platform</p>
        <h1 style={{ margin: "8px 0" }}>Operations Command Center</h1>
        <p style={{ margin: 0, color: "#475569" }}>
          Select a module to manage records, workflows, and AI-assisted actions.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {moduleOrder.map((key) => {
          const module = moduleConfigs[key];
          return (
            <Link
              key={key}
              href={`/${key}`}
              style={{
                border: "1px solid #dbe3f0",
                borderRadius: 12,
                padding: 14,
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              <h2 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>{module.title}</h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.92rem" }}>
                {module.subtitle}
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
