// import { Paper, MobileStepper, Button, ImageList, ImageListItem } from '@mui/material';
import { Box, styled } from '@mui/system';

import { useState } from 'react';
import { Project } from '@core/db/schema';
import solutionArch from '../../assets/images/solutionArch.png';
import { Typography, Container } from '@mui/material';
import { MarkDownRenderer } from '../toolkit/MarkDownUtils';
import { formatDate } from '@/utils/HelperFunctions';
// import { Button } from '@mui/material';

// const ImageButtonBox = styled(Box)`
//   position: absolute;
//   width: 90%;
//   display: flex;
//   justify-content: space-between;
//   margin: 50px;
//   top: 40%;
// `;

const ProjectContentWrapper = styled(Container)`
  margin-top: 70px;
  margin-bottom: 50px;
`;

const ProjectImageWrapper = styled(Box)`
  background-color: var(--mui-palette-secondary-main);
  box-shadow: 0px 0px 40px 40px var(--mui-palette-secondary-main);
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;

  @media (max-width: 600px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const ProjectModalImageList = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  min-height: 200px;
  gap: 20px;
  padding: 20px 0;
  scroll-behavior: smooth;
  border-bottom: 2px solid var(--mui-palette-primary-main);
`;

const SubTitleWrapper = styled('div')`
  margin-top: 10px;
  margin-bottom: 40px;
  border-bottom: 2px solid var(--mui-palette-secondary-dark);
`;

type ProjectModalBodyProps = {
  projectData: Project;
};

// const ProjectModalBody = ({ id, title, description, image, highlighted }: testProjectDataType) => {
const ProjectModalBody = ({ projectData }: ProjectModalBodyProps) => {
  // const theme = useTheme();
  const [activeImage, setActiveImage] = useState<number | null>(null);
  // const maxImages = projectData.image.length;

  // const handleNext = () => {
  //   setActiveImage((prevActiveImage) => prevActiveImage + 1);
  // };

  // const handleBack = () => {
  //   setActiveImage((prevActiveImage) => prevActiveImage - 1);
  // };

  const handleImageClick = (index: number) => {
    setActiveImage(null);
    if (activeImage === null) {
      setActiveImage(index);
    } else {
      // This feels gross, but it works for now, TODO figure out how to make the two transitions sequential
      // wait for the closing animation of the currently selected image before expanding the clicked one
      setTimeout(() => {
        activeImage === index ? setActiveImage(null) : setActiveImage(index);
      }, 200);
    }
  };

  const parseSubtitle = (project: Project) => {
    const clientStr = project.client ? `${projectData.client} |` : '';

    const endDate = project.dateEnded ? formatDate(new Date(project.dateEnded).toLocaleDateString()) : 'Present';

    return `${clientStr} ${formatDate(new Date(project.dateStarted).toLocaleDateString())} - ${endDate}`;
  };

  return (
    <>
      <ProjectImageWrapper>
        {projectData.Images && (
          <ProjectModalImageList maxWidth='xl'>
            {projectData.Images.map((image, index) => (
              <div
                className={`ProjectModalImageItem ${index === activeImage ? 'ProjectModalImageItemSelected' : ''}`}
                key={index + image.id}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={solutionArch}
                  alt={`Project ${projectData.id} - Image ${index + 1}`}
                  loading='lazy'
                  className=''
                />
              </div>
            ))}
          </ProjectModalImageList>
        )}
      </ProjectImageWrapper>

      <ProjectContentWrapper maxWidth='lg'>
        <Typography component='h3' variant='h3'>
          {projectData.title}
        </Typography>
        <SubTitleWrapper>
          <Typography component='h6' variant='h6'>
            {parseSubtitle(projectData)}
          </Typography>
          {/* <Typography component='h6' variant='h6'>
          21/02/2023 - 10/06/2023
        </Typography> */}
        </SubTitleWrapper>

        <div>
          <MarkDownRenderer markDownStr={projectData.description} />
        </div>
      </ProjectContentWrapper>
    </>
  );
};

export default ProjectModalBody;
