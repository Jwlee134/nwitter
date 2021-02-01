import React, { useContext } from "react";

import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

import { NweetContext } from "../context/Nweet";
import { UserContext } from "../context/User";

const Home = () => {
  const { userObj } = useContext(UserContext);
  const { nweets } = useContext(NweetContext);

  return (
    <>
      <NweetFactory />
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweet={nweet}
          isCreator={nweet.creatorId === userObj?.uid}
        />
      ))}
    </>
  );
};

export default Home;
