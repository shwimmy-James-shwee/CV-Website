import InfoBanner from '@/components/landingPage/InfoBanner';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ProjectCards from '@/components/landingPage/ProjectCards';
import MyClients from '@/components/landingPage/MyClients';
import { HyperText } from '@/components/toolkit/AnimatedText';

const LandPageContainer = styled(Container)`
  margin-top: 50px;
  scroll-snap-align: start;
  scroll-margin: 100px;
`;

function LandingPage() {
  // const { currentUserData } = useContext(UserContext);
  return (
    <>
      <LandPageContainer maxWidth='xl' id='infoBanner'>
        <InfoBanner />
      </LandPageContainer>
      <LandPageContainer maxWidth='xl' id='projects'>
        {/* <Box sx={{ marginTop: '50px' }}> */}
        <HyperText text='projects' />
        <Typography variant='h4' component='h2' gutterBottom>
          Projects
        </Typography>
        <ProjectCards />

        <MyClients />
        {/* </Box> */}
      </LandPageContainer>
    </>
  );
}

export default LandingPage;
