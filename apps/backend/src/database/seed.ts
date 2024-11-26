import { ContactUsNotification, Image, PrismaClient, Project } from '@core/db';
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'A demonstration project showcasing react-markdown capabilities and features',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Extended markdown implementation with advanced features and plugins',
      highlighted: false,
      dateStarted: new Date('2023-02-15'),
      dateEnded: new Date('2023-08-31'),
      client: 'TechCorp Solutions',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Interactive markdown editor with real-time preview functionality',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Customizable markdown renderer with syntax highlighting support',
      highlighted: false,
      dateStarted: new Date('2023-04-05'),
      dateEnded: new Date('2023-10-20'),
      client: 'Digital Innovations Ltd',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Advanced markdown system with plugin architecture and custom components',
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
      shortDescription: 'Innovative AR project bridging virtual and physical realities',
      highlighted: false,
      dateStarted: new Date('2023-06-15'),
      dateEnded: new Date('2023-12-31'),
      client: 'VR Dynamics Inc',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Enhanced markdown editor with CommonMark and GFM support',
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
      description: `
  # A demo of 'react-markdown'

'react-markdown' is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using 'dangerouslySetInnerHTML'
* Lets you define your own components (to render 'MyHeading' instead of 'h1')
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
['rehype-highlight'](https://github.com/rehypejs/rehype-highlight).
`,
      shortDescription: 'Comprehensive markdown solution with extensive plugin ecosystem',
      highlighted: false,
      dateStarted: new Date('2023-08-10'),
      dateEnded: new Date('2024-02-29'),
      client: 'Global Tech Solutions',
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
        shortDescription: project.shortDescription,
        client: project.client,
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

  const contactMeQueries = [
    {
      id: uuidFromString('contact-me-query-1'),
      name: 'John Doe',
      submittedByEmail: 'john.doe@example.com',
      message: 'I have a question about your services.',
      company: 'ACME Corp',
      createdAt: new Date(),
      sentTimestamp: null,
    },
    {
      id: uuidFromString('contact-me-query-2'),
      name: 'Jane Smith',
      submittedByEmail: 'jane.smith@example.com',
      message: 'I would like to schedule a consultation.',
      company: null,
      createdAt: new Date(),
      sentTimestamp: null,
    },
    {
      id: uuidFromString('contact-me-query-3'),
      name: 'Alice Johnson',
      submittedByEmail: 'alice.johnson@example.com',
      message: 'I am interested in your pricing.',
      company: 'Tech Solutions Inc',
      createdAt: new Date(),
      sentTimestamp: new Date(),
    },
    {
      id: uuidFromString('contact-me-query-4'),
      name: 'Bob Williams',
      message: 'I am interested in your pricing.',
      submittedByEmail: 'bob.williams@',
      company: null,
      sentTimestamp: null,
    },
  ] as ContactUsNotification[];

  await contactMeQueries.forEach(async (query: ContactUsNotification) => {
    await prisma.contactUsNotification.create({
      data: query,
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
