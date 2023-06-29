import React, { createContext, useState } from "react";

const AuthContext = createContext({
  auth: {
    token: localStorage.getItem("token") || "",
  },
  setAuth: (auth: any) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
