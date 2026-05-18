import Link from "next/link";

export default function NotFoundEn() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 28px",
      }}
    >
      <p className="nx-eyebrow" style={{ color: "var(--nx-accent)" }}>
        404
      </p>
      <h1 className="nx-display" style={{ fontSize: "clamp(36px,5vw,64px)", margin: "16px 0 12px" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--nx-600)", maxWidth: 480 }}>
        The page you’re looking for may have moved or never existed.
      </p>
      <Link href="/en" className="nx-btn nx-btn--primary" style={{ marginTop: 28 }}>
        Back to home
      </Link>
    </section>
  );
}
