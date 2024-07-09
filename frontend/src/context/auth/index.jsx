import { createContext, useContext, useState } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localstorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getLocalStorageItem("user") || null);

  let signin = (data, callback) => {
    setLocalStorageItem("user", data);
    setUser(data);
    callback();
  };

  let signout = (callback) => {
    removeLocalStorageItem("user");
    setUser(null);
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
