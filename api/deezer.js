const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const path = req.query.path;

    if (!path) {
      return res.status(400).json({ error: "Missing path parameter" });
    }

    const deezerURL = `https://api.deezer.com/${path}`;

    const response = await fetch(deezerURL);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Failed to reach Deezer API" });
  }
};
