import '../ModalNotification/ModalNotification.css';
import Notification from '../Notification/notification';
import React, {forwardRef, useEffect} from 'react';

const ModalNotification = forwardRef(({ modalOpen }, ref) => {
    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:9001/ws/notification');

        socket.onmessage = (event) => {
            console.log(event.data);
            const data = JSON.parse(event.data);
            setMessages([...messages, data]);
        };

        return () => {
            socket.close();
        };
    }, [messages]);

    return (
        <div
            ref={ref}
            className='mod-notification'
            style={{
                display: modalOpen ? "block" : "none",
                position: "absolute",
                Top: "10%",
                right: "100px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "2px",
                zIndex: 1000,
                width: "100px",
                boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 12px"
            }}>
            <div className='menu-notification'>
                {messages.map((message, index) => (
                    <Notification key={index} notification={message} />
                ))}
            </div>
        </div>
    );
});

export default ModalNotification;
