import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { UserContext } from "../context/User";

import Router from "./Router";

const GlobalStyles = createGlobalStyle`
  ${reset};
  body{
    height:100vh;
    background-color:#333333;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  form{
    width:100%;
  }
  input{
    all:unset;
    width:370px;
    background-color:#ffffff;
    padding:10px 15px;
    border-radius:50px;
    margin:10px 0px;
  }
  input[type="submit"]{
    color:#ffffff;
    background-color:#099FFF;
    text-align:center;
    &:hover{
      background-color:#33b1ff;
    }
  }
  a{
    color:#ffffff;
    text-decoration:none;
  }
  *{
    box-sizing: border-box;
  }
  button{
    padding: 10px 5px;
    border:none;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      outline: none;
    }
  }
`;

const Container = styled.div`
  width: 400px;
  height: 100vh;
  margin: 0 auto;
`;

const App = () => {
  const { initialized } = useContext(UserContext);

  return (
    <>
      <GlobalStyles />
      <Container>
        {initialized ? <Router /> : "Initializing..."}
        {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
      </Container>
    </>
  );
};

export default App;
