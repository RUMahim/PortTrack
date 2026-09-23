import { useState } from 'react'
import ShipManagement from './pages/ShipManagement'
import ShipmentManagement from './pages/ShipmentManagement'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState('dashboard')

  if (loggedIn) {
    return (
      <div>
        {/* Dashboard */}
        {page === 'dashboard' && (
          <>
            <h1>PortTrack Dashboard</h1>

            <p>Welcome to PortTrack!</p>

            <h2>Dashboard</h2>

            <p>Total Ships: Managed in Ship Management</p>
            <p>Total Shipments: Managed in Shipment Management</p>
            <p>Total Containers: 0</p>
            <p>Delivered: 0</p>

            <h2>Menu</h2>

            <button onClick={() => setPage('ships')}>
              Ship Management
            </button>

            <br />
            <br />

            <button onClick={() => setPage('shipments')}>
              Shipment Management
            </button>

            <br />
            <br />

            <button>
              Container Management
            </button>

            <br />
            <br />

            <button>
              Track Shipment
            </button>

            <br />
            <br />

            <button>
              Notifications
            </button>

            <br />
            <br />

            <button
              onClick={() => {
                setLoggedIn(false)
                setPage('dashboard')
              }}
            >
              Logout
            </button>
          </>
        )}

        {/* Ship Management */}
        {page === 'ships' && (
          <>
            <ShipManagement />

            <br />

            <button onClick={() => setPage('dashboard')}>
              Back to Dashboard
            </button>
          </>
        )}

        {/* Shipment Management */}
        {page === 'shipments' && (
          <>
            <ShipmentManagement />

            <br />

            <button onClick={() => setPage('dashboard')}>
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    )
  }

  // Login / Welcome
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

          <br />
          <br />

          <label>Password:</label>
          <br />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <br />
          <br />

          <button onClick={() => setLoggedIn(true)}>
            Login
          </button>

          {' '}

          <button onClick={() => setShowLogin(false)}>
            Back
          </button>
        </>
      )}
    </div>
  )
}

export default App