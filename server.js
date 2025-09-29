import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5174; // Render provides PORT

// Resolve dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server API key not configured' });
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await r.text();
    res.status(r.status).send(data);
  } catch (e) {
    res.status(500).json({ error: 'Proxy error', details: String(e) });
  }
});

// Serve built frontend from /dist when running in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback to index.html (Express 5 requires '/*' instead of '*')
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});


