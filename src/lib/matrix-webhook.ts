import "server-only";

export interface MatrixWebhookPayload {
  company: string;
  recipientName: string;
  email: string;
  phone: string;
  locale: "tr" | "en";
  facilityType: string;
  naceCode: string | null;
  naceActivity: string | null;
  employeeCount: number | null;
  matrixStatus: string;
  summary: string;
  submittedAt: string;
}

export async function postMatrixLeadWebhook(
  payload: MatrixWebhookPayload,
): Promise<void> {
  const url = process.env.MATRIS_LEAD_WEBHOOK_URL?.trim();
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[matrix-webhook] non-OK response:", res.status);
    }
  } catch (err) {
    console.error("[matrix-webhook] request failed:", err);
  }
}
