import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Missing ?path parameter" });
    }

    const deezerURL = `https://api.deezer.com/${path}`;

    const response = await fetch(deezerURL);
    const text = await response.text(); // Deezer sometimes returns text instead of JSON

    // Fix CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Try parse JSON safely
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (err) {
      return res.status(500).json({
        error: "Deezer returned non-JSON response",
        raw: text.substring(0, 300)
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: "Proxy server error",
      details: err.toString(),
    });
  }
}
