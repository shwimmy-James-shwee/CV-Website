import { testProjectDataType } from './ProjectCards';

type ProjectModalBodyProps = {
  projectData: testProjectDataType;
};

// const ProjectModalBody = ({ id, title, description, image, highlighted }: testProjectDataType) => {
const ProjectModalBody = ({ projectData }: ProjectModalBodyProps) => {
  return (
    <div className='project-modal-body'>
      <div>
        {/* {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Project image ${index + 1}`} />
          </div>
        ))} */}
      </div>
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
