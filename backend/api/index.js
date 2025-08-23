const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const getDbData = () => {
  const dbPath = path.join(__dirname, '../db.json')
  const rawData = fs.readFileSync(dbPath, 'utf8')
  return JSON.parse(rawData)
}

app.get('/api/products', (req, res) => {
  const data = getDbData()
  res.json(data.products || [])
})

app.get('/api/users', (req, res) => {
  const data = getDbData()
  res.json(data.users || [])
})

module.exports = app


