// api/paste.js
let pastes = {}; // Temporary memory (resets on redeploy)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = await req.text();
    const id = Math.random().toString(36).substring(2, 8);
    pastes[id] = body;
    return res.status(200).send(`https://${req.headers.host}/?id=${id}`);
  }

  if (req.method === "GET") {
    const { id } = req.query;
    if (id && pastes[id]) {
      res.setHeader("Content-Type", "text/plain");
      return res.send(pastes[id]);
    }
    return res.status(404).send("Paste not found");
  }

  res.status(405).send("Method not allowed");
}
