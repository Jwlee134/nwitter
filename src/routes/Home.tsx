import React, { useContext } from "react";
import styled from "styled-components";

import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

import { NweetContext } from "../context/Nweet";
import { UserContext } from "../context/User";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const { userObj } = useContext(UserContext);
  const { nweets } = useContext(NweetContext);

  return (
    <Container>
      <NweetFactory />
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweet={nweet}
          isCreator={nweet.creatorId === userObj?.uid}
        />
      ))}
    </Container>
  );
};

export default Home;
