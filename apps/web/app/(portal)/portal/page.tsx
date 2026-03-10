const portalTasks = [
  "Complete organization profile",
  "Submit quarterly narrative report",
  "Upload signed grant agreement",
];

export default function PortalPage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">External Portal</p>
        <h1>Guided flows for applicants, grantees, reviewers, and partners.</h1>
        <p className="lede">
          External users see tasks, forms, and statuses instead of the full
          internal system complexity.
        </p>
      </section>

      <section className="grid">
        {portalTasks.map((task) => (
          <article key={task} className="card">
            <h2>{task}</h2>
            <p>Portal workflow placeholder for the initial product slice.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
