export default function Home() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 40 }}>
      <h1 style={{ fontSize: 36, marginBottom: 10 }}>ValueOmni</h1>
      <p style={{ color: "#666", marginBottom: 30 }}>
        Value Investing Knowledge Platform
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2>👤 Investors</h2>
        <ul>
          <li><a href="/people/charlie-munger">Charlie Munger</a></li>
          <li><a href="/people/warren-buffett">Warren Buffett</a></li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>📘 Concepts</h2>
        <ul>
          <li><a href="/concepts/moat">Moat</a></li>
        </ul>
      </section>

      <section>
        <h2>🏷 Tags</h2>
        <ul>
          <li><a href="/tags/value-investing">Value Investing</a></li>
        </ul>
      </section>
    </main>
  );
}