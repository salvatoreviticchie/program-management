"use client";

import { useMemo, useState } from "react";

type ItemStatus = "todo" | "in_progress" | "done";

type WorkItem = {
  id: number;
  title: string;
  notes: string;
  dueDate: string;
  status: ItemStatus;
};

const initialItems: WorkItem[] = [
  {
    id: 1,
    title: "Finalize grant review framework",
    notes: "Align criteria with impact metrics before committee review.",
    dueDate: "2026-03-15",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Draft applicant onboarding checklist",
    notes: "Short, plain-language checklist for first-time applicants.",
    dueDate: "2026-03-18",
    status: "todo",
  },
  {
    id: 3,
    title: "Publish weekly program summary",
    notes: "Share highlights and blockers with leadership.",
    dueDate: "2026-03-10",
    status: "done",
  },
];

const statuses: ItemStatus[] = ["todo", "in_progress", "done"];

const statusLabel: Record<ItemStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

function toFriendlyTone(text: string) {
  if (!text.trim()) return "";
  return `Here’s a clearer friendly version:\n\n${text.trim()}\n\n✅ Next step: confirm and save.`;
}

function toProfessionalTone(text: string) {
  if (!text.trim()) return "";
  return `Professional draft:\n\n${text.trim()}\n\nAction requested: review and approve.`;
}

export default function HomePage() {
  const [items, setItems] = useState<WorkItem[]>(initialItems);
  const [selectedId, setSelectedId] = useState<number>(initialItems[0].id);
  const [commandInput, setCommandInput] = useState("");
  const [tone, setTone] = useState<"friendly" | "professional" | "short">(
    "friendly",
  );

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0],
    [items, selectedId],
  );

  const stats = useMemo(() => {
    const todo = items.filter((item) => item.status === "todo").length;
    const inProgress = items.filter((item) => item.status === "in_progress").length;
    const done = items.filter((item) => item.status === "done").length;
    return { todo, inProgress, done };
  }, [items]);

  function updateSelected(partial: Partial<WorkItem>) {
    setItems((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              ...partial,
            }
          : item,
      ),
    );
  }

  function addItem() {
    const nextId = Math.max(...items.map((item) => item.id)) + 1;
    const newItem: WorkItem = {
      id: nextId,
      title: "New task",
      notes: "",
      dueDate: new Date().toISOString().slice(0, 10),
      status: "todo",
    };
    setItems((current) => [newItem, ...current]);
    setSelectedId(newItem.id);
  }

  function applyTone() {
    if (!selected) return;
    let nextNotes = selected.notes;

    if (tone === "friendly") nextNotes = toFriendlyTone(selected.notes);
    if (tone === "professional") nextNotes = toProfessionalTone(selected.notes);
    if (tone === "short") nextNotes = selected.notes.slice(0, 140);

    updateSelected({ notes: nextNotes });
  }

  function parseCommand() {
    if (!commandInput.trim()) return;
    const nextId = Math.max(...items.map((item) => item.id)) + 1;

    const newItem: WorkItem = {
      id: nextId,
      title: commandInput,
      notes: "Created via command bar",
      dueDate: new Date().toISOString().slice(0, 10),
      status: "todo",
    };

    setItems((current) => [newItem, ...current]);
    setSelectedId(newItem.id);
    setCommandInput("");
  }

  return (
    <main className="app-shell">
      <header className="top">
        <div>
          <p className="eyebrow">Program Management — AI Assisted</p>
          <h1>Simple operations app with an AI tone layer</h1>
          <p className="lede">
            Fast task management, command-driven creation, and guided content
            rewriting without losing human control.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>To do</span>
          <strong>{stats.todo}</strong>
        </article>
        <article className="stat-card">
          <span>In progress</span>
          <strong>{stats.inProgress}</strong>
        </article>
        <article className="stat-card">
          <span>Done</span>
          <strong>{stats.done}</strong>
        </article>
      </section>

      <section className="command-bar">
        <input
          value={commandInput}
          onChange={(event) => setCommandInput(event.target.value)}
          placeholder='Type a command: "Create task review budget memo"'
        />
        <button onClick={parseCommand}>Run command</button>
      </section>

      <section className="workspace-grid">
        <aside className="panel list-panel">
          <div className="panel-head">
            <h2>Items</h2>
            <button onClick={addItem}>New</button>
          </div>

          <ul className="item-list">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  className={item.id === selected?.id ? "active" : ""}
                  onClick={() => setSelectedId(item.id)}
                >
                  <strong>{item.title}</strong>
                  <span>{statusLabel[item.status]}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="panel editor-panel">
          <h2>Editor</h2>
          <label>
            Title
            <input
              value={selected?.title ?? ""}
              onChange={(event) => updateSelected({ title: event.target.value })}
            />
          </label>

          <label>
            Notes
            <textarea
              value={selected?.notes ?? ""}
              onChange={(event) => updateSelected({ notes: event.target.value })}
              rows={8}
            />
          </label>

          <div className="editor-row">
            <label>
              Due date
              <input
                type="date"
                value={selected?.dueDate ?? ""}
                onChange={(event) =>
                  updateSelected({ dueDate: event.target.value })
                }
              />
            </label>

            <label>
              Status
              <select
                value={selected?.status ?? "todo"}
                onChange={(event) =>
                  updateSelected({ status: event.target.value as ItemStatus })
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel[status]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="panel ai-panel">
          <h2>AI tone tools</h2>
          <p>Use AI assistance with explicit control before saving changes.</p>

          <label>
            Tone
            <select
              value={tone}
              onChange={(event) =>
                setTone(event.target.value as "friendly" | "professional" | "short")
              }
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="short">Short</option>
            </select>
          </label>

          <button className="primary" onClick={applyTone}>
            Apply tone suggestion
          </button>

          <p className="hint">
            Next step: replace this mock logic with `/api/ai/rewrite` and
            `/api/ai/summarize` endpoints.
          </p>
        </section>
      </section>
    </main>
  );
}
