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
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        // const newTheme = theme ? "black" : "#ffffff";
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        // return newTheme;
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    
    const handleRegister = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin = (email, password) => {
        setLoading(true);
       return signInWithEmailAndPassword(auth, email, password)
    }
    const handleSignOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const handleGoogleLogin = () => {
        setLoading(true);
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
        userProfile,
        theme, 
        toggleTheme
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