import React, { useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import Menu from '../components/Menu';

const TestHTTPPage = () => {
  const { employees, fetchEmployees, loading, error } = useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <div id="requests__custom">
          <h2>Custom Inputs</h2>
          <div id="customInputs">
            <label>URL<input type="text" id="urlEnding" /></label>
            <label>HTTP Type<input type="text" id="httpType" /></label>
            <label>Body (JSON format)<input type="text" id="bodyJSON" /></label>
          </div>
          <button>Send Request</button>
        </div>
        <div id="response__details">
          <h2>Response</h2>
          <div id="response__output"></div>
        </div>
        <textarea id="response__box" wrap="hard"></textarea>
        <hr />
        <div id="request__application">
          <h2>Application Requests</h2>
          <button>Get all Employees</button>
          <h3>Login</h3>
          <button>Login</button>
          <button>Create Account</button>
          <button>Reset Password</button>
          <h3>Home / Announcements</h3>
          <h3>Time Clock</h3>
          <h3>Calendar</h3>
          <h3>Create Event</h3>
          <h3>Settings</h3>
          <h3>User Profile</h3>
        </div>
        <hr />
        <div id="requests__GET">
          <h2>GET Requests</h2>
          <button>Get all Employees</button>
          <button>Get Employee with a specific id</button>
        </div>
        <div id="requests__POST">
          <h2>POST Requests</h2>
          <button>Add a new Employee - No body</button>
        </div>
        <div>{loading ? 'Loading employees...' : `Employees: ${employees.length}`}</div>
        {error && <div style={{color:'red'}}>Error: {error.message}</div>}
      </main>
      <footer>{/* Add footer items here */}</footer>
    </>
  );
};

export default TestHTTPPage;
