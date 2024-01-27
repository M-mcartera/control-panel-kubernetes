import { useContext } from 'react'
import SidebarContext from '../context/SidebarContext/SidebarContext'

const useSidebar = () => {
  return useContext(SidebarContext)
}

export default useSidebar
