import { Divider, Flex, Typography } from 'antd'
const { Text } = Typography
export type Resource = {
  node: string
  status: string
  ip: string
  qosClass: string
  restarts: number
  serviceAccounts: string
}

type ResourceInformationPanelType = {
  expanded: boolean
  resource: Resource | undefined
}

const ResourceInformationPanel = ({
  expanded,
  resource,
}: ResourceInformationPanelType) => {
  if (!resource) {
    return <h1>Loading...</h1>
  }
  if (expanded) {
    return (
      <Flex align="center" justify="start">
        <span>Resource information</span>
      </Flex>
    )
  }
  return (
    <Flex justify="space-between" align="center">
      <span>Resource information</span>
      <span>
        Status:{' '}
        <Text keyboard strong>
          {resource.status}
        </Text>
        <Divider type="vertical" />
        IP:{' '}
        <Text keyboard strong>
          {resource.ip}
        </Text>
      </span>
    </Flex>
  )
}

export default ResourceInformationPanel
