import InfoBanner from '@/components/landingPage/InfoBanner';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ProjectCards from '@/components/landingPage/ProjectCards';
import MyClients from '@/components/landingPage/MyClients';
import ContactMe from '@/components/landingPage/ContactMe';
// import { HyperText } from '@/components/toolkit/AnimatedText';

const LandPageContainer = styled(Container)`
  margin-top: 50px;
  scroll-snap-align: start;
  scroll-margin: 100px;
  /* height: fit-content; */
`;

const ClientContainer = styled(Container)`
  scroll-snap-align: center;
  scroll-margin: 100px;
  padding: 50px;
  padding-bottom: 50px;
  margin-top: 50px;
  margin-bottom: 80px;
  /* border-top: 3px solid var(--mui-palette-secondary-dark); */
  /* border-bottom: 3px solid var(--mui-palette-secondary-dark); */
`;

function LandingPage() {
  // const { currentUserData } = useContext(UserContext);
  return (
    <>
      <LandPageContainer maxWidth='xl' id='infoBanner'>
        <InfoBanner />
      </LandPageContainer>

      <ClientContainer maxWidth={false} id='myClients'>
        <MyClients />
      </ClientContainer>

      <LandPageContainer maxWidth='xl' id='projects'>
        {/* <Box sx={{ marginTop: '50px' }}> */}
        {/* <HyperText text='projects' /> */}
        <Typography variant='h4' component='h2' gutterBottom>
          Projects
        </Typography>
        <ProjectCards />

        {/* </Box> */}
      </LandPageContainer>
      <LandPageContainer maxWidth='xl' id='contactMe'>
        <Typography variant='h4' component='h2' gutterBottom>
          Contact Me
        </Typography>
        <ContactMe />
      </LandPageContainer>
    </>
  );
}

export default LandingPage;
