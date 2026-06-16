import {createContext, useState, useContext} from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    const [activeNote, setActiveNote] = useState(null); // For holding note data for editing and update


    const openCreateNoteModal = () => {
        setIsNoteModalOpen(true);
        setActiveNote(null);
    }

    const openEditNoteModal = (noteData) => {
        setIsNoteModalOpen(true);
        setActiveNote(noteData);
    }

    const closeNoteModal = () => {
        setIsNoteModalOpen(false);
        setActiveNote(null);
    }

    const switchToLogin = (message) => {
        setIsRegisterModalOpen(false);
        setModalMessage(message);
        setIsLoginModalOpen(true);
    };

    const switchToRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);

    }


    return (
        <ModalContext.Provider value={{isNoteModalOpen, activeNote, isLoginModalOpen,
            setIsLoginModalOpen ,openCreateNoteModal, openEditNoteModal, closeNoteModal, isRegisterModalOpen,
            setIsRegisterModalOpen, switchToLogin, modalMessage, setModalMessage, switchToRegisterModal,
            isSettingModalOpen, setIsSettingModalOpen
        }}>
            {children}
        </ModalContext.Provider>
    );
}

// Custom hook for easy consumption
export  function useModal() {
    return useContext(ModalContext);
}