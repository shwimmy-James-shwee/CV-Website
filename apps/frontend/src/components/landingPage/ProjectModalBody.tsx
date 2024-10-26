// import { Paper, MobileStepper, Button, ImageList, ImageListItem } from '@mui/material';
import { Box, styled } from '@mui/system';

import { useState } from 'react';
import { Project } from '@core/db/schema';
import solutionArch from '../../assets/images/solutionArch.png';
// import { Button } from '@mui/material';

// const ImageButtonBox = styled(Box)`
//   position: absolute;
//   width: 90%;
//   display: flex;
//   justify-content: space-between;
//   margin: 50px;
//   top: 40%;
// `;

const ProjectModalWrapper = styled('div')`
  //
`;

const ProjectModalImageList = styled('div')`
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
      // This is disgusting, but it works for now, TODO fix this!
      setTimeout(() => {
        activeImage === index ? setActiveImage(null) : setActiveImage(index);
      }, 200);
    }
  };
  return (
    <ProjectModalWrapper>
      <Box>
        {projectData.Images && (
          <ProjectModalImageList>
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
            {/* <ImageButtonBox>
            {activeImage && activeImage > 0 && (
              <Button onClick={() => setActiveImage(() => (activeImage ? activeImage - 1 : null))}>PREV</Button>
            )}
            {activeImage && activeImage < maxImages - 1 && (
              <Button onClick={() => setActiveImage(() => (activeImage ? activeImage + 1 : null))}>NEXT</Button>
            )}
          </ImageButtonBox> */}
          </ProjectModalImageList>
        )}
      </Box>

      <h2 className='project-title'>{projectData.title}</h2>
      <div className='project-subtitle-dates'>
        <h3 className='project-subtitle'>{'asdasd'}</h3>
        <span className='project-dates'>{'adate'}</span>
      </div>
      <div className='project-body'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque
        tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis,
        obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut
        harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum.
        Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis
        consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae
        magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem
        commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam,
        recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi
        maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt
        aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium
        hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero,
        accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque
        tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis,
        obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut
        harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum.
        Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis
        consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae
        magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem
        commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam,
        recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi
        maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt
        aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium
        hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero,
        accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque
        tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis,
        obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut
        harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum.
        Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis
        consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae
        magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem
        commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam,
        recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt aliquid nisi
        maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium hic deserunt
        aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero, accusantium
        hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque tempora libero,
        accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis, obcaecati.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut harum neque
        tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum. Perspiciatis,
        obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem commodi quis consequatur ut
        harum neque tempora libero, accusantium hic deserunt aliquid nisi maxime laboriosam, recusandae magnam ipsum.
        Perspiciatis, obcaecati.
      </div>
    </ProjectModalWrapper>
  );
};

export default ProjectModalBody;
