import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

const Navigation = () => {
  const { userObj } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj?.displayName ? userObj?.displayName : "Anonymous"}'s
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
