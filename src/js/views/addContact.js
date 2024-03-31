import React, { useState } from "react";
import "../../styles/addContact.css";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const AddContact = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [warning, setWarning] = useState("");

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!contact.name.trim()) {
      setWarning("Name is required.");
      return;
    }

    if (!contact.email.trim() || !contact.email.includes("@")) {
      setWarning("Please provide a valid email address.");
      return;
    }

    try {
      // Create a new contact object based on form input
      const newContact = {
        name: contact.name,
        address: contact.address,
        phone: contact.phone,
        email: contact.email,
      };

      // Call the addContact action
      await actions.addContact(newContact);

      // Redirect to the home page
      navigate("/");

      // rerender home page to show new contacts
      await actions.getContactList();
    } catch (error) {
      console.error("Error adding contact:", error.message);
      // Handle the error gracefully
    }
  };

  return (
    <div className="container">
      <h1 className="formTitle">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name and Surname</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name and Surname"
            value={contact.name}
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
        {warning && <div className="alert alert-warning">{warning}</div>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
