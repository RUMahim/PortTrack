const mongoose = require('mongoose')

const STATUS_STEPS = [
  'Booked',
  'Loaded',
  'In Transit',
  'Arrived at Port',
  'Customs Clearance',
  'Delivered',
]

const containerSchema = new mongoose.Schema(
  {
    containerId: {
      type: String,
      required: true,
      unique: true,
    },

    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipment',
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    goodsType: {
      type: String,
      required: true,
    },

    currentStatus: {
      type: String,
      enum: STATUS_STEPS,
      default: 'Booked',
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: STATUS_STEPS,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

containerSchema.statics.STATUS_STEPS = STATUS_STEPS

const Container = mongoose.model('Container', containerSchema)

module.exports = Container