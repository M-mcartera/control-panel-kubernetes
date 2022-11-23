import Spinner from 'react-spinner-material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

const StyledSpinnerOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  z-index: 2;
`;
const StyledSpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;
const LoadingSpinner = ({ isLoading }) => {
  console.log({ isLoading });
  const theme = useTheme();
  const color = !isEmpty(theme) ? theme.spinner.color : '#9690E1';
  const radius = !isEmpty(theme) ? theme.spinner.radius : 120;
  const stroke = !isEmpty(theme) ? theme.spinner.stroke : 2;

  if (isLoading) {
    return (
      <StyledSpinnerOverlay>
        <StyledSpinnerWrapper>
          <Spinner radius={radius} color={color} stroke={stroke} />
        </StyledSpinnerWrapper>
      </StyledSpinnerOverlay>
    );
  }
  return <></>;
};

const mapStateToProps = state => {
  const isLoading = state.users.loading;

  return { isLoading };
};

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LoadingSpinner);
