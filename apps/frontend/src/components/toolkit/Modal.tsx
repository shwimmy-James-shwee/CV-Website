import { ReactNode } from 'react';
import { Container, Modal, ModalProps } from 'react-bootstrap';

interface ModalComponentProps {
  show: boolean;
  title?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  backdrop?: boolean;
  closeButton?: boolean;
  size?: ModalProps['size'];
  onHide?: () => void;
}

const ModalComponent = ({
  show,
  title,
  body,
  footer,
  backdrop,
  closeButton = true,
  size,
  onHide,
}: ModalComponentProps) => {
  return (
    <Modal show={show} size={size} onHide={onHide} data-testid='modal' centered backdrop={backdrop}>
      <Container>
        <Modal.Header closeButton={closeButton} className='px-4 border-0 mt-3' style={{ width: '100%' }}>
          {title && <Modal.Title style={{ width: '100%' }}>{title}</Modal.Title>}
        </Modal.Header>
        {body && <Modal.Body className='py-0 px-4'>{body}</Modal.Body>}
        {footer && <Modal.Footer className='px-4 mb-3 border-0'>{footer}</Modal.Footer>}
      </Container>
    </Modal>
  );
};
export default ModalComponent;
