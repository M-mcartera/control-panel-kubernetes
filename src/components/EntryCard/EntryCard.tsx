import { StyledEntryCard } from "./style";

type EntryCardProps = {
  children: React.ReactNode;
};

const EntryCard = ({ children }: EntryCardProps) => {
  return <StyledEntryCard>{children}</StyledEntryCard>;
};

export default EntryCard;
