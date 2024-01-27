import { useParams } from 'react-router-dom'
import UsersListing from '../../components/Users/UsersListing'
import RolesListing from '../../components/Roles/RolesListing'
import React from 'react'
const SettingsController = () => {
  const { tab } = useParams()
  switch (tab) {
    case 'users':
      return <UsersListing />
    case 'roles':
      return <RolesListing />
    default:
      return <h1>Not found</h1>
  }
}

export default SettingsController
