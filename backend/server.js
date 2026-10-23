const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const PORT = 5000

app.get('/', (req, res) => {
  res.send('PortTrack Backend is Running!')
})

app.get('/api/test', (req, res) => {
  res.json({
    message: 'PortTrack API is working!'
  })
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