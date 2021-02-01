import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../base";

const useNweetFactory = (
  inputRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  const { userObj } = useContext(UserContext);

  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj?.uid}/${uuidv4()}}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweet: Nweet = {
      text,
      createdAt: Date.now(),
      creatorId: userObj?.uid as string,
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

  return {
    text,
    attachment,
    handleSubmit,
    handleChange,
    onFileChange,
    onClearAttachment,
  };
};

export default useNweetFactory;
