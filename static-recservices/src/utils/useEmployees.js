import { useState, useCallback } from "react";
import supabase from "../db/supabase.js";
import { useUser } from "@supabase/auth-helpers-react";

// Custom hook for CRUD operations on employees
function useEmployees() {

  const user = useUser();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  // Fetch all employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Employee").select("*");
    if (error) setError(error);
    else setEmployees(data);
    setLoading(false);
  }, []);

  // Fetch one employee by ID
  const fetchEmployee = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Employee").select("*").eq("id", id).single();;
    setLoading(false);
    if (error) {
      setError(error);
    }
    else {
      setEmployees(data)
    }

  }, []);

  // Fetch one employee ID by User UID
  const fetchEmployeeID = useCallback(async () => {
    if (user === null || user === undefined) {
      setError("User not authenticated");
      return;
    }
    else {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("employees").select("id").eq("uid", user.id).single();
      setLoading(false);
      if (error) {
        setError(error);
      }
      else {
        setId(data)
      }
    }
    
  }, [user]);

  // Create a new employee
  const createEmployee = useCallback(async (employee) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Employee").insert([employee]).select();
    setLoading(false);
    if (error) setError(error);
    else setEmployees((prev) => [...prev, ...data]);
    return { data, error };
  }, []);

  // Update an employee
  const updateEmployee = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("Employee").update(updates).eq("id", id).select();
    setLoading(false);
    if (error) setError(error);
    else setEmployees(prev => ({ ...prev, ...updates }));
    return { data, error };
  }, []);

  // Delete an employee
  const deleteEmployee = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("Employee").delete().eq("id", id);
    setLoading(false);
    if (error) setError(error);
    else setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    return { error };
  }, []);

  return {
    employees,
    loading,
    error,
    id,
    fetchEmployees,
    fetchEmployee,
    fetchEmployeeID,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

export default useEmployees;
