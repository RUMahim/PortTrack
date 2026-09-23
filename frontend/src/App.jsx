import { useState } from 'react'
import ShipManagement from './pages/ShipManagement'

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
    <ShipManagement
      shipName={shipName}
      setShipName={setShipName}
      imoNumber={imoNumber}
      setImoNumber={setImoNumber}
      company={company}
      setCompany={setCompany}
      arrivalDate={arrivalDate}
      setArrivalDate={setArrivalDate}
      departureDate={departureDate}
      setDepartureDate={setDepartureDate}
      dockNumber={dockNumber}
      setDockNumber={setDockNumber}
      status={status}
      setStatus={setStatus}
      addShip={addShip}
      ships={ships}
      deleteShip={deleteShip}
      editIndex={editIndex}
      editShip={editShip}
      updateShip={updateShip}
    />

    <br />

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