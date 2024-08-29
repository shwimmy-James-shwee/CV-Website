import { Container, Tabs, Tab } from 'react-bootstrap'
import { Header } from '../components/banners/Header'
import styled from 'styled-components'
import BusinessUnitManagement from './admin/BusinessUnitManagement'
import UserManagement from './admin/UserManagement'

const TabsComponent = styled(Tabs)`
  padding-top: 1rem;
  .nav-item .nav-link {
    color: var(--general-text-color) !important;
  }
`

function AdminPage() {
  return (
    <>
      <Header
        title={'Portal Administration'}
        description='All activity on this page is monitored and actions are traced.'
      />
      <Container>
        <TabsComponent>
          <Tab eventKey={'BusinessUnit'} title={'Business Unit'} data-testid='business-unit-tab'>
            <BusinessUnitManagement />
          </Tab>
          <Tab eventKey={'User'} title={'User'} data-testid='user-tab'>
            <UserManagement />
          </Tab>
        </TabsComponent>
      </Container>
    </>
  )
}

export default AdminPage
