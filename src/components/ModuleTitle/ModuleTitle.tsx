import BackButton from '../BackButton'
import { Container, Title } from './style'

const ModuleTitle = ({
  title,
  hideButton,
  backButtonPath,
  backButtonOnClick,
}: {
  title?: string
  hideButton?: boolean
  backButtonPath?: string
  backButtonOnClick?: () => void
}) => {
  return (
    <Container>
      <Title>{title ?? 'Module title'}</Title>
      {hideButton ? null : (
        <BackButton
          onClick={backButtonOnClick}
          path={backButtonPath}
        ></BackButton>
      )}
    </Container>
  )
}

export default ModuleTitle
