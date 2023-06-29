import { useContext } from "react";
import SidebarContext from "../context/SidebarContext.tsx/SidebarContext";

const useSidebar = () => {
  return useContext(SidebarContext);
};

export default useSidebar;
