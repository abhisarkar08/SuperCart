// api/index.js

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Read db.json from backend folder
const getDbData = () => {
  try {
    const dbPath = path.join(process.cwd(), 'backend/db.json')
    const rawData = fs.readFileSync(dbPath, 'utf8')
    return JSON.parse(rawData)
  } catch (error) {
    return { products: [], users: [] }
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API Working!' })
})

// Products endpoint
app.get('/products', (req, res) => {
  const data = getDbData()
  res.json(data.products || [])
})

// Users endpoint with optional email/password filtering
app.get('/users', (req, res) => {
  const { email, password } = req.query
  const db = getDbData()
  let users = db.users || []

  // If email and password are provided, filter the users array
  if (email && password) {
    users = users.filter(
      u => u.email === email && u.password === password
    )
  }

  res.json(users)
})

// Registration endpoint
app.post('/users', (req, res) => {
  const newUser = req.body
  const db = getDbData()
  const users = db.users || []

  // Prevent duplicate emails
  if (users.find(u => u.email === newUser.email)) {
    return res.status(400).json({ error: 'Email already registered' })
  }

  users.push(newUser)

  // Save back to db.json
  fs.writeFileSync(
    path.join(process.cwd(), 'backend/db.json'),
    JSON.stringify({ ...db, users }, null, 2),
    'utf8'
  )

  res.status(201).json(newUser)
})

module.exports = app




