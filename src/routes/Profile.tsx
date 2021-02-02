import React from "react";
import styled from "styled-components";
import useProfile from "../hooks/useProfile";

const Form = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 50px;
  background-color: #ee533a;
  color: #ffffff;
`;

const Profile = () => {
  const { onLogOut, onChange, onSubmit, userObj, newName } = useProfile();

  return (
    <>
      {userObj?.displayName !== null && (
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            onChange={onChange}
            value={newName as string}
          />
          <input type="submit" value="Save" />
        </Form>
      )}
      <Button onClick={onLogOut}>Sign Out</Button>
    </>
  );
};

export default Profile;
