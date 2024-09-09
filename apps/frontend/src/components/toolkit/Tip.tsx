import { Col, Row } from 'react-bootstrap';
import { TitleText } from '../text/TitleText';
import { BodyText } from '../text/BodyText';
import styled from 'styled-components';

interface TipProps {
  show: boolean;
  title?: string;
  text?: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  closeButton?: boolean;
  onHide?: () => void;
  className?: string;
  'data-testid'?: string;
}

const TipIcon = styled.span<{ $color?: string }>`
  color: ${(props) => props.$color};
`;

const TipRow = styled(Row)<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 0.75rem;
`;

export const Tip = ({
  color = 'var(--tip-primary-color)',
  backgroundColor = 'var(--tip-primary-bg)',
  closeButton,
  onHide,
  show,
  ...props
}: TipProps) => {
  return (
    <>
      {show && (
        <TipRow $backgroundColor={backgroundColor} {...props}>
          <Col xs='auto' className='my-auto'>
            <TipIcon $color={color} className='material-icons-outlined align-middle'>
              {props.icon}
            </TipIcon>
          </Col>
          <Col xs='auto' className='my-auto px-1'>
            <TitleText color={color} size={1}>
              {props.title}
            </TitleText>
          </Col>
          <Col className='my-auto'>
            <BodyText color={color}>{props.text}</BodyText>
          </Col>

          {closeButton && (
            <Col xs={1} className='my-auto text-end'>
              <TipIcon
                onClick={() => onHide && onHide()}
                $color={color}
                className='material-icons-outlined align-middle'
              >
                close
              </TipIcon>
            </Col>
          )}
        </TipRow>
      )}
    </>
  );
};
