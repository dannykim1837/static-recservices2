import React, { useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import usePositions from '../utils/usePositions';
import Menu from '../components/Menu';
import '../styles/createEvent.css';

const CreateEventPage = () => {
  const { employees, fetchEmployees, loading: loadingEmployees, error: errorEmployees } = useEmployees();
  const { positions, fetchPositions, loading: loadingPositions, error: errorPositions } = usePositions();

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, [fetchEmployees, fetchPositions]);

  return (
    <>
      <header>
        <Menu />
      </header>

      <main className="create-event-main">
        <h1 className="create-event-title">Create Event</h1>
        <section className="create-event-container">
          <form className="create-event-form" id="createCustomEvent" action="">
            <label htmlFor="eventTitle">Title</label>
            <input id="eventTitle" name="eventTitle" type="text" />

            <label htmlFor="eventDescription">Description</label>
            <input id="eventDescription" name="eventDescription" type="text" />

            <div className="row">
              <div className="field-group">
                <label htmlFor="eventDate">Date</label>
                <input id="eventDate" name="eventDate" type="date" />
              </div>
              <div className="field-group">
                <label htmlFor="timeStart">Time Start</label>
                <input id="timeStart" name="timeStart" type="time" />
              </div>
              <div className="field-group">
                <label htmlFor="timeEnd">Time End</label>
                <input id="timeEnd" name="timeEnd" type="time" />
              </div>
            </div>

            <div className="row">
              <div className="field-group">
                <label htmlFor="newEventPositions">Position</label>
                <select name="position" id="newEventPositions">
                  {positions.map(position => (
                    <option key={position.id} value={position.id}>
                      {position.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="newEventEmployees">Employee</label>
                <select name="employees" id="newEventEmployees">
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="newEventTags">Tags</label>
                <select name="tags" id="newEventTags"></select>
              </div>
            </div>

            <div className="button-row">
              <button id="closeNewEvent" type="button" className="cancel-btn">Cancel</button>
              <button id="submitNewEvent" type="submit" className="save-btn">Save</button>
            </div>
          </form>

          <div className="info-text">
            {loadingEmployees ? 'Loading employees...' : `Employees: ${employees.length}`}
            <br />
            {loadingPositions ? 'Loading positions...' : `Positions: ${positions.length}`}
            {errorEmployees && <div className="error-text">Error: {errorEmployees.message}</div>}
            {errorPositions && <div className="error-text">Error: {errorPositions.message}</div>}
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default CreateEventPage;
