import { StyledButton } from './style'

export type ButtonProps = {
  children: React.ReactNode
  full: boolean
  type?: string
  onClick?: () => void
}
const Button = ({ children, onClick }: ButtonProps) => {
  if (onClick) {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
  }
  return <StyledButton type="submit">{children}</StyledButton>
}

export default Button
