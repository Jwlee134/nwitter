import React, { useState } from "react";
import { dbService, storageService } from "../base";

const useNweet = (nweet: NweetObj) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.text);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditing(false);
    dbService.doc(`nweets/${nweet.id}`).update({
      text: newNweet,
    });
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`nweets/${nweet.id}`).delete();
      if (nweet.attachmentUrl !== "") {
        await storageService.refFromURL(nweet.attachmentUrl as string).delete();
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return {
    editing,
    onSubmit,
    toggleEditing,
    onDeleteClick,
    onChange,
    newNweet,
  };
};

export default useNweet;
