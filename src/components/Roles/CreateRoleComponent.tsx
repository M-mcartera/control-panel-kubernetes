import { Checkbox, Divider, Input, Modal } from 'antd'
import { AxiosError } from 'axios'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { firstLetterUppercase } from '../../helpers'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Button from '../Button'
import { ErrorMessage, FooterButtons } from '../globalComponents'
import InputGroup from '../InputGroup'
import { RolesWrapper, RoleBlock } from './CreateRoleComponent.styled'
import { Role } from './types'
const ACTIONS_NAMES = Object.freeze({
  GET: 'get',
  LIST: 'list',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ALL: 'all',
  PATCH: 'patch',
})
const ACTIONS = [
  { name: ACTIONS_NAMES.GET, checked: false },
  { name: ACTIONS_NAMES.LIST, checked: false },
  { name: ACTIONS_NAMES.CREATE, checked: false },
  { name: ACTIONS_NAMES.UPDATE, checked: false },
  { name: ACTIONS_NAMES.PATCH, checked: false },
  { name: ACTIONS_NAMES.DELETE, checked: false },
  { name: ACTIONS_NAMES.ALL, checked: false },
]
const RESOURCES = [
  { name: 'Pods', actions: ACTIONS },
  { name: 'Deployments', actions: ACTIONS },
  { name: 'Services', actions: ACTIONS },
  { name: 'Ingresses', actions: ACTIONS },
  { name: 'ConfigMaps', actions: ACTIONS },
  { name: 'Namespaces', actions: ACTIONS },
]
export type Action = {
  name: string
  checked: boolean
}
export type Resource = {
  name: string
  actions: Action[]
}

const RoleDisplayComponent = ({
  resource,
  updateParent,
}: {
  resource: Resource
  updateParent: (actions: Action[]) => void
}) => {
  const [actions, setActions] = useState<Action[]>([])

  useEffect(() => {
    setActions(resource.actions)
  }, [resource])
  const handleActionChange = (value: boolean, action: Action) => {
    let tempActions
    if (action.name === ACTIONS_NAMES.ALL) {
      tempActions = actions.map((a: Action) => ({ ...a, checked: value }))
    } else {
      tempActions = actions.map((a: Action) => {
        if (a.name === action.name) {
          return { ...a, checked: value }
        }
        return a
      })
    }
    setActions(tempActions)
    updateParent(tempActions)
  }

  return (
    <RoleBlock>
      <h4>{resource.name}</h4>
      <ul>
        {actions.map((action: Action) => (
          <li key={action.name}>
            <Checkbox
              onChange={(e) => handleActionChange(e.target.checked, action)}
              checked={action.checked}
            >
              {firstLetterUppercase(action.name)}
            </Checkbox>
          </li>
        ))}
      </ul>
    </RoleBlock>
  )
}

type CreateRoleErrors = {
  roleName: string
  resources: string
}

type CreateRoleComponentProps = {
  closeModal: () => void
  isEdit: boolean
  role: Role
  refetchRoles: () => void
}
const CreateRoleComponent = ({
  closeModal,
  isEdit,
  role,
  refetchRoles,
}: CreateRoleComponentProps) => {
  const [roleName, setRoleName] = useState('')
  const [roleDescription, setRoleDescription] = useState('')
  const [resources, setResources] = useState<Resource[]>(RESOURCES)
  const [errors, setErrors] = useState<CreateRoleErrors>({
    roleName: '',
    resources: '',
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    if (isEdit) {
      setRoleName(role.roleName)
      setRoleDescription(role.roleDescription)
      setResources(role.resources)
    } else {
      setRoleName('')
      setRoleDescription('')
      setResources(RESOURCES)
    }
  }, [isEdit, role])

  const isWarningResources = (resources: Resource[]) => {
    const existingActions = resources
      .flatMap((resource) => resource.actions)
      .some((action) => action.checked === true)

    return !existingActions
  }

  const resetModal = () => {
    setRoleName('')
    setRoleDescription('')
    setResources(RESOURCES)
    closeModal()
    refetchRoles()
  }

  const submitData = async (
    rolename: string,
    roledescrption: string,
    resources: Resource[],
  ) => {
    if (isEdit) {
      try {
        const { data: roleCreationResponse } = await axiosPrivate.put(
          `/roles/${role._id}`,
          {
            roleName: rolename,
            roleDescription: roledescrption,
            resources: resources,
          },
        )

        if (roleCreationResponse.status === 'success') {
          toast.success('Role updated successfully!')
          resetModal()
        }
      } catch (err) {
        const error = err as AxiosError
        toast.error(error.message)
      }
      return
    }
    try {
      const { data: roleCreationResponse } = await axiosPrivate.post('/roles', {
        roleName: rolename,
        roleDescription: roledescrption,
        resources: resources,
      })

      if (roleCreationResponse.status === 'success') {
        toast.success('Role created successfully!')
        resetModal()
      }
    } catch (err) {
      const error = err as AxiosError
      toast.error(error.message)
    }
  }

  const handleSubmit = async () => {
    if (_.isEmpty(roleName)) {
      setErrors({ ...errors, roleName: 'Role name is required' })
      return
    }
    if (isWarningResources(resources)) {
      setIsModalOpen(true)
      return
    }

    await submitData(roleName, roleDescription, resources)
  }

  const handleUpdateParent = (resource: Resource, actions: Action[]) => {
    const tempResources = resources.map((r: Resource) => {
      if (r.name === resource.name) {
        return { ...r, actions }
      }
      return r
    })
    setResources(tempResources)
  }

  const sendEmptyRole = async () => {
    await submitData(roleName, roleDescription, [])
    resetModal()
    setIsModalOpen(false)
  }

  return (
    <>
      <InputGroup>
        <ErrorMessage>{errors.roleName}</ErrorMessage>
        <label htmlFor="roleName">Role name</label>
        <Input
          type="text"
          id="roleName"
          placeholder="Role name..."
          value={roleName}
          onChange={(e: { target: { value: string } }) =>
            setRoleName(e.target.value)
          }
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="roleDescription">Role description</label>
        <Input
          type="text"
          id="roleDescription"
          placeholder="Role description..."
          value={roleDescription}
          onChange={(e: { target: { value: string } }) =>
            setRoleDescription(e.target.value)
          }
        />
      </InputGroup>
      <Divider>Permissions</Divider>
      <RolesWrapper>
        {resources.map((resource: Resource) => (
          <RoleDisplayComponent
            key={resource.name}
            resource={resource}
            updateParent={(actions: Action[]) => {
              handleUpdateParent(resource, actions)
            }}
          />
        ))}
      </RolesWrapper>
      <Button full={true} onClick={handleSubmit}>
        Submit
      </Button>
      <Modal
        title="Warning"
        open={isModalOpen}
        footer={
          <FooterButtons>
            <span
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              No
            </span>
            <span
              onClick={() => {
                sendEmptyRole()
              }}
            >
              Yes
            </span>
          </FooterButtons>
        }
        maskClosable={false}
        centered
      >
        <p>
          All permissions are empty, are you sure you want to create this role?
        </p>
      </Modal>
    </>
  )
}

export default CreateRoleComponent
