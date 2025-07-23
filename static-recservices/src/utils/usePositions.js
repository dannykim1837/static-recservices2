import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";

function usePositions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPositions = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Position").select("*");
    if (error) setError(error);
    else setPositions(data);
    setLoading(false);
  }, []);

  const fetchPosition = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Position").select("*").eq("id", id).single();
    setLoading(false);
    if (error) {
      setError(error);
    }
    else {
      setPositions(data)
    }
  }, []);

  const createPosition = useCallback(async (position) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Position").insert([position]).select();
    setLoading(false);
    if (error) setError(error);
    else setPositions((prev) => [...prev, ...data]);
    return { data, error };
  }, []);

  const updatePosition = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Position").update(updates).eq("id", id).select();
    setLoading(false);
    if (error) setError(error);
    else setPositions((prev) => prev.map((pos) => (pos.id === id ? data[0] : pos)));
    return { data, error };
  }, []);

  const deletePosition = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("Position").delete().eq("id", id);
    setLoading(false);
    if (error) setError(error);
    else setPositions((prev) => prev.filter((pos) => pos.id !== id));
    return { error };
  }, []);

  return {
    positions,
    loading,
    error,
    fetchPositions,
    fetchPosition,
    createPosition,
    updatePosition,
    deletePosition,
  };
}

export default usePositions;
