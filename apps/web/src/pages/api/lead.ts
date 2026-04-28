import type { APIRoute } from "astro";
import { sql } from "@vercel/postgres";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = { "Content-Type": "application/json" };

  try {
    const body = await request.json();

    if (body.website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    const { name, phone, preferred_time } = body;
    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), { status: 400, headers });
    }

    const utm_source = body.utm_source || null;
    const utm_medium = body.utm_medium || null;
    const utm_campaign = body.utm_campaign || null;
    const utm_content = body.utm_content || null;
    const utm_term = body.utm_term || null;
    const source_page = body.source_page || "";
    const userAgent = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

    const result = await sql`
      INSERT INTO leads (name, phone, preferred_time, utm_source, utm_medium, utm_campaign, utm_content, utm_term, source_page, user_agent, ip)
      VALUES (${name}, ${phone}, ${preferred_time || "any"}, ${utm_source}, ${utm_medium}, ${utm_campaign}, ${utm_content}, ${utm_term}, ${source_page}, ${userAgent}, ${ip})
      RETURNING id, created_at
    `;

    sendTelegramNotification({ name, phone, preferred_time, utm_source, source_page });

    return new Response(JSON.stringify({ ok: true, id: result.rows[0]?.id }), { status: 201, headers });
  } catch (err) {
    console.error("Lead submission error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers });
  }
};

async function sendTelegramNotification(lead: Record<string, string | null | undefined>) {
  const token = import.meta.env.TG_BOT_TOKEN;
  const chatIds = (import.meta.env.TG_CHAT_IDS || "").split(",").filter(Boolean);
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
