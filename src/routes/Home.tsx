import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../base";
import Nweet from "../components/Nweet";

interface Props {
  user: User;
}

const Home = ({ user }: Props) => {
  const [text, setText] = useState("");
  const [nweets, setNweets] = useState<NweetObj[]>([]);
  const [attachment, setAttachment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Nweet),
        }));
        setNweets(nweetArray);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweet: Nweet = {
      text,
      createdAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
    };
    if (text !== "") {
      const input = inputRef.current;
      if (input) {
        input.value = "";
      }
      setText("");
      setAttachment("");
      dbService.collection("nweets").add(nweet);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const image = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent?.target?.result as string);
    };
  };

  const onClearAttachment = () => {
    const input = inputRef.current;
    if (input) {
      input.value = "";
    }
    setAttachment("");
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
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachment}>Cancel</button>
          </div>
        )}
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
