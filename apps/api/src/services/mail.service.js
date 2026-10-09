const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false,
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

async function sendMail({ to, subject, html, replyTo }) {
  if (!process.env.SMTP_USER) {
    console.log('📧 [MAIL désactivé] À:', to, '| Sujet:', subject);
    return { skipped: true };
  }
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || '"SFPA" <noreply@sfpa.org>',
      to: to || process.env.MAIL_TO,
      replyTo,
      subject,
      html,
    });
    console.log('📧 Mail envoyé:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Erreur mail:', err.message);
    return { error: err.message };
  }
}

function templateNotification({ title, fields }) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px;font-weight:bold;vertical-align:top;">${k}</td><td style="padding:8px;">${v}</td></tr>`)
    .join('');
  return `<div style="font-family:sans-serif;max-width:600px;margin:auto;">
    <h2 style="color:#6B8E23;">${title}</h2>
    <table style="border-collapse:collapse;width:100%;background:#F5E9D6;border-radius:8px;">${rows}</table>
    <p style="color:#888;font-size:12px;margin-top:20px;">Notification automatique — SFPA</p>
  </div>`;
}

module.exports = { sendMail, templateNotification };