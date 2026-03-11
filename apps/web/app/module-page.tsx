"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { moduleConfigs, type ModuleKey, type ModuleRecord } from "../lib/module-data";

type ApiModuleData = {
  title: string;
  subtitle: string;
  records: ModuleRecord[];
  columns: Array<{ key: keyof ModuleRecord; label: string }>;
};

export default function ModulePage({ moduleKey }: { moduleKey: ModuleKey }) {
  const fallback = moduleConfigs[moduleKey];
  const [data, setData] = useState<ApiModuleData>(fallback);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    fallback.records[0]?.id ?? null,
  );

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/${moduleKey}`);
      const payload = await res.json();
      if (payload?.data) {
        setData(payload.data);
        setSelectedId(payload.data.records?.[0]?.id ?? null);
      }
    }
    load();
  }, [moduleKey]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return data.records.filter((record) => {
      const matchStatus = status === "all" ? true : record.status === status;
      const matchText =
        !term ||
        record.id.toLowerCase().includes(term) ||
        record.title.toLowerCase().includes(term) ||
        record.owner.toLowerCase().includes(term);

      return matchStatus && matchText;
    });
  }, [data.records, search, status]);

  const selected =
    filtered.find((record) => record.id === selectedId) ?? filtered[0] ?? null;

  const statuses = [
    "all",
    ...Array.from(new Set(data.records.map((record) => record.status))),
  ];

  async function refreshModule() {
    const res = await fetch(`/api/${moduleKey}`);
    const payload = await res.json();
    if (payload?.data) setData(payload.data);
  }

  async function createRecord() {
    await fetch(`/api/${moduleKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: `New ${data.title} item`, status: "New" }),
    });
    await refreshModule();
  }

  async function updateSelected(patch: Partial<ModuleRecord>) {
    if (!selected) return;
    await fetch(`/api/modules/${moduleKey}/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    await refreshModule();
  }

  return (
    <main style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ marginBottom: 16 }}>
        <p style={{ color: "#64748b", margin: 0 }}>Operations / {data.title}</p>
        <h1 style={{ margin: "8px 0" }}>{data.title}</h1>
        <p style={{ margin: 0, color: "#475569" }}>{data.subtitle}</p>
      </header>

      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(moduleConfigs).map((key) => (
          <Link
            key={key}
            href={`/${key}`}
            style={{
              padding: "6px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              textDecoration: "none",
              background: key === moduleKey ? "#eef2ff" : "#fff",
            }}
          >
            {moduleConfigs[key as ModuleKey].title}
          </Link>
        ))}
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          <div
            style={{
              padding: 10,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 8,
              borderBottom: "1px solid #e2e8f0",
              background: "#f8fafc",
            }}
          >
            <input
              placeholder="Search records"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 10px" }}
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 10px" }}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All statuses" : item}
                </option>
              ))}
            </select>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {data.columns.map((column) => (
                  <th key={column.key} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e2e8f0" }}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr
                  key={record.id}
                  onClick={() => setSelectedId(record.id)}
                  style={{ background: selected?.id === record.id ? "#eef2ff" : "#fff", cursor: "pointer" }}
                >
                  {data.columns.map((column) => (
                    <td key={column.key} style={{ padding: 10, borderBottom: "1px solid #f1f5f9" }}>
                      {record[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Record detail</h3>
          {selected ? <RecordDetail record={selected} /> : <p>No record selected.</p>}
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            <button style={btn} onClick={createRecord}>Create Record</button>
            <button style={btn} onClick={() => updateSelected({ status: "In Progress" })}>Mark In Progress</button>
            <button style={btn} onClick={() => updateSelected({ status: "Needs Follow-up" })}>Request Follow-up</button>
          </div>
        </aside>
      </section>
    </main>
  );
}

function RecordDetail({ record }: { record: ModuleRecord }) {
  return (
    <dl style={{ margin: 0, display: "grid", gap: 8 }}>
      <Item k="ID" v={record.id} />
      <Item k="Title" v={record.title} />
      <Item k="Owner" v={record.owner} />
      <Item k="Status" v={record.status} />
      <Item k="Updated" v={record.updatedAt} />
    </dl>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed #e2e8f0", paddingBottom: 6 }}>
      <dt style={{ color: "#64748b" }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 600 }}>{v}</dd>
    </div>
  );
}

const btn: CSSProperties = {
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "#fff",
  padding: "8px 10px",
  cursor: "pointer",
};
