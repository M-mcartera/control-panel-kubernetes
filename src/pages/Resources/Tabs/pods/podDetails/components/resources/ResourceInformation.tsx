import { Flex, Divider, Typography } from 'antd'
import { Resource } from './ResourceInformationPanel'
const { Text } = Typography

const ResourceInformation = ({
  details,
}: {
  details: Resource | undefined
}) => {
  if (!details) {
    return <h1>Loading...</h1>
  }
  return (
    <Flex justify="start" align="center" gap="large" wrap="wrap">
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>Node</label>
        <Text strong keyboard>
          {details.node}
        </Text>
      </div>
      <Divider type="vertical" />
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>Status</label>
        <Text strong keyboard>
          {details.status}
        </Text>
      </div>
      <Divider type="vertical" />
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>IP</label>
        <Text strong keyboard>
          {details.ip}
        </Text>
      </div>
      <Divider type="vertical" />
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>QoSClass</label>
        <Text strong keyboard>
          {details.qosClass}
        </Text>
      </div>
      <Divider type="vertical" />
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>Restarts</label>
        <Text strong code>
          {details.restarts}
        </Text>
      </div>
      <Divider type="vertical" />
      <div>
        <label style={{ marginBottom: 0, display: 'block' }}>
          Service Accounts
        </label>
        <Text strong code>
          {details.serviceAccounts}
        </Text>
      </div>
    </Flex>
  )
}

export default ResourceInformation
