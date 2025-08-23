// api/index.js

const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

// ===== CORS SETUP =====
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')             // allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS') // allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // allowed headers
  if (req.method === 'OPTIONS') return res.sendStatus(204)      // preflight
  next()
})
// ======================

app.use(express.json())

// Read db.json from backend folder
const getDbData = () => {
  try {
    const dbPath = path.join(process.cwd(), 'backend/db.json')
    const rawData = fs.readFileSync(dbPath, 'utf8')
    return JSON.parse(rawData)
  } catch {
    return { products: [], users: [] }
  }
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API Working!' })
})

// Products endpoint
app.get('/products', (req, res) => {
  const data = getDbData()
  res.json(data.products || [])
})

// Users with optional filtering
app.get('/users', (req, res) => {
  const { email, password } = req.query
  const db = getDbData()
  let users = db.users || []
  if (email && password) {
    users = users.filter(u => u.email === email && u.password === password)
  }
  res.json(users)
})

// Registration endpoint
app.post('/users', (req, res) => {
  const newUser = req.body
  const db = getDbData()
  const users = db.users || []
  if (users.find(u => u.email === newUser.email)) {
    return res.status(400).json({ error: 'Email already registered' })
  }
  users.push(newUser)
  fs.writeFileSync(
    path.join(process.cwd(), 'backend/db.json'),
    JSON.stringify({ ...db, users }, null, 2),
    'utf8'
  )
  res.status(201).json(newUser)
})

module.exports = app





