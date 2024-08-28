import styled, { CSSProperties } from 'styled-components'

interface ProgressBarProp {
  background?: string
  progressColor?: string
  style?: CSSProperties
  progressStyle?: CSSProperties
  dataTestId?: string
  className?: string
  height?: string
  percentage?: number
  animation?: boolean
}

const ProgressBarComponent = styled.div<{ $background?: string; $height?: string }>`
  background: ${(props) =>
    props.$background || 'var(--Light-1, var(--theme-tertiary-background-color))'};
  height: ${(props) => `${props.$height || '10px'}`};
  margin: 0;
  width: 100%;
  border-radius: 9.5px;
  position: relative;
`

const ProgressBarProgress = styled.div<{
  $background?: string
  $percentage: number
  $height?: string
  $animation?: boolean
}>`
  background: ${(props) =>
    props.$background ||
    'var(--Gradient,linear-gradient(90deg, var(--theme-tertiary-color) 0%, var(--theme-secondary-color) 100%))'};
  width: ${(props) => `${props.$percentage}%`};
  height: ${(props) => `${props.$height || '10px'}`};
  border-radius: 9.5px;
  flex-shrink: 0;
  position: relative;
  ${(props) => (props.$animation ? 'transition: width 0.5s ease-in-out;' : '')}
`

export const ProgressBar = ({
  style,
  progressStyle,
  progressColor,
  background,
  dataTestId,
  className,
  percentage,
  animation,
  height,
}: ProgressBarProp) => {
  return (
    <ProgressBarComponent
      $background={background}
      style={style}
      $height={height}
      className={className}
      data-testid={dataTestId || 'progress-bar'}
    >
      <ProgressBarProgress
        style={progressStyle}
        $background={progressColor}
        $height={height}
        $percentage={percentage || 1}
        $animation={animation || true}
        data-testid={`${(dataTestId || 'progress-bar') + '-progress'}`}
      />
    </ProgressBarComponent>
  )
}
