export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { token } = req.body;
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    const userData = await googleRes.json();
    if (userData.error_description) {
      return res.status(401).json({ error: 'Token yaroqsiz' });
    }
    res.status(200).json({
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      given_name: userData.given_name
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
