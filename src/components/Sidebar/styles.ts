// import { Link } from "react-router-dom";
// import styled from "styled-components";

import styled from 'styled-components'

// export const Navbar = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   height: 3.5rem;
//   background-color: #000080;
// `;

// export const MenuIconOpen = styled(Link)`
//   display: flex;
//   justify-content: start;
//   font-size: 1.5rem;
//   margin-left: 2rem;
//   color: #4c4c6d;
//   &:hover {
//     color: #3c486b;
//   }
// `;

// export const MenuIconClose = styled(Link)`
//   display: flex;
//   justify-content: end;
//   font-size: 1.5rem;
//   margin-top: 0.75rem;
//   margin-right: 1rem;
//   color: #4c4c6d;
//   &:hover {
//     color: #3c486b;
//   }
// `;

// export const SidebarMenu = styled.div<{ close: boolean }>`
//   width: 250px;
//   height: 100vh;
//   background-color: #f8f6f4;
//   position: fixed;
//   top: 0;
//   left: ${({ close }) => (close ? "0" : "-100%")};
//   transition: 0.6s;
//   box-shadow: 2px 0px 13px 0px rgba(166, 159, 166, 1);
// `;

// export const MenuItems = styled.li`
//   list-style: none;
//   display: flex;
//   align-items: center;
//   justify-content: start;
//   width: 100%;
//   height: 90px;
//   padding: 1rem 0 1.25rem;
// `;

// export const MenuItemLinks = styled(Link)`
//   display: flex;
//   align-items: center;
//   padding: 0 2rem;
//   font-size: 20px;
//   text-decoration: none;
//   color: #4c4c6d;

//   &:hover {
//     background-color: #ffffff;
//     color: #000080;
//     width: 100%;
//     height: 45px;
//     text-align: center;
//     border-radius: 5px;
//     margin: 0 2rem;
//   }
// `;

export const Container = styled.div`
  display: flex;
  & > * {
    transition: all 0.5s ease;
  }
`

export const SidebarDiv = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: ${({ isOpen }) => (isOpen ? '200px' : '35px')};
  height: 100vh;
  background-color: #fff;
  color: #fff;
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  cursor: ${({ isOpen }) => (isOpen ? 'auto' : 'pointer')};
  &:hover {
    background-color: ${({ isOpen }) => (!isOpen ? '#e5e5e5' : '')};
  }
  transition: all 0.5 ease;
`

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const MenuItemIcon = styled.span`
  margin-right: 10px;
  color: #b1b1b1;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  width: 15px !important;
  height: 15px !important;
  opacity: 1;
  * {
    width: 15px !important;
    height: 15px !important;
    color: #b1b1b1;
  }
`

export const MenuItemText = styled.span`
  color: #b1b1b1;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 1;
`
export const MenuItem = styled.li<{ active: boolean }>`
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#695cfe' : 'transparent')};
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  ${({ active }) =>
    active &&
    `${MenuItemIcon} { color: #fff; } ${MenuItemText} { color: #fff; }}`}
  &:hover {
    background-color: #695cfe;
    ${MenuItemIcon} {
      color: #fff;
      * {
        color: #fff;
      }
    }
    ${MenuItemText} {
      color: #fff;
    }
  }
`

export const Toggle = styled.div`
  cursor: pointer;
  position: absolute;
  text-align: center;
  right: -35px;
  transform: translateY(-50%);
  height: 25px;
  width: 25px;
  background: #695cfe;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  span {
    width: 100%;
    height: 100%;
  }
`

export const Header = styled.div`
  position: relative;
`
