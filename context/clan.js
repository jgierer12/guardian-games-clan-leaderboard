import { createContext, useContext } from "react";

const Context = createContext(null);

export const ClanProvider = Context.Provider;

export const useClan = () => {
  return useContext(Context);
};
