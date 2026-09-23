import { useState } from 'react'

function ShipmentManagement() {
  // =========================
  // States
  // =========================

  const [trackingId, setTrackingId] = useState('')
  const [containerId, setContainerId] = useState('')
  const [shipmentType, setShipmentType] = useState('Import')

  const [shipments, setShipments] = useState([])

  // =========================
  // Add Shipment
  // =========================

  const addShipment = () => {
    if (
      trackingId === '' ||
      containerId === ''
    ) {
      alert('Please fill all fields')
      return
    }

    const newShipment = {
      trackingId: trackingId,
      containerId: containerId,
      shipmentType: shipmentType,
    }

    setShipments([...shipments, newShipment])

    clearForm()
  }

  // =========================
  // Clear Form
  // =========================

  const clearForm = () => {
    setTrackingId('')
    setContainerId('')
    setShipmentType('Import')
  }

  // =========================
  // UI
  // =========================

  return (
    <div>
      <h1>Shipment Management</h1>

      <p>
        Manage import and export shipments.
      </p>

      <h2>Add Shipment</h2>

      <label>Tracking ID:</label>
      <br />

      <input
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter tracking ID"
      />

      <br />
      <br />

      <label>Container ID:</label>
      <br />

      <input
        value={containerId}
        onChange={(e) => setContainerId(e.target.value)}
        placeholder="Enter container ID"
      />

      <br />
      <br />

      <label>Shipment Type:</label>
      <br />

      <select
        value={shipmentType}
        onChange={(e) => setShipmentType(e.target.value)}
      >
        <option value="Import">Import</option>
        <option value="Export">Export</option>
      </select>

      <br />
      <br />

      <button onClick={addShipment}>
        Add Shipment
      </button>

      <h2>Shipment List</h2>

      {shipments.length === 0 ? (
        <p>No shipments added yet.</p>
      ) : (
        shipments.map((shipment, index) => (
          <div key={index}>
            <p>
              <strong>Tracking ID:</strong>{' '}
              {shipment.trackingId}
            </p>

            <p>
              <strong>Container ID:</strong>{' '}
              {shipment.containerId}
            </p>

            <p>
              <strong>Shipment Type:</strong>{' '}
              {shipment.shipmentType}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default ShipmentManagement