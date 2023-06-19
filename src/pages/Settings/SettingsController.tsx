import { useParams } from "react-router-dom";
import UsersListing from "../../components/Users/UsersListing";

const SettingsController = () => {
  const { tab } = useParams();
  console.log(tab);
  switch (tab) {
    case "users":
      return <UsersListing />;
    default:
      return <h1>Not found</h1>;
  }
};

export default SettingsController;
