import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/system';
import BoxReveal from '../toolkit/BoxReveal';
import { IconCloud } from '../toolkit/IconGlobe';

const BannerContainer = styled(Box)`
  background-color: var(--mui-palette-background-background);
  min-height: 85vh;

  margin-bottom: 50px;
`;

const IconsContainer = styled(Box)`
  /* width: 100%;
  height: 100%;
  min-height: 400;
  margin: auto; */
`;

const ColumnContainer = styled(Grid)`
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  min-height: inherit;
`;

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  padding: '0px', // theme.spacing(4),
  // padding: theme.spacing(4),
  paddingTop: theme.spacing(1),
  margin: 'auto',
}));

const SubHeadingList = styled('ul')`
  list-style: none;
  margin-left: 1em;
  padding-left: 0;
`;

const SubHeadingListItem = styled('li')(
  ({ theme }) => `
  padding-left: 1.5em;
  text-indent: -1.2em;
  font-size: 60px;
  ${theme.breakpoints.down('sm')} {
    padding-left: 1.5em;
    text-indent: -1.2em;
    font-size: 40px;
  }
  &:before {
    content: '//';
    margin-right: 0.5em;
  }
`,
);

const slugs = [
  'typescript',
  'javascript',
  'react',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nestjs',
  'prisma',
  'postgresql',
  'testinglibrary',
  'jest',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'figma',
  'cplusplus',
  'angular',
  'microsoftazure',
  'bootstrap',
  'mui',
];

function InfoBanner() {
  return (
    <BannerContainer>
      <ColumnContainer container spacing={2}>
        <Grid component='div' size={{ xs: 12, lg: 7.5 }}>
          <ContentContainer>
            <SubHeadingList>
              <BoxReveal boxColor='var(--mui-palette-primary-main)'>
                <SubHeadingListItem>Full Stack Developer</SubHeadingListItem>
              </BoxReveal>
              <BoxReveal boxColor='var(--mui-palette-primary-main)'>
                <SubHeadingListItem>Consultant</SubHeadingListItem>
              </BoxReveal>
              <BoxReveal boxColor='var(--mui-palette-primary-main)'>
                <SubHeadingListItem sx={{ marginBottom: '50px' }}>Tinkerer</SubHeadingListItem>
              </BoxReveal>
            </SubHeadingList>

            <BoxReveal boxColor='var(--mui-palette-primary-main)'>
              <Typography variant='h3' gutterBottom>
                James Pearce
              </Typography>
            </BoxReveal>

            <BoxReveal boxColor='var(--mui-palette-primary-main)' duration={1}>
              <>
                <Typography variant='h6' sx={{ marginTop: '1em' }}>
                  Developer and consultant by trade, tinkerer by nature. My passion for technology, creativity, and
                  problem solving has been at the forefront of my career, producing opportunities to work with a variety
                  of clients in development, business analyst, and project management roles. something about being
                  involved end to end to produce better results...
                </Typography>
                {/* </BoxReveal>
            <BoxReveal boxColor='var(--mui-palette-primary-main)'> */}
                <Button variant='contained' color='primary' href='/resume' target='_blank' sx={{ marginTop: '1em' }}>
                  View Resume
                </Button>
              </>
            </BoxReveal>
          </ContentContainer>
        </Grid>
        <Grid component='div' size={{ xs: 12, lg: 4.5 }} sx={{ alignContent: 'center' }}>
          <IconsContainer>
            <IconCloud iconSlugs={slugs} />
          </IconsContainer>
        </Grid>
      </ColumnContainer>
    </BannerContainer>
  );
}
export default InfoBanner;
