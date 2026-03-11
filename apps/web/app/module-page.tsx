import Link from "next/link";
import { moduleConfigs, type ModuleKey } from "../lib/module-data";

export default function ModulePage({ moduleKey }: { moduleKey: ModuleKey }) {
  const config = moduleConfigs[moduleKey];

  return (
    <main style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ marginBottom: 16 }}>
        <p style={{ color: "#64748b", margin: 0 }}>Operations / {config.title}</p>
        <h1 style={{ margin: "8px 0" }}>{config.title}</h1>
        <p style={{ margin: 0, color: "#475569" }}>{config.subtitle}</p>
      </header>

      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(moduleConfigs).map((key) => (
          <Link key={key} href={`/${key}`} style={{ padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 8, textDecoration: "none" }}>
            {moduleConfigs[key as ModuleKey].title}
          </Link>
        ))}
      </div>

      <section style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              {config.columns.map((column) => (
                <th key={column.key} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e2e8f0" }}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.records.map((record) => (
              <tr key={record.id}>
                {config.columns.map((column) => (
                  <td key={column.key} style={{ padding: 10, borderBottom: "1px solid #f1f5f9" }}>
                    {record[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
