import React, { useState, useEffect } from "react";
import fire, { database } from "./fire";
import "./App.css";
import Login from "./Login";
import Hero from "./Hero";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, push, set } from "firebase/database";
function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [pid, setPid] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setPlaceOfBirth("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    clearErrors();
    signInWithEmailAndPassword(fire, email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
  };

  const handleSignUp = () => {
    clearErrors();
    const userRef = ref(database, "users");
    const newUserRef = push(userRef);
    set(newUserRef, {
      email,
      placeOfBirth,
      dob,
    });
    setPid(newUserRef.key);

    createUserWithEmailAndPassword(fire, email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    });
  };

  const handleLogout = () => {
    signOut(fire);
  };

  const authListener = () => {
    onAuthStateChanged(fire, (user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <Hero handleLogout={handleLogout} user={user} pid={pid} />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          dob={dob}
          setDob={setDob}
          placeOfBirth={placeOfBirth}
          setPlaceOfBirth={setPlaceOfBirth}
        />
      )}
    </div>
  );
}

export default App;
