import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database';
import { registerRoutes } from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const apiBaseUrl = getApiBaseUrl();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

registerRoutes(app, apiBaseUrl);

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});

export { db };
