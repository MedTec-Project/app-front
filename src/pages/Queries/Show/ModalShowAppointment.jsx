import ModalShow from "../../../components/ModalShow/ModalMedication.jsx";
import CalendarScheduling from "../../../components/CalendarScheduling/calendarScheduling.jsx";
import CalendarAppointment from "../../../components/CalendarAppointment/CalendarAppointment.jsx";

export default function ModalShowAppointment({
                                                 isOpen,
                                                 handleClose,
                                                 handleClean,
                                                 handleSubmit,
                                                 appointment,
                                                 allCards
                                             }) {

    const imageBase64 = appointment?.imageBase64 ?? allCards?.find(c => c.oidSchedule === appointment?.oid || c.oid === appointment?.oid)?.imageBase64;


    return appointment ? (
        <ModalShow
            isOpen={isOpen}
            handleClose={handleClose}
            handleClean={() => handleClean(appointment.oid)}
            labelSubmit={"Editar"}
            labelCancel={"Excluir"}
            handleSubmit={() => handleSubmit(appointment.oid)}
            title={"Consulta Agendada"}
            content={
                <>
                    <div className='img-medice'>
                        <img src={`data:image/png;base64,${imageBase64}`} className="remed-img-modal"
                             alt="Imagem do remédio"/>
                    </div>
                    <div className='calendar'>
                        <div className='pos-calendar'>
                            <CalendarAppointment />
                            <div className='pos-infos'>
                                <div className='combination'>
                                    <div style={{
                                        height: "8px",
                                        width: "8px",
                                        backgroundColor: "#3d6aff",
                                        borderRadius: "5px"
                                    }}/>
                                    <a style={{marginLeft: "5px"}}>Dia Atual</a>
                                </div>
                                <div className='combination'>
                                    <div style={{
                                        height: "8px",
                                        width: "8px",
                                        backgroundColor: "#149D4B",
                                        borderRadius: "5px"
                                    }}/>
                                    <a style={{marginLeft: "5px"}}>Dia Consulta</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        >
            <button className='item-button'>Médico: {appointment.nameDoctor}</button>
            <button
                className='item-button'>Data: {appointment.scheduleDate ? appointment.scheduleDate.slice(0, 10) : ""}</button>
            <button className='item-button'>Lembrete: {appointment.reminder}</button>
            <button
                className='item-button'>Horário: {appointment.scheduleDate ? appointment.scheduleDate.slice(11, 16) : ""}</button>
        </ModalShow>
    ) : null;
}
