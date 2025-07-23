import React, { useState } from 'react';
import '../styles/siteStyle.css';
import '../styles/timeClock.css';

const TimeClock = () => {
  const [visibleFields, setVisibleFields] = useState({
    shiftStart: true,
    shiftEnd: true,
    location: true,
    position: true,
    duration: true,
    payEstimate: true,
  });

  const testData = [
    {
      name: "Michael Rodriguez",
      events: [
        {
          employeeName: "Michael Rodriguez",
          date: "March 24",
          location: "Rec Services",
          position: "Lifeguard",
          shiftStart: "10:00 AM",
          clockIn: "9:55 AM",
          clockOut: "11:55 AM",
          shiftEnd: "12:00 PM",
          payRate: 22
        },
        {
          employeeName: "Michael Rodriguez",
          date: "March 25",
          location: "Rec Services",
          position: "Lifeguard",
          shiftStart: "11:00 AM",
          clockIn: "11:00 AM",
          clockOut: "2:00 PM",
          shiftEnd: "2:00 PM",
          payRate: 22
        }
      ]
    }
  ];

  const toggleField = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const calculateDuration = (start, end) => {
    try {
      const s = new Date(`1/1/2000 ${start}`);
      const e = new Date(`1/1/2000 ${end}`);
      const mins = Math.floor((e - s) / 60000);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h ${m}m`;
    } catch {
      return "- hours";
    }
  };

  const calculatePay = (start, end, rate) => {
    try {
      const s = new Date(`1/1/2000 ${start}`);
      const e = new Date(`1/1/2000 ${end}`);
      const hours = (e - s) / (1000 * 60 * 60);
      return `$${(hours * rate).toFixed(2)}`;
    } catch {
      return "$-.--";
    }
  };

  return (
    <div>
      <main>
        <h1>Filters</h1>
        <div id="TimeClockFilters">
          {Object.entries(visibleFields).map(([field, isVisible]) => (
            <label key={field}>
              {field.replace(/([A-Z])/g, ' $1')}
              <input
                type="checkbox"
                className="timeClockFilter"
                value={`timeClockEvent__${field}`}
                checked={isVisible}
                onChange={() => toggleField(field)}
              />
            </label>
          ))}
        </div>

        {/* Column Headers */}
        <div id="columnHeaders">
          <h3 className="timeClockEvent__employeeName timeClockEvent__header">Name</h3>
          <h3 className="timeClockEvent__date timeClockEvent__header">Date</h3>
          {visibleFields.location && <h3 className="timeClockEvent__location timeClockEvent__header">Location</h3>}
          {visibleFields.position && <h3 className="timeClockEvent__position timeClockEvent__header">Position</h3>}
          {visibleFields.shiftStart && <h3 className="timeClockEvent__shiftStart timeClockEvent__header">Shift Start</h3>}
          <h3 className="timeClockEvent__clockIn timeClockEvent__header">Clock In</h3>
          <h3 className="timeClockEvent__clockOut timeClockEvent__header">Clock Out</h3>
          {visibleFields.shiftEnd && <h3 className="timeClockEvent__shiftEnd timeClockEvent__header">Shift End</h3>}
          {visibleFields.duration && <h3 className="timeClockEvent__duration timeClockEvent__header">Duration</h3>}
          {visibleFields.payEstimate && <h3 className="timeClockEvent__payEstimate timeClockEvent__header">Pay Estimate</h3>}
        </div>

        {/* Data Rows */}
        <div id="employeeList">
          {testData.map((emp, empIdx) =>
            emp.events.map((event, eventIdx) => (
              <div className="timeClockEvent" key={`${empIdx}-${eventIdx}`}>
                <div className="timeClockEvent__employeeName">{event.employeeName}</div>
                <div className="timeClockEvent__date">{event.date}</div>
                {visibleFields.location && <div className="timeClockEvent__location">{event.location}</div>}
                {visibleFields.position && <div className="timeClockEvent__position">{event.position}</div>}
                {visibleFields.shiftStart && <div className="timeClockEvent__shiftStart">{event.shiftStart}</div>}
                <div className="timeClockEvent__clockIn">{event.clockIn}</div>
                <div className="timeClockEvent__clockOut">{event.clockOut}</div>
                {visibleFields.shiftEnd && <div className="timeClockEvent__shiftEnd">{event.shiftEnd}</div>}
                {visibleFields.duration && (
                  <div className="timeClockEvent__duration">
                    {calculateDuration(event.clockIn, event.clockOut)}
                  </div>
                )}
                {visibleFields.payEstimate && (
                  <div className="timeClockEvent__payEstimate">
                    {calculatePay(event.clockIn, event.clockOut, event.payRate)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TimeClock;
