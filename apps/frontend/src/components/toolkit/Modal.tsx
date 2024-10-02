import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { Container, Modal } from '@mui/material';
import { styled } from '@mui/system';

const ModalContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff; // TODO change to theme color
  border: 2px solid #000;
  box-shadow: 24;
  padding: 20px;
  max-height: 80vh;
  overflow-y: scroll;
`;

function ModalComponent() {
  const { modalIsOpen, modalProps, handleModalClose } = useContext(ModalContext);

  const { content, size } = modalProps;
  // TODO update close button option to Modal
  return modalIsOpen ? (
    <Modal open={modalIsOpen} onClose={handleModalClose}>
      <ModalContainer maxWidth={size}>
        <button
          onClick={handleModalClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        {content}
      </ModalContainer>
    </Modal>
  ) : (
    <></>
  );
}
export default ModalComponent;
