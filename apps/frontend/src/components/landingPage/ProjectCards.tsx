import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid2 as Grid, Button } from '@mui/material';
import { styled } from '@mui/system';

const ProjectCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'hoverShadow',
})`
  height: 200px;
`;

// type Props = {
//   hoverShadow: number;
// };
// const options = {
//   shouldForwardProp: (prop) => prop !== 'hoverShadow',
// };
// const ProjectCard = styled(
//   Card,
//   options,
// )<Props>(({ theme, hoverShadow = 1 }) => ({
//   ':hover': {
//     boxShadow: theme.shadows[hoverShadow],
//   },
// }));
//

const ProjectCardHeader = styled(Typography)`
  margin-bottom: 20px;
`;

const ProjectCardBody = styled(Typography)`
  /* padding-bottom: 20px; */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const projectTestData = [
  {
    id: 1,
    title: 'Project 1',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project1',
    highlighted: true,
  },
  {
    id: 2,
    title: 'Project 2',
    description:
      'loremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elitloremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elitloremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elitloremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elit.loremm ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project1',
    highlighted: false,
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Description of project 3',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project3',
    highlighted: true,
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Description of project 4',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project4',
    highlighted: false,
  },
  {
    id: 5,
    title: 'Project 5',
    description: 'Description of project 5',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project5',
    highlighted: true,
  },
  {
    id: 6,
    title: 'Project 6',
    description: 'Description of project 6',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project6',
    highlighted: false,
  },
  {
    id: 7,
    title: 'Project 7',
    description: 'Description of project 7',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project7',
    highlighted: true,
  },
  {
    id: 8,
    title: 'Project 8',
    description: 'Description of project 8',
    image: 'https://via.placeholder.com/300x200',
    link: 'https://example.com/project8',
    highlighted: false,
  },
];
function ProjectCards() {
  const [projects, setProjects] = useState(projectTestData);

  useEffect(() => {
    // TODO Fetch projects from API
    setProjects(projectTestData);
  }, []);

  const parseProjectDescription = (description: string) => {
    const maxLength = 300;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
          <ProjectCard hoverShadow={2}>
            <CardContent>
              <ProjectCardHeader variant='h5' component='div'>
                {project.title}
              </ProjectCardHeader>
              <ProjectCardBody variant='body2'>{parseProjectDescription(project.description)}</ProjectCardBody>
              <Button variant='contained' color='secondary' href={project.link} target='_blank'>
                View more
              </Button>
            </CardContent>
          </ProjectCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectCards;
