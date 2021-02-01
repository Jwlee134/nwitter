import React, { useRef } from "react";

import useNweetFactory from "../hooks/useNweetFactory";

const NweetFactory = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    text,
    attachment,
    handleSubmit,
    handleChange,
    onFileChange,
    onClearAttachment,
  } = useNweetFactory(inputRef);

  return (
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
  );
};

export default NweetFactory;
