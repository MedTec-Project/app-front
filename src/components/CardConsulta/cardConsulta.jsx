import '../CardConsulta/cardConsulta.css';
import image from '../../assets/images/doctor.png';

export default function CardConsulta() {
    return(
        <div className='card-main'>
            <div style={{margin: "40px"}}>
                <div className='pos-foto'>
                    <div className='foto'>
                        <img src={image} alt="Foto de perfil" className="foto-perfil" />
                    </div>
                </div>
                <div className='tittle'>
                    <label>Médico: Maicon Douglas</label>
                </div>
                <div className='pos-information'>
                    <h4 style={{textAlign: "center",paddingBottom: "10px", fontWeight: "100"}}>INFORMAÇÕES</h4>
                    <label>Horário: 15:00h</label><br />
                    <label>Data: 12/12/2024</label>
                </div>
            </div>
        </div>
    )
}