import React, { useState } from 'react';
import App from './App';
import KeycloakContext from './KeycloakContext';
import { Space, Spin } from 'antd';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakClient from './keycloakClient';
import { processToken } from './lib/auth/auth';

const AppBuilder = () => {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);
  return (
    <ReactKeycloakProvider
      authClient={keycloakClient}
      initOptions={{ onLoad: 'login-required', checkLoginIframe: false }}
      LoadingComponent={
        <Space size="large">
          <Spin size="large" />
        </Space>
      }
      onEvent={event => {
        if (event === 'onAuthSuccess') {
          setIsReady(true);
          processToken(keycloakClient.tokenParsed);
          setToken(keycloakClient.tokenParsed);
        }
      }}
      onTokens={token => {
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
