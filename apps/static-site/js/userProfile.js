import React, { useState, useEffect } from 'react';
import '../styles/siteStyle.css';
import '../styles/timeClock.css';

const TimeClock = () => {
  const userID = 27;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dummyShifts = [
    {
      date: "2025-06-10",
      location: "Rec Center",
      position: "Lifeguard",
      shiftStart: "10:00 AM",
      clockIn: "9:58 AM",
      clockOut: "2:03 PM",
      shiftEnd: "2:00 PM",
      payRate: 22,
    },
  ];

  const [visibleFields, setVisibleFields] = useState({
    shiftStart: true,
    shiftEnd: true,
    location: true,
    position: true,
    duration: true,
    payEstimate: true,
  });

  useEffect(() => {
    fetch(`https://recservices.onrender.com/api/employees/${userID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, []);

  const toggleField = (field) => {
    setVisibleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const calculateDuration = (start, end) => {
    try {
      const s = new Date(`1/1/2000 ${start}`);
      const e = new Date(`1/1/2000 ${end}`);
      const minutes = Math.floor((e - s) / 60000);
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return `${h}h ${m}m`;
    } catch {
      return "-";
    }
  };

  const calculatePay = (start, end, rate) => {
    try {
      const s = new Date(`1/1/2000 ${start}`);
      const e = new Date(`1/1/2000 ${end}`);
      const hours = (e - s) / 3600000;
      return `$${(hours * rate).toFixed(2)}`;
    } catch {
      return "$-.--";
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Error loading user data.</p>;

  return (
    <div>
      <header>
        <nav>
          <div id="menu-container"></div>
        </nav>
      </header>

      <main>
        <h2 className="page-title">Time Clock for {user.first_name} {user.last_name}</h2>
        <p className="user-info">{user.email} | {user.phone_number}</p>

        <h3>Filters</h3>
        <div id="TimeClockFilters">
          {Object.keys(visibleFields).map((key) => (
            <label key={key}>
              {key.replace(/([A-Z])/g, ' $1')}
              <input
                type="checkbox"
                className="timeClockFilter"
                value={key}
                checked={visibleFields[key]}
                onChange={() => toggleField(key)}
              />
            </label>
          ))}
        </div>

        <div className="timeClockEvents">
          {dummyShifts.map((shift, i) => (
            <div className="timeClockEvent" key={i}>
              <h4 className="timeClockEvent__date">{shift.date}</h4>
              {visibleFields.location && <h4 className="timeClockEvent__location">{shift.location}</h4>}
              {visibleFields.position && <h4 className="timeClockEvent__position">{shift.position}</h4>}
              {visibleFields.shiftStart && <h4 className="timeClockEvent__shiftStart">{shift.shiftStart}</h4>}
              <h4 className="timeClockEvent__clockIn">{shift.clockIn}</h4>
              <h4 className="timeClockEvent__clockOut">{shift.clockOut}</h4>
              {visibleFields.shiftEnd && <h4 className="timeClockEvent__shiftEnd">{shift.shiftEnd}</h4>}
              {visibleFields.duration && (
                <h4 className="timeClockEvent__duration">
                  {calculateDuration(shift.clockIn, shift.clockOut)}
                </h4>
              )}
              {visibleFields.payEstimate && (
                <h4 className="timeClockEvent__payEstimate">
                  {calculatePay(shift.clockIn, shift.clockOut, shift.payRate)}
                </h4>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TimeClock;
