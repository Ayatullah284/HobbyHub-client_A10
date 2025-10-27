import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config"; // ✅ ঠিক করা হলো
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth)
  }
  const createWithEmailAndPassword = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const signInEmailAndPassword = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const resetPassword  = (email)=>{
    return sendPasswordResetEmail(auth, email)
  }

    const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  


  useEffect(()=>{
    const unSubscrib = onAuthStateChanged(auth, (user) => {
    setUser(user)

    setLoading(false);  // ✅ user load শেষ হলে

    return ()=>{
        unSubscrib();
    }
});
  },[])




  const authData = { 
    signInWithGooglePopup,
    user ,
    logOut,
    createWithEmailAndPassword,
    signInEmailAndPassword,
    resetPassword,
    updateUserProfile,
    loading
};

if (loading) {
  return <LoadingSpinner />;
}


  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;