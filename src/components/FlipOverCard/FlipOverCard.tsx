import React from "react";
import { Card, EmptyBar, FilledBar, Bar, Title, Description } from "./style";

const FlipOverCard = ({
  onClick,
  title,
  description,
}: {
  onClick: () => void;
  title: string;
  description: string;
}) => {
  return (
    <Card className="card" onClick={onClick}>
      <Title className="title">{title}</Title>
      <Description>{description}</Description>
      <Bar className="bar">
        <EmptyBar className="emptybar"></EmptyBar>
        <FilledBar className="filledbar"></FilledBar>
      </Bar>
    </Card>
  );
};

export default FlipOverCard;
