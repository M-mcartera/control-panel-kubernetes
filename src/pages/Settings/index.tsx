import { PersonOutline, SettingsOutline } from 'react-ionicons'
import GlassmorphicCard from '../../components/GlassmorphicGlass'
import { CardTitleWrapper, CardsWrapper } from './style'
import React from 'react'
const SettingsModule = () => {
  const modules = [
    {
      title: (
        <CardTitleWrapper>
          <span>Settings</span>
          <SettingsOutline
            color={'#ffffff'}
            title="Settings"
            height="40px"
            width="30px"
          />
        </CardTitleWrapper>
      ),
      content: 'Manage your settings',
      path: 'settings',
    },
    {
      title: (
        <CardTitleWrapper>
          <span>Users</span>
          <PersonOutline
            color={'#ffffff'}
            title="Users"
            height="40px"
            width="30px"
          />
        </CardTitleWrapper>
      ),
      content: 'Manage your users',
      path: 'users',
    },
    {
      title: (
        <CardTitleWrapper>
          <span>Roles</span>
          <PersonOutline
            color={'#ffffff'}
            title="Roles"
            height="40px"
            width="30px"
          />
        </CardTitleWrapper>
      ),
      content: 'Manage your RBAC roles',
      path: 'roles',
    },
  ]
  return (
    <CardsWrapper>
      {modules.map((module, index) => (
        <GlassmorphicCard
          key={`${module.content} + ${index}`}
          title={module.title}
          content={module.content}
          link={module.path}
        />
      ))}
    </CardsWrapper>
  )
}

export default SettingsModule
