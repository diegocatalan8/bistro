'use client'
import React, { useContext } from "react";

export const AccountContext = React.createContext(null);

export function useAccountContext() {
  const { user, setUser } = useContext(AccountContext);
  return { user, setUser };
}

export function AccountProvider({ children }) {
  const [user, setUser] = React.useState(null);


  return (
    <AccountContext.Provider value={{ user, setUser  }}>
      {children}
    </AccountContext.Provider>
  );
}
