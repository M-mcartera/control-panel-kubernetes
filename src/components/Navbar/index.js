import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import KeycloakContext from '../../KeycloakContext';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const NavbarWrapper = styled.div`
  align-items: center;
  box-shadow: 0 3px 25px 4px #f1f1f1;
  display: flex;
  height: 70px;
  justify-content: center;
  width: 100%;
  background-color: white;
`;
const NavBar = styled.div`
  width: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;
const NavbarLogo = styled.div`
  width: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  img {
    object-fit: contain;
    height: 100px;
  }
`;
const AccountSpan = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  span {
    font-family: Roboto, sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
  }

  position: relative;
`;
const AccountActions = styled.div`
  display: none;
  position: absolute;
  right: 0;
  width: 200px;
  height: 100px;
  top: 20px;
`;
const NavbarAccountWrapper = styled.div`
  cursor: pointer;
  width: auto;
  justify-content: flex-end;
  align-items: center;
  transition: 0.3s;
  border-radius: 15px;
  background-color: ${({ active }) => (active ? '#f0f0f0' : 'white')};
  :hover {
    background-color: #f0f0f0;
    ${AccountActions} {
      display: block;
    }
  }
`;

const AccountActionsList = styled.ul`
  border-radius: 0 0 10px 10px;
  padding: 10px;
  box-sizing: border-box;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.7);
  li {
    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    margin-top: 3px;
    letter-spacing: 1px;
    font-weight: 300;
    padding: 5px;
    :hover {
      background-image: linear-gradient(286deg, #ccc, transparent);
      border-radius: 15px;
      padding: 5px;
    }
  }
`;
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token: keycloakUser } = useContext(KeycloakContext);
  const { preferred_username: username = '' } = keycloakUser;

  const handleOverlayMenu = state => {
    if (menuOpen !== state) {
      setMenuOpen(prevState => !prevState);
    }
  };

  return (
    <NavbarWrapper>
      <NavBar>
        <NavbarLogo></NavbarLogo>
        <NavbarAccountWrapper
          onMouseOver={() => {
            handleOverlayMenu(true);
          }}
          onMouseOut={() => {
            handleOverlayMenu(false);
          }}
        >
          <AccountSpan>
            <span>{username}</span>
            <span>
              {!menuOpen ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </span>{' '}
            <AccountActions>
              <AccountActionsList>
                <li>Account details</li>
                <li>Log out</li>
              </AccountActionsList>
            </AccountActions>
          </AccountSpan>
        </NavbarAccountWrapper>
      </NavBar>
    </NavbarWrapper>
  );
};

export default Navbar;
