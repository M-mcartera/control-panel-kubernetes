import { useEffect, useState } from 'react'
import { validateEmail } from '../../../helpers'
import Button from '../../Button'
import { ErrorMessage } from '../../globalComponents'
import Input from '../../Input'
import InputGroup from '../../InputGroup'
import CustomSelect from '../../Select'
import { User } from '../types'
import { RoleOptionsType, UserCreatePayload } from '../UsersListing'
interface CreateUserErrors {
  email: string
  username: string
  role: string
}
interface CreateUserFormData {
  email: string
  username: string
  role: 'ADMIN' | 'USER' | null
}

const CreateUser = ({
  onSubmit,
  user,
  buttonName,
  clusterRoles,
}: {
  onSubmit: (payload: UserCreatePayload) => void
  user?: User
  buttonName: string
  clusterRoles: RoleOptionsType[]
}) => {
  const [errors, setErrors] = useState<CreateUserErrors>({
    email: '',
    username: '',
    role: '',
  })
  const [formData, setFormData] = useState<CreateUserFormData>({
    email: user?.email || '',
    username: user?.username || '',
    role: user?.role || null,
  })

  const resetForm = () => {
    setFormData({
      email: '',
      username: '',
      role: null,
    })
  }

  useEffect(() => {
    setFormData({
      email: user?.email || '',
      username: user?.username || '',
      role: user?.role || null,
    })
  }, [user])

  const handleChange = (e: string, key: string) => {
    setFormData((prevState) => ({ ...prevState, [key]: e }))
  }

  const handleSubmit = () => {
    const { email, username, role } = formData
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }))
      return
    }
    if (!username) {
      setErrors((prev) => ({
        ...prev,
        username: 'Please enter a username',
      }))
      return
    }
    if (!role) {
      setErrors((prev) => ({
        ...prev,
        role: 'Please select a role',
      }))
      return
    }
    onSubmit(formData as UserCreatePayload)
    resetForm()
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <InputGroup>
        <ErrorMessage>{errors.email}</ErrorMessage>
        <label htmlFor="newUser-email">Email</label>
        <Input
          type="text"
          id="newUser-email"
          placeholder="email@email.com"
          value={formData.email}
          onChange={(e: { target: { value: string } }) =>
            handleChange(e.target.value, 'email')
          }
        />
      </InputGroup>
      <InputGroup>
        <ErrorMessage>{errors.username}</ErrorMessage>
        <label htmlFor="newUser-username">Username</label>
        <Input
          type="text"
          id="newUser-username"
          placeholder="Username"
          value={formData.username}
          onChange={(e: { target: { value: string } }) =>
            handleChange(e.target.value, 'username')
          }
        />
      </InputGroup>
      <InputGroup>
        <ErrorMessage>{errors.role}</ErrorMessage>
        <label htmlFor="newUser-role">Role</label>
        <CustomSelect
          placeholder="Pick a role for new user"
          value={formData.role}
          onChange={(e: any) => {
            handleChange(e, 'role')
          }}
          popupMatchSelectWidth={false}
          options={clusterRoles}
        />
      </InputGroup>
      <Button type="submit" full={false}>
        {buttonName}
      </Button>
    </form>
  )
}

export default CreateUser
