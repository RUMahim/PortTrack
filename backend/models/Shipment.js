const mongoose = require('mongoose')

const shipmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ['import', 'export'],
      required: true,
    },

    containerId: {
      type: String,
      required: true,
    },

    goodsType: {
      type: String,
      required: true,
    },

    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    ship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ship',
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Shipment = mongoose.model('Shipment', shipmentSchema)

module.exports = Shipment