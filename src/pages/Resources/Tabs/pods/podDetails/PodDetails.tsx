import { Collapse, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import MetadataPanel from './components/metadata/MetadataPanel'
import Metadata, { PodMetadata } from './components/metadata/Metadata'
import ResourceInformationPanel, {
  Resource,
} from './components/resources/ResourceInformationPanel'
import ResourceInformation from './components/resources/ResourceInformation'
import ConditionsPanel, {
  Condition,
} from './components/conditions/ConditionsPanel'
import Conditions from './components/conditions/Conditions'
import Containers from './components/containers'
import { Container } from './components/containers/Containers'

export type OutputPodDetail = {
  metadata: PodMetadata
  resource: Resource
  conditions: Condition[]
  containers: Container[]
}

const { Panel } = Collapse

const PodDetails = () => {
  const [expandedAreas, setExpandedAreas] = useState<string | string[]>([
    '1',
    '2',
    '3',
  ])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pod, setPod] = useState<OutputPodDetail>()
  const { resourceId, namespace } = useParams()
  const privateAxios = useAxiosPrivate()

  useEffect(() => {
    ;(async () => {
      try {
        const { data: podDetails } = await privateAxios.get(
          `/client-kubernetes/pods/${resourceId}?namespace=${namespace}`,
        )
        const data: OutputPodDetail = podDetails.data
        setPod(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [namespace, privateAxios, resourceId])

  const RenderedMetadataPanel = () => {
    if (!pod) {
      return <h1>Loading....</h1>
    }
    const isExpanded = expandedAreas.includes('1')
    return (
      <MetadataPanel
        expanded={isExpanded}
        name={pod?.metadata.name || ''}
        namespace={pod?.metadata.namespace || ''}
        age={dayjs(pod?.metadata.created).fromNow()}
        isLoading={isLoading}
      />
    )
  }

  if (!pod) {
    return <h1>Loading....</h1>
  }
  return (
    <Spin spinning={isLoading || isEmpty(pod)} size="large">
      <Collapse
        size="large"
        bordered={false}
        defaultActiveKey={expandedAreas}
        expandIconPosition="end"
        onChange={(keys: string | string[]) => setExpandedAreas(keys)}
      >
        <Panel header={<RenderedMetadataPanel />} key="1">
          <Metadata details={pod?.metadata} />
        </Panel>
        <Panel
          header={
            <ResourceInformationPanel
              expanded={expandedAreas.includes('2')}
              resource={pod?.resource}
            />
          }
          key="2"
        >
          <ResourceInformation details={pod?.resource} />
        </Panel>
        <Panel
          header={
            <ConditionsPanel
              expanded={expandedAreas.includes('3')}
              conditions={pod?.conditions}
            />
          }
          key="3"
        >
          <Conditions conditions={pod.conditions} />
        </Panel>
      </Collapse>

      <Containers podContainers={pod.containers} />
    </Spin>
  )
}

export default PodDetails
