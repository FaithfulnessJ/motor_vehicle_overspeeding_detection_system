import { auth } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

// Register function
const register = async (username: string, email: string, password: string) => {
  // Creating a new user
  const res = await createUserWithEmailAndPassword(auth, email, password);
  if(auth.currentUser) {
    // Creating a username
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    await sendEmailVerification(auth.currentUser);
  }

  return res;
};

// Login function
const login = async (email: string, password: string) => {
  // signing a registered user
  const res = await signInWithEmailAndPassword(auth, email, password)
  return res
};

// Reset password function
const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// Logout user
const logout = async () => {
  await signOut(auth);
};

const AuthServices = {
  register,
  login,
  resetPassword,
  logout,
};

export default AuthServices;
