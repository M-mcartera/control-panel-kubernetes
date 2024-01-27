import { isEmpty } from 'lodash'
import { Condition } from './ConditionsPanel'
import { Flex, Table } from 'antd'
import dayjs from 'dayjs'

const Conditions = ({
  conditions,
}: {
  conditions: Condition[] | undefined
}) => {
  if (isEmpty(conditions)) {
    return (
      <Flex justify="center" align="center">
        No conditions on pod
      </Flex>
    )
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Last probe time',
      dataIndex: 'lastProbeTime',
      key: 'lastProbeTime',
      render: (value: Date) => (value ? dayjs(value).fromNow() : ' - '),
    },
    {
      title: 'Last transition time',
      dataIndex: 'lastTransitionTime',
      key: 'lastTransitionTime',
      render: (value: Date) => dayjs(value).fromNow(),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={conditions}
      size="small"
      pagination={false}
    />
  )
}

export default Conditions
