import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { SidebarLayout, SidebarTitle } from './StyledNav';
import modules from './modules';
import { isEmpty } from 'lodash';
import { Link, useHistory } from 'react-router-dom';

const SidebarMenu = ({}) => {
  const history = useHistory();
  const historyLocation = history.location.pathname;

  const handleActiveSubMenu = module => {
    return module.path.toString() === historyLocation.toString();
  };

  const handleIsOpen = module => {
    return !!module.subMenuItems.find(
      subMenu => subMenu.path === historyLocation
    );
  };

  return (
    <>
      <SidebarLayout>
        <Sidebar breakPoint="md">
          <SidebarTitle>Dashboard</SidebarTitle>
          <Menu>
            {modules.map(module => {
              if (isEmpty(module.subMenuItems)) {
                return (
                  <MenuItem
                    active={handleActiveSubMenu(module)}
                    key={module.name}
                    label={module.name}
                    routerLink={<Link to={module.path} />}
                  >
                    {module.name}
                  </MenuItem>
                );
              }
              return (
                <SubMenu
                  defaultOpen={handleIsOpen(module)}
                  icon={module.icon}
                  key={`${module.name}-submenu`}
                  label={module.name}
                >
                  {module.subMenuItems.map(subMenuItem => (
                    <MenuItem
                      active={handleActiveSubMenu(subMenuItem)}
                      routerLink={<Link to={subMenuItem.path} />}
                      key={subMenuItem.name}
                    >
                      {subMenuItem.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            })}
          </Menu>
        </Sidebar>
      </SidebarLayout>
    </>
  );
};

export default SidebarMenu;
