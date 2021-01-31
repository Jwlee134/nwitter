import React, { useState } from "react";
import { dbService } from "../base";

interface Props {
  nweet: NweetObj;
  isCreator: boolean;
}

const Nweet = ({ nweet, isCreator }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.text);

  const toggleEditing = () => setEditing((prev) => !prev);

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      dbService.doc(`nweets/${nweet.id}`).delete();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditing(false);
    dbService.doc(`nweets/${nweet.id}`).update({
      text: newNweet,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {isCreator && editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet."
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Save" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweet.text}</h4>
          {isCreator && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
