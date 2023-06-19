import "./App.css";
import {
  EntryPage,
  ErrorMessage,
  PageHeader,
} from "./components/globalComponents";
import EntryCard from "./components/EntryCard";
import InputGroup from "./components/InputGroup";
import Input from "./components/Input";
import Button from "./components/Button";
import React, { useState } from "react";
import RestClient from "./RestClient";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { publicAxios } from "./api/axios";
import axios from "axios";

function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const { setAuth = () => {} } = useAuth();

  const navigate = useNavigate();
  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formError) {
      setFormError("");
    }
    const isValidEmail = validateEmail(e.target.value);

    if (!isValidEmail) {
      setEmailError("Please enter a valid email address");
    } else {
      if (emailError) {
        setEmailError("");
      }
    }
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const isvalidEmail = validateEmail(email);
    if (!isvalidEmail) {
      setEmailError("Please enter a valid email address");
      return;
    }
    try {
      const response = await publicAxios.post("/auth/login", {
        email,
        password,
      });

      const { access_token = "" } = response.data;

      setAuth({ user: "", token: access_token });

      // const userInformation = await publicAxios.get("/users/profile");
      // console.log({ userInformation });
      resetInput();
      navigate("/settings/users");
    } catch {
      setFormError("Internal Server Error, please try again later");
      resetInput();
    }
  };

  return (
    <EntryPage>
      <PageHeader to="/">LOGO</PageHeader>
      <EntryCard>
        <ErrorMessage>{formError}</ErrorMessage>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputGroup>
            <label htmlFor="login-email">Email Address</label>
            <ErrorMessage>{emailError}</ErrorMessage>
            <Input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleEmailChange(e)
              }
              type="text"
              placeholder="name@email.com"
              id="login-email"
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="login-password">Password</label>
            <Input
              type="password"
              placeholder="Password"
              id="login-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </InputGroup>
          <Button type="submit" full>
            Sign in
          </Button>
        </form>
      </EntryCard>
    </EntryPage>
  );
}

export default App;
