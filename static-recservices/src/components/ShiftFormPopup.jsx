import React from "react";

const ShiftFormPopup = ({
  open,
  onClose,
  onCheckboxChange,
  onSubmit,
  shiftForm,
  onFormChange,
  employees,
  loading,
  error,
  mode = 'create', // 'create' or 'edit'
  onDelete
}) => {
  if (!open) return null;
  return (
    <div id="shiftPopup" className="window" style={{display: 'block'}}>
      <div className="event__details">
        <h2>{mode === 'edit' ? 'Edit Shift' : 'Create New Shift'}</h2>
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={onSubmit}>
          <label>Date</label>
          <input type="date" name="date" value={shiftForm.date} onChange={onFormChange} required />
          <br />
          <label>Start Time</label>
          <input type="time" name="start" value={shiftForm.start} onChange={onFormChange} required />
          <br />
          <label>End Time</label>
          <input type="time" name="end" value={shiftForm.end} onChange={onFormChange} required />
          <br />
          <label>Description</label>
          <input type="text" name="description" value={shiftForm.description} onChange={onFormChange} />
          <br />
          <label>Employee</label>

          <fieldset>
            <legend>Select Employee(s):</legend>
            {employees && employees.map(emp => (
              <div
                key={emp.id}
                style={{ display: 'flex', }}
              >
                <input
                  type="checkbox"
                  id={`employee-${emp.id}`}
                  name="employee_ids"
                  value={emp.id}
                  checked={Array.isArray(shiftForm.employee_ids) && shiftForm.employee_ids.includes(emp.id)}
                  onChange={onCheckboxChange}
                  style={{ width: 'auto', height: 'auto', }}
                />
                <label htmlFor={`employee-${emp.id}`}>
                  {emp.name || (emp.firstName + ' ' + emp.lastName) || emp.id}
                </label>
              </div>
            ))}
          </fieldset>

          <br />
          <button type="submit" disabled={loading}>
            {mode === 'edit' ? 'Update Shift' : 'Create Shift'}
          </button>
          {mode === 'edit' && (
            <button
              type="button"
              style={{ marginLeft: 8, background: '#e57373', color: 'white' }}
              onClick={onDelete}
              disabled={loading}
            >
              Delete
            </button>
          )}
          {error && <div style={{color:'red'}}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ShiftFormPopup;
