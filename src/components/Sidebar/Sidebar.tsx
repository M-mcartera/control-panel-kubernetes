import { useEffect, useState } from 'react'
import { ArrowUndoOutline } from 'react-ionicons'
import { useLocation, useNavigate } from 'react-router-dom'
import useSidebar from '../../hooks/useSidebar'
import { useSidebarData } from './useSidebarData'
import {
  Menu,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  SidebarDiv,
  Toggle,
  Header,
} from './styles'

export const SidebarItem: React.FC<{
  icon: React.ReactNode
  text: string
  active: boolean
  onClick: () => void
}> = ({ icon, text, active, onClick }) => (
  <MenuItem active={active} onClick={onClick}>
    <MenuItemIcon>{icon}</MenuItemIcon>
    <MenuItemText>{text}</MenuItemText>
  </MenuItem>
)

const SideBar = () => {
  const [activeItem, setActiveItem] = useState(0) // [1
  const { open, setOpen } = useSidebar()
  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleItemClick = (index: number) => {
    setActiveItem(index)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const data = useSidebarData({ handleItemClick, handleNavigate, activeItem })

  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    if (path.includes('settings')) {
      setActiveItem(2)
    }
    if (path.includes('home')) {
      setActiveItem(0)
    }
    if (path.includes('resources')) {
      setActiveItem(1)
    }
  }, [path])

  return (
    <>
      <SidebarDiv
        isOpen={open}
        onClick={() => {
          if (open) {
            return
          }
          handleToggle()
        }}
      >
        <Header>
          <Toggle onClick={handleToggle}>
            <ArrowUndoOutline color="#fff" />
          </Toggle>
        </Header>
        <Menu>{data.map((item) => item)}</Menu>
      </SidebarDiv>
    </>
  )
}

export default SideBar
