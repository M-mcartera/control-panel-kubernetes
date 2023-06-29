import BackButton from "../BackButton";
import { Container, Title } from "./style";

const ModuleTitle = ({
  title,
  backButtonPath,
  backButtonOnClick,
}: {
  title?: string;
  backButtonPath?: string;
  backButtonOnClick?: () => void;
}) => {
  return (
    <Container>
      <Title>{title ?? "Module title"}</Title>
      <BackButton
        onClick={backButtonOnClick}
        path={backButtonPath}
      ></BackButton>
    </Container>
  );
};

export default ModuleTitle;
