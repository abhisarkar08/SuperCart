import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServerlessExpress } from '@vercel/node'; // Not mandatory, you can also do manual

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const getDbData = () => {
  try {
    const dbPath = path.join(__dirname, '../backend/db.json'); // fixed path
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch {
    return { products: [], users: [] };
  }
};

app.get('/', (_, res) => res.json({ status: 'API Working!' }));

app.get('/products', (_, res) => {
  const { products = [] } = getDbData();
  res.json(products);
});

app.get('/users', (req, res) => {
  const { email, password } = req.query;
  let { users = [] } = getDbData();
  if (email && password) {
    users = users.filter(u => u.email === email && u.password === password);
  }
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  const db = getDbData();
  const users = db.users || [];
  if (users.find(u => u.email === newUser.email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  users.push(newUser);
  fs.writeFileSync(
    path.join(__dirname, '../backend/db.json'),
    JSON.stringify({ ...db, users }, null, 2),
    'utf8'
  );
  res.status(201).json(newUser);
});

export default app;







