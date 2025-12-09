// /api/track.js — Función Serverless para Vercel
export default function handler(req, res) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers["user-agent"] || "";
  const ref = req.headers["referer"] || "";
  const ts = new Date().toISOString();

  console.log("📥 Nueva visita:", {
    ip,
    userAgent: ua,
    referer: ref,
    timestamp: ts,
  });

  res.status(200).json({ ok: true });
}
