import './SubmitButton.scss';

export default function SubmitButton({ label, onClick }) {
    return (
        <button type="submit" className="submit-button" onClick={onClick}>{label}</button>
    );
}