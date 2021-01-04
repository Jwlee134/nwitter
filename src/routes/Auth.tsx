import React, { useState } from "react";
import { authService, firebaseInstance } from "../base";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const toggleAccount = () => {
    return setNewAccount(newAccount ? false : true);
  };

  const onSocialclick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const {
      currentTarget: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
      await authService.signInWithPopup(provider);
    } else {
      await authService.signInAnonymously();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input type="submit" value={newAccount ? "Sign Up" : "Sign In"} />
        {error}
      </form>
      <div onClick={toggleAccount}>{newAccount ? "Sign In" : "Sign Up"}</div>
      <div>
        <button name="google" onClick={onSocialclick}>
          Continue with Google
        </button>
        <button name="anonymous" onClick={onSocialclick}>
          Continue with Anonymous
        </button>
      </div>
    </div>
  );
};

export default Auth;
