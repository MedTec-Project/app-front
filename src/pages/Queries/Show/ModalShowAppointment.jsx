import ModalShow from "../../../components/ModalShow/ModalMedication.jsx";

export default function ModalShowAppointment({
                                              isOpen,
                                              handleClose,
                                              handleClean,
                                              handleSubmit,
                                              appointment,
                                          }) {

    return appointment ? (
        <ModalShow
            isOpen={isOpen}
            handleClose={handleClose}
            handleClean={() => handleClean(appointment.oid)}
            labelSubmit={"Editar"}
            labelCancel={"Excluir"}
            handleSubmit={() => handleSubmit(appointment.oid)}
            title={"Consulta Agendada"}
        >
            <button className='item-button'>Médico: {appointment.nameDoctor}</button>
            <button className='item-button'>Data: {appointment.scheduleDate ? appointment.scheduleDate.slice(0, 10) : ""}</button>
            <button className='item-button'>Lembrete: {appointment.reminder}</button>
            <button className='item-button'>Horário: {appointment.scheduleDate ? appointment.scheduleDate.slice(11, 16) : ""}</button>
        </ModalShow>
    ) : null;
}
