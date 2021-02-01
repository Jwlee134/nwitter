import React, { createContext, useEffect, useState } from "react";
import { authService } from "../base";

interface Props {
  children: React.ReactNode;
}

interface Value {
  initialized: boolean;
  loggedIn: boolean;
  userObj: User | null;
  refreshUser: () => void;
}

const defaultValue: Value = {
  initialized: false,
  loggedIn: false,
  userObj: null,
  refreshUser: () => {},
};

export const UserContext = createContext(defaultValue);

export const UserContextProvider = ({ children }: Props) => {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<User | null>(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    if (!user) return;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInitialized(true);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ initialized, loggedIn, userObj, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
