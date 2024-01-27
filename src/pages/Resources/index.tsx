import ModuleTitle from '../../components/ModuleTitle'
import { Wrapper } from './style'
import { Tabs } from 'antd'
import { useResourceData } from './routing'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const verticalTabBarStyle = {
  background: '#ffffff',
  color: '#333333',
  borderRight: '1px solid #e8e8e8',
  padding: '10px',
}

const Resources = () => {
  const [key, setKey] = useState<number>(0)
  const tabsItems = useResourceData()
  const { tab, resourceId } = useParams()
  const navigate = useNavigate()

  const handleTabChange = (key: string) => {
    navigate(`/resources/${key}`)
    setKey((prevState: number) => prevState + 1)
  }

  const handleBackButtonClick = () => {
    if (resourceId) {
      navigate(`/resources/${tab}`)
    }
  }

  return (
    <>
      <ModuleTitle
        title="Resources Module"
        hideButton={!resourceId}
        backButtonOnClick={handleBackButtonClick}
      />
      <Wrapper>
        <Tabs
          defaultActiveKey={tab}
          key={key}
          items={tabsItems}
          onChange={handleTabChange}
          tabPosition="left"
          size="large"
          tabBarStyle={verticalTabBarStyle}
        />
      </Wrapper>
    </>
  )
}
export default Resources
