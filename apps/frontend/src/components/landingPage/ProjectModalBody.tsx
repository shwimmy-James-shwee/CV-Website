import { Paper, MobileStepper, Button } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { testProjectDataType } from './ProjectCards';
import { useState } from 'react';

type ProjectModalBodyProps = {
  projectData: testProjectDataType;
};

// const ProjectModalBody = ({ id, title, description, image, highlighted }: testProjectDataType) => {
const ProjectModalBody = ({ projectData }: ProjectModalBodyProps) => {
  const theme = useTheme();
  const [activeImage, setActiveImage] = useState(0);
  const maxImages = projectData.image.length;

  const handleNext = () => {
    setActiveImage((prevActiveImage) => prevActiveImage + 1);
  };

  const handleBack = () => {
    setActiveImage((prevActiveImage) => prevActiveImage - 1);
  };
  return (
    <div>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <img
            width={'100%'}
            src={projectData.image[activeImage]}
            srcSet={projectData.image[activeImage]}
            alt={`Project image - Image ${activeImage + 1}`}
            loading='lazy'
          />
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>this could be a description of the image</Box>
        <MobileStepper
          variant='text'
          steps={maxImages}
          position='static'
          activeStep={activeImage}
          nextButton={
            <Button size='small' onClick={handleNext} disabled={activeImage === maxImages - 1}>
              Next
              {theme.direction === 'rtl' ? '<' : '>'}
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBack} disabled={activeImage === 0}>
              {theme.direction === 'rtl' ? '>' : '<'}
              Back
            </Button>
          }
        />
      </Box>
      <h2 className='project-title'>{projectData.title}</h2>
      <div className='project-subtitle-dates'>
        <h3 className='project-subtitle'>{'asdasd'}</h3>
        <span className='project-dates'>{'adate'}</span>
      </div>
      <div className='project-body'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque
        tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis,
        obcaecati.
      </div>
    </div>
  );
};

export default ProjectModalBody;
