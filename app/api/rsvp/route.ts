import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type RSVPBody = {
  name: string;
  attending: "Yes" | "No";
  guests: number;
};

function safeNumber(n: unknown, fallback = 1) {
  const x = Number(n);
  if (!Number.isFinite(x)) return fallback;
  return Math.min(10, Math.max(1, Math.round(x)));
}

function nowIST() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

function buildEmailHTML(data: RSVPBody) {
  const rows = [
    ["Name", data.name || "Guest"],
    ["Attending", data.attending === "Yes" ? "✅ Coming" : "❌ Can't"],
    ["Guests", String(data.guests)],
    ["Time (IST)", nowIST()],
  ];

  const tr = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 12px;border:1px solid rgba(255,255,255,.10);color:rgba(255,255,255,.75)">${k}</td>
        <td style="padding:10px 12px;border:1px solid rgba(255,255,255,.10);color:#fff;font-weight:600">${v}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family: ui-sans-serif, system-ui; background:#0b0f14; color:#fff; padding:22px; border-radius:16px">
    <div style="letter-spacing:.28em; text-transform:uppercase; font-size:11px; color:rgba(214,175,97,.95);">
      RSVP RECEIVED
    </div>
    <h2 style="margin:10px 0 6px; font-size:22px;">New RSVP Submission</h2>
    <p style="margin:0 0 14px; color:rgba(255,255,255,.70); font-size:13px;">
      A guest has responded on your wedding website.
    </p>

    <table style="width:100%; border-collapse:collapse; overflow:hidden; border-radius:14px; border:1px solid rgba(255,255,255,.10)">
      ${tr}
    </table>

    <p style="margin:14px 0 0; color:rgba(255,255,255,.55); font-size:12px;">
      Sent automatically from your website backend.
    </p>
  </div>`;
}

async function sendEmailToOwners(data: RSVPBody) {
  const user = process.env.RSVP_GMAIL_USER;
  const pass = process.env.RSVP_GMAIL_APP_PASS;
  const recipients = process.env.RSVP_NOTIFY_EMAILS;

  if (!user || !pass || !recipients) {
    console.warn("RSVP email not configured: missing env vars");
    return;
  }

  const toList = recipients
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const eventName = process.env.RSVP_EVENT_NAME || "Wedding RSVP";
  const fromName = process.env.RSVP_FROM_NAME || "Wedding Invitation";

  const subject = `${eventName} • ${
    data.attending === "Yes" ? "✅ Coming" : "❌ Can't"
  } • ${data.name || "Guest"}`;

  await transporter.sendMail({
    from: `"${fromName}" <${user}>`,
    to: toList, // ✅ 2 emails here
    subject,
    html: buildEmailHTML(data),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<RSVPBody>;

    const data: RSVPBody = {
      name: String(body.name ?? "").slice(0, 80),
      attending: body.attending === "No" ? "No" : "Yes",
      guests: safeNumber(body.guests, 1),
    };

    await sendEmailToOwners(data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
