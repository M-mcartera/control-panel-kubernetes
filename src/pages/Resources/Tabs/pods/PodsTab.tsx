import { useState, useEffect, useMemo } from 'react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import {
  Badge,
  Divider,
  Dropdown,
  Flex,
  Menu,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import type { TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EllipsisOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import PodDetails from './podDetails'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Editor } from '@monaco-editor/react'
import yaml from 'js-yaml'
dayjs.extend(relativeTime)

const { Text, Title } = Typography

const getTagColor = (index: number): string => {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
  ]
  return colors[index % colors.length]
}

type Pod = {
  name: string
  namespace: string
  creationTimestamp: Date
  restartPolicy: string
  status: string
  node: string
  images: string[]
}

interface PodDataType {
  key: React.Key
  name: string
  namespace: string
  images: string[]
  creationTimestamp: Date
  status: string
  restartPolicy: string
  node: string
}
export type PodLogs = {
  container: string
  logs: string
}

const PodsTab = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pods, setPods] = useState<Pod[]>([])

  const [podLogs, setPodLogs] = useState<PodLogs[]>([])
  const [selectedPodLogContainer, setSelectedPodLogContainer] =
    useState<string>('')

  const [podEdit, setPodEdit] = useState<string>('')
  const [podEditName, setPodEditName] = useState<string>('')
  const [podEditFormat, setPodEditFormat] = useState<'yaml' | 'json'>('yaml')

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [logModalIsOpen, setLogModalIsOpen] = useState<boolean>(false)

  const privateAxios = useAxiosPrivate()
  const navigate = useNavigate()
  const { resourceId } = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        const { data: podsResponse } = await privateAxios.get(
          '/client-kubernetes/pods',
        )
        setPods(podsResponse.data)
        setIsLoading(false)
      } catch (err) {
        const error = err as AxiosError
        toast.error(error.message)
      }
    })()
  }, [privateAxios])

  const columns = useMemo((): TableColumnsType<PodDataType> => {
    const showPodLogs = async (podName: string, namespace: string) => {
      try {
        setIsLoading(true)
        const { data: podLogsResponse } = await privateAxios.get(
          `/client-kubernetes/pods/${podName}/logs?namespace=${namespace}`,
        )
        setIsLoading(false)
        setPodLogs(podLogsResponse.data)
        setSelectedPodLogContainer(podLogsResponse.data[0].container)
        setLogModalIsOpen(true)
      } catch (err) {
        console.log(err)
      }
    }

    const editPod = async (podName: string, namespace: string) => {
      try {
        setIsLoading(true)
        const { data: podLogsResponse } = await privateAxios.get(
          `/client-kubernetes/pods/${podName}?namespace=${namespace}&type=edit`,
        )
        setIsLoading(false)
        setPodEdit(podLogsResponse.data)
        setPodEditName(podName)
        setEditModalVisible(true)
      } catch (err) {
        console.log(err)
      }
    }
    const getMenu = (record: PodDataType) => (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => showPodLogs(record.name, record.namespace)}
        >
          Logs
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => editPod(record.name, record.namespace)}
        >
          Edit
        </Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
      </Menu>
    )

    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        align: 'left',
        render: (textValue, record) => {
          if (record.status === 'Running') {
            return (
              <>
                <Badge status="success" />
                <Divider type="vertical" />
                <span>{textValue}</span>
              </>
            )
          }
          return (
            <>
              <Badge status="error" />
              <Divider type="vertical" />
              <span>{textValue}</span>
            </>
          )
        },
      },
      {
        title: 'Namespace',
        dataIndex: 'namespace',
        key: 'namespace',
      },
      {
        title: 'Images',
        dataIndex: 'images',
        key: 'images',
        render: (value) => {
          return value.map((image: string, index: number) => (
            <Tag color={getTagColor(index)} key={`${index}-key`}>
              {image}
            </Tag>
          ))
        },
      },
      {
        title: 'Node',
        dataIndex: 'node',
        key: 'node',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'RestartPolicy',
        dataIndex: 'restartPolicy',
        key: 'restartPolicy',
      },
      {
        title: 'Created',
        dataIndex: 'creationTimestamp',
        key: 'created',
        render: (value: Date) => {
          return (
            <Tooltip title={dayjs(value).format()}>
              {dayjs(value).fromNow()}
            </Tooltip>
          )
        },
      },
      {
        title: '',
        key: 'actions',
        align: 'right',
        onCell: (_) => {
          return {
            onClick: (e) => e.stopPropagation(),
          }
        },
        render: (_, record) => (
          <Dropdown overlay={getMenu(record)} trigger={['hover']}>
            <EllipsisOutlined
              style={{
                fontSize: '24px',
                cursor: 'pointer',
                transform: 'rotate(90deg)',
              }}
            />
          </Dropdown>
        ),
      },
    ]
  }, [privateAxios])

  const dataSource = useMemo(() => {
    return pods.map((pod: Pod, index: number) => ({
      key: index,
      name: pod.name,
      namespace: pod.namespace,
      images: pod.images,
      creationTimestamp: pod.creationTimestamp,
      status: pod.status,
      restartPolicy: pod.restartPolicy,
      node: pod.node,
    }))
  }, [pods])

  if (resourceId) {
    return <PodDetails />
  }

  const selectedContainerLogs = podLogs.find(
    (l: PodLogs) => l.container === selectedPodLogContainer,
  )?.logs

  const handleLogsModalClose = () => {
    setLogModalIsOpen(false)
    setPodLogs([])
    setSelectedPodLogContainer('')
  }

  const handleEditModalClose = () => {
    setEditModalVisible(false)
    setPodEdit('')
    setPodEditName('')
  }

  const handleSwitchFormat = () => {
    setPodEditFormat((prevValue) => (prevValue === 'yaml' ? 'json' : 'yaml'))
  }
  return (
    <>
      <Modal
        title={
          <Flex align="center" justify="center">
            <Text>Logs for </Text>
            <Divider type="vertical" />
            <Select
              value={selectedPodLogContainer}
              options={podLogs.map((podlog: PodLogs) => ({
                value: podlog.container,
                label: podlog.container,
              }))}
              onChange={(value: string) => setSelectedPodLogContainer(value)}
            />
          </Flex>
        }
        open={logModalIsOpen}
        maskClosable={false}
        onCancel={() => handleLogsModalClose()}
        onOk={() => handleLogsModalClose()}
        width="80%"
        centered
      >
        <Divider />
        {selectedContainerLogs ? (
          <SyntaxHighlighter language="plaintext" style={dracula}>
            {selectedContainerLogs}
          </SyntaxHighlighter>
        ) : (
          <Flex justify="center" align="center">
            <Title level={4}>No logs for {selectedPodLogContainer} </Title>
          </Flex>
        )}
      </Modal>
      <Modal
        open={editModalVisible}
        centered
        maskClosable={false}
        width="80%"
        onCancel={() => handleEditModalClose()}
        okText="Update"
        title={
          <>
            Edit{' '}
            <Text code strong>
              {podEditName}
            </Text>
          </>
        }
      >
        <Flex align="center" justify="flex-end">
          <Switch
            checkedChildren="YAML"
            unCheckedChildren="JSON"
            defaultChecked
            value={podEditFormat === 'yaml'}
            onChange={() => handleSwitchFormat()}
          />
        </Flex>
        <Divider />
        <Editor
          height="70vh"
          theme="hc-black"
          value={
            podEditFormat === 'yaml'
              ? yaml.dump(JSON.parse(podEdit ? podEdit : '{}'))
              : podEdit
          }
          language={podEditFormat}
          options={{ wordWrap: 'on' }}
          onChange={(e: string | undefined) => console.log(e)}
        />
      </Modal>
      <Spin spinning={isLoading} size="large">
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <h1>Pods</h1>
          <Table
            dataSource={dataSource}
            style={{ width: '100%', cursor: 'pointer' }}
            size="small"
            columns={columns}
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/resources/pods/${record.name}/${record.namespace}`)
                },
              }
            }}
          />
        </div>
      </Spin>
    </>
  )
}
export default PodsTab
