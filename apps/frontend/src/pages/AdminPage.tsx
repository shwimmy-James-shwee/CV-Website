import ContactQueries from '@/components/adminPage/ContactQueries';
import ProjectManageTable from '@/components/adminPage/ProjectManageTable';
import { Container, Tabs, Typography, Box, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

const AdminPageContainer = styled(Container)`
  margin-top: 50px;
`;

const TabWrapper = styled(Box)`
  margin-top: 10px;
  width: 100%;
  border-bottom: 2px solid var(--mui-palette-secondary-dark);
`;

const AdminTab = styled(Tab)`
  margin-left: 20px;
  margin-right: 20px;
`;

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event; // eslint-disable-line
    setSelectedTab(newValue);
  };

  return (
    <>
      <AdminPageContainer>
        <Typography variant='h3' component='h3'>
          Admin
        </Typography>
        <TabWrapper>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <AdminTab label='Manage Projects' />
            <AdminTab label='Contact Me Queries' />
            <AdminTab label='Analytics' />
          </Tabs>
        </TabWrapper>
        <Box sx={{ marginTop: '20px' }}>
          {selectedTab === 0 && <ProjectManageTable />}
          {selectedTab === 1 && <ContactQueries />}
          {selectedTab === 2 && <div>Manage Projects</div>}
        </Box>
      </AdminPageContainer>
    </>
  );
}

export default AdminPage;
