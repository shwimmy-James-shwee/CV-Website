import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid2 as Grid, ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/system';
import solutionArch from '../../assets/images/solutionArch.png';

const CardTextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectCardHeader = styled(Typography)`
  margin: 10px;
  margin-bottom: 10px;
`;

const ProjectCardDesc = styled(Typography)`
  margin: 10px;
  margin-bottom: 20px;
  height: 145px;
`;

const projectTestData = [
  {
    id: 1,
    title: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: [solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project1',
    highlighted: true,
  },
  {
    id: 2,
    title: 'Project 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    image: [solutionArch, solutionArch, solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project1',
    highlighted: false,
  },
  {
    id: 3,
    title: 'Project 3',
    description:
      'Description of project 3. This innovative project aims to revolutionize the way we approach problem-solving in the digital age. By leveraging cutting-edge technologies and methodologies, we are creating a platform that enhances collaboration, streamlines processes, and delivers unprecedented results for our clients.',
    image: [solutionArch, solutionArch],
    link: 'https://example.com/project3',
    highlighted: true,
  },
  {
    id: 4,
    title: 'Project 4',
    description:
      'Description of project 4. Our team is developing a groundbreaking solution that addresses the growing challenges in data management and analysis. This project combines advanced machine learning algorithms with intuitive user interfaces to provide actionable insights and drive informed decision-making across various industries.',
    image: [solutionArch, solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project4',
    highlighted: false,
  },
  {
    id: 5,
    title: 'Project 5',
    description:
      'Description of project 5. We are pioneering a new approach to sustainable technology development. This project focuses on creating eco-friendly solutions that reduce carbon footprints while maintaining high performance and reliability. Our innovative designs and materials are set to transform the way we think about environmental responsibility in the tech industry.',
    image: [solutionArch, solutionArch, solutionArch, solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project5',
    highlighted: true,
  },
  {
    id: 6,
    title: 'Project 6',
    description:
      'Description of project 6. This ambitious project aims to bridge the gap between virtual and physical realities. By developing advanced augmented reality technologies, we are creating immersive experiences that enhance education, training, and entertainment. Our solutions are poised to revolutionize how we interact with digital content in our daily lives.',
    image: [solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project6',
    highlighted: false,
  },
  {
    id: 7,
    title: 'Project 7',
    description:
      'Description of project 7. We are at the forefront of developing next-generation cybersecurity solutions. This project combines artificial intelligence and blockchain technology to create robust, adaptive security systems that protect against evolving threats. Our innovative approach is set to redefine the standards of digital security in an increasingly connected world.',
    image: [solutionArch, solutionArch, solutionArch, solutionArch, solutionArch],
    link: 'https://example.com/project7',
    highlighted: true,
  },
  {
    id: 8,
    title: 'Project 8',
    description:
      'Description of project 8. Our team is developing a revolutionary platform for personalized healthcare management. This project integrates wearable technology, big data analytics, and telemedicine to provide tailored health insights and interventions. We aim to empower individuals to take control of their well-being while improving the efficiency and effectiveness of healthcare delivery.',
    image: [solutionArch, solutionArch, solutionArch, solutionArch],
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
    const descStr = description.replace(' ', '');
    if (descStr.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }} key={project.id} className='projectCardsWrapper'>
          <Card className='projectCards'>
            <CardContent>
              <CardTextWrapper>
                <ProjectCardHeader variant='h5'>{project.title}</ProjectCardHeader>
                <ProjectCardDesc variant='body1'>{parseProjectDescription(project.description)}</ProjectCardDesc>
              </CardTextWrapper>
              <div className='imageListContainer'>
                <ImageList sx={{ width: '100%' }} cols={4} gap={8}>
                  {project.image.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        srcSet={image}
                        alt={`Project ${project.id} - Image ${index + 1}`}
                        loading='lazy'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectCards;
