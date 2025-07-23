import React, { useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import useShifts from '../utils/useShifts';
import useLocations from '../utils/useLocations';
import usePositions from '../utils/usePositions';
import useShiftsWithEmployeeDetails from '../utils/useShiftsWithEmployeeDetails';
import '../styles/dashboard.css';
import '../styles/siteStyle.css';
import Menu from '../components/Menu';

function DashboardPage() {
  // ===== Data Hooks =====
  const { employees, fetchEmployees, loading: loadingEmployees, error: errorEmployees } = useEmployees();
  const { shifts, fetchShifts, loading: loadingShifts, error: errorShifts } = useShifts();
  const { locations, fetchLocations, loading: loadingLocations, error: errorLocations } = useLocations();
  const { positions, fetchPositions, loading: loadingPositions, error: errorPositions } = usePositions();
  const { detailedShifts, fetchShiftsWithDetails, loading: loadingDetailedShifts, error: errorDetailedShifts } = useShiftsWithEmployeeDetails();

  // ===== Fetch Data on Mount =====
  useEffect(() => {
    fetchEmployees();
    fetchShifts();
    fetchLocations();
    fetchPositions();
    fetchShiftsWithDetails();
  }, [fetchEmployees, fetchShifts, fetchLocations, fetchPositions, fetchShiftsWithDetails]);

  // ===== Render =====
  return (
    <>
      <header>
        <Menu />
      </header>
      <main className="calendar-main">
        {/* Main Container */}
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          {/* Loading/Error */}
          {(loadingEmployees || loadingShifts || loadingLocations || loadingPositions) && (
            <div className="loading">Loading data...</div>
          )}
          {(errorEmployees || errorShifts || errorLocations || errorPositions) && (
            <div className="error" style={{ color: 'red' }}>
              {errorEmployees && <div>Employee Error: {errorEmployees.message}</div>}
              {errorShifts && <div>Shifts Error: {errorShifts.message}</div>}
              {errorLocations && <div>Locations Error: {errorLocations.message}</div>}
              {errorPositions && <div>Positions Error: {errorPositions.message}</div>}
            </div>
          )}
          {/* Grid Layout */}
          <div className="dashboard-grid">
            {/* Left Section */}
            <div className="left-section">
              {/* Quick Actions */}
              <div className="quick-actions">
                <button className="action-card" title="Notifications"><span className="material-icons">notifications</span></button>
                <button className="action-card" title="Schedule"><span className="material-icons">schedule</span></button>
                <button className="action-card" title="Calendar"><span className="material-icons">calendar_today</span></button>
                <button className="action-card" title="Add"><span className="material-icons">add</span></button>
              </div>
              {/* Employee List */}
              <div className="employee-list">
                <div className="employee-row header">
                  <div className="col checkbox"><input type="checkbox" disabled /></div>
                  <div className="col name">Name</div>
                  <div className="col status">Status</div>
                  <div className="col toggle">Toggle</div>
                </div>
                {employees && employees.length > 0 ? (
                  employees.map(emp => (
                    <div className="employee-row" key={emp.id}>
                      <div className="col checkbox"><input type="checkbox" /></div>
                      <div className="col name">{emp.name || (emp.firstName + ' ' + emp.lastName) || emp.id}</div>
                      <div className="col status">{emp.status || 'Unknown'}</div>
                      <div className="col toggle">
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="employee-row"><div className="col name">No employees found</div></div>
                )}
              </div>
              {/* Locations Dropdown */}
              <div className="form-group">
                <label htmlFor="location-dropdown">Select Location: </label>
                <select id="location-dropdown" disabled={loadingLocations}>
                  <option value="">-- Select --</option>
                  {locations && locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name || loc.id}</option>
                  ))}
                </select>
                <div className="form-error">
                  {loadingLocations && <span>Loading...</span>}
                  {errorLocations && <span className="error-text">Error loading locations</span>}
                </div>
              </div>
              {/* Positions Dropdown */}
              <div className="form-group">
                <label htmlFor="position-dropdown">Select Position: </label>
                <select id="position-dropdown" disabled={loadingPositions}>
                  <option value="">-- Select --</option>
                  {positions && positions.map(pos => (
                    <option key={pos.id} value={pos.id}>{pos.name || pos.id}</option>
                  ))}
                </select>
                <div className="form-error">
                  {loadingPositions && <span>Loading...</span>}
                  {errorPositions && <span className="error-text">Error loading positions</span>}
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="right-section">
              <div className="shift-card">
                <h3>Employee Shifts</h3>
                <div className="card-content">
                  {loadingDetailedShifts && <span>Loading shifts...</span>}
                  {errorDetailedShifts && <span style={{ color: 'red' }}>Error loading shifts</span>}
                  {detailedShifts && detailedShifts.length > 0 ? (
                    <ul>
                      {detailedShifts.map(shift => (
                        <li key={shift.id}>
                          <strong>{shift.employee?.firstName || ''} {shift.employee?.lastName || ''}</strong>
                          {shift.position?.name && <> | Position: {shift.position.name}</>}
                          {shift.location?.name && <> | Location: {shift.location.name}</>}
                          <br />
                          {shift.start_time ? `Start: ${shift.start_time}` : ''}
                          {shift.end_time ? ` | End: ${shift.end_time}` : ''}
                          {shift.description ? <><br />{shift.description}</> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No shifts found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        {/* Footer */}
      </footer>
    </>
  );
}

export default DashboardPage;
