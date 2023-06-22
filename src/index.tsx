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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterInvitationHandler from "./components/RegisterInvitationHandler";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<SettingsModule />} />
          <Route path="/settings/:tab" element={<SettingsController />} />
          <Route
            path="/invitation/register"
            element={<RegisterInvitationHandler />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
