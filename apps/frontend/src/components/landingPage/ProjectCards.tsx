import { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid2 as Grid, ImageList, ImageListItem, Box } from '@mui/material';
import { styled } from '@mui/system';
// import solutionArch from '../../assets/images/solutionArch.png';
import { ModalContext } from '../toolkit/ModalContext';
import ProjectModalBody from './ProjectModalBody';
import { sortHighlightedProjects } from '@/utils/HelperFunctions';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { Project } from '@core/db/schema';
import { API } from '@core/routes';

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

// TODO REMOVE and replace with SCHEMA
export type testProjectDataType = {
  id: number;
  title: string;
  description: string;
  image: string[];
  // link: string;
  highlighted: boolean;
  dateStarted: Date;
  dateCompleted: Date;
};

function ProjectCards() {
  const { handleModalOpen } = useContext(ModalContext);
  const { execute, error } = useFetchWithAuth();

  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    // TODO Fetch projects from API
    if (!projects && !error) {
      execute('GET', API.project.getAll).then((response: Project[]) => {
        if (response) {
          const sortedProjects = sortHighlightedProjects(response);
          setProjects(sortedProjects);
        } else if (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          // TODO create info pop up to display to user
        } else {
          // eslint-disable-next-line no-console
          console.log('Something went wrong, please try again later');
          // TODO create info pop up to display to user
        }
      });
    }
  }, [execute, projects]);

  function parseProjectDescription(description: string) {
    const maxLength = 300;
    const descStr = description.replace(' ', '');
    if (descStr.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }

  const openProjectModal = (project: Project) => {
    handleModalOpen({
      content: <ProjectModalBody projectData={project} />,
      size: 'xl',
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        {projects &&
          projects.map((project: Project) => (
            <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }} key={project.id} className='projectCardsWrapper'>
              <Card className='projectCards' onClick={() => openProjectModal(project)}>
                <CardContent>
                  <Box sx={{ position: 'relative' }}>
                    {project.highlighted && <Box sx={{ position: 'absolute', top: 8, right: 8 }}>*</Box>}
                    <CardTextWrapper>
                      <ProjectCardHeader variant='h5'>{project.title}</ProjectCardHeader>
                      <ProjectCardDesc variant='body1'>{parseProjectDescription(project.description)}</ProjectCardDesc>
                    </CardTextWrapper>
                    {project.Images && (
                      <div className='imageListContainer'>
                        <ImageList sx={{ width: '100%' }} cols={4} gap={8}>
                          {project.Images.map((image, index) => (
                            <ImageListItem key={index}>
                              <img
                                src={image.imageUrl}
                                alt={`Project ${project.id} - Image ${index + 1}`}
                                loading='lazy'
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </div>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default ProjectCards;
