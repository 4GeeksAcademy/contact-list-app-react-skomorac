import React, { useState } from "react";
import "../../styles/addContact.css";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const AddContact = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [contact, setContact] = useState({
    full_name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
      await actions.addContact(contact);
      // Optionally, you can redirect the user to another page after adding the contact
    } catch (error) {
      console.error("Error adding contact:", error.message);
      // Handle error
    }
  };

  return (
    <div className="container">
      <h1 className="formTitle">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Name and Surname</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            placeholder="Enter Name and Surname"
            value={contact.full_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            value={contact.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={contact.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
