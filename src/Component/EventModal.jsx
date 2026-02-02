export default function EventModal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                {/* <button className="modal-close" onClick={onClose}>✕</button> */}
                {children}
                <button className="modal-close-btn" onClick={onClose}>ปิด</button>
            </div>
        </div>
    );
}
