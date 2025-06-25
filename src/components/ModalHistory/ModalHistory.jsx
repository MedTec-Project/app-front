import {AiOutlineClose} from 'react-icons/ai';
import '../ModalHistory/ModalHistory.css';
import LabelHistory from '../LabelHistory/LabelHistory.jsx';
import {useEffect, useState} from "react";
import {getAllHistory} from "../../api/history.jsx";
import {toast} from "react-toastify";


export default function ModalHistory({modalOpen, handleClose}) {
    if (!modalOpen) return null;

    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        getAllHistory().then((response) => {
            setHistory(response);
            console.log(response);
        }).catch((error) => {
            toast.error('Erro ao buscar histórico');
        });
    };

    useEffect(() => {
        fetchHistory();
    }, []);
    return (
        <div className="mod-history">
            <div className='mod-tittle'>
                <div className='pos-tittle'>
                    <h2>Histórico</h2>
                </div>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose/>
                </button>
            </div>
            <div className='pos-hist'>
                <div className='cnt-hist'>
                    <LabelHistory rows={history} />
                </div>
            </div>
            <div className='footer'></div>
        </div>
    );
}
