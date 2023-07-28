import React,{useState} from "react";
import './modal.css';


const Modal =({onDelete,onCancel,data,commentId})=>{
    const [showModal, setShowModal] = useState(true);

    const handleDelete = () => {
        onDelete(commentId);
        setShowModal(false);
    };

    const handleCancel = () => {
        onCancel();
        setShowModal(false);
    };

    return showModal ? (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{data.content}</h3>
                <div className="modal-buttons">
                    <button onClick={handleCancel}>{data.button1}</button>
                    <button onClick={handleDelete}>{data.button2}</button>
                </div>
            </div>
        </div>
    ) : null;
}
export default Modal;