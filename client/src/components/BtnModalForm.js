import useModal from './../hooks/useModal';
import ModalForm from './ModalForm';


const BtnModalForm = ({ textBtn, title, icon: Icon, form: Form }) => {

    const { isOpen, closeModal, openModal } = useModal();


    if (isOpen) {
        return (
            <ModalForm
                textBtn={textBtn}
                icon={Icon}
                title={title}
                form={Form}
                closeModal={closeModal}
            >
            </ModalForm>
        );
    }
    return (
        <>
            <button className='btn btn-dark' onClick={openModal}>
                {Icon || ''}{Icon && textBtn ? ' ' : ''}{textBtn || ''}
            </button>
        </>
    );
}


export default BtnModalForm;