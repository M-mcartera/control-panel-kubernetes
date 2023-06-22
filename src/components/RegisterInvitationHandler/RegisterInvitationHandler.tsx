import { Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicAxios } from "../../api/axios";
import { validatePassword } from "../../helpers";
import Button from "../Button";
import { ErrorMessage } from "../globalComponents";
import Input from "../Input";
import InputGroup from "../InputGroup";

const parseTokenErrorCode = (errorCode: number) => {
  switch (errorCode) {
    case 0:
      return {
        title: "Invalid token",
        options:
          "Please check your email for a valid link or request a new one",
      };
    case 1:
      return {
        title: "Token already redeemed",
        options: "Please contact support for further assistance",
      };
    case 2:
      return {
        title: "Token expired",
        options: "Please contact support or request a new link",
      };
    case 3:
      return {
        title: "User already exists",
        options: "You already have an account. Please login instead",
      };
    default:
      return {
        title: "Error",
        options: "Please contact support for further assistance",
      };
  }
};

const RegisterInvitationHandler = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    passwordError: "",
    repeatPasswordError: "",
  });
  const [apiErrors, setApiErrors] = useState<number | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorModalTitle, setErrorModalTitle] = useState<string>("");
  const [errorModalOptions, setErrorModalOptions] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await publicAxios.get(
            `/users/validate-invitation?token=${token}`
          );
          const { success } = response.data;
          if (success) {
            setModalOpen(true);
          } else {
            setApiErrors(response.data.errorCode);
          }
        } catch (error) {
          const err = error as AxiosError;
          toast.error(err.message);
        }
      })();
    }
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        setErrors({
          ...errors,
          passwordError:
            "Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character.",
        });
        return;
      }
      if (password !== repeatPassword) {
        setErrors({
          ...errors,
          repeatPasswordError: "Passwords do not match.",
        });
        return;
      }

      const response = await publicAxios.post("/users/register", {
        password,
        token,
      });

      const { success } = response.data;
      if (success) {
        toast.success("Account created successfully!");
        setModalOpen(false);
        navigate("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (apiErrors !== null) {
      setErrorModalOpen(true);
      const { title, options } = parseTokenErrorCode(apiErrors);
      setErrorModalTitle(title);
      setErrorModalOptions(options);
    }
  }, [apiErrors]);

  return (
    <>
      <Modal open={modalOpen} footer={null} closable={false} centered>
        <form onSubmit={handleSubmit}>
          <h1>Create user password</h1>
          <InputGroup>
            <ErrorMessage>{errors.passwordError}</ErrorMessage>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <ErrorMessage>{errors.repeatPasswordError}</ErrorMessage>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <Input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e: any) => setRepeatPassword(e.target.value)}
            />
          </InputGroup>
          <Button type="submit" full>
            Submit
          </Button>
        </form>
      </Modal>
      <Modal open={errorModalOpen} closable={false} footer={null} centered>
        <h1>{errorModalTitle}</h1>
        <span>{errorModalOptions}</span>
      </Modal>
    </>
  );
};

export default RegisterInvitationHandler;
