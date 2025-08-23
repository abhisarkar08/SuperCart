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

app.get('/', (req, res) => {
  res.json({ status: 'API Working!' })
})

app.get('/products', (req, res) => {
  const data = getDbData()
  res.json(data.products || [])
})

app.get('/users', (req, res) => {
  const data = getDbData()
  res.json(data.users || [])
})

module.exports = app



