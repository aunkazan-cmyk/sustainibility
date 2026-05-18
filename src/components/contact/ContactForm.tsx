"use client";
// Contact form island — markup ported from pages-secondary.jsx ContactPage,
// wired to the submitContact Server Action via useActionState. Per-field
// errors, value preservation on error, on-brand success panel.
import { useActionState, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { ArrowRight } from "@/components/shared/primitives";
import {
  submitContact,
  initialContactState,
  type ContactField,
} from "@/actions/contact";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 14,
  background: "#fff",
  border: "1px solid var(--nx-200)",
  borderRadius: 10,
  fontFamily: "inherit",
  color: "var(--nx-900)",
  outline: "none",
  boxSizing: "border-box",
};
const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--nx-700)",
  marginBottom: 6,
  letterSpacing: "0.02em",
};
const errStyle: CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: "#b91c1c",
};

export function ContactForm({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const cp = t.contactPage;
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const v = state.values ?? {};
  const [sector, setSector] = useState<string>(v.sector ?? "");
  const err = (f: ContactField) => state.fieldErrors?.[f];

  if (state.status === "success") {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 48,
          border: "1px solid var(--nx-200)",
          boxShadow: "0 30px 60px -30px rgba(0,0,0,0.08)",
        }}
      >
        <span className="nx-pill" style={{ display: "inline-flex" }}>
          {lang === "TR" ? "Gönderildi" : "Sent"}
        </span>
        <h2
          className="nx-display"
          style={{ fontSize: 30, margin: "18px 0 10px", fontWeight: 500 }}
        >
          {lang === "TR" ? "Teşekkürler." : "Thank you."}
        </h2>
        <p style={{ color: "var(--nx-600)", fontSize: 15, lineHeight: 1.6 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 36,
        border: "1px solid var(--nx-200)",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.08)",
      }}
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — visually hidden, off the a11y tree, bots fill it. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Company URL
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <h2
        className="nx-display"
        style={{
          fontSize: 30,
          margin: 0,
          fontWeight: 500,
          color: "var(--nx-900)",
          letterSpacing: "-0.01em",
        }}
      >
        {cp.formTitle}
      </h2>
      <p style={{ margin: "10px 0 28px", color: "var(--nx-600)", fontSize: 14.5 }}>
        {cp.formIntro}
      </p>

      {state.status === "error" && state.message && !state.fieldErrors && (
        <div
          style={{
            marginBottom: 20,
            padding: "12px 14px",
            borderRadius: 10,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: 13.5,
          }}
        >
          {state.message}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        data-nx-collapse
      >
        <div>
          <label style={labelStyle}>
            {lang === "TR" ? "Ad Soyad" : "Full name"} *
          </label>
          <input
            type="text"
            name="name"
            aria-label={lang === "TR" ? "Ad Soyad" : "Full name"}
            defaultValue={v.name}
            style={inputStyle}
            required
          />
          {err("name") && <div style={errStyle}>{err("name")}</div>}
        </div>
        <div>
          <label style={labelStyle}>
            {lang === "TR" ? "Şirket" : "Company"} *
          </label>
          <input
            type="text"
            name="company"
            aria-label={lang === "TR" ? "Şirket" : "Company"}
            defaultValue={v.company}
            style={inputStyle}
            required
          />
          {err("company") && <div style={errStyle}>{err("company")}</div>}
        </div>
        <div>
          <label style={labelStyle}>
            {lang === "TR" ? "E-posta" : "Email"} *
          </label>
          <input
            type="email"
            name="email"
            aria-label={lang === "TR" ? "E-posta" : "Email"}
            defaultValue={v.email}
            style={inputStyle}
            required
          />
          {err("email") && <div style={errStyle}>{err("email")}</div>}
        </div>
        <div>
          <label style={labelStyle}>
            {lang === "TR" ? "Telefon" : "Phone"} *
          </label>
          <input
            type="tel"
            name="phone"
            aria-label={lang === "TR" ? "Telefon" : "Phone"}
            defaultValue={v.phone}
            style={inputStyle}
            required
          />
          {err("phone") && <div style={errStyle}>{err("phone")}</div>}
        </div>
        <div>
          <label style={labelStyle}>{lang === "TR" ? "Sektör" : "Sector"}</label>
          <select
            name="sector"
            aria-label={lang === "TR" ? "Sektör" : "Sector"}
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            style={inputStyle}
          >
            <option value="">{lang === "TR" ? "Seçin" : "Select"}</option>
            {t.sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="other">{lang === "TR" ? "Diğer" : "Other"}</option>
          </select>
          {sector === "other" && (
            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                name="sectorOther"
                aria-label={lang === "TR" ? "Sektörü belirtin" : "Specify sector"}
                defaultValue={v.sectorOther}
                placeholder={lang === "TR" ? "Sektörü belirtin" : "Specify sector"}
                style={inputStyle}
              />
              {err("sectorOther") && (
                <div style={errStyle}>{err("sectorOther")}</div>
              )}
            </div>
          )}
        </div>
        <div>
          <label style={labelStyle}>
            {lang === "TR" ? "İlgilendiğiniz hizmet" : "Service interest"}
          </label>
          <select
            name="serviceInterest"
            aria-label={
              lang === "TR" ? "İlgilendiğiniz hizmet" : "Service interest"
            }
            defaultValue={v.serviceInterest}
            style={inputStyle}
          >
            <option value="">{lang === "TR" ? "Seçin" : "Select"}</option>
            <option>{t.services.water.title}</option>
            <option>{t.services.sustain.title}</option>
            <option>{t.services.adr.title}</option>
            <option>
              Nexovia Flow — {lang === "TR" ? "erken erişim" : "early access"}
            </option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={labelStyle}>
          {lang === "TR" ? "Mesajınız" : "Message"} *
        </label>
        <textarea
          name="message"
          aria-label={lang === "TR" ? "Mesajınız" : "Message"}
          rows={5}
          defaultValue={v.message}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: 120,
            fontFamily: "inherit",
          }}
          required
        />
        {err("message") && <div style={errStyle}>{err("message")}</div>}
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: 13,
            color: "var(--nx-700)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            name="kvkkAccepted"
            value="1"
            style={{ marginTop: 3 }}
          />
          <span>
            {cp.kvkkNotice}{" "}
            <Link
              href={pathFor("legalKvkk", locale)}
              style={{
                color: "var(--nx-accent)",
                textDecoration: "underline",
              }}
            >
              {lang === "TR" ? "Aydınlatma Metni" : "Privacy Notice"}
            </Link>{" "}
            *
          </span>
        </label>
        {err("kvkkAccepted") && (
          <div style={errStyle}>{err("kvkkAccepted")}</div>
        )}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: 13,
            color: "var(--nx-700)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            name="marketingPermission"
            value="1"
            style={{ marginTop: 3 }}
          />
          <span>
            {lang === "TR"
              ? "Aylık içgörü bültenini almak istiyorum (opsiyonel)."
              : "Send me the monthly insights briefing (optional)."}
          </span>
        </label>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--nx-500)" }}>
          {lang === "TR"
            ? "En az 3 iş günü içinde dönüş yaparız."
            : "We respond within at least 3 business days."}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="nx-btn nx-btn--accent"
          style={{ opacity: pending ? 0.7 : 1 }}
        >
          {pending
            ? lang === "TR"
              ? "Gönderiliyor…"
              : "Sending…"
            : lang === "TR"
              ? "Talebi gönder"
              : "Send request"}
          {!pending && <ArrowRight />}
        </button>
      </div>
    </form>
  );
}
