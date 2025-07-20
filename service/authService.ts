// firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  villageCode: string,
  role: "resident" | "admin" = "resident",

) => {
  try {
    console.log("Starting registration with:", { email, name, role });
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { user } = userCredential;
    console.log("User created successfully:", user.uid);

    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      role: role.toUpperCase(),
      createdAt: serverTimestamp(),
      villageCode: villageCode,
      isActive: false,
    });
    
    console.log("User profile saved to Firestore");
    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
