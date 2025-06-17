import '../Notification/notification.css'
import { FaCircle } from "react-icons/fa";

export default function Notification({key, notification}) {
    const activated = false;

    return notification ? (
        <div className='notification' key={key}>
            <div className='pos-notification'>
                <FaCircle className='icon-notification' style={{color: activated ? "red" : "grey"}}/>
            </div>
            <div className='pos-txt'>
                <label style={{fontSize: "13px"}}>{ notification.timestamp }</label>
                <p style={{fontSize: "16px", marginTop: "2px"}}>{ notification.message }</p>
            </div>
        </div>
    ) : null;
}