import { useNavigate } from 'react-router-dom'
import { StyledButton } from './style'

const BackButton = ({
  onClick,
  path,
}: {
  onClick?: () => void
  path?: string
}) => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    if (path) {
      navigate(path)
      return
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <StyledButton onClick={() => handleOnClick()}>
      <span>Back</span>
      <i></i>
    </StyledButton>
  )
}

export default BackButton
