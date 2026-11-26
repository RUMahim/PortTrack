const express = require('express')
const Notification = require('../models/Notification')
const { protect } = require('../middleware/auth')

const router = express.Router()

// GET /api/notifications - my notifications, newest first
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 })
    const unreadCount = notifications.filter((n) => !n.isRead).length
    res.json({ notifications, unreadCount })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/notifications/read-all
router.put('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true })
    res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/notifications/:id/read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    )
    if (!notification) return res.status(404).json({ message: 'Notification not found' })
    res.json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
