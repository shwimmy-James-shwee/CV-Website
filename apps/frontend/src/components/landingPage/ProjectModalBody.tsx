// import { Paper, MobileStepper, Button, ImageList, ImageListItem } from '@mui/material';
import { Box } from '@mui/system';
import { testProjectDataType } from './ProjectCards';

import { useState } from 'react';

type ProjectModalBodyProps = {
  projectData: testProjectDataType;
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
    activeImage === index ? setActiveImage(null) : setActiveImage(index);
  };
  return (
    <div>
      <Box>
        <div className='ProjectModalImageList'>
          {projectData.image.map((image, index) => (
            <div
              className={`ProjectModalImageItem ${index === activeImage ? 'ProjectModalImageItemSelected' : ''}`}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                srcSet={image}
                alt={`Project ${projectData.id} - Image ${index + 1}`}
                loading='lazy'
                className=''
              />
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default ProjectModalBody;
