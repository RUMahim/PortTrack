const mongoose = require('mongoose')

const shipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imo: {
      type: String,
      required: true,
      unique: true,
    },

    company: {
      type: String,
      required: true,
    },

    arrivalDate: {
      type: Date,
      required: true,
    },

    departureDate: {
      type: Date,
      required: true,
    },

    dockNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Expected', 'Arrived', 'Departed'],
      default: 'Expected',
    },
  },
  {
    timestamps: true,
  }
)

const Ship = mongoose.model('Ship', shipSchema)

module.exports = Ship