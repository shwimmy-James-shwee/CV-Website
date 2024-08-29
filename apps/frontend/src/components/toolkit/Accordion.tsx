import { ReactNode, useState } from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

interface AccordionProps {
  title: ReactNode
  children?: ReactNode
  className?: string
  // variant?: 'primary' | 'secondary' | 'section' | 'light'
  border?: string
  borderRadius?: string
  backgroundColor?: string
  draggable?: boolean
  show?: boolean
  defaultShow?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  onDragStart?: React.DragEventHandler<HTMLElement>
  onDragEnd?: React.DragEventHandler<HTMLElement>
  onDrop?: React.DragEventHandler<HTMLElement>
  onDragOver?: React.DragEventHandler<HTMLElement>
  onDragEnter?: React.DragEventHandler<HTMLElement>
  onDragLeave?: React.DragEventHandler<HTMLElement>
  'data-testid'?: string
  showError?: boolean
}

const AccordionItem = styled(Card)<{
  $border?: string
  $borderRadius?: string
  $showError?: boolean
  $backgroundColor?: string
}>`
  border: ${(props) =>
    props.$showError ? '1px solid var(--warning-color) !important' : props.$border};
  border-radius: ${(props) => props.$borderRadius ?? 'none'};
  border-color: var(--primary-accordion-border-color);
  background-color: ${(props) => props.$backgroundColor};
`

const AccordionHeader = styled(Card.Header)<{ $backgroundColor?: string; $borderRadius?: string }>`
  background-color: ${(props) => props.$backgroundColor || 'var(--primary-accordion-bg)'};
  border: none;
  ${(props) => (props.$borderRadius ? `border-radius: ${props.$borderRadius} !important;` : '')}
`
const ExpandIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.5rem;
  color: var(--section-accordion-title-icon);
  cursor: pointer !important;
  transform: rotate(${(props) => (props.$isOpen ? '90deg' : '0deg')});
  transition: transform 0.3s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`

const AccordionComponent = ({
  title,
  children,
  border,
  borderRadius,
  backgroundColor,
  defaultShow,
  show,
  setShow,
  showError,
  ...props
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(show ?? defaultShow ?? false)
  const toggleShow = () => {
    if (setShow) {
      setIsOpen(!isOpen)
      setShow(!show)
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <Accordion flush {...props}>
      <AccordionItem
        $border={border}
        $borderRadius={borderRadius}
        $showError={showError}
        $backgroundColor={backgroundColor}
      >
        <AccordionHeader $backgroundColor={backgroundColor} $borderRadius={borderRadius}>
          <Row>
            <Col className='my-auto'>{title}</Col>
            <Col xs='auto' className='my-auto'>
              <ExpandIcon
                className='material-icons-outlined align-middle'
                onClick={toggleShow}
                $isOpen={show ?? isOpen}
                data-testid='accordion-expand-icon'
              >
                chevron_right
              </ExpandIcon>
            </Col>
          </Row>
        </AccordionHeader>
        <Accordion.Collapse eventKey='0' in={show ?? isOpen}>
          <Card.Body className='pt-0'>{children}</Card.Body>
        </Accordion.Collapse>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionComponent
