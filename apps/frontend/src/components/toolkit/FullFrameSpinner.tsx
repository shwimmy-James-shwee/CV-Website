import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

interface AccordionProps {
  animation?: 'grow' | 'border'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
  height?: string
  scale?: number
  blur?: boolean
  blurRate?: number
}

const FullFrameDiv = styled.div<{ $blur?: boolean; $blurRate?: number; $height?: string }>`
  width: 100%;
  ${(props) => (props.$height ? `height: ${props.$height};` : 'height: 100%;')}

  text-align: center;
  ${(props) =>
    props.$blur ? `background-color: rgba(79, 78, 78, ${props.$blurRate || '0.3'});` : ''}
`

const StyledSpinner = styled(Spinner)<{ scale?: number }>`
  position: relative;
  top: 45%;
  ${(props) => (props.scale ? `scale: ${props.scale};` : '')}
`

const FullFrameSpinner = ({ animation = 'border', variant = 'light', ...args }: AccordionProps) => {
  return (
    <FullFrameDiv
      $blur={args.blur}
      $blurRate={args.blurRate}
      $height={args.height}
      data-testid='full-frame-spinner'
      className='my-auto'
    >
      <StyledSpinner
        animation={animation}
        variant={variant}
        scale={args.scale}
        data-testid='spinner'
        className='my-auto'
      />
    </FullFrameDiv>
  )
}

export default FullFrameSpinner
