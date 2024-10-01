import { createContext, ReactNode, useState } from 'react';

export type ModalProps = {
  content: JSX.Element;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};
export type ModalContextType = {
  modalIsOpen: boolean;
  handleModalOpen: (modalProps: ModalProps) => void;
  handleModalClose: () => void;
  modalProps: ModalProps;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

interface IModalProvider {
  children: ReactNode;
}

const ModalProvider = ({ children }: IModalProvider) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ModalProps>({ content: <></> });

  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalOpen = (modalProps: ModalProps) => {
    setModalProps(modalProps);
    setModalIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        handleModalClose,
        handleModalOpen,
        modalIsOpen,
        modalProps,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
