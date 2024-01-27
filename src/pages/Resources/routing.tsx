import _ from 'lodash'
import { UserRole } from '../../context/AuthContext/AuthContext'
import useAuth from '../../hooks/useAuth'
import { useMemo } from 'react'
import PodsTab from './Tabs/pods/PodsTab'
import React from 'react'
const checkRolesExistance = (roles: UserRole[], resouceName: string) => {
  const userRole = roles.find(
    (arrRole) => arrRole.name.toLowerCase() === resouceName.toLowerCase(),
  )
  if (_.isEmpty(userRole)) {
    return true
  }

  if (userRole.type === 'wildcard') {
    return false
  }

  if (userRole.type !== 'read') {
    return true
  }

  return false
}

export const useResourceData = () => {
  const { auth } = useAuth()
  const roles = auth.roles as UserRole[]

  return useMemo(
    () => [
      {
        key: 'pods',
        label: 'Pods',
        children: <PodsTab />,
        disabled: checkRolesExistance(roles, 'pods'),
      },
      {
        key: 'deployments',
        label: 'Deployments',
        children: <h1>Deployments</h1>,
        disabled: checkRolesExistance(roles, 'deployments'),
      },
      {
        key: 'services',
        label: 'Services',
        children: <h1>Services</h1>,
        disabled: checkRolesExistance(roles, 'services'),
      },
      {
        key: 'ingresses',
        label: 'Ingresses',
        children: <h1>Ingresses</h1>,
        disabled: checkRolesExistance(roles, 'ingresses'),
      },
      {
        key: 'configMaps',
        label: 'ConfigMaps',
        children: <h1>ConfigMaps</h1>,
        disabled: checkRolesExistance(roles, 'configMaps'),
      },
      {
        key: 'namespaces',
        label: 'Namespaces',
        children: <h1>Namespaces</h1>,
        disabled: checkRolesExistance(roles, 'namespaces'),
      },
    ],
    [roles],
  )
}
