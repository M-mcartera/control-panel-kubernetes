import React, { createContext } from "react";

const KeycloakContext = createContext({
	token: "",
	setToken: () => {},
});

export default KeycloakContext;
