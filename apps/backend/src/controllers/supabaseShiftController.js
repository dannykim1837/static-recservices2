import supabase from "../config/supabaseClient.js";

// CREATE a new shift
async function createShift(shiftData) {
  const { data, error } = await supabase
    .from('shift')
    .insert([shiftData])
    .select();
  if (error) throw error;
  return data;
}

// READ all shifts
async function getAllShifts() {
  const { data, error } = await supabase
    .from('shift')
    .select('*');
  if (error) throw error;
  return data;
}

// READ one shift by id
async function getShiftById(id) {
  const { data, error } = await supabase
    .from('shift')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// UPDATE a shift by id
async function updateShift(id, updateData) {
  const { data, error } = await supabase
    .from('shift')
    .update(updateData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

// DELETE a shift by id
async function deleteShift(id) {
  const { data, error } = await supabase
    .from('shift')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};