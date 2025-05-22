import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import "./styles.css"; 
import Fosenra from "../../assets/images/Fosenra.png";

export default function CardAgenda() {
  const [isOn, setIsOn] = useState(false);


  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="card">
      <div className="horario">
        <a>20/02/2024 - 09:00H</a>
      </div>
      <div className="remedio">
        <div>
          <img src={Fosenra} className="remed-img" alt="Imagem do remédio" />
        </div>
      </div>  
      <div className="texto">
        <div className="txt-titulo">
          <a style={{ color: "#364b41", fontWeight: "bolder", fontSize: "20px" }}>
            PARACETAMOL
          </a>
          <a style={{ color: "#385e4c", fontSize: "20px", fontWeight: "normal" }}>
            {" "} (20mg)
          </a>
        </div>
        <h2 style={{ fontSize: "20px", color: "#5F967C" }}>Cimed</h2>
      </div>

      <div className="switch-container">
        <div className={`switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}
          style={{
            width: isOn ? "210px" : "210px",
            height: "44px",
            borderStyle: "solid",
            borderWidth: isOn ? "0px" : "2px",
            borderColor: isOn ? "#fff" : "#48735F",
            backgroundColor: isOn ? "#48735F" : "#FAFAFA",
            borderRadius: "30px",
            position: "relative",
            cursor: "pointer",
            userSelect: "none",
          }}>
        <span className="txt" style={{color: isOn ? "#fcfcfc" : "#48735F", padding: "20px", marginLeft: isOn ? "-20px" : "20px", fontWeight: "800", fontSize: "11px", zIndex: isOn ? "-10" : "1"}}>CLIQUE PARA CONFIRMAR</span>
          
          <FaCircleCheck className={`slider ${isOn ? "slider-on" : "slider-off"}`}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: isOn ? "30px" : "50%",
              color: isOn ? "#FAFAFA" : "#48735F",
              backgroundColor: isOn ? "#48735F" : "#FAFAFA",
              top: isOn ? "4px" : "1.5px" ,
              left: isOn ? "140px" : "2px",
              transition: "transform 0.10s ease",
            }} />
            
        </div>
      </div>
    </div>
  );
}

/*width: "36px",
              height: "36px",
              borderRadius: "50%",
              color: isOn ? "#FAFAFA" : "#48735F",
              backgroundColor: isOn ? "#48735F" : "#FAFAFA",
              top: isOn ? "4px" : "1.5px" ,
              left: isOn ? "-26px" : "2px",
              transition: "transform 0.10s ease",*/