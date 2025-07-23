import { supabase } from "../database/supabase.js";

// Sign up
export const signUp = async (req, res, next) => {
  try {
    console.log(`Creating new user...`);
    const {mail, pass} = req.body;
    const { data, error } = await supabase.auth.signUp({
        email: mail,
        password: pass
    });
    if (error) throw error

    res
      .status(201)
      .json({ message: `User created successfully`, data });
  } catch (error) {
    console.error(`Error creating user:`, error);
    return res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

// Log in
export const logIn = async (req, res, next) => {
  try {
    const { mail, pass } = req.body;
    console.log(`Logging in as user: ${mail}`);
    const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: pass
    })
    if (error) throw error
    
    res.status(200).json(data);
  } catch (error) {
    const mail = req?.body?.mail || 'Unknown';
    console.error(`Error logging in as user: ${mail}: `, error);
    next(error);
  }
};

// Forgot password
export const forgotPass = async (req, res, next) => {
  try {
    const { mail } = req.body;
    console.log(`Resetting password for: ${mail}`);
    const { data, error } = await supabase.auth.resetPasswordForEmail(mail)
    if (error) throw error

    res.status(200).json(data);
  } catch (error) {
    const mail = req?.body?.mail || 'Unknown';
    console.error(`Error resetting password for: ${mail}:`, error);
    next(error);
  }
};

// Log out
export const logOut = async (req, res, next) => {
  try {
    console.log(`Logging out`);
    const { error } = await supabase.auth.signOut();
    if (error) throw error

    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.error(`Error signing out:`, error);
    next(error);
  }
};

// Delete User **Requires service key (Needs admin permissions)
export const deleteUser = async (req, res, next) => {
  try {
    const { UID } = req.body;
    console.log(`Deleting user`);
    const { data, error } = await supabase.auth.admin.deleteUser(
  UID
)
    if (error) throw error

    res.status(200).json({message: "User Deleted"});
  } catch (error) {
    console.error(`Error deleting user:`, error);
    next(error);
  }
};
