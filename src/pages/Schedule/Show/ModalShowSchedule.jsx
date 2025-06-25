import ModalShow from "../../../components/ModalShow/ModalMedication.jsx";
import CalendarScheduling from "../../../components/CalendarScheduling/calendarScheduling.jsx";
import "./ModalShowSchedule.css";

export default function ModalShowSchedule({
                                              isOpen,
                                              handleClose,
                                              handleClean,
                                              handleSubmit,
                                              schedule,
                                              allCards
                                          }) {

    const imageBase64 = schedule?.imageBase64 ?? allCards?.find(c => c.oidSchedule === schedule?.oid || c.oid === schedule?.oid)?.imageBase64;

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
            content={
                <>
                    <div className='img-medice'>
                        <img src={`data:image/png;base64,${imageBase64}`} className="remed-img-modal"
                             alt="Imagem do remédio"/>
                    </div>
                    <div className='calendar'>
                        <div className='pos-calendar'>
                            <CalendarScheduling initialDate={schedule.initialDate} finalDate={schedule.finalDate}/>
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
                                        backgroundColor: "yellow",
                                        borderRadius: "5px"
                                    }}/>
                                    <a style={{marginLeft: "5px"}}>Não consumido</a>
                                </div>
                                <div className='combination'>
                                    <div style={{
                                        height: "8px",
                                        width: "8px",
                                        backgroundColor: "#149D4B",
                                        borderRadius: "5px"
                                    }}/>
                                    <a style={{marginLeft: "5px"}}>Consumido</a>
                                </div>
                            </div>
                            <div>
                                <div className='combination'>
                                    <div style={{
                                        height: "8px",
                                        width: "8px",
                                        backgroundColor: "#91D7B5",
                                        borderRadius: "5px"
                                    }}/>
                                    <a style={{marginLeft: "5px"}}>Aguardando consumo</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        >
            <button className='item-button'>Quantidade: {schedule.quantity}</button>
            <button className='item-button'>Médico Responsável: Usuário teste</button>
            <button className='item-button'>Data de Inicio: {schedule.initialDate}</button>
            <button className='item-button'>Data Final: {schedule.finalDate}</button>
            <button className='item-button'>Lembrete: {schedule.reminder}</button>
        </ModalShow>
    ) : null;
}
