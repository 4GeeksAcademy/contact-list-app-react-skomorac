const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // Your existing store data
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
        {
          title: "THIRD",
          background: "white",
          initial: "white",
        },
      ],
      contacts: [], // Initialize an empty array for contacts
    },
    actions: {
      addContactToList: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: "Admir Skomorac",
                email: "skomi@gmail.com",
                agenda_slug: "Skomorac_agenda",
                address: "47568 NW 34ST, 33434 FL, USA",
                phone: "+38706012345678",
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              "Failed to retrieve contact list: " + response.statusText
            );
          }

          const data = await response.json();
          setStore({ contacts: data }); // Update store with fetched contacts
        } catch (error) {
          console.error("Error retrieving contact list:", error.message);
          throw new Error("Error retrieving contact list: " + error.message);
        }
      },

      getContactList: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/agenda/Skomorac_agenda",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "Failed to retrieve contact list: " + response.statusText
            );
          }

          const data = await response.json();
          setStore({ contacts: data }); // Update store with fetched contacts
        } catch (error) {
          console.error("Error retrieving contact list:", error.message);
          throw new Error("Error retrieving contact list: " + error.message);
        }
      },

      addContact: async (newContact) => {
        try {
          newContact.agenda_slug = "Skomorac_agenda";

          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newContact),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to add contact: " + response.statusText);
          }
          await actions.getContactList();
        } catch (error) {
          console.error("Error adding contact:", error.message);
          throw new Error("Error adding contact: " + error.message);
        }
      },

      deleteContact: async (contactId) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/apis/fake/contact/${contactId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete contact: " + response.statusText);
          }

          // Get the current store
          const store = getStore();

          // Update the contacts array by filtering out the deleted contact
          const updatedContacts = store.contacts.filter(
            (contact) => contact.id !== contactId
          );

          // Set the updated contacts array in the store
          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.error("Error deleting contact:", error.message);
          throw new Error("Error deleting contact: " + error.message);
        }
      },
    },
  };
};

export default getState;
