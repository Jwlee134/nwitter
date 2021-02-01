import React, { createContext, useEffect, useState } from "react";
import { dbService } from "../base";

interface Value {
  nweets: NweetObj[];
}

interface Props {
  children: React.ReactNode;
}

const defaultValue: Value = {
  nweets: [],
};

export const NweetContext = createContext(defaultValue);

export const NweetContextProvider = ({ children }: Props) => {
  const [nweets, setNweets] = useState<NweetObj[]>([]);

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

  return (
    <NweetContext.Provider value={{ nweets }}>{children}</NweetContext.Provider>
  );
};
