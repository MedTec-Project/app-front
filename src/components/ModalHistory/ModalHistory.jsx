import { AiOutlineClose } from 'react-icons/ai';
import '../ModalHistory/ModalHistory.css';
import LabelHistory from '../LabelHistory/LabelHistory.jsx';


export default function ModalHistory({ modalOpen, handleClose }) {
    if (!modalOpen) return null;

    return (
        <div className="mod-history">
            <div className='mod-tittle'>
                <div className='pos-tittle'>
                    <h2>Histórico</h2>
                </div>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose />
                </button>
            </div>
            <div className='pos-hist'>
                <div className='cnt-hist'>
                    <LabelHistory />
                </div>
            </div>
            <div className='footer'></div>
        </div>
    );
}
