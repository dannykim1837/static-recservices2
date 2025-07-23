import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";

// Fetches shifts and joins with Employee, Location, and Position in JS
export default function useShiftsWithEmployeeDetails() {
  const [detailedShifts, setDetailedShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShiftsWithDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all shifts
      const { data: shifts, error: shiftError } = await supabase.from("Shift").select("*");
      if (shiftError) throw shiftError;

      // Fetch all employees (with location and position info)
      const { data: employees, error: empError } = await supabase.from("Employee").select("*, Location(*), Position(*)");
      if (empError) throw empError;

      // Map employee uid to employee object
      const employeeByUid = {};
      for (const emp of employees) {
        if (emp.uid) employeeByUid[emp.uid] = emp;
      }

      // Join shifts with employee, location, and position
      const joined = shifts.map((shift) => {
        const employee = shift.employee_id ? employeeByUid[shift.employee_id] : null;
        return {
          ...shift,
          employee,
          location: employee?.Location || null,
          position: employee?.Position || null,
        };
      });
      setDetailedShifts(joined);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    detailedShifts,
    fetchShiftsWithDetails,
    loading,
    error,
  };
}
