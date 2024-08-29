import { Container, Stack } from 'react-bootstrap';
import { Header } from '../components/banners/Header';
import Accordion from '../components/toolkit/Accordion';
import styled from 'styled-components';
import ButtonComponent from '../components/toolkit/Button';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const ScrollButton = styled(ButtonComponent)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  border-radius: 4px;
  padding: 10px 24px;
  border: none;
  line-height: 12px;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background-color: var(--navbar-nav-link-active-cl);
    color: var(--navbar-nav-link-cl);
  }
`;

function FAQPage() {
  return (
    <>
      <Header
        title='Frequently Asked Questions'
        description='This page is designed to answer all the frequently asked questions and help you get started with using the template 
  and make the most out of its features. 
  '
      />

      <div className='content help-page'>
        <div data-testid='content'>
          <ScrollButton onClick={scrollToTop} label='Back to Top' data-testid='back-to-top-button' />
          <Container className='mt-4'>
            <Stack direction='vertical' gap={4}>
              <Accordion
                title='Introduction'
                children={
                  <>
                    <Accordion
                      title='What is our web app template?'
                      children={
                        'Our web app template is a pre-built infrastructure that serves as a foundation for developing custom web applications for clients.'
                      }
                    />
                    <Accordion
                      title='How does our web app template save time on client engagements?'
                      children={
                        'It eliminates the need to build a web application from scratch for each client, reducing development time significantly.'
                      }
                    />
                  </>
                }
              />
              <Accordion
                title='Customisation and Flexbility'
                children={
                  <>
                    <Accordion
                      title='Can our web app template handle different client requirements?'
                      children={
                        'Yes, it is highly adaptable and can accommodate a wide range of client requirements through customisation.'
                      }
                    />
                    <Accordion
                      title='Can we rebrand our web app template for each client?'
                      children={
                        "Absolutely! The template supports rebranding, allowing customization of visual elements to align with each client's branding guidelines."
                      }
                    />
                    <Accordion
                      title='Does our web app template include security features?'
                      children={
                        'Yes, it incorporates essential security measures such as data encryption and secure authentication, ensuring adherence to security standards.'
                      }
                    />
                  </>
                }
              />
              <Accordion
                title='Scalability and Performance'
                children={
                  <>
                    <Accordion
                      title='Is our web app template scalable and capable of handling high user loads?'
                      children={
                        'Yes, it is designed for scalability and able to handle increased user loads and traffic.'
                      }
                    />
                    <Accordion
                      title='How can we ensure our web app template remains up to date and relevant?'
                      children={
                        'We have a dedicated team that regularly updates and maintains the template, incorporating the latest technologies and addressing security vulnerabilities.'
                      }
                    />
                  </>
                }
              />
              <Accordion
                title='Support and More Information'
                children={
                  <Accordion
                    title='Who can I speak to if I have more questions or would like more information?'
                    children={
                      'If you have further questions or would like more information, you can click the ‘Contact’ tab at the top of this page and send us an inquiry.'
                    }
                  />
                }
              />
            </Stack>
          </Container>
        </div>
      </div>
    </>
  );
}
export default FAQPage;
