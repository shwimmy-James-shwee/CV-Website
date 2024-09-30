import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/system';

const BannerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  // backgroundColor: theme.palette.background.paper,
  backgroundColor: '#f5f5f5',
}));

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
}));

function InfoBanner() {
  return (
    <BannerContainer>
      <Grid container spacing={4}>
        <Grid component='div' size={{ xs: 12, md: 6 }}>
          <ImageContainer style={{ backgroundImage: "url('')" }} />
        </Grid>
        <Grid component='div' size={{ xs: 12, md: 6 }}>
          <ContentContainer>
            <Typography variant='h3' component='h1' gutterBottom>
              James Pearce
            </Typography>
            <Typography variant='h5' component='h2' gutterBottom>
              Full Stack Developer - KPMG
            </Typography>
            <Typography variant='body1' paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque odio ratione eligendi in esse
              sunt, quisquam suscipit, accusantium cum vero similique eveniet tempore itaque velit quidem neque
              accusamus tempora?
            </Typography>
            <Button variant='contained' color='primary' href='/resume' target='_blank'>
              View Resume
            </Button>
          </ContentContainer>
        </Grid>
      </Grid>
    </BannerContainer>
  );
}
export default InfoBanner;
