import { Container, Navbar, Nav } from 'react-bootstrap'
import styled from 'styled-components'

interface FooterBarProps {
  redirectUrls?: {
    url: string
    label: string
  }[]
}

const StyledNavbar = styled(Navbar)`
  border-top: 10px solid var(--navbar-nav-link-active-cl);
  background-color: var(--navbar-nav-link-cl);
`

function FooterBar({ redirectUrls }: FooterBarProps) {
  return (
    <>
      <StyledNavbar data-testid='footer-bar'>
        <Container>
          <Navbar.Collapse>
            <Nav className='ms-auto me-auto' style={{ height: '100%' }}>
              {redirectUrls?.map((redirectItem, index) => {
                return (
                  <Nav.Link href={redirectItem.url} data-testid='footer-nav-link' key={index}>
                    {redirectItem.label}
                  </Nav.Link>
                )
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  )
}

export default FooterBar
