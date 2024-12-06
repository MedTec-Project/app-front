import { useState } from "react"
import MediceForm from "../../components/MediceForm/MediceForm"

export default function Medice(){
    const [abrirModal, setAbrirModal] = useState(false)
    return(
        <div>
        Medicamentos
        <button onClick={() => setAbrirModal(true)}>AAAA</button>
        <MediceForm show={abrirModal} handleClose={() => setAbrirModal(false)} />
        </div>
    )
}