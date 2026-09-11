const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const frontendPath = path.join(__dirname, '..', 'frontend');
const dataDir = path.join(__dirname, 'data');
const leadsFile = path.join(dataDir, 'leads.json');

app.use(cors());
app.use(express.json({ limit: '100kb' }));

function readLeads() {
  try { return JSON.parse(fs.readFileSync(leadsFile, 'utf8')); }
  catch { return []; }
}

function saveLeads(leads) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2) + '\n', 'utf8');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'lumen-roofing-api' });
});

app.post('/api/inspection', (req, res) => {
  const { name, phone, email, address, service, message } = req.body || {};

  if (!name || !phone || !address) {
    return res.status(400).json({ ok: false, message: 'Name, phone number and property address are required.' });
  }

  const leads = readLeads();
  const lead = {
    id: `LR-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    address: String(address).trim(),
    service: String(service || 'inspection').trim(),
    message: String(message || '').trim(),
    status: 'new'
  };

  leads.push(lead);
  saveLeads(leads);
  console.log(`[NEW LEAD] ${lead.id} — ${lead.name} — ${lead.phone}`);

  res.status(201).json({ ok: true, message: 'Thanks! Your inspection request has been received. The Lumen team will follow up soon.' });
});

// Serve frontend files while keeping the application code in a separate backend folder.
app.use(express.static(frontendPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Lumen Roofing website: http://localhost:${PORT}`);
  console.log(`API health: http://localhost:${PORT}/api/health`);
});
