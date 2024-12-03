import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import auth from '../firebase/firebase.config'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null);
    
    const handleRegister = (email,password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin = (email, password) => {
       return signInWithEmailAndPassword(auth, email, password)
    }
    const handleSignOut = () => {
        return signOut(auth)
    }
    const handleGoogleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const manageProfile = (manageData) => {
        setUserProfile(manageData.photoURL);
        return updateProfile(auth.currentUser, manageData)
    }
    const authInfo = {
        handleGoogleLogin,
        handleLogin,
        handleRegister,
        handleSignOut,
        user, 
        setUser,
        manageProfile,
        loading,
        userProfile
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if(currentUser){
                    setUser(currentUser)
                }else{
                    setUser(null)
                }
                setLoading(false)
            return() => {
                unsubscribe()
            }
        })
    }, [])

    return <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
};

export default AuthProvider;