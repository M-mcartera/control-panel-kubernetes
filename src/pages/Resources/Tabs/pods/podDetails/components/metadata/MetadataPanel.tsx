import { Flex, Divider, Typography } from 'antd'

const { Text } = Typography

export type MetadataPanelType = {
  expanded: boolean
  name: string
  namespace: string
  age: string
  isLoading: boolean
}

const MetadataPanel = ({
  expanded,
  name,
  namespace,
  age,
  isLoading,
}: MetadataPanelType) => {
  if (isLoading) {
    return <></>
  }
  if (expanded) {
    return (
      <Flex align="center" justify="start">
        <span>Metadata</span>
      </Flex>
    )
  }
  return (
    <Flex justify="space-between" align="center">
      <span>Metadata</span>
      <span>
        Name:{' '}
        <Text keyboard strong>
          {name}
        </Text>
        <Divider type="vertical" />
        Namespace:{' '}
        <Text keyboard strong>
          {namespace}
        </Text>
        <Divider type="vertical" />
        Age:{' '}
        <Text keyboard strong>
          {age}
        </Text>
      </span>
    </Flex>
  )
}

export default MetadataPanel
