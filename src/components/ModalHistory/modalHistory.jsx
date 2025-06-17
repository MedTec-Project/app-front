import { AiOutlineClose } from 'react-icons/ai';
import '../ModalHistory/ModalHistory.css';
import Historico from '../../assets/images/Historico.png';


export default function ModalHistory({ modalOpen, handleClose }) {
  if (!modalOpen) return null;

  return (
    <div className="mod-history">
        <div className='mod-tittle'>
            <button className="close-btn" onClick={handleClose}>
                <AiOutlineClose />
            </button>
        </div>
        <div className='pos-tittle'>
            <img className='hist-icon' src={Historico} /><h2 style={{fontWeight: "100"}}>Histórico</h2>
        </div>
        <div className='pos-hist'>
            <div className='cnt-hist'>
                <a>sad</a>
            </div>
        </div>
    </div>
  );
}
