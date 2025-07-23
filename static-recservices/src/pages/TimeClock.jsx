import React, { useEffect, useState } from "react";
import useShiftsWithEmployeeDetails from '../utils/useShiftsWithEmployeeDetails';
import Menu from '../components/Menu';
import '../styles/timeClock.css';
import '../styles/siteStyle.css';

// ===== Column Labels =====
const FIELD_LABELS = {
  shiftStart: 'Shift Start',
  shiftEnd: 'Shift End',
  location: 'Location',
  position: 'Position',
  duration: 'Duration',
  payEstimate: 'Pay Estimate',
};

function TimeClockPage() {
  // ===== Data Hooks =====
  const { detailedShifts, fetchShiftsWithDetails, loading, error } = useShiftsWithEmployeeDetails();
  const [search, setSearch] = useState('');
  const [visibleFields, setVisibleFields] = useState({
    shiftStart: true,
    shiftEnd: true,
    location: true,
    position: true,
    duration: true,
    payEstimate: true,
  });

  useEffect(() => {
    fetchShiftsWithDetails();
  }, [fetchShiftsWithDetails]);

  // ===== Utils: Toggle columns =====
  const toggleField = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ===== Utils: Duration =====
  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    try {
      const s = new Date(start);
      const e = new Date(end);
      const mins = Math.floor((e - s) / 60000);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h ${m}m`;
    } catch {
      return "-";
    }
  };

  // ===== Utils: Pay =====
  const calculatePay = (start, end, rate) => {
    if (!start || !end || !rate) return '';
    try {
      const s = new Date(start);
      const e = new Date(end);
      const hours = (e - s) / (1000 * 60 * 60);
      return `$${(hours * rate).toFixed(2)}`;
    } catch {
      return "$-.--";
    }
  };

  // ===== Utils: Name fallback, flexible for various data =====
  const getEmployeeName = (shift) => {
    if (shift.employee?.firstName && shift.employee?.lastName)
      return `${shift.employee.firstName} ${shift.employee.lastName}`;
    if (shift.employee?.name)
      return shift.employee.name;
    if (shift.employee?.fullName)
      return shift.employee.fullName;
    if (shift.employee?.display_name)
      return shift.employee.display_name;
    if (shift.employeeName)
      return shift.employeeName;
    if (shift.employee?.firstName)
      return shift.employee.firstName;
    if (shift.employee?.lastName)
      return shift.employee.lastName;
    if (shift.employee) {
      const firstString = Object.values(shift.employee).find(
        (val) => typeof val === "string" && val.trim().length > 0
      );
      if (firstString) return firstString;
    }
    return "";
  };

  // ===== Utils: Date fallback =====
  const getDate = (shift) =>
    shift.date ||
    (shift.start_time && shift.start_time.split("T")[0]) ||
    shift.clockIn?.split("T")[0] ||
    shift.clockOut?.split("T")[0] ||
    shift.shiftStart?.split("T")[0] ||
    "";

  // ===== Utils: Time fallback =====
  const getTime = (val) =>
    (val && val.includes("T")) ? val.split("T")[1]?.slice(0, 5) : (val || "");

  // ===== Utils: Location/Position fallback =====
  const getLocation = (shift) =>
    shift.location?.name || shift.locationName || "";

  const getPosition = (shift) =>
    shift.position?.name || shift.positionName || "";

  // ===== Filter: Search by any name (no error) =====
  const filteredShifts = (detailedShifts || []).filter(shift =>
    getEmployeeName(shift).toLowerCase().includes(search.trim().toLowerCase())
  );

  // ===== Render =====
  return (
    <>
      <header style={{ marginBottom: 0 }}>
        <Menu />
      </header>
      <main className="timeclock-main">
        <div className="timeclock-container">
          <h1 className="timeclock-title">Time Clock</h1>
          {loading && <div className="loading">Loading shifts...</div>}
          {error && (
            <div className="error" style={{ color: "red" }}>
              Error loading shifts: {error.message}
            </div>
          )}

          {/* ===== Top Controls ===== */}
          <section className="timeclock-top-controls">
            <input
              className="timeclock-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name..."
              aria-label="Search by name"
            />
            <div className="timeclock-field-filters">
              {Object.keys(visibleFields).map((field) => (
                <button
                  key={field}
                  className={`field-filter-btn ${visibleFields[field] ? 'active' : ''}`}
                  onClick={() => toggleField(field)}
                  aria-pressed={visibleFields[field]}
                  type="button"
                >
                  {FIELD_LABELS[field]}
                </button>
              ))}
            </div>
          </section>

          {/* ===== Table ===== */}
          <div className="timeclock-table-section">
            <div className="timeclock-table-wrapper">
              <div className="timeclock-table">
                {/* ===== Header Row ===== */}
                <div className="timeclock-table-row timeclock-table-header">
                  <div className="tc-col tc-name">Name</div>
                  <div className="tc-col tc-date">Date</div>
                  {visibleFields.location && <div className="tc-col tc-location">Location</div>}
                  {visibleFields.position && <div className="tc-col tc-position">Position</div>}
                  {visibleFields.shiftStart && <div className="tc-col tc-shiftstart">Shift Start</div>}
                  <div className="tc-col tc-clockin">Clock In</div>
                  <div className="tc-col tc-clockout">Clock Out</div>
                  {visibleFields.shiftEnd && <div className="tc-col tc-shiftend">Shift End</div>}
                  {visibleFields.duration && <div className="tc-col tc-duration">Duration</div>}
                  {visibleFields.payEstimate && <div className="tc-col tc-payestimate">Pay Estimate</div>}
                </div>
                {(filteredShifts.length === 0 && !loading) && (
                  <div className="timeclock-table-row timeclock-no-data">
                    <div className="tc-col" style={{ flex: 10, textAlign: "center", color: "var(--color-secondary)" }}>
                      No results found.
                    </div>
                  </div>
                )}
                {filteredShifts.map((shift, idx) => {
                  console.log(shift); // 콘솔에서 실제 데이터를 확인할 수 있도록 추가!
                  return (
                    <div className="timeclock-table-row" key={shift.id || idx}>
                      <div className="tc-col tc-name">
                        {getEmployeeName(shift)}
                      </div>
                      <div className="tc-col tc-date">
                        {getDate(shift)}
                      </div>
                      {visibleFields.location && (
                        <div className="tc-col tc-location">{getLocation(shift)}</div>
                      )}
                      {visibleFields.position && (
                        <div className="tc-col tc-position">{getPosition(shift)}</div>
                      )}
                      {visibleFields.shiftStart && (
                        <div className="tc-col tc-shiftstart">{getTime(shift.shiftStart) || getTime(shift.start_time)}</div>
                      )}
                      <div className="tc-col tc-clockin">{getTime(shift.clockIn) || getTime(shift.start_time)}</div>
                      <div className="tc-col tc-clockout">{getTime(shift.clockOut) || getTime(shift.end_time)}</div>
                      {visibleFields.shiftEnd && (
                        <div className="tc-col tc-shiftend">{getTime(shift.shiftEnd) || getTime(shift.end_time)}</div>
                      )}
                      {visibleFields.duration && (
                        <div className="tc-col tc-duration">
                          {calculateDuration(shift.start_time || shift.clockIn, shift.end_time || shift.clockOut)}
                        </div>
                      )}
                      {visibleFields.payEstimate && (
                        <div className="tc-col tc-payestimate">
                          {calculatePay(
                            shift.start_time || shift.clockIn,
                            shift.end_time || shift.clockOut,
                            shift.payRate || shift.employee?.payRate
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default TimeClockPage;
