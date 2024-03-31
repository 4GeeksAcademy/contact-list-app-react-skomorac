import React, { useState } from "react";
import "../../styles/modal.css";

const EditContactModal = ({ contact, onSave, onClose }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleInputChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedContact);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Contact</h2>
        <div className="input-container">
          <label className="label" htmlFor="name">
            Name and Surname
          </label>
          <input
            className="input-field"
            type="text"
            id="name"
            value={editedContact.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="address">
            Address
          </label>
          <input
            className="input-field"
            type="text"
            id="address"
            value={editedContact.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="phone">
            Phone number
          </label>
          <input
            className="input-field"
            type="text"
            id="phone"
            value={editedContact.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            type="email"
            id="email"
            value={editedContact.email}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditContactModal;
