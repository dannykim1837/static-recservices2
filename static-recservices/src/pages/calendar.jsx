import React, { useState, useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import useShifts from '../utils/useShifts';
import Menu from '../components/Menu';
import ShiftFormPopup from '../components/ShiftFormPopup';
import "../styles/calendar.css";
import '../styles/siteStyle.css';

const CalendarPage = () => {
  // --- State
  const { shifts, createShift, updateShift, deleteShift, fetchShifts } = useShifts();
  const { employees, fetchEmployees } = useEmployees();
  const [shiftForm, setShiftForm] = useState({
    date: '',
    start: '',
    end: '',
    description: '',
    employee_id: [],
    employee_ids: []
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-CA');
  });
  const [shiftPopupOpen, setShiftPopupOpen] = useState(false);
  const [shiftLoading, setShiftLoading] = useState(false);
  const [shiftError, setShiftError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [visibleWeekStart, setVisibleWeekStart] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - today.getDay());
    today.setHours(0, 0, 0, 0);
    return today;
  });

  // --- Fetch Data
  useEffect(() => {
    fetchEmployees();
    fetchShifts();
  }, [fetchEmployees, fetchShifts]);

  // --- Form Handlers
  const handleShiftFormChange = (e) => {
    const { name, value } = e.target;
    setShiftForm(prev => ({
      ...prev,
      [name]: name === "employee_id" ? parseInt(value, 10) || -1 : value
    }));
  };
  const onCheckboxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const { checked } = e.target;
    setShiftForm(prev => {
      const prevEmployeeIds = Array.isArray(prev.employee_ids) ? prev.employee_ids : [];
      if (checked) {
        return { ...prev, employee_ids: [...new Set([...prevEmployeeIds, value])] };
      } else {
        return { ...prev, employee_ids: prevEmployeeIds.filter(id => id !== value) };
      }
    });
  };

  // --- Shift CRUD
  const handleShiftSubmit = async (e) => {
    e.preventDefault();
    setShiftLoading(true);
    setShiftError(null);
    try {
      const start_time = shiftForm.date && shiftForm.start ? `${shiftForm.date}T${shiftForm.start}` : null;
      const end_time = shiftForm.date && shiftForm.end ? `${shiftForm.date}T${shiftForm.end}` : null;
      const employeeIdsToProcess = Array.isArray(shiftForm.employee_ids) && shiftForm.employee_ids.length > 0
        ? shiftForm.employee_ids
        : (shiftForm.employee_id ? [shiftForm.employee_id] : []);
      if (employeeIdsToProcess.length === 0) throw new Error('Please select at least one employee for the shift.');
      if (editMode && selectedShift) {
        await updateShift(selectedShift.id, {
          start_time,
          end_time,
          description: shiftForm.description,
          employee_id: selectedShift.employee_id,
        });
        const newEmployeesForDuplication = employeeIdsToProcess.filter(id => id !== selectedShift.employee_id);
        if (newEmployeesForDuplication.length > 0) {
          const createPromises = newEmployeesForDuplication.map(employeeId =>
            createShift({ start_time, end_time, description: shiftForm.description, employee_id: employeeId })
          );
          await Promise.all(createPromises);
        }
      } else {
        const createPromises = employeeIdsToProcess.map(employeeId =>
          createShift({ start_time, end_time, description: shiftForm.description, employee_id: employeeId })
        );
        await Promise.all(createPromises);
      }
      setShiftForm({ date: '', start: '', end: '', description: '', employee_id: '', employee_ids: [] });
      setShiftPopupOpen(false);
      setEditMode(false);
      setSelectedShift(null);
    } catch (err) {
      setShiftError(editMode
        ? 'Failed to update or duplicate shift(s). Please try again.'
        : 'Failed to create shift(s). Please try again.');
    } finally {
      setShiftLoading(false);
    }
  };

  const handleDeleteShift = async () => {
    if (!selectedShift) return;
    if (window.confirm('Are you sure you want to delete this shift? This action cannot be undone.')) {
      setShiftLoading(true);
      setShiftError(null);
      try {
        await deleteShift(selectedShift.id);
        setShiftForm({ date: '', start: '', end: '', description: '', employee_id: '', employee_ids: [] });
        setShiftPopupOpen(false);
        setEditMode(false);
        setSelectedShift(null);
      } catch (err) {
        setShiftError('Failed to delete shift.');
      } finally {
        setShiftLoading(false);
      }
    }
  };

  // --- Utility Functions
  function parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function previousDayButton() {
    setSelectedDate(prev => {
      const d = parseLocalDate(prev);
      d.setDate(d.getDate() - 1);
      return d.toLocaleDateString('en-CA');
    });
  }
  function nextDayButton() {
    setSelectedDate(prev => {
      const d = parseLocalDate(prev);
      d.setDate(d.getDate() + 1);
      return d.toLocaleDateString('en-CA');
    });
  }
  function formatTime(timeString) {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 === 0 ? 12 : hours % 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  const getWeekDates = () => Array.from({ length: 7 }, (_, i) => {
    const date = new Date(visibleWeekStart.getTime());
    date.setDate(visibleWeekStart.getDate() + i);
    return date;
  });
  const goToPreviousWeek = () => {
    setVisibleWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };
  const goToNextWeek = () => {
    setVisibleWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  // --- Render
  return (
    <>
      <header>
        <Menu />
      </header>
      <main className="calendar-main">
        <h1>Employee Calendar</h1>
        <div className="create-shift-row">
          <button
            className="fab-create-shift"
            title="Create New Shift"
            onClick={() => setShiftPopupOpen(true)}
          >
            +
          </button>
        </div>
        <ShiftFormPopup
          open={shiftPopupOpen}
          onClose={() => {
            setShiftPopupOpen(false);
            setEditMode(false);
            setSelectedShift(null);
            setShiftForm({ date: '', start: '', end: '', description: '', employee_id: '', employee_ids: [] });
          }}
          onSubmit={handleShiftSubmit}
          shiftForm={shiftForm}
          onCheckboxChange={onCheckboxChange}
          onFormChange={handleShiftFormChange}
          employees={employees}
          loading={shiftLoading}
          error={shiftError}
          mode={editMode ? 'edit' : 'create'}
          onDelete={editMode ? handleDeleteShift : undefined}
        />
        <div className="week-bar-container">
          <button onClick={goToPreviousWeek} className="week-nav-btn">&#9664;</button>
          <div className="week-bar" style={{ display: 'flex', gap: '0.5em' }}>
            {getWeekDates().map((day, i) => {
              const dateStr = day.toLocaleDateString('en-CA');
              const isSelected = dateStr === selectedDate;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`day-button ${isSelected ? 'selected' : ''}`}
                >
                  {day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </button>
              );
            })}
          </div>
          <button onClick={goToNextWeek} className="week-nav-btn">&#9654;</button>
        </div>
        <section className="calendar__box__week">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1em 0' }}>
            <button id="prev__day" className="week__nav" onClick={previousDayButton}>&#9664; Previous Day</button>
            <h2 id="current__day" style={{ margin: '0 1em', color: 'var(--color-primary)', fontWeight: 600 }}>
              {parseLocalDate(selectedDate).toDateString()}
            </h2>
            <button id="next__day" className="day__nav" onClick={nextDayButton}>Next Day &#9654;</button>
          </div>
          <div className="calendar-table-scroll">
            <section
              className="day__view"
              style={{
                gridTemplateRows: `40px repeat(${employees.length}, minmax(54px, 1fr))`
              }}
            >
              <div className="employee-name-cell calendar-header" style={{ gridRow: 1, gridColumn: 1 }}>Employee</div>
              {Array.from({ length: 24 }, (_, i) => {
                const hour = (i + 6) % 24;
                const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                const ampm = hour >= 12 && hour < 24 ? 'PM' : 'AM';
                return (
                  <div
                    key={`hour-${i}`}
                    className="calendar-header"
                    style={{
                      gridRow: 1,
                      gridColumn: i + 2,
                      color: 'var(--color-secondary)',
                      fontWeight: 500,
                      fontSize: "0.97rem"
                    }}
                  >
                    {displayHour}:00 {ampm}
                  </div>
                );
              })}
              {employees.map((emp, rowIndex) => (
                <div
                  key={emp.id}
                  className="employee-name-cell"
                  title={`${emp.firstName || ''} ${emp.lastName || ''}`.trim()}
                  style={{ gridRow: rowIndex + 2, gridColumn: 1 }}
                >
                  {(emp.firstName || '') + ' ' + (emp.lastName || '')}
                </div>
              ))}
              {shifts
                .filter(shift => {
                  if (!shift.start_time) return false;
                  const shiftDate = new Date(shift.start_time);
                  const shiftDateLocalStr = shiftDate.toLocaleDateString('en-CA');
                  return shiftDateLocalStr === selectedDate;
                })
                .map(shift => {
                  const empIndex = employees.findIndex(e => e.id === shift.employee_id);
                  if (empIndex === -1) return null;
                  const startHour = new Date(shift.start_time).getHours();
                  const endHour = new Date(shift.end_time).getHours();
                  const employee = employees.find(emp => emp.id === shift.employee_id);
                  return (
                    <div
                      key={shift.id}
                      className="shift-box"
                      style={{
                        gridRow: empIndex + 2,
                        gridColumn: `${((startHour + 18) % 24) + 2} / ${((endHour + 18) % 24) + 3}`
                      }}
                      onClick={() => {
                        setEditMode(true);
                        setSelectedShift(shift);
                        setShiftForm({
                          date: shift.start_time?.slice(0, 10) || '',
                          start: shift.start_time?.slice(11, 16) || '',
                          end: shift.end_time?.slice(11, 16) || '',
                          description: shift.description || '',
                          employee_id: shift.employee_id || '',
                          employee_ids: [shift.employee_id]
                        });
                        setShiftPopupOpen(true);
                      }}
                    >
                      <b>{shift.description}</b>
                      <br />
                      {shift.start_time && shift.end_time && `${formatTime(shift.start_time)} - ${formatTime(shift.end_time)}`}
                      {shift.employee_id && <><br />{employee?.firstName || "unknown"} {employee?.lastName || "unknown"}</>}
                    </div>
                  );
                })}
            </section>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};
export default CalendarPage;
