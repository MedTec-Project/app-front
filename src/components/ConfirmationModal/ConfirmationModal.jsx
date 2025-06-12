import './ConfirmationModal.css';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-confirmation-overlay">
            <div className="modal-confirmation-container">
                <button className="modal-confirmation-close" onClick={onClose}>×</button>
                <p className="modal-confirmation-text">{children}</p>
                <div className="modal-confirmation-buttons">
                    <button className="btn btn-danger" onClick={onConfirm}>Sim</button>
                    <button className="btn btn-outline" onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
}
