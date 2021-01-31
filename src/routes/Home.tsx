import React, { useEffect, useState } from "react";
import { dbService } from "../base";
import Nweet from "../components/Nweet";

interface Props {
  user: User;
}

const Home = ({ user }: Props) => {
  const [text, setText] = useState("");
  const [nweets, setNweets] = useState<NweetObj[]>([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Nweet),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    await dbService.collection("nweets").add({
      text,
      createdAt: Date.now(),
      creatorId: user.uid,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={text}
          onChange={handleChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isCreator={nweet.creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
