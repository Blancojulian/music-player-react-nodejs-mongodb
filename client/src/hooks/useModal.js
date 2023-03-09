import { useState } from 'react';

const useModal = (initialValue = false) => {

    const [isOpen, setIsOpen] = useState(initialValue);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return {
        isOpen,
        closeModal,
        openModal
    }
}

export default useModal;