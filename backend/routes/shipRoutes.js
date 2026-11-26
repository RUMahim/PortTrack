const express = require('express')
const Ship = require('../models/Ships')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

// GET /api/ships - all ships (any logged-in user)
router.get('/', protect, async (req, res) => {
  try {
    const ships = await Ship.find().sort({ arrivalDate: 1 })
    res.json(ships)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/ships/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.id)
    if (!ship) return res.status(404).json({ message: 'Ship not found' })
    res.json(ship)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/ships - admin only
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const ship = await Ship.create(req.body)
    res.status(201).json(ship)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT /api/ships/:id - admin only
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const ship = await Ship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!ship) return res.status(404).json({ message: 'Ship not found' })
    res.json(ship)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /api/ships/:id - admin only
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id)
    if (!ship) return res.status(404).json({ message: 'Ship not found' })
    res.json({ message: 'Ship deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
