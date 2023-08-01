import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./reset.css";
import SettingsModule from "./pages/Settings";
import SettingsController from "./pages/Settings/SettingsController";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterInvitationHandler from "./components/RegisterInvitationHandler";
import Home from "./components/Home";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { SideBarProvider } from "./context/SidebarContext/SidebarContext";
import { SocketProvider } from "./context/SocketContext/SocketContext";
import Resources from "./pages/Resources";
import ResourcesController from "./pages/Resources/ResourcesController";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <SideBarProvider>
        <SocketProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<App />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsModule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/:tab"
                element={
                  <PrivateRoute>
                    <SettingsController />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invitation/register"
                element={<RegisterInvitationHandler />}
              />
              <Route
                path="/resources"
                element={
                  <PrivateRoute>
                    <Resources />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resources/:tab"
                element={
                  <PrivateRoute>
                    <ResourcesController />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </SocketProvider>
      </SideBarProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
