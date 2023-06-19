import { StyledInputGroup } from "./style";

type InputGroupProps = {
  children: React.ReactNode;
};

const InputGroup = ({ children }: InputGroupProps) => {
  return <StyledInputGroup> {children}</StyledInputGroup>;
};

export default InputGroup;
