import { StyledButton } from './style'

const DefaultButton = ({
  title,
  onClick,
}: {
  title: string
  onClick: (e: any) => void
}) => {
  return (
    // <Wrap>
    //   <StyledButton />
    // </Wrap>
    <StyledButton onClick={onClick}>{title}</StyledButton>
  )
}
export default DefaultButton
