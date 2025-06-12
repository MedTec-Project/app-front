import '../ModalNotification/ModalNotification.css';
import Notification from '../Notification/notification';
import React, { forwardRef } from 'react';

const ModalNotification = forwardRef(({ modalOpen }, ref) => {
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
                <Notification />
                <Notification />
                <Notification />
                <Notification />
            </div>
        </div>
    );
});

export default ModalNotification;
