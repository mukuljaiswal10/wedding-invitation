import { NextResponse } from "next/server";
import { invite } from "@/data/invite";

export const runtime = "nodejs";

function icsEscape(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toICSDateUTC(d: Date) {
  // YYYYMMDDTHHMMSSZ
  const iso = d.toISOString(); // UTC
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export async function GET() {
  const title =
    invite.calendar?.title ||
    `${invite.couple.groom} & ${invite.couple.bride} — Wedding`;

  const details =
    invite.calendar?.details ||
    "Wedding celebration — thank you for being part of our special day.";

  const startISO = invite.calendar?.startISO || invite.dateISO;
  const durationMinutes = invite.calendar?.durationMinutes ?? 240;

  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const location = `${invite.venue.name}${
    invite.venue.address ? `, ${invite.venue.address}` : ""
  }`;

  const dtStart = toICSDateUTC(start);
  const dtEnd = toICSDateUTC(end);
  const dtStamp = toICSDateUTC(new Date());
  const uid = `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}@wedding-invite`;

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${icsEscape(title)}
LOCATION:${icsEscape(location)}
DESCRIPTION:${icsEscape(details)}
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="wedding-invite.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
