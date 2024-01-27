import { HomeOutline, LayersOutline, SettingsOutline } from 'react-ionicons'
import { SidebarItem } from './Sidebar'
export const useSidebarData = ({
  handleItemClick,
  handleNavigate,
  activeItem,
}: {
  handleItemClick: (e: number) => void
  handleNavigate: (e: string) => void
  activeItem: number
}) => {
  return [
    <SidebarItem
      key="home"
      icon={<HomeOutline />}
      text="Home"
      active={activeItem === 0}
      onClick={() => {
        handleItemClick(0)
        handleNavigate('/home')
      }}
    />,
    <SidebarItem
      key="resources"
      icon={<LayersOutline />}
      text="Resources"
      active={activeItem === 1}
      onClick={() => {
        handleItemClick(0)
        handleNavigate('/resources/pods')
      }}
    />,
    <SidebarItem
      key="settings"
      icon={<SettingsOutline />}
      text="Settings"
      active={activeItem === 2}
      onClick={() => {
        handleItemClick(1)
        handleNavigate('/settings')
      }}
    />,
  ]
}
