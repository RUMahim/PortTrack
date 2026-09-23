function ShipManagement({
    shipName,
    setShipName,
    imoNumber,
    setImoNumber,
    company,
    setCompany,
    arrivalDate,
    setArrivalDate,
    departureDate,
    setDepartureDate,
    dockNumber,
    setDockNumber,
    status,
    setStatus,
    addShip,
    ships,
    deleteShip,
    editIndex,
    editShip,
    updateShip
}) {
    return (
        <div>
            <h1>Ship Management</h1>

            <p>Manage ships arriving and departing from the port.</p>

            <h2>{editIndex === null ? 'Add Ship' : 'Edit Ship'}</h2>

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
        </div>
    )
}

export default ShipManagement