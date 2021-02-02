import React, { useState } from "react";
import styled from "styled-components";
import { authService, firebaseInstance } from "../base";

import { faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  color: #ee533a;
  font-size: 12px;
  margin: 5px 0px;
  align-self: center;
`;

const Text = styled.div`
  color: grey;
  text-decoration: underline;
  margin: 10px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 48%;
  background-color: #ffffff;
`;

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

  const toggleAccount = () => setNewAccount(newAccount ? false : true);

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
    <Container>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <Form onSubmit={handleSubmit}>
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
        <Error>{error}</Error>
        <input type="submit" value={newAccount ? "Sign Up" : "Sign In"} />
      </Form>
      <Text onClick={toggleAccount}>{newAccount ? "Sign In" : "Sign Up"}</Text>
      <ButtonContainer>
        <Button name="google" onClick={onSocialclick}>
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: 6 }} />
        </Button>
        <Button name="anonymous" onClick={onSocialclick}>
          Continue with Anonymous
          <FontAwesomeIcon icon={faGhost} style={{ marginLeft: 6 }} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Auth;
