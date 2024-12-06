import FormModal from "../FormModal/FormModal";

export default function MediceForm({show, handleClose}){
    return (
        <FormModal show={show} handleClose={handleClose}>
            <div>
                Corpo do modal
            </div>
        </FormModal>

    )
}