import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { loginWithFirebase, getMe, logoutSession } from "../services/api";

const FIREBASE_ERRORS = {
  "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
  "auth/invalid-email": "Invalid email address. Please check and try again.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your internet connection.",
  "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Firebase API key is invalid. Check your .env configuration.",
  "auth/invalid-api-key": "Firebase API key is invalid. Check your .env configuration.",
  "auth/operation-not-allowed": "Email/Password sign-in is not enabled. Enable it in Firebase Console.",
  "auth/invalid-credential": "Email/password mismatch or not found.",
};

function toFriendlyError(error) {
  const code = error?.code || error?.message || "";
  const match = Object.entries(FIREBASE_ERRORS).find(([key]) => code.includes(key));
  return new Error(match ? match[1] : code || "Something went wrong. Please try again.");
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("firebase_token", token);
        setUser(firebaseUser);
        try {
          const session = await loginWithFirebase(token);
          if (session) setProfile(session.user || session);
        } catch {
          try { const me = await getMe(); setProfile(me); } catch { /* silent */ }
        }
      } else {
        localStorage.removeItem("firebase_token");
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    const interval = setInterval(async () => {
      const fbUser = auth.currentUser;
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken(true);
          localStorage.setItem("firebase_token", token);
        } catch { /* silent */ }
      }
    }, 55 * 60 * 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const login = async (email, password) => {
    let cred;
    try {
      cred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      throw toFriendlyError(err);
    }
    const token = await cred.user.getIdToken();
    localStorage.setItem("firebase_token", token);
    try { const session = await loginWithFirebase(token); setProfile(session?.user || session || null); } catch { /* silent */ }
    return cred.user;
  };

  const register = async (email, password) => {
    let cred;
    try {
      cred = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      throw toFriendlyError(err);
    }
    const token = await cred.user.getIdToken();
    localStorage.setItem("firebase_token", token);
    try { const session = await loginWithFirebase(token); setProfile(session?.user || session || null); } catch { /* silent */ }
    return cred.user;
  };

  const logout = async () => {
    try { await logoutSession(); } catch { /* silent */ }
    await signOut(auth);
    localStorage.removeItem("firebase_token");
    setProfile(null);
    window.location.href = "/";
  };

  const refreshProfile = async () => {
    try { const me = await getMe(); setProfile(me); } catch { /* silent */ }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
