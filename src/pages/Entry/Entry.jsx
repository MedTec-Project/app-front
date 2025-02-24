import React, { useState } from "react";
import "./styles.css";
import paciente from "../../assets/images/paciente.png"
import cuidador from "../../assets/images/cuidador.png"

export default function Entry() {
  return (
    <div className="entry-screen">
      <div className="entry-text">
      <h2>Você é</h2>
      </div>
      <div className="entry-screen-card">
        <div className="card-option-paciente">
          <h1>Paciente</h1>
          <div className="img-option-paciente">
            <img src={cuidador}/>
          </div>
        </div>

        <div className="card-option-paciente">
          <h1>Cuidador</h1>
          <div className="img-option-paciente">
            <img src={paciente}/>
            </div>
        </div>
      </div>
    </div>

  );
}
