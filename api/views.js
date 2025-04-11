import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  // const ignoreIp = '84.52.243.200';
  // if (ip.includes(ignoreIp)) return res.status(204).end();

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: '👀 Somebody checked your GitHub-profile',
    html: `<p><strong>IP:</strong> ${ip}<br /><strong>User-Agent:</strong> ${userAgent}</p>`,
  });

  const img = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    'base64'
  );

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).end(img);
}
