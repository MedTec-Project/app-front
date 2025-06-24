import ModalShow from "../../../components/ModalShow/ModalMedication.jsx";

export default function ModalShowSchedule({
                                              isOpen,
                                              handleClose,
                                              handleClean,
                                              handleSubmit,
                                              schedule,
                                          }) {

    return schedule ? (
        <ModalShow
            isOpen={isOpen}
            handleClose={handleClose}
            handleClean={() => handleClean(schedule.oidSchedule)}
            labelSubmit={"Editar"}
            labelCancel={"Excluir"}
            handleSubmit={() => handleSubmit(schedule.oid)}
            sub={schedule.nameMedicine + " (" + schedule.dosageMedicine + schedule.dosageTypeNameMedicine + ")"}
            title={"Medicamento Agendado"}
        >
            <button className='item-button'>Quantidade: {schedule.quantity}</button>
            <button className='item-button'>Médico Responsável: Usuário teste</button>
            <button className='item-button'>Data de Inicio: {schedule.initialDate}</button>
            <button className='item-button'>Data Final: {schedule.finalDate}</button>
            <button className='item-button'>Lembrete: {schedule.reminder}</button>
        </ModalShow>
    ) : null;
}
