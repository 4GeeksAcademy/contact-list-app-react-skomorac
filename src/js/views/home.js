import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
  };

  return (
    <div className="text-center mt-5">
      <Link to="/addContact" className="addContactBtn">
        <div className="d-grid d-sm-flex justify-content-sm-end mb-3">
          <button className="btn btn-success me-sm-2" type="button">
            Add new contact
          </button>
        </div>
      </Link>
      <div>
        {store.contacts.map((contact) => (
          <div key={contact.id} className="contact">
            <img
              src={`https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=`}
              alt="Contact"
            />
            <div className="contact-info">
              <h3>{contact.full_name}</h3>
              <p>
                <i className="fas fa-map-marker-alt"></i> Address:{" "}
                {contact.address}
              </p>
              <p>
                <i className="fas fa-phone"></i> Phone: {contact.phone}
              </p>
              <p>
                <i className="fas fa-envelope"></i> Email: {contact.email}
              </p>
            </div>
            <div className="contact-actions">
              <button>
                <i className="fas fa-pen"></i>
              </button>
              <button onClick={() => handleDeleteContact(contact.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
