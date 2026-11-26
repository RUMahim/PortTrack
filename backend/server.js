const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const shipRoutes = require('./routes/shipRoutes')
const shipmentRoutes = require('./routes/shipmentRoutes')
const containerRoutes = require('./routes/containerRoutes')
const trackRoutes = require('./routes/trackRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('PortTrack Backend is Running!')
})

app.get('/api/test', (req, res) => {
  res.json({
    message: 'PortTrack API is working!',
  })
})

app.get('/api/info', (req, res) => {
  res.json({
    project: 'PortTrack',
    version: '1.0.0',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/ships', shipRoutes)
app.use('/api/shipments', shipmentRoutes)
app.use('/api/containers', containerRoutes)
app.use('/api/track', trackRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/users', userRoutes)

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' })
})

// Central error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 5000

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
