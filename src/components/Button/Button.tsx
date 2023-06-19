import { StyledButton } from "./style";

export type ButtonProps = {
  children: React.ReactNode;
  full: boolean;
  type?: string;
};
const Button = ({ children }: ButtonProps) => {
  return <StyledButton type="submit">{children}</StyledButton>;
};

export default Button;
