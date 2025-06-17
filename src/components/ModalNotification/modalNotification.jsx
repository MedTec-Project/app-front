import '../ModalNotification/ModalNotification.css';
import Notification from '../Notification/notification';
import React, { forwardRef, useEffect, useState } from 'react';

const ModalNotification = forwardRef(({ modalOpen }, ref) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5173/ws/notification");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleClickNotification = (notification) => {
        messages.forEach((message) => {
            if (message.id === notification.id) {
                message.new = !message.new;
            }
        });
        setMessages([...messages]);
    }

    return (
        <div
            ref={ref}
            className='mod-notification'
            style={{
                display: modalOpen ? "block" : "none",
                position: "absolute",
                top: "10%", // ✅ corrigido
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
                    <Notification key={index} notification={message} handleClickNotification={handleClickNotification}/>
                ))}
            </div>
        </div>
    );
});

export default ModalNotification;
