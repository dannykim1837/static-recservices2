import React, { useState, useEffect } from "react";
import useEmployees from '../utils/useEmployees';
import useLocations from '../utils/useLocations';
import usePositions from '../utils/usePositions';
import Menu from '../components/Menu';
import '../styles/userProfile.css';
import '../styles/siteStyle.css';
import { useUser } from '@supabase/auth-helpers-react';
import supabase from "../db/supabase.js";


const UserProfilePage = () => {
  const { employees, fetchEmployee, updateEmployee, loading: loadingEmployees, error: errorEmployees} = useEmployees();
  const { locations, fetchLocation, loading: loadingLocations, error: errorLocations } = useLocations();
  const { positions, fetchPosition, loading: loadingPositions, error: errorPositions } = usePositions();
  
  const user = useUser();

  const [Id, setId] = useState(null);

  async function fetchEmployeeID() {
    if (user)
    {
      setId((await supabase.from("Employee").select("id").eq("uid", user.id).single()).data.id);
    }
    else
    {
      alert("Must be logged in to view profile");
    }
  }


  useEffect(() => {
    fetchEmployeeID();
  }, [fetchEmployeeID]);

  useEffect(() => {
    fetchEmployee(Id);
  }, [Id, fetchEmployee]);

  useEffect(() => {
    if (employees.location) fetchLocation(employees.location);
    if (employees.position) fetchPosition(employees.position);
  }, [employees.location, employees.position, fetchLocation, fetchPosition]);

  const [visiblePage, setVisiblePage] = useState('view_profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    kiosk_pin: ''
  });

  // Update form data when employees data loads
  useEffect(() => {
    if (employees.firstName) {
      setFormData({
        firstName: employees.firstName || '',
        lastName: employees.lastName || '',
        email: employees.email || '',
        kiosk_pin: employees.kiosk_pin || ''
      });
    }
  }, [employees]);

  const handleSave = () => {
    if (Number(formData.kiosk_pin) >= 1000 && Number(formData.kiosk_pin) <= 9999) {
      const updatedData = {
        ...formData,
        kiosk_pin: formData.kiosk_pin === '' ? null : Number(formData.kiosk_pin)
      };

      console.log('Updated Data:', updatedData);

      setVisiblePage('view_profile');
      updateEmployee(Id, updatedData);
    } else {
      alert('Kiosk Pin must be a 4-digit number.');
    }
  };

  const goToPage = (navigateToPage) => {
    setVisiblePage(navigateToPage);
  };

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <h1>Profile</h1>
        {/* -------------------VIEW PROFILE------------------- */}
        <section id="view_profile" style={{ display: visiblePage === 'view_profile' ? 'block' : 'none' }}>
          <div id="userProfile">
            <button
            type="button"
            className="fake-link"
            onClick={() => goToPage('update_profile')}
          >Update</button>
            <fieldset id="profile">
              {(loadingEmployees || loadingLocations || loadingPositions) && (
                <div className="loading">Loading data...</div>
              )}
              {(errorEmployees || errorLocations || errorPositions) && (
                <div className="error" style={{color:'red'}}>
                  {errorEmployees && <div>Employee Error: {errorEmployees.message}</div>}
                  {errorLocations && <div>Locations Error: {errorLocations.message}</div>}
                  {errorPositions && <div>Positions Error: {errorPositions.message}</div>}
                </div>
              )}
              <img src="" id="userPicture" alt="User" />
              <div className="profileData">
                <p id="first">
                  First Name:<br></br>
                  {employees.firstName}
                </p>
                <p id="last">
                  Last Name:<br></br>
                  {employees.lastName}
                </p>
                <p id="em">
                  Email:<br></br>
                  {employees.email}
                </p>
                <p id="loc">
                  Location:<br></br>
                  {locations.name}
                </p>
                <p id="pos">
                  Position:<br></br>
                  {positions.name}
                </p>
                <p id="kiosk">
                  Kiosk Pin:<br></br>
                  {employees.kiosk_pin}
                </p>
              </div>
            </fieldset>
          </div>
        </section>
        {/* -------------------UPDATE PROFILE------------------- */}
        <section id="update_profile" style={{ display: visiblePage === 'update_profile' ? 'block' : 'none' }}>
          <button
            type="button"
            className="fake-link"
            onClick={handleSave}
          >Save</button>
          <button
            type="button"
            className="fake-link"
            onClick={() => goToPage('view_profile')}>
              Cancel
            </button>
          <fieldset id="profile">
            <img src="" id="userPicture" alt="User" />
            <form id="userForm">
              <div className="profileData">
                <label>First Name
                  <input type="text" id="firstName" name="first__name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                </label>
                <label>Last Name
                  <input type="text" id="lastName" name="last__name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                </label>
                <label id="emailAddress">Email Address
                  <input type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </label>
                <label>Kiosk Pin
                  <input type="number" id="kioskPin" name="kiosk_pin" value={formData.kiosk_pin} onChange={(e) => setFormData({...formData, kiosk_pin: e.target.value})} required />
                </label>
              </div>
            </form>
            <p id="loc">
              Location:<br></br>
              {locations.name}
            </p>
            <p id="pos">
              Position:<br></br>
              {positions.name}
            </p>
          </fieldset>
        </section>
      </main>
      <footer>{/* Add footer items here */}</footer>
    </>
  );
};

export default UserProfilePage;
