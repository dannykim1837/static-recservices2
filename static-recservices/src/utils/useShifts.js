import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";

function useShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShifts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Shift").select("*");
    if (error) setError(error);
    else setShifts(data);
    setLoading(false);
  }, []);

  const fetchShift = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Shift").select("*").eq("id", id).single();
    setLoading(false);
    if (error) {
      setError(error);
      return null;
    }
    return data;
  }, []);

  const createShift = useCallback(async (shift) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Shift").insert([shift]).select();
    setLoading(false);
    if (error) setError(error);
    else setShifts((prev) => [...prev, ...data]);
    return { data, error };
  }, []);

  const updateShift = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Shift").update(updates).eq("id", id).select();
    setLoading(false);
    if (error) setError(error);
    else setShifts((prev) => prev.map((shift) => (shift.id === id ? data[0] : shift)));
    return { data, error };
  }, []);

  const deleteShift = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("Shift").delete().eq("id", id);
    setLoading(false);
    if (error) setError(error);
    else setShifts((prev) => prev.filter((shift) => shift.id !== id));
    return { error };
  }, []);

  return {
    shifts,
    loading,
    error,
    fetchShifts,
    fetchShift,
    createShift,
    updateShift,
    deleteShift,
  };
}

export default useShifts;
