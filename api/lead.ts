import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    if (body.website) {
      return res.status(200).json({ ok: true });
    }

    const { name, phone, preferred_time } = body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const utm_source = body.utm_source || null;
    const utm_medium = body.utm_medium || null;
    const utm_campaign = body.utm_campaign || null;
    const utm_content = body.utm_content || null;
    const utm_term = body.utm_term || null;
    const source_page = body.source_page || "";
    const userAgent = (req.headers["user-agent"] as string) || "";
    const ip = ((req.headers["x-forwarded-for"] as string) || "").split(",")[0]?.trim() || "";

    const result = await sql`
      INSERT INTO leads (name, phone, preferred_time, utm_source, utm_medium, utm_campaign, utm_content, utm_term, source_page, user_agent, ip)
      VALUES (${name}, ${phone}, ${preferred_time || "any"}, ${utm_source}, ${utm_medium}, ${utm_campaign}, ${utm_content}, ${utm_term}, ${source_page}, ${userAgent}, ${ip})
      RETURNING id, created_at
    `;

    sendTelegramNotification({ name, phone, preferred_time, utm_source, source_page });

    return res.status(201).json({ ok: true, id: result.rows[0]?.id });
  } catch (err) {
    console.error("Lead submission error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

function sendTelegramNotification(lead: Record<string, string | null | undefined>) {
  const token = process.env.TG_BOT_TOKEN;
  const chatIds = (process.env.TG_CHAT_IDS || "").split(",").filter(Boolean);
  if (!token || chatIds.length === 0) return;

  const lines = [
    `🏡 <b>Новий лід — Polish Hill</b>`,
    ``,
    `👤 Ім'я: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
  ];
  if (lead.preferred_time && lead.preferred_time !== "any") {
    lines.push(`🕐 Зручний час: ${lead.preferred_time}`);
  }
  if (lead.utm_source) {
    lines.push(`📊 UTM: ${lead.utm_source}`);
  }
  if (lead.source_page) {
    lines.push(`📄 Сторінка: ${lead.source_page}`);
  }

  const text = lines.join("\n");

  for (const chatId of chatIds) {
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId.trim(), text, parse_mode: "HTML" }),
    }).catch(() => {});
  }
}
