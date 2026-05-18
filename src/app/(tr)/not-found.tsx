import Link from "next/link";

export default function NotFoundTr() {
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
        Sayfa bulunamadı
      </h1>
      <p style={{ color: "var(--nx-600)", maxWidth: 480 }}>
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link href="/" className="nx-btn nx-btn--primary" style={{ marginTop: 28 }}>
        Anasayfaya dön
      </Link>
    </section>
  );
}
