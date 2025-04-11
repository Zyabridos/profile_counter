export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  const myIp = '84.52.243.200';
  const myAgentSignature = 'Macintosh';

  if (ip.includes(myIp) || userAgent.includes(myAgentSignature)) {
    return res.status(204).end(); // не учитываем себя
  }

  console.log(`[${new Date().toISOString()}] Visitor: ${ip} — ${userAgent}`);

  const img = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64'
  );
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Content-Length', img.length);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).end(img);
}
