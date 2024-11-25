import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { Container, Modal } from '@mui/material';
import { styled } from '@mui/system';

const ModalContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--mui-palette-secondary-main);
  padding: 0px !important;
  outline: none;
  max-height: 80vh;
  overflow-y: scroll;
`;

function ModalComponent() {
  const { modalIsOpen, modalProps, handleModalClose } = useContext(ModalContext);

  const { content, size } = modalProps;
  // TODO update close button option to Modal
  return modalIsOpen ? (
    <Modal open={modalIsOpen} onClose={handleModalClose} sx={{ outline: 'none' }}>
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
