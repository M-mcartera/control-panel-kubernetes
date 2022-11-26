import React from 'react';
import { MainLayout, LayoutTitle, LayoutBody } from './GeneralLayout.styled';

const RefactoredGeneralLayout = ({ title, children }) => {
  return (
    <MainLayout>
      <LayoutTitle>{title}</LayoutTitle>
      <LayoutBody>{children}</LayoutBody>
    </MainLayout>
  );
};

export default RefactoredGeneralLayout;
