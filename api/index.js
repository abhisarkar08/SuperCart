// api/index.js

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Read backend/db.json
const getDbData = () => {
  try {
    const dbPath = path.join(process.cwd(), 'backend/db.json');
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch {
    return { products: [], users: [] };
  }
};

// Health check
app.get('/', (_, res) => res.json({ status: 'API Working!' }));

// Products
app.get('/products', (_, res) => {
  const { products = [] } = getDbData();
  res.json(products);
});

// Users with optional filtering
app.get('/users', (req, res) => {
  const { email, password } = req.query;
  let { users = [] } = getDbData();
  if (email && password) {
    users = users.filter(u => u.email === email && u.password === password);
  }
  res.json(users);
});

// Register
app.post('/users', (req, res) => {
  const newUser = req.body;
  const db = getDbData();
  const users = db.users || [];
  if (users.find(u => u.email === newUser.email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  users.push(newUser);
  fs.writeFileSync(
    path.join(process.cwd(), 'backend/db.json'),
    JSON.stringify({ ...db, users }, null, 2),
    'utf8'
  );
  res.status(201).json(newUser);
});

export default app;





