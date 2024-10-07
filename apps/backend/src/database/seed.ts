import { Image, PrismaClient, Project } from '@core/db';
import { v5 as uuid } from 'uuid';

export const prisma = new PrismaClient();
export const NAME_SPACE = 'ecfd24b0-e77d-49a7-a8d6-dd01b7d9c588';

export function uuidFromString(name: string) {
  return uuid(name, NAME_SPACE);
}

interface ProjectWithImages extends Project {
  Images: Image[];
}

async function main() {
  const userBody = {
    firstName: 'no-reply',
    lastName: 'no-reply',
  };
  await prisma.user.upsert({
    where: { id: uuidFromString('no-reply@portal.com') },
    update: { ...userBody },
    create: {
      id: uuidFromString('no-reply@portal.com'),
      loginEmail: 'no-reply@portal.com',
      ...userBody,
    },
  });

  const projectSeedData = [
    {
      id: '1',
      title: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      highlighted: true,
      dateStarted: new Date('2023-01-01'),
      dateEnded: new Date('2023-06-30'),
      Images: [
        {
          id: '1',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Solution Architecture',
          displaySequence: 1,
        },
        {
          id: '2',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'System Overview',
          displaySequence: 2,
        },
      ],
    },
    {
      id: '2',
      title: 'Project 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      highlighted: false,
      dateStarted: new Date('2023-02-15'),
      dateEnded: new Date('2023-08-31'),
      Images: [
        {
          id: '3',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Project Diagram',
          displaySequence: 1,
        },
        {
          id: '4',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Workflow Chart',
          displaySequence: 2,
        },
        {
          id: '5',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Data Flow',
          displaySequence: 3,
        },
      ],
    },
    {
      id: '3',
      title: 'Project 3',
      description:
        'Description of project 3. This innovative project aims to revolutionize the way we approach problem-solving in the digital age. By leveraging cutting-edge technologies and methodologies, we are creating a platform that enhances collaboration, streamlines processes, and delivers unprecedented results for our clients.',
      highlighted: true,
      dateStarted: new Date('2023-03-10'),
      dateEnded: new Date('2023-09-15'),
      Images: [
        {
          id: '6',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Component Diagram',
          displaySequence: 1,
        },
      ],
    },
    {
      id: '4',
      title: 'Project 4',
      description:
        'Description of project 4. Our team is developing a groundbreaking solution that addresses the growing challenges in data management and analysis. This project combines advanced machine learning algorithms with intuitive user interfaces to provide actionable insights and drive informed decision-making across various industries.',
      highlighted: false,
      dateStarted: new Date('2023-04-05'),
      dateEnded: new Date('2023-10-20'),
      Images: [
        {
          id: '7',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'System Architecture',
          displaySequence: 1,
        },
        {
          id: '8',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Process Flow',
          displaySequence: 2,
        },
      ],
    },
    {
      id: '5',
      title: 'Project 5',
      description:
        'Description of project 5. We are pioneering a new approach to sustainable technology development. This project focuses on creating eco-friendly solutions that reduce carbon footprints while maintaining high performance and reliability. Our innovative designs and materials are set to transform the way we think about environmental responsibility in the tech industry.',
      highlighted: true,
      dateStarted: new Date('2023-05-20'),
      dateEnded: new Date('2023-11-30'),
      Images: [
        {
          id: '9',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Technical Diagram',
          displaySequence: 1,
        },
        {
          id: '10',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Implementation Plan',
          displaySequence: 2,
        },
        {
          id: '11',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'User Interface Mockup',
          displaySequence: 3,
        },
      ],
    },
    {
      id: '6',
      title: 'Project 6',
      description:
        'Description of project 6. This ambitious project aims to bridge the gap between virtual and physical realities. By developing advanced augmented reality technologies, we are creating immersive experiences that enhance education, training, and entertainment. Our solutions are poised to revolutionize how we interact with digital content in our daily lives.',
      highlighted: false,
      dateStarted: new Date('2023-06-15'),
      dateEnded: new Date('2023-12-31'),
      Images: [
        {
          id: '12',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Project Roadmap',
          displaySequence: 1,
        },
      ],
    },
    {
      id: '7',
      title: 'Project 7',
      description:
        'Description of project 7. We are at the forefront of developing next-generation cybersecurity solutions. This project combines artificial intelligence and blockchain technology to create robust, adaptive security systems that protect against evolving threats. Our innovative approach is set to redefine the standards of digital security in an increasingly connected world.',
      highlighted: true,
      dateStarted: new Date('2023-07-01'),
      dateEnded: new Date('2024-01-15'),
      Images: [
        {
          id: '13',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'System Design',
          displaySequence: 1,
        },
        {
          id: '14',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Integration Diagram',
          displaySequence: 2,
        },
      ],
    },
    {
      id: '8',
      title: 'Project 8',
      description:
        'Description of project 8. Our team is developing a revolutionary platform for personalized healthcare management. This project integrates wearable technology, big data analytics, and telemedicine to provide tailored health insights and interventions. We aim to empower individuals to take control of their well-being while improving the efficiency and effectiveness of healthcare delivery.',
      highlighted: false,
      dateStarted: new Date('2023-08-10'),
      dateEnded: new Date('2024-02-29'),
      Images: [
        {
          id: '15',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Conceptual Model',
          displaySequence: 1,
        },
        {
          id: '16',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Feature Overview',
          displaySequence: 2,
        },
        {
          id: '17',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Technology Stack',
          displaySequence: 3,
        },
        {
          id: '18',
          imageUrl: '../../assets/images/solutionArch.png',
          altText: 'Deployment Strategy',
          displaySequence: 4,
        },
      ],
    },
  ] as ProjectWithImages[];

  await projectSeedData.forEach(async (project: ProjectWithImages) => {
    await prisma.project.create({
      include: { Images: true },
      data: {
        id: project.id,
        title: project.title,
        description: project.description,
        highlighted: project.highlighted,
        dateStarted: project.dateStarted,
        dateEnded: project.dateEnded,
        Images: {
          create: project.Images.map((image) => ({
            id: image.id,
            imageUrl: image.imageUrl,
            altText: image.altText,
            displaySequence: image.displaySequence,
          })),
        },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
