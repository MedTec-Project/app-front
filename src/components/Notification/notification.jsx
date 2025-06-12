import '../Notification/notification.css'
import { FaCircle } from "react-icons/fa";

export default function Notification() {
    const activated = false;

    return(
        <div className='notification'>
            <div className='pos-notification'>
                <FaCircle className='icon-notification' style={{color: activated ? "red" : "grey"}}/>
            </div>
            <div className='pos-txt'>
                <label style={{fontSize: "13px"}}>16/05 - 19:23</label>
                <p style={{fontSize: "16px", marginTop: "2px"}}>Paracetamol está quase à vencer.</p>
            </div>
        </div>
    )
} 