import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/User";

const Container = styled.div`
  width: 100%;
  padding-top: 80px;
  padding-bottom: 40px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;

const Li = styled.li`
  text-align: center;
`;

const Text = styled.div`
  font-size: 13px;
  margin-top: 10px;
`;

const Navigation = () => {
  const { userObj } = useContext(UserContext);

  return (
    <Container>
      <Ul>
        <Li>
          <Link to="/">
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "#099FFF" }}
              size="2x"
            />
          </Link>
        </Li>
        <Li>
          <Link to="/profile">
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#099FFF" }}
              size="2x"
            />
            <Text>
              {userObj?.displayName ? userObj?.displayName : "Anonymous"}'s
              Profile
            </Text>
          </Link>
        </Li>
      </Ul>
    </Container>
  );
};

export default Navigation;
