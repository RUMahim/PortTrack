const express = require('express')
const Shipment = require('../models/Shipment')
const Container = require('../models/Container')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

// Generate a tracking ID like PT-2026-1042
async function generateTrackingId() {
  const year = new Date().getFullYear()
  let trackingId
  let exists = true
  while (exists) {
    const num = Math.floor(1000 + Math.random() * 9000)
    trackingId = `PT-${year}-${num}`
    exists = await Shipment.findOne({ trackingId })
  }
  return trackingId
}

// Importers/exporters only see their own shipments; admin sees all
function ownerFilter(req) {
  return req.user.role === 'admin' ? {} : { owner: req.user._id }
}

// GET /api/shipments?search=&type=
router.get('/', protect, async (req, res) => {
  try {
    const filter = { ...ownerFilter(req) }
    if (req.query.type) filter.type = req.query.type
    if (req.query.search) {
      const q = req.query.search.trim()
      filter.$or = [
        { trackingId: { $regex: q, $options: 'i' } },
        { containerId: { $regex: q, $options: 'i' } },
        { goodsType: { $regex: q, $options: 'i' } },
      ]
    }
    const shipments = await Shipment.find(filter)
      .populate('ship', 'name imo company dockNumber status')
      .populate('owner', 'name email role')
      .sort({ createdAt: -1 })
    res.json(shipments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/shipments/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ _id: req.params.id, ...ownerFilter(req) })
      .populate('ship', 'name imo company dockNumber status arrivalDate departureDate')
      .populate('owner', 'name email role')
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' })
    res.json(shipment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/shipments - creates the shipment and its container together
// Body: type, containerId, goodsType, origin, destination, ship, owner (admin only), weight, trackingId (optional)
router.post('/', protect, async (req, res) => {
  try {
    const { type, containerId, goodsType, origin, destination, ship, weight } = req.body
    if (!type || !containerId || !goodsType || !origin || !destination) {
      return res.status(400).json({
        message: 'type, containerId, goodsType, origin and destination are required',
      })
    }
    if (!['import', 'export'].includes(type)) {
      return res.status(400).json({ message: 'type must be import or export' })
    }
    const owner = req.user.role === 'admin' && req.body.owner ? req.body.owner : req.user._id
    const trackingId = req.body.trackingId || (await generateTrackingId())

    const shipment = await Shipment.create({
      trackingId,
      type,
      containerId,
      goodsType,
      origin,
      destination,
      ship: ship || undefined,
      owner,
    })

    const container = await Container.create({
      containerId,
      shipment: shipment._id,
      weight: weight || 0,
      goodsType,
      currentStatus: 'Booked',
      statusHistory: [{ status: 'Booked', date: new Date() }],
    })

    res.status(201).json({ shipment, container })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT /api/shipments/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const shipment = await Shipment.findOneAndUpdate(
      { _id: req.params.id, ...ownerFilter(req) },
      req.body,
      { new: true, runValidators: true }
    )
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' })
    res.json(shipment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /api/shipments/:id - also deletes its container
router.delete('/:id', protect, async (req, res) => {
  try {
    const shipment = await Shipment.findOneAndDelete({ _id: req.params.id, ...ownerFilter(req) })
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' })
    await Container.deleteMany({ shipment: shipment._id })
    res.json({ message: 'Shipment deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
