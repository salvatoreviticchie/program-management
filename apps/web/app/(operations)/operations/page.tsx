const queues = [
  { name: "Applications awaiting review", count: 12 },
  { name: "Reports due this month", count: 8 },
  { name: "Overdue disbursements", count: 3 },
];

export default function OperationsPage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Operations App</p>
        <h1>Internal workspaces for grants, programs, CRM, and impact.</h1>
        <p className="lede">
          The operator experience is built around queues, records, actions, and
          reporting rather than generic CRM navigation.
        </p>
      </section>

      <section className="grid">
        {queues.map((queue) => (
          <article key={queue.name} className="card">
            <h2>{queue.name}</h2>
            <p>{queue.count} items currently in the queue.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
