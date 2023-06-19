import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import RestClient from "../../../RestClient";
import { User } from "../types";

const UsersListing = () => {
  const [data, setData] = useState<User[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("/users");
        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);
  return (
    <div>
      <h1>Users Listing</h1>
    </div>
  );
};

export default UsersListing;
