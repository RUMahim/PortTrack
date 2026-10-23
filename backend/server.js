const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
const Ship = require('./models/Ships')

const PORT = 5000

app.get('/', (req, res) => {
  res.send('PortTrack Backend is Running!')
})

app.get('/api/test', (req, res) => {
  res.json({
    message: 'PortTrack API is working!'
  })
})
app.get('/api/info', (req, res) => {
  res.json({
    project: 'PortTrack',
    version: '1.0.0',
  })
})

app.post('/api/ships', async (req, res) => {
  try {
    const ship = await Ship.create(req.body)
    res.status(201).json(ship)
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas Connected!')
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
  })