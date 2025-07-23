import React, { useState, useEffect } from "react";
import supabase from '../db/supabase';

/**
 * Employee Kiosk Component
 * 
 * Allows employees to:
 * - Authenticate with 4-digit PIN
 * - Clock in/out with real-time duration tracking
 * - View recent shift history
 * - Prevent early clock-outs (if scheduled)
 */
const KioskPage = () => {
  // ===== STATE MANAGEMENT =====
  
  // Authentication & Employee Data
  const [pin, setPin] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  
  // Shift Data
  const [shifts, setShifts] = useState([]);
  const [currentShift, setCurrentShift] = useState(null);
  
  // UI State
  const [kioskError, setKioskError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Live Duration Tracking
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveDuration, setLiveDuration] = useState('0m');

  // ===== REAL-TIME DURATION TRACKING =====
  
  /**
   * Timer that updates every 5 seconds to refresh live duration
   * This ensures the "Current duration" display stays accurate
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /**
   * Calculate and update live duration whenever currentTime or currentShift changes
   * Handles timezone issues by ensuring proper UTC parsing
   */
  useEffect(() => {
    if (currentShift?.clock_in_time) {
      let startTime;
      const clockInString = currentShift.clock_in_time;
      
      // Fix timezone issues - ensure we parse timestamps as UTC
      if (clockInString.includes('T') && !clockInString.endsWith('Z') && !clockInString.includes('+')) {
        startTime = new Date(clockInString + 'Z');
      } else {
        startTime = new Date(clockInString);
      }
      
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      
      if (diffMinutes < 0) {
        setLiveDuration('0m');
      } else {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        setLiveDuration(duration);
      }
    } else {
      setLiveDuration('0m');
    }
  }, [currentTime, currentShift]);

  // ===== DATABASE OPERATIONS =====

  /**
   * Authenticate employee by PIN
   * @param {string} pin - 4-digit employee PIN
   * @returns {Object|null} Employee data with location info
   */
  const getEmployeeByPin = async (pin) => {
    try {
      const { data, error } = await supabase
        .from('Employee')
        .select(`
          *,
          Location(name, address)
        `)
        .eq('kiosk_pin', parseInt(pin))
        .eq('active', true)
        .single();

      if (error) {
        console.error('Error fetching employee by PIN:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error in getEmployeeByPin:', err);
      return null;
    }
  };

  /**
   * Fetch recent shifts for an employee
   * @param {number} employeeId - Employee ID
   * @returns {Array} Array of recent shift records
   */
  const getEmployeeShifts = async (employeeId) => {
    try {
      const { data, error } = await supabase
        .from('Shift')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching employee shifts:', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Error in getEmployeeShifts:', err);
      return [];
    }
  };

  /**
   * Clock in an employee
   * Creates a new shift record with current timestamp
   * @param {number} employeeId - Employee ID
   * @param {number} kioskPin - Employee's kiosk PIN
   * @returns {Object} Success/error result
   */
  const clockIn = async (employeeId, kioskPin) => {
    try {
      // Check if employee is already clocked in
      const { data: existingShifts, error: checkError } = await supabase
        .from('Shift')
        .select('id, clock_in_time, created_at')
        .eq('employee_id', employeeId)
        .is('clock_out_time', null)
        .order('created_at', { ascending: false });

      if (checkError) {
        console.error('Error checking existing shift:', checkError);
        return { success: false, error: `Check error: ${checkError.message}` };
      }

      // Prevent double clock-in
      if (existingShifts && existingShifts.length > 0) {
        return { success: false, error: 'You are already clocked in. Please clock out first.' };
      }

      // Create new shift record
      const now = new Date();
      const insertData = {
        employee_id: employeeId,
        kiosk_pin: kioskPin,
        clock_in_time: now.toISOString(),
        up_for_trade: false,
        duration: 0,
        clocked_duration: 0
      };
      
      const { data, error } = await supabase
        .from('Shift')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Error clocking in:', error);
        return { success: false, error: `Clock in failed: ${error.message}` };
      }

      console.log('Clock in successful:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Error in clockIn:', err);
      return { success: false, error: `Unexpected error: ${err.message}` };
    }
  };

  /**
   * Clock out an employee
   * Updates shift record with clock-out time and calculates duration
   * @param {number} employeeId - Employee ID
   * @param {number} shiftId - Shift ID to clock out
   * @returns {Object} Success/error result
   */
  const clockOut = async (employeeId, shiftId) => {
    try {
      // Get the active shift
      const { data: currentShift, error: shiftError } = await supabase
        .from('Shift')
        .select('*')
        .eq('id', shiftId)
        .eq('employee_id', employeeId)
        .is('clock_out_time', null)
        .single();

      if (shiftError || !currentShift) {
        return { success: false, error: 'No active shift found' };
      }

      const clockOutTime = new Date();
      
      // Calculate total duration in minutes
      let clockedDurationMinutes = 0;
      if (currentShift.clock_in_time) {
        const clockInTime = new Date(currentShift.clock_in_time);
        const durationMs = clockOutTime - clockInTime;
        clockedDurationMinutes = Math.floor(durationMs / (1000 * 60));
      }

      // Update shift record with clock-out data
      const { data, error } = await supabase
        .from('Shift')
        .update({
          clock_out_time: clockOutTime.toISOString(),
          clocked_duration: clockedDurationMinutes
        })
        .eq('id', shiftId)
        .eq('employee_id', employeeId)
        .select()
        .single();

      if (error) {
        console.error('Error clocking out:', error);
        return { success: false, error: `Failed to clock out: ${error.message}` };
      }

      console.log('Clock out successful:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Error in clockOut:', err);
      return { success: false, error: `Unexpected error during clock out: ${err.message}` };
    }
  };

  // ===== UTILITY FUNCTIONS =====

  /**
   * Calculate duration for completed shifts
   * Handles both old time-format data and new timestamp data
   * @param {string} clockInTime - Clock in timestamp
   * @param {string} clockOutTime - Clock out timestamp
   * @returns {string} Formatted duration (e.g., "2h 30m")
   */
  const calculateCompletedDuration = (clockInTime, clockOutTime) => {
    if (!clockInTime || !clockOutTime) return '';
    
    try {
      let startTime, endTime;
      
      // Handle different timestamp formats (legacy vs new)
      if (clockInTime.includes('T') || clockInTime.includes('Z')) {
        startTime = new Date(clockInTime);
      } else {
        // Legacy time format - combine with today's date
        const today = new Date().toISOString().split('T')[0];
        startTime = new Date(`${today}T${clockInTime}`);
      }
      
      if (clockOutTime.includes('T') || clockOutTime.includes('Z')) {
        endTime = new Date(clockOutTime);
      } else {
        const today = new Date().toISOString().split('T')[0];
        endTime = new Date(`${today}T${clockOutTime}`);
      }
      
      const diffMs = endTime - startTime;
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      
      if (diffMinutes < 0) return '0m';
      
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } catch (error) {
      console.error('Error calculating completed duration:', error);
      return '';
    }
  };

  /**
   * Format stored duration from minutes to readable format
   * @param {number} minutes - Duration in minutes
   * @returns {string} Formatted duration (e.g., "2h 30m")
   */
  const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  /**
   * Format timestamp for display
   * Handles both full timestamps and legacy time formats
   * @param {string} timeString - Time string to format
   * @returns {string} Formatted time (e.g., "2:30 PM")
   */
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    try {
      if (timeString.includes('T') || timeString.includes('Z')) {
        // Full timestamp
        return new Date(timeString).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
      } else if (timeString.includes(':')) {
        // Legacy time format - combine with today's date
        const today = new Date().toISOString().split('T')[0];
        return new Date(`${today}T${timeString}`).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
      }
      return '';
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  /**
   * Format date for display
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date (e.g., "7/12/2025")
   */
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // ===== EVENT HANDLERS =====

  /**
   * Handle keypad button clicks for PIN entry
   * @param {string} value - Button value ('0'-'9', 'del', 'ok')
   */
  const handleKeypadClick = (value) => {
    if (value === 'del') {
      setPin(prev => prev.slice(0, -1));
    } else if (value === 'ok') {
      handleSubmit();
    } else if (pin.length < 4) {
      setPin(prev => prev + value);
    }
  };

  /**
   * Handle PIN submission and employee authentication
   * Loads employee data and checks for active shifts
   */
  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setKioskError('Please enter a 4-digit PIN');
      return;
    }

    setIsProcessing(true);
    setKioskError('');

    try {
      // Authenticate employee
      const employee = await getEmployeeByPin(pin);
      if (!employee) {
        setKioskError('Invalid PIN. Please try again.');
        setPin('');
        setIsProcessing(false);
        return;
      }

      // Load employee data
      setCurrentEmployee(employee);
      const employeeShifts = await getEmployeeShifts(employee.id);
      setShifts(employeeShifts);
      
      // Check for active shifts
      const { data: activeShifts, error: checkError } = await supabase
        .from('Shift')
        .select('*')
        .eq('employee_id', employee.id)
        .is('clock_out_time', null)
        .order('created_at', { ascending: false });

      if (!checkError && activeShifts && activeShifts.length > 0) {
        setCurrentShift(activeShifts[0]);
      }
      
    } catch (err) {
      setKioskError('Error accessing employee data. Please try again.');
      console.error('Kiosk error:', err);
    }

    setIsProcessing(false);
  };

  /**
   * Handle clock in button click
   * Creates new shift and updates UI state
   */
  const handleClockIn = async () => {
    if (!currentEmployee) return;

    setIsProcessing(true);
    setKioskError('');

    try {
      const result = await clockIn(currentEmployee.id, currentEmployee.kiosk_pin);
      if (result.success) {
        // Update current shift and refresh shift list
        setCurrentShift(result.data);
        const updatedShifts = await getEmployeeShifts(currentEmployee.id);
        setShifts(updatedShifts);
      } else {
        setKioskError(result.error || 'Failed to clock in');
      }
    } catch (err) {
      setKioskError('Error clocking in. Please try again.');
      console.error('Clock in error:', err);
    }

    setIsProcessing(false);
  };

  /**
   * Handle clock out button click
   * Updates shift record and refreshes UI
   */
  const handleClockOut = async () => {
    if (!currentEmployee) return;

    setIsProcessing(true);
    setKioskError('');

    try {
      let shiftToClockOut = currentShift;
      
      // If no current shift set, find the most recent active shift
      if (!shiftToClockOut) {
        const { data: activeShifts, error } = await supabase
          .from('Shift')
          .select('*')
          .eq('employee_id', currentEmployee.id)
          .is('clock_out_time', null)
          .order('created_at', { ascending: false });
          
        if (error || !activeShifts || activeShifts.length === 0) {
          setKioskError('No active shift found to clock out');
          setIsProcessing(false);
          return;
        }
        
        shiftToClockOut = activeShifts[0];
      }

      const result = await clockOut(currentEmployee.id, shiftToClockOut.id);
      if (result.success) {
        // Refresh shift list and clear current shift
        const updatedShifts = await getEmployeeShifts(currentEmployee.id);
        setShifts(updatedShifts);
        setCurrentShift(null);
      } else {
        setKioskError(result.error || 'Failed to clock out');
      }
    } catch (err) {
      setKioskError('Error clocking out. Please try again.');
      console.error('Clock out error:', err);
    }

    setIsProcessing(false);
  };

  /**
   * Handle back button - return to PIN entry screen
   * Clears all employee data and resets form
   */
  const handleBack = () => {
    setCurrentEmployee(null);
    setShifts([]);
    setPin('');
    setKioskError('');
    setCurrentShift(null);
  };

  // ===== RENDER =====

  // Employee Dashboard (after successful PIN authentication)
  if (currentEmployee) {
    return (
      <>
        <header>
          <h1>Welcome, {currentEmployee.firstName} {currentEmployee.lastName}</h1>
          <div>
            <span style={{marginRight: '1rem', fontSize: '0.9rem'}}>
              Location: {currentEmployee.Location?.name}
            </span>
            <button onClick={handleBack} className="back-btn">
              Back to PIN Entry
            </button>
          </div>
        </header>

        <main>
          <div className="employee-actions">
            {/* Clock In/Out Controls */}
            <div className="clock-actions">
              {currentShift ? (
                // Employee is currently clocked in
                <div className="clocked-in-status">
                  <p>Currently clocked in since: {formatTime(currentShift.clock_in_time)}</p>
                  <p>Current duration: {liveDuration}</p>
                  <button 
                    onClick={handleClockOut} 
                    disabled={isProcessing}
                    className="clock-out-btn"
                  >
                    {isProcessing ? 'Processing...' : 'Clock Out'}
                  </button>
                </div>
              ) : (
                // Check if there are any active shifts in the table (fallback detection)
                shifts && shifts.some(shift => shift.clock_in_time && !shift.clock_out_time) ? (
                  <div className="clocked-in-status">
                    <p>Active shift detected. Ready to clock out.</p>
                    <button 
                      onClick={handleClockOut} 
                      disabled={isProcessing}
                      className="clock-out-btn"
                    >
                      {isProcessing ? 'Processing...' : 'Clock Out'}
                    </button>
                  </div>
                ) : (
                  // Employee can clock in
                  <button 
                    onClick={handleClockIn} 
                    disabled={isProcessing}
                    className="clock-in-btn"
                  >
                    {isProcessing ? 'Processing...' : 'Clock In'}
                  </button>
                )
              )}
            </div>

            {/* Error Messages */}
            {kioskError && <div className="error-message">{kioskError}</div>}

            {/* Recent Shifts Table */}
            <div className="shifts-display">
              <h3>Recent Shifts</h3>
              {shifts.length > 0 ? (
                <table className="shifts-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Clock In</th>
                      <th>Clock Out</th>
                      <th>Actual Duration</th>
                      <th>Scheduled</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift) => (
                      <tr key={shift.id}>
                        <td>{formatDate(shift.clock_in_time || shift.created_at)}</td>
                        <td>{formatTime(shift.clock_in_time)}</td>
                        <td>
                          {shift.clock_out_time ? formatTime(shift.clock_out_time) : 'In Progress'}
                        </td>
                        <td>
                          {shift.clock_out_time ? (
                            // Completed shift - use stored duration or calculate
                            shift.clocked_duration > 0 
                              ? formatDuration(shift.clocked_duration)
                              : calculateCompletedDuration(shift.clock_in_time, shift.clock_out_time)
                          ) : (
                            // Active shift - show live duration (use same state as main display)
                            shift.id === currentShift?.id ? liveDuration : '0m'
                          )}
                        </td>
                        <td>
                          {shift.start_time && shift.end_time ? 
                            `${formatTime(shift.start_time)} - ${formatTime(shift.end_time)}` : 
                            'Not scheduled'
                          }
                        </td>
                        <td>{shift.description || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent shifts found.</p>
              )}
            </div>
          </div>
        </main>
        <footer></footer>
      </>
    );
  }

  // PIN Entry Screen (initial view)
  return (
    <>
      <header>
        <h1>Employee Kiosk</h1>
      </header>
      
      <main>
        {/* PIN Entry Interface */}
        <div id="pinpad-area">
          <div className="pin-display">
            <label htmlFor="pinpad-input">Enter your 4-digit PIN:</label>
            <input 
              type="password" 
              id="pinpad-input" 
              maxLength={4} 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus 
            />
          </div>
          
          {/* Virtual Keypad */}
          <div id="keypad">
            <div className="pinpad-row">
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('1')}>1</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('2')}>2</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('3')}>3</button>
            </div>
            <div className="pinpad-row">
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('4')}>4</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('5')}>5</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('6')}>6</button>
            </div>
            <div className="pinpad-row">
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('7')}>7</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('8')}>8</button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('9')}>9</button>
            </div>
            <div className="pinpad-row">
              <button type="button" className="pinpad-btn" id="delete-btn" onClick={() => handleKeypadClick('del')}>
                Del
              </button>
              <button type="button" className="pinpad-btn" onClick={() => handleKeypadClick('0')}>0</button>
              <button type="button" className="pinpad-btn" id="submit-btn" onClick={() => handleKeypadClick('ok')}>
                Ok
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Messages */}
        {kioskError && <div className="error-message">{kioskError}</div>}
        {isProcessing && <div className="loading">Processing...</div>}
      </main>
      
      <footer></footer>
    </>
  );
};

export default KioskPage;