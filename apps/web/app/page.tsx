const modules = [
  "CRM",
  "Fundraising",
  "Programs",
  "Grants",
  "MEL",
  "Portal",
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Nonprofit Operations Platform</p>
        <h1>Replace Salesforce with a purpose-built cloud product.</h1>
        <p className="lede">
          Multi-tenant CRM, grantmaking, program delivery, and impact
          measurement in a single product architecture.
        </p>
      </section>

      <section className="grid">
        {modules.map((module) => (
          <article key={module} className="card">
            <h2>{module}</h2>
            <p>Initial module placeholder for the first product slice.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
