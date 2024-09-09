import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { TitleText } from '../text/TitleText';
import { InfoText } from '../text/InfoText';

const HeaderComponent = styled.header`
  width: 100%;
  border-bottom: 1px solid var(--header-border-color);
  padding: 2.5rem 3rem;
  background-color: var(--header-bg);
`;

const DescriptionComponent = styled.h4`
  color: var(--heading-text-color);
  margin-top: 0.2rem;
`;

interface HeaderProps {
  title: string | ReactNode;
  description?: string;
  children?: ReactNode;
}

export const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <>
      <HeaderComponent data-testid='header'>
        <Container fluid className='p-0'>
          <Row>
            <Col className='my-auto '>
              {typeof title === 'string' ? <TitleText data-testid='header-title'>{title}</TitleText> : title}
              {description && (
                <DescriptionComponent data-testid='header-description'>
                  <InfoText>{description}</InfoText>
                </DescriptionComponent>
              )}
            </Col>
            <Col md='auto' className='my-auto'>
              {children}
            </Col>
          </Row>
        </Container>
      </HeaderComponent>
    </>
  );
};
