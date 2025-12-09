// /api/track.js — Guarda visitas en visits.json dentro de tu repo usando GitHub API

const GITHUB_API = "https://api.github.com";

export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;   // "usuario/APP_OPENCV"
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!token || !repo) {
      return res.status(500).json({ ok: false, error: "Missing GitHub token or repo." });
    }

    // --- Datos de visita ---
    const rawIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
    const ip = maskIp(rawIp);
    const userAgent = req.headers["user-agent"] || "";
    const referrer = req.headers["referer"] || "";
    const timestamp = new Date().toISOString();

    const newVisit = { ip, userAgent, referrer, timestamp };

    // --- 1. Obtener visits.json existente ---
    const getUrl = `${GITHUB_API}/repos/${repo}/contents/visits.json?ref=${branch}`;
    const getResp = await fetch(getUrl, {
      method: "GET",
      headers: { Authorization: `token ${token}` }
    });

    let visits = [];
    let sha = null;

    if (getResp.status === 200) {
      const data = await getResp.json();
      sha = data.sha;
      const decoded = Buffer.from(data.content, "base64").toString("utf8");
      try { visits = JSON.parse(decoded); } catch { visits = []; }
    }

    // --- 2. Añadir nueva visita ---
    visits.push(newVisit);

    // --- 3. Subir el archivo actualizado ---
    const updatedContent = Buffer.from(JSON.stringify(visits, null, 2)).toString("base64");

    const putUrl = `${GITHUB_API}/repos/${repo}/contents/visits.json`;
    const putResp = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Add visit ${timestamp}`,
        content: updatedContent,
        branch,
        sha
      })
    });

    if (!putResp.ok) {
      const txt = await putResp.text();
      console.error("GitHub update failed:", txt);
      return res.status(500).json({ ok: false, error: "GitHub update failed" });
    }

    res.status(200).json({
      ok: true,
      total: visits.length,
      lastVisit: timestamp
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
}

// --- Función para anonimizar IP (opc. GDPR) ---
function maskIp(ip) {
  if (ip === "unknown") return ip;
  const parts = ip.split(".");
  if (parts.length === 4) {
    parts[3] = "0";
    return parts.join(".");
  }
  return ip; // IPv6 simplificada
}
