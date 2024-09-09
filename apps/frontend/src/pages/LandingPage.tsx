import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../components/banners/Header';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import styled from 'styled-components';

import SAImage from '../assets/images/solutionArch.png';
import webImage from '../assets/images/website.png';

const RowComponent = styled(Row)`
  margin-top: 3rem;
  max-height: 300px;
`;

const ImageComponent = styled.img`
  height: 250px;
`;

const H3Component = styled.h3`
  color: var(--heading-text-color);
  border-bottom: 1px solid var(--heading-underlined-color);
  padding-bottom: 0.5rem;
`;

const TextComponent = styled.p`
  padding-top: 1rem;
  font-weight: 500;
  color: var(--general-text-color);
  text-align: justify;
`;

function LandingPage() {
  const { currentUserData } = useContext(UserContext);
  return (
    <>
      <Header title={`Hi ${currentUserData?.firstName},`} description='Welcome to the template webapp' />
      <Container>
        <RowComponent>
          <Col>
            <H3Component data-testid='landing-intro-header'>The Purpose</H3Component>
            <TextComponent data-testid='landing-intro-text'>
              The temp late is created to help speed up project development, saving large amount of the solution
              architecture time and allow the budget to be spend largely on business logic instead of low level works
              that is crucial but not tangible to client
            </TextComponent>
          </Col>
          <Col className='text-end'>
            <ImageComponent src={SAImage} data-testid='landing-intro-image' />
          </Col>
        </RowComponent>

        <RowComponent>
          <Col>
            <ImageComponent src={webImage} data-testid='landing-intro-image' />
          </Col>
          <Col className='text-end'>
            <H3Component data-testid='landing-intro-header'>What is included</H3Component>
            <TextComponent data-testid='landing-intro-text'>
              Webapp Infrastructure as Code, which provision all the resource required to run the application and also
              meet KPMG security standard. The Frontend UI is built with React, and the backend is built with NodeJS and
              NestJS. All SDLC standard and development workflow is provided in the repo.
            </TextComponent>
          </Col>
        </RowComponent>
      </Container>
    </>
  );
}

export default LandingPage;
