import styled, { css, keyframes } from 'styled-components';

export const NavBarWrapper = styled.div`
  height: 100vh;
  min-width: 310px;
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 4px #00000029;
  position: relative;
`;

export const NavbarTitle = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 80px 15px;
  box-sizing: border-box;
  span {
    color: #171725;
    font-family: ${({ theme }) => theme.font.defaultFont};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.08px;
  }
`;

export const NavBarItemText = styled.span`
  color: #171725;
  font-size: 14px;
  letter-spacing: 0.1px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.defaultFont};
`;

export const NavBarItemIcon = styled.span`
  font-size: 16px;
  width: 24px;
  height: 24px;
  color: #171725;
`;

const renderIsActive = active => {
  if (active) {
    return css`
      ${NavBarItemIcon} {
        color: #0058ff;
      }
      ${NavBarItemText} {
        color: #0058ff;
      }
      :after {
        content: '';
        width: 4px;
        height: 100%;
        background-color: #0058ff;
        border-radius: 10px;
        position: absolute;
        right: 0;
      }
    `;
  }
};

export const NavBarItem = styled.li`
  width: 100%;
  display: flex;
  column-gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  :hover {
    ${NavBarItemIcon} {
      color: #0058ff;
    }
    ${NavBarItemText} {
      color: #0058ff;
    }
  }
`;

export const NavBarBody = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  ul {
    width: 100%;
    list-style: none;
    ${NavBarItem} {
      position: relative;
      width: 100%;
      margin-top: 10px;
    }
  }
`;
export const NavBarFooter = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 75px;
  background: #e5eeff 0 0 no-repeat padding-box;
  border-radius: 0 0 0 24px;
  box-sizing: border-box;
  padding: 71px 0;
`;

export const NavBarUser = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #131523;
`;

export const NavBarUserHandle = styled.div`
  display: flex;
  column-gap: 10px;
  text-transform: capitalize;
  align-items: center;
  cursor: pointer;
`;

export const NavbarUserIcon = styled.span`
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 3px;
  box-sizing: border-box;
  color: cornflowerblue;
`;

export const NavbarUserUsername = styled.span`
  font-size: 14px;
  font-family: Poppins, sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
`;
export const NavbarUserArrow = styled.span`
  font-weight: 300;
  color: #ccc;
  font-size: 12px;
`;

export const NavBarItemWrapper = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  ${({ isActive }) => renderIsActive(isActive)}
`;

const reveal = keyframes`
  from {
    transform: translateX(-1000%);
    opacity: 0;
  }
  to{
    transform: translateX(0);
    opacity: 1;
  }
`;
const render = active => {
  if (active) {
    return css`
      animation: ${reveal} 0.3s linear forwards;
    `;
  }
};
export const UserActionsList = styled.div`
  width: 180px;
  position: absolute;
  bottom: 30px;
  right: -180px;
  height: 75px;
  border-radius: 0 15px 15px 0;
  background: #e5eeff 0 0 no-repeat padding-box;
  box-shadow: 0 0 4px #00000029;
  z-index: 10;
  transform: translateX(-1000%);
  opacity: 0;
  ${({ active }) => render(active)}
`;

export const UserActionItem = styled.span`
  width: 100%;
  padding: 5px 10px;
  font-family: Poppins, sans-serif;
  font-weight: 400;
  cursor: pointer;
`;
