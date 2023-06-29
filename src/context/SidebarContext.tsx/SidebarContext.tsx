import { createContext, useState } from "react";

const SideBarContext = createContext({
  open: true,
  setOpen: (open: boolean) => {},
});

export const SideBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <SideBarContext.Provider value={{ open, setOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;
