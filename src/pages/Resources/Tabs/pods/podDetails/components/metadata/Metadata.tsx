import { Editor } from '@monaco-editor/react'
import { Flex, Tag, Modal, Divider, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Text, Title } = Typography

export type PodMetadata = {
  name: string
  namespace: string
  created: Date
  uid: string
  annotations: { [key: string]: string }
}

const Metadata = ({ details }: { details: PodMetadata | undefined }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  if (!details) {
    return <>No metadata details to display</>
  }

  const handleAnnotationsClick = () => {
    setModalOpen(true)
  }
  const modalProps = {
    title: (
      <Flex justify="center" align="center">
        <Tag color="black">
          <Title level={4} style={{ color: 'white' }}>
            {Object.keys(details.annotations)[0]}
          </Title>
        </Tag>
      </Flex>
    ),
    visible: modalOpen,
    centered: true,
    onCancel: () => {
      setModalOpen(false)
    },
    footer: null,
    width: '40%',
  }

  const annotationsJSON = JSON.stringify(
    JSON.parse(details.annotations[Object.keys(details.annotations)[0]]),
    null,
    2,
  )
  return (
    <>
      <Modal {...modalProps}>
        <Editor
          height="50vh"
          theme="vs-dark"
          value={annotationsJSON}
          language="json"
          options={{ readOnly: true, wordWrap: 'on' }}
        />
      </Modal>
      <Flex justify="start" align="center" gap="large" wrap="wrap">
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>Name</label>
          <Text strong keyboard>
            {details.name}
          </Text>
        </div>
        <Divider type="vertical" />
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>Namespace</label>
          <Text strong keyboard>
            {details.namespace}
          </Text>
        </div>
        <Divider type="vertical" />
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>Created</label>
          <Text strong keyboard>
            {dayjs(details.created).format('MMM D, YYYY')}
          </Text>
        </div>
        <Divider type="vertical" />
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>Age</label>
          <Text strong keyboard>
            {dayjs(details.created).fromNow()}
          </Text>
        </div>
        <Divider type="vertical" />
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>UID</label>
          <Text strong code>
            {details.uid}
          </Text>
        </div>
      </Flex>
      <Flex style={{ marginTop: '20px' }}>
        <div>
          <label style={{ marginBottom: 0, display: 'block' }}>
            Annotations
          </label>
          <Text
            strong
            code
            style={{ cursor: 'pointer' }}
            onClick={() => handleAnnotationsClick()}
          >
            {Object.keys(details.annotations)[0]}
          </Text>
        </div>
      </Flex>
    </>
  )
}

export default Metadata
