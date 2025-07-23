import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";

// Fetches shifts with joined employee, location, and position info for easy display
export default function useEmployeeShiftsDetailed() {
  const [detailedShifts, setDetailedShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetailedShifts = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Adjust the select string to match your actual column names and relationships
    const { data, error } = await supabase
      .from("Shift")
      .select(`*, Employee(*), Location(*), Position(*)`);
    if (error) setError(error);
    else setDetailedShifts(data);
    setLoading(false);
  }, []);

  return {
    detailedShifts,
    fetchDetailedShifts,
    loading,
    error
  };
}
