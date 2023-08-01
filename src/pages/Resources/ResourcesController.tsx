import { useParams } from "react-router-dom";
import Namespaces from "./Tabs/Namespaces";

const ResourcesController = () => {
  const { tab } = useParams();
  switch (tab) {
    case "namespaces":
      return <Namespaces />;
    default:
      return <h1>Not found</h1>;
  }
};

export default ResourcesController;
