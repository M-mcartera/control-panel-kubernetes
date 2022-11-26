import React, { useContext, useState } from 'react';
import {
  NavBarWrapper,
  NavbarTitle,
  NavBarBody,
  NavBarItem,
  NavBarItemIcon,
  NavBarItemText,
  NavBarFooter,
  NavBarUser,
  NavBarUserHandle,
  NavbarUserIcon,
  NavbarUserUsername,
  NavbarUserArrow,
  NavBarItemWrapper,
  UserActionsList,
  UserActionItem
} from './RestyledNavbar.styled';

import modules from '../SidebarMenu/modules';
import KeycloakContext from '../../KeycloakContext';
import { AiOutlineUser } from 'react-icons/ai';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const RestyledNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token: keycloakUser } = useContext(KeycloakContext);
  const { preferred_username: username = '' } = keycloakUser;

  const history = useHistory();

  const handleRedirect = path => {
    history.push(path, {
      from: history.location.pathname
    });
  };

  const handleIsActive = module => {
    const locationPathName = history.location.pathname;
    const split_locationPathName = locationPathName.split('/')[1];
    const normalize_split_locationPathName = `/${split_locationPathName}`;
    return (
      module.path === locationPathName ||
      module.path === normalize_split_locationPathName
    );
  };

  const handleUserMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <NavBarWrapper>
      <NavbarTitle>
        <span>Kubernetes dashboard</span>
      </NavbarTitle>
      <NavBarBody>
        <ul>
          {modules.map(module => {
            return (
              <NavBarItemWrapper
                key={module.name}
                isActive={handleIsActive(module)}
              >
                <NavBarItem
                  onClick={() => {
                    handleRedirect(module.path);
                  }}
                >
                  <NavBarItemIcon>{module.icon || ''}</NavBarItemIcon>
                  <NavBarItemText>{module.name}</NavBarItemText>
                </NavBarItem>
              </NavBarItemWrapper>
            );
          })}
        </ul>
      </NavBarBody>
      <NavBarFooter>
        <NavBarUser>
          <NavBarUserHandle
            onClick={() => {
              handleUserMenu();
            }}
          >
            <NavbarUserIcon>
              <AiOutlineUser />
            </NavbarUserIcon>
            <NavbarUserUsername>{username}</NavbarUserUsername>
            <NavbarUserArrow>
              {!isOpen ? <FaGreaterThan /> : <FaLessThan />}
            </NavbarUserArrow>
          </NavBarUserHandle>
        </NavBarUser>
      </NavBarFooter>
      <UserActionsList active={isOpen}>
        <UserActionItem>Account details</UserActionItem>
        <hr />
        <UserActionItem>Log out</UserActionItem>
      </UserActionsList>
    </NavBarWrapper>
  );
};

export default RestyledNavbar;
