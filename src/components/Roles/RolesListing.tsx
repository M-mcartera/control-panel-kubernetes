import { Dropdown, MenuProps, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useState, ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import DefaultButton from '../DefaultButton'
import { ActionsElipsis, StyledTable } from '../globalComponents'
import ModuleTitle from '../ModuleTitle'
import CreateRoleComponent from './CreateRoleComponent'
import { Role } from './types'

const RolesListing = () => {
  const [modalTitle, setModalTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)
  const [data, setData] = useState<Role[]>([])
  const axiosPrivate = useAxiosPrivate()
  const [selectedRole, setSelectedRole] = useState<Role>({} as Role)
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [trigger, setTrigger] = useState<boolean>(false)
  useEffect(() => {
    if (firstRender || trigger) {
      ;(async () => {
        try {
          const { data: rolesResponse } = await axiosPrivate.get('/roles')
          setData(
            rolesResponse.data.map((role: Role, index: number) => {
              return { ...role, index: index + 1 }
            }),
          )

          setFirstRender(false)
          setTrigger(false)
        } catch (err) {
          console.log({ err })
        }
      })()
    }
  }, [axiosPrivate, firstRender, trigger])

  const resetModal = () => {
    setModalContent(null)
    setModalTitle('')
    setIsModalOpen(false)
    setSelectedRole({} as Role)
  }

  const handleDeleteRole = async (role: Role) => {
    try {
      const { _id } = role
      await axiosPrivate.delete(`/roles/${_id}`)
      toast.success('Role deleted successfully!')
      setTrigger(true)
    } catch (err) {
      toast.error('Error deleting role')
    }
  }

  const handleNewRole = () => {
    setModalTitle('Create new role')
    setModalContent(
      <CreateRoleComponent
        closeModal={() => resetModal()}
        refetchRoles={() => setTrigger(true)}
        isEdit={false}
        role={{} as Role}
      />,
    )
    setIsModalOpen(true)
  }

  const handleEditRole = () => {
    setModalTitle(`Edit role ${selectedRole.roleName}`)
    setModalContent(
      <CreateRoleComponent
        closeModal={() => resetModal()}
        isEdit={true}
        refetchRoles={() => setTrigger(true)}
        role={selectedRole}
      />,
    )
    setIsModalOpen(true)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span
          style={{ width: '100%' }}
          onClick={() => {
            handleEditRole()
          }}
        >
          Edit
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span
          onClick={() => {
            handleDeleteRole(selectedRole)
          }}
        >
          Delete
        </span>
      ),
    },
  ]

  const columns = [
    {
      title: 'Id',
      dataIndex: 'index',
      key: 'id',
    },
    {
      title: 'Role name',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: 'Role description',
      dataIndex: 'roleDescription',
      key: 'roleDescription',
    },
    {
      title: 'Users in role',
      dataIndex: 'usersInRole',
      key: 'username',
      render: (username: string[]) => {
        return (
          <span>
            {username.reduce(
              (text, value, i, array) =>
                text + (i < array.length - 1 ? ', ' : ' and ') + value,
            )}
          </span>
        )
      },
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => (
        <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, row: Role) => {
        return (
          <Dropdown
            menu={{ items }}
            onOpenChange={(val) => {
              if (val) {
                setSelectedRole(row)
              } else {
                setSelectedRole({} as Role)
              }
            }}
          >
            <ActionsElipsis />
          </Dropdown>
        )
      },
    },
  ] as ColumnsType<any>

  return (
    <>
      <ModuleTitle title="Roles Listing" backButtonPath="/settings" />
      <DefaultButton title="Create new role" onClick={handleNewRole} />
      <StyledTable
        columns={columns}
        dataSource={data}
        rowClassName={() => 'custom-row'}
      />
      <Modal
        width="80%"
        title={modalTitle}
        open={isModalOpen}
        footer={null}
        maskClosable={false}
        centered
        onOk={() => {
          setIsModalOpen(false)
        }}
        onCancel={() => {
          resetModal()
        }}
      >
        {modalContent}
      </Modal>
    </>
  )
}

export default RolesListing
