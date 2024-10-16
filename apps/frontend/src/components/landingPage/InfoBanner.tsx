import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/system';

const BannerContainer = styled(Box)`
  background-color: var(--mui-palette-background-background);
  height: 85vh;
`;

const ImageContainer = styled(Box)({
  width: '100%',
  height: '100%',
  minHeight: 400,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(4),
  paddingTop: theme.spacing(1),
  margin: 'auto',
}));

const SubHeadingList = styled('ul')`
  list-style: none;
  margin-left: 1em;
  padding-left: 0;
`;

const SubHeadingListItem = styled('li')`
  padding-left: 1em;
  text-indent: -1.2em;
  font-size: 60px;
  &:before {
    content: '//';
    margin-right: 0.5em;
  }
`;

// const SubHeading = styled(Typography)(({ theme }) => ({
//   marginBottom: 0,
//   // whiteSpace: 'nowrap',
//   // [theme.breakpoints.down('sm')]: {
//   //   fontSize: '34px',
//   // },
// }));

function InfoBanner() {
  return (
    <BannerContainer id='infoBanner'>
      <Grid container spacing={2}>
        <Grid component='div' size={{ xs: 12, lg: 7.5 }}>
          <ContentContainer>
            <SubHeadingList>
              <SubHeadingListItem>Full Stack Developer</SubHeadingListItem>
              <SubHeadingListItem>Consultant</SubHeadingListItem>
              <SubHeadingListItem sx={{ marginBottom: '50px' }}>Tinkerer</SubHeadingListItem>
            </SubHeadingList>
            {/* <SubHeading variant='h2'>// Full Stack Developer</SubHeading>
            <SubHeading variant='h2'>// Consultant</SubHeading>
            <SubHeading variant='h2' sx={{ marginBottom: '50px' }}>
              // Tinkerer
            </SubHeading> */}
            <Typography variant='h3' gutterBottom>
              James Pearce
            </Typography>
            {/* <Typography variant='h1' component='h1' gutterBottom>
              James Pearce
            </Typography>
            <SubHeading variant='h3' gutterBottom>
              // Full Stack Developer
            </SubHeading>
            <SubHeading variant='h3' gutterBottom>
              // Consultant
            </SubHeading>
            <SubHeading variant='h3' gutterBottom>
              // Tinkerer
            </SubHeading> */}
            <Typography variant='h6' sx={{ marginTop: '1em' }}>
              Developer and consultant by trade, tinkerer by nature. My passion for technology, creativity, and problem
              solving has been at the forefront of my career, producing opportunities to work with a variety of clients
              in development, business analyst, and project management roles. something about being involved end to end
              to produce better results...
            </Typography>
            <Button variant='contained' color='primary' href='/resume' target='_blank'>
              View Resume
            </Button>
          </ContentContainer>
        </Grid>
        <Grid component='div' size={{ xs: 12, lg: 4.5 }}>
          <ImageContainer style={{ backgroundImage: "url('')" }} />
        </Grid>
      </Grid>
    </BannerContainer>
  );
}
export default InfoBanner;
