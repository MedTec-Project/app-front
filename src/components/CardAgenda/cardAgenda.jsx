import { FaCircleCheck } from "react-icons/fa6";
import "./styles.css";
import {useEffect, useMemo} from "react";

export default function CardAgenda({ id, schedule, toggle, isAnimating, onClick }) {

    const dataFormatada = useMemo(() => {
        if (!schedule?.scheduleDate) return "";

        const isoString = schedule.scheduleDate.replace("[UTC]", "");
        const data = new Date(isoString);

        const formattedDate = data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        return formattedDate.replace(",",  " - ");
    }, [schedule]);

  return schedule ? (
      <div className={`card-scheduling ${schedule.taken ? "inactive-card" : ""} ${isAnimating ? "card-animating" : ""}`} onClick={onClick}>
          <div className="horario">
              {dataFormatada  + "h"}
          </div>
          <div className="remedio">
              <img src={`data:image/png;base64,${schedule.imageBase64}`} className="remed-img" alt="Imagem do remédio"/>
          </div>
          <div className="texto">
              <div className="txt-titulo">
                  <a style={{color: "#364b41", fontWeight: "bolder", fontSize: "20px"}}>
                      {schedule.name}
                  </a>
                  <a style={{color: "#385e4c", fontSize: "20px", fontWeight: "normal"}}>
                      {" (" + schedule.dosage + (schedule.dosageType != null ? schedule.dosageType.toLowerCase() : null) + ")"}
                  </a>
              </div>
              <h2 style={{fontSize: "20px", color: "#5F967C"}}>Cimed</h2>
          </div>

          <div className="switch-container">
              <div className={`switch ${schedule.taken ? "on" : "off"}`} onClick={toggle}
                   style={{
                       width: "230px",
                       height: "44px",
                       borderStyle: "solid",
                       borderWidth: schedule.taken ? "0px" : "2px",
                       borderColor: schedule.taken ? "#fff" : "#48735F",
                       backgroundColor: schedule.taken ? "#48735F" : "#FAFAFA",
                       borderRadius: "30px",
                       position: "relative",
                       cursor: "pointer",
                       userSelect: "none",
                   }}>
          <span className="txt" style={{
              color: schedule.taken ? "#fcfcfc" : "#48735F",
              padding: "20px",
              marginLeft: schedule.taken ? "-20px" : "20px",
              fontWeight: "800",
              fontSize: "11px",
              zIndex: schedule.taken ? "-10" : "100"
          }}>
            CLIQUE PARA CONFIRMAR
          </span>

                  <FaCircleCheck className={`slider ${schedule.taken ? "slider-on" : "slider-off"}`}
                                 style={{
                                     width: "36px",
                                     height: "36px",
                                     borderRadius: schedule.taken ? "30px" : "50%",
                                     color: schedule.taken ? "#FAFAFA" : "#48735F",
                                     backgroundColor: schedule.taken ? "#48735F" : "#FAFAFA",
                                     top: schedule.taken ? "4px" : "2px",
                                     left: schedule.taken ? "160px" : "2px",
                                     transition: "transform 0.10s ease",
                                 }}/>
              </div>
          </div>
      </div>
  ) : null;
}
