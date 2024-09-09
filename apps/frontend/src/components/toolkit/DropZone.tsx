import styled from 'styled-components';
import { Row, Stack } from 'react-bootstrap';
import { ReactNode } from 'react';
import { InfoText } from '../text/InfoText';

type DropZoneProps = {
  show?: boolean;
  showText?: boolean;
  name?: string;
  children?: ReactNode;
  height?: string;
  'data-testid'?: string;
  border?: string;
  className?: string;
  onDrop?: React.DragEventHandler<HTMLElement>;
  onDragOver?: React.DragEventHandler<HTMLElement>;
};
const StyledDropZone = styled(Row)<{ $show?: boolean }>`
  border: ${(props) => (props.$show ? props.border || '2px dashed var(--drop-zone-color)' : 'none')};
  min-height: ${(props) => (props.$show ? props.height || '4rem' : '0px')};
`;

const DropZoneAddIcon = styled.span`
  color: var(--drop-zone-color);
`;

function DropZone({ children, show, showText, name, ...props }: DropZoneProps) {
  return (
    <StyledDropZone $show={show} {...props}>
      {children}
      {showText && (
        <Stack direction='horizontal' gap={3} className='justify-content-center'>
          <DropZoneAddIcon className='material-icons-outlined'>add_circle</DropZoneAddIcon>
          <InfoText size={1} fontWeight={600} color={'var(--drop-zone-color)'} className='w-auto'>
            Drop {name} Here
          </InfoText>
        </Stack>
      )}
    </StyledDropZone>
  );
}

export default DropZone;
