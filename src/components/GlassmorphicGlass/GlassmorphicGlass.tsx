import { useNavigate } from "react-router-dom";
import { Card, GoArrow, GoCorner } from "./style";

const GlassmorphicCard = ({
  title,
  content,
  link,
}: {
  title: string | React.ReactNode;
  content: string;
  link: string;
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(link);
      }}
    >
      <h3>{title}</h3>
      <p className="small">{content}</p>
      <GoCorner>
        <GoArrow> → </GoArrow>
      </GoCorner>
    </Card>
  );
};

export default GlassmorphicCard;
