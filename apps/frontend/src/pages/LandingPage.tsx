import InfoBanner from '@/components/landingPage/InfoBanner';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import ProjectCards from '@/components/landingPage/ProjectCards';
import MyClients from '@/components/landingPage/MyClients';

const LandPageContainer = styled(Container)`
  margin-top: 50px;
`;

function LandingPage() {
  // const { currentUserData } = useContext(UserContext);
  return (
    <LandPageContainer maxWidth='xl'>
      <InfoBanner />
      <Box sx={{ marginTop: '50px' }}>
        <Typography variant='h4' component='h2' gutterBottom id='projects'>
          Projects
        </Typography>
        <ProjectCards />

        <MyClients />
      </Box>
    </LandPageContainer>
  );
}

export default LandingPage;
