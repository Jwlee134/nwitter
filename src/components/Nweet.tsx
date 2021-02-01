import React from "react";
import useNweet from "../hooks/useNweet";

interface Props {
  nweet: NweetObj;
  isCreator: boolean;
}

const Nweet = ({ nweet, isCreator }: Props) => {
  const {
    editing,
    onSubmit,
    toggleEditing,
    onDeleteClick,
    onChange,
    newNweet,
  } = useNweet(nweet);

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
          {nweet.attachmentUrl && (
            <img src={nweet.attachmentUrl} width="50px" height="50px" alt="" />
          )}
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
