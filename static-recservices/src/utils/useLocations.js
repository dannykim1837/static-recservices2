import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";

function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Location").select("*");
    if (error) setError(error);
    else setLocations(data);
    setLoading(false);
  }, []);

  const fetchLocation = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Location").select("*").eq("id", id).single();
    setLoading(false);
    if (error) {
      setError(error);
    }
    else {
      setLocations(data)
    }
  }, []);

  const createLocation = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Location").insert([location]).select();
    setLoading(false);
    if (error) setError(error);
    else setLocations((prev) => [...prev, ...data]);
    return { data, error };
  }, []);

  const updateLocation = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Location").update(updates).eq("id", id).select();
    setLoading(false);
    if (error) setError(error);
    else setLocations((prev) => prev.map((loc) => (loc.id === id ? data[0] : loc)));
    return { data, error };
  }, []);

  const deleteLocation = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("Location").delete().eq("id", id);
    setLoading(false);
    if (error) setError(error);
    else setLocations((prev) => prev.filter((loc) => loc.id !== id));
    return { error };
  }, []);

  return {
    locations,
    loading,
    error,
    fetchLocations,
    fetchLocation,
    createLocation,
    updateLocation,
    deleteLocation,
  };
}

export default useLocations;
