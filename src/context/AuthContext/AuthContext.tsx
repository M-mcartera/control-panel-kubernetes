import React, { createContext, useState } from "react";

const AuthContext = createContext({
  auth: {
    token: "",
  },
  setAuth: (auth: any) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({ token: "" });
  console.log("authprovider", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
