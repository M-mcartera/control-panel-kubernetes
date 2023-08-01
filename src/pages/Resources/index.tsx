import { CopyOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { Wrap } from "../../components/DefaultButton/style";
import FlipOverCard from "../../components/FlipOverCard";
import ModuleTitle from "../../components/ModuleTitle";
import { CardsContainer, Wrapper } from "./style";
const Resources = () => {
  const navigate = useNavigate();

  const array = [0, 1, 2, 3, 4, 5, 6];
  const cardsRepresentation = [
    {
      title: "Namespaces",
      description:
        "Kubernetes namespaces are virtual clusters that enable resource isolation and logical separation within a Kubernetes cluster",
      onClick: () => {
        navigate("namespaces");
      },
    },
    {
      title: "Namespaces",
      description:
        "Kubernetes namespaces are virtual clusters that enable resource isolation and logical separation within a Kubernetes cluster",
      onClick: () => {
        navigate("namespaces");
      },
    },
    {
      title: "Namespaces",
      description:
        "Kubernetes namespaces are virtual clusters that enable resource isolation and logical separation within a Kubernetes cluster",
      onClick: () => {
        navigate("namespaces");
      },
    },
    {
      title: "Namespaces",
      description:
        "Kubernetes namespaces are virtual clusters that enable resource isolation and logical separation within a Kubernetes cluster",
      onClick: () => {
        navigate("namespaces");
      },
    },
  ];
  return (
    <>
      <ModuleTitle title="Resources Module" hideButton={true} />
      <Wrapper>
        <CardsContainer>
          {cardsRepresentation.map((card) => {
            return (
              <FlipOverCard
                title={card.title}
                description={card.description}
                onClick={card.onClick}
              />
            );
          })}
        </CardsContainer>
      </Wrapper>
    </>
  );
};
export default Resources;
