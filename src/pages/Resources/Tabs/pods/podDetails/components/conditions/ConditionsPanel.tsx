import { Flex, Typography } from 'antd'
const { Text } = Typography
export type Condition = {
  lastProbeTime: Date
  lastTransitionTime: Date
  status: string
  type: string
}

type ConditionsPanelType = {
  expanded: boolean
  conditions: Condition[] | undefined
}

const ConditionsPanel = ({ expanded, conditions }: ConditionsPanelType) => {
  if (!conditions) {
    return <h1>Loading...</h1>
  }
  if (expanded) {
    return (
      <Flex align="center" justify="start">
        <span>Conditions</span>
      </Flex>
    )
  }
  return (
    <Flex justify="space-between" align="center">
      <span>Conditions</span>
      <span>
        Items:{' '}
        <Text keyboard strong>
          {conditions.length}
        </Text>
      </span>
    </Flex>
  )
}

export default ConditionsPanel
