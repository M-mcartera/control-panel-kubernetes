import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useState, useContext } from "react";
import keycloakClient from "./keycloakClient";
import { Space, Spin } from "antd";
import App from "./App";
import { processToken } from "./lib/auth/auth";
import KeycloakContext from "./KeycloakContext";

const AppBuilder = () => {
	const [isReady, setIsReady] = useState(false);
	const [token, setToken] = useState("");
	return (
		<ReactKeycloakProvider
			authClient={keycloakClient}
			initOptions={{ onLoad: "login-required" }}
			LoadingComponent={
				<Space size="large">
					<Spin size="large" />
				</Space>
			}
			onEvent={(event) => {
				if (event === "onAuthSuccess") {
					setIsReady(true);
					processToken(keycloakClient.tokenParsed);
					setToken(keycloakClient.tokenParsed);
				}
			}}
			onTokens={(token) => {
				if (token.token) {
				}
			}}
		>
			{isReady ? (
				<KeycloakContext.Provider value={{ token, setToken }}>
					<App />
				</KeycloakContext.Provider>
			) : (
				<></>
			)}
		</ReactKeycloakProvider>
	);
};

export default AppBuilder;
