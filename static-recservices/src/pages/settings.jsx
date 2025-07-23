import React, { useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import Menu from '../components/Menu';

const SettingsPage = () => {
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
        <form action="/kiosk">
          <input type="submit" value="Kiosk" />
        </form>
        <div>{loading ? 'Loading employees...' : `Employees: ${employees.length}`}</div>
        {error && <div style={{color:'red'}}>Error: {error.message}</div>}
      </main>
      <footer>{/* Add footer items here */}</footer>
    </>
  );
};

export default SettingsPage;
