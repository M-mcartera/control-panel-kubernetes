import { StyledSelectWrapper } from './style'
import { Select } from 'antd'
const CustomSelect = (props: any) => {
  return (
    <StyledSelectWrapper>
      <Select {...props} />
    </StyledSelectWrapper>
  )
}

export default CustomSelect
