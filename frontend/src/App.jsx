import { useState } from 'react'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState('dashboard')

  const [shipName, setShipName] = useState('')
  const [imoNumber, setImoNumber] = useState('')
  const [company, setCompany] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [dockNumber, setDockNumber] = useState('')
  const [status, setStatus] = useState('Expected')

  const [ships, setShips] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const addShip = () => {
    if (
      shipName === '' ||
      imoNumber === '' ||
      company === '' ||
      arrivalDate === '' ||
      departureDate === '' ||
      dockNumber === ''
    ) {
      alert('Please fill all fields')
      return
    }

    const newShip = {
      name: shipName,
      imo: imoNumber,
      company: company,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      dockNumber: dockNumber,
      status: status,
    }

    setShips([...ships, newShip])

    clearForm()
  }

  const deleteShip = (index) => {
    const updatedShips = ships.filter((_, i) => i !== index)
    setShips(updatedShips)
  }

  const editShip = (index) => {
    const ship = ships[index]

    setShipName(ship.name)
    setImoNumber(ship.imo)
    setCompany(ship.company)
    setArrivalDate(ship.arrivalDate)
    setDepartureDate(ship.departureDate)
    setDockNumber(ship.dockNumber)
    setStatus(ship.status)

    setEditIndex(index)
  }

  const updateShip = () => {
    if (
      shipName === '' ||
      imoNumber === '' ||
      company === '' ||
      arrivalDate === '' ||
      departureDate === '' ||
      dockNumber === ''
    ) {
      alert('Please fill all fields')
      return
    }

    const updatedShips = [...ships]

    updatedShips[editIndex] = {
      name: shipName,
      imo: imoNumber,
      company: company,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      dockNumber: dockNumber,
      status: status,
    }

    setShips(updatedShips)

    clearForm()
  }

  const clearForm = () => {
    setShipName('')
    setImoNumber('')
    setCompany('')
    setArrivalDate('')
    setDepartureDate('')
    setDockNumber('')
    setStatus('Expected')
    setEditIndex(null)
  }

  if (loggedIn) {
    return (
      <div>
        {page === 'dashboard' && (
          <>
            <h1>PortTrack Dashboard</h1>

            <p>Welcome to PortTrack!</p>

            <h2>Dashboard</h2>

            <p>Total Ships: {ships.length}</p>
            <p>Total Shipments: 0</p>
            <p>Total Containers: 0</p>
            <p>Delivered: 0</p>

            <h2>Menu</h2>

            <button onClick={() => setPage('ships')}>
              Ship Management
            </button>

            <br /><br />

            <button onClick={() => setPage('shipments')}>
  Shipment Management
</button>
            

            <br /><br />

            <button>Container Management</button>

            <br /><br />

            <button>Track Shipment</button>

            <br /><br />

            <button>Notifications</button>

            <br /><br />

            <button onClick={() => setLoggedIn(false)}>
              Logout
            </button>
          </>
        )}

        {page === 'ships' && (
          <>
            <h1>Ship Management</h1>

            <p>
              Manage ships arriving and departing from the port.
            </p>

            <h2>
              {editIndex === null ? 'Add Ship' : 'Edit Ship'}
            </h2>

            <label>Ship Name:</label>
            <br />

            <input
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
              placeholder="Enter ship name"
            />

            <br /><br />

            <label>IMO Number:</label>
            <br />

            <input
              value={imoNumber}
              onChange={(e) => setImoNumber(e.target.value)}
              placeholder="Enter IMO number"
            />

            <br /><br />

            <label>Shipping Company:</label>
            <br />

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
            />

            <br /><br />

            <label>Arrival Date:</label>
            <br />

            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />

            <br /><br />

            <label>Departure Date:</label>
            <br />

            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />

            <br /><br />

            <label>Dock Number:</label>
            <br />

            <input
              value={dockNumber}
              onChange={(e) => setDockNumber(e.target.value)}
              placeholder="Enter dock number"
            />

            <br /><br />

            <label>Status:</label>
            <br />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Expected">Expected</option>
              <option value="Arrived">Arrived</option>
              <option value="Departed">Departed</option>
            </select>

            <br /><br />

            {editIndex === null ? (
              <button onClick={addShip}>
                Add Ship
              </button>
            ) : (
              <button onClick={updateShip}>
                Update Ship
              </button>
            )}

            <h2>Ship List</h2>

            {ships.length === 0 ? (
              <p>No ships added yet.</p>
            ) : (
              ships.map((ship, index) => (
                <div key={index}>
                  <p>
                    <strong>Ship Name:</strong> {ship.name}
                  </p>

                  <p>
                    <strong>IMO Number:</strong> {ship.imo}
                  </p>

                  <p>
                    <strong>Company:</strong> {ship.company}
                  </p>

                  <p>
                    <strong>Arrival Date:</strong> {ship.arrivalDate}
                  </p>

                  <p>
                    <strong>Departure Date:</strong> {ship.departureDate}
                  </p>

                  <p>
                    <strong>Dock Number:</strong> {ship.dockNumber}
                  </p>

                  <p>
                    <strong>Status:</strong> {ship.status}
                  </p>

                  <button onClick={() => editShip(index)}>
                    Edit
                  </button>

                  {' '}

                  <button onClick={() => deleteShip(index)}>
                    Delete
                  </button>

                  <hr />
                </div>
              ))
            )}

                        <button onClick={() => setPage('dashboard')}>
              Back to Dashboard
            </button>
          </>
        )}

        {page === 'shipments' && (
          <>
            <h1>Shipment Management</h1>

            <p>Manage import and export shipments.</p>
<label>Tracking ID:</label>
    <br />

    <input
      placeholder="Enter tracking ID"
    />

    <br /><br />

            <button onClick={() => setPage('dashboard')}>
              Back to Dashboard
            </button>
          </>
        )}

      </div>
    )
  }

  return (
    <div>
      {!showLogin ? (
        <>
          <h1>PortTrack</h1>

          <p>Container Cargo Tracking System</p>

          <h2>Welcome to PortTrack</h2>

          <button onClick={() => setShowLogin(true)}>
            Login
          </button>
        </>
      ) : (
        <>
          <h1>PortTrack Login</h1>

          <label>Email:</label>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
          />

          <br /><br />

          <label>Password:</label>
          <br />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <br /><br />

          <button onClick={() => setLoggedIn(true)}>
            Login
          </button>

          <button onClick={() => setShowLogin(false)}>
            Back
          </button>
        </>
      )}
    </div>
  )
}

export default App