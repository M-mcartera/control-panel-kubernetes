import { Collapse, Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

type Mount = {
  name: string
  readOnly: boolean
  mountPath: string
  subPath?: string
}

export type Container = {
  image: string
  status: {
    ready: boolean
    started: boolean
    startedAt: Date
  }
  mounts: Mount[]
}

const { Title, Text } = Typography
const { Panel } = Collapse

const Containers = ({ podContainers }: { podContainers: Container[] }) => {
  const [activeKeys, setActiveKeys] = useState<string[] | string>(
    Array.from({ length: podContainers.length }, (_, index) =>
      index.toString(),
    ),
  )
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        index: 'name',
      },
      {
        title: 'Read Only',
        dataIndex: 'readOnly',
        index: 'readOnly',
        render: (value: boolean) => {
          return value ? 'True' : 'False'
        },
      },
      {
        title: 'Mount path',
        dataIndex: 'mountPath',
        index: 'mountPath',
      },
      {
        title: 'Sub path',
        dataIndex: 'subPath',
        index: 'subPath',
        render: (value: string) => value ?? ' - ',
      },
    ],
    [],
  )

  return (
    <div style={{ marginTop: '10px' }}>
      <Title keyboard level={3}>
        Containers
      </Title>
      <Collapse
        activeKey={activeKeys}
        expandIconPosition="end"
        onChange={(keys: string | string[]) => {
          console.log(keys)
          setActiveKeys(keys)
        }}
        bordered={false}
      >
        {podContainers.map((container: Container, index: number) => {
          const isExpanded = activeKeys.includes(index.toString())

          const Header = () => {
            if (isExpanded) {
              return (
                <Flex>
                  {' '}
                  <Title level={5}>{container.image.split(':')[0]}</Title>
                </Flex>
              )
            }
            return (
              <Flex justify="space-between" align="center">
                <Title level={5}>{container.image.split(':')[0]}</Title>
                <span>
                  <Text strong>Image: </Text>:{' '}
                  <Text strong code>
                    {container.image}
                  </Text>
                </span>
              </Flex>
            )
          }

          return (
            <Panel key={index.toString()} header={<Header />}>
              <Flex justify="start" align="center">
                <div>
                  <label style={{ marginBottom: 0, display: 'block' }}>
                    Image:
                  </label>
                  <Text strong keyboard>
                    {container.image}
                  </Text>
                </div>
              </Flex>
              <Title level={5} style={{ marginTop: '20px' }}>
                Status
              </Title>

              <Flex justify="start" align="center" wrap="wrap" gap="20px">
                <div>
                  <label style={{ marginBottom: 0, display: 'block' }}>
                    Ready:
                  </label>
                  <Text strong keyboard>
                    {container.status.ready ? 'True' : 'False'}
                  </Text>
                </div>
                <div>
                  <label style={{ marginBottom: 0, display: 'block' }}>
                    Started:
                  </label>
                  <Text strong keyboard>
                    {container.status.started ? 'True' : 'False'}
                  </Text>
                </div>
                <div>
                  <label style={{ marginBottom: 0, display: 'block' }}>
                    StartedAt:
                  </label>
                  <Text strong keyboard>
                    {dayjs(container.status.startedAt).format()}
                  </Text>
                </div>
              </Flex>

              <Title level={5} style={{ marginTop: '20px' }}>
                Mounts
              </Title>
              <Table
                columns={columns}
                dataSource={container.mounts}
                pagination={false}
                bordered
              />
            </Panel>
          )
        })}
      </Collapse>
    </div>
  )
}

export default Containers
