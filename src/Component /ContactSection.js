import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ContactTile from "./ContactTile";
import SearchForm from "./SearchForm";
import axios from "axios";
import { generalContext } from "../GeneralContext";

const ContactSection = () => {
  const { contacts, setContacts } = useContext(generalContext);
  const [isloading, setisloading] = useState(true);
  const getConversations = () => {
    axios({
      method: "get",
      url: "http://localhost:35000/users",
      responseType: "json",
    }).then((data) => {
      setContacts(data.data);
      setisloading(false);
      console.log(data.data);
    });
  };

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div className="conversationsSection">
      <div className="search-form">
        <SearchForm />
      </div>
      <div className="recently-conversations">
        <div className="tilte">Contact Section</div>
        <div className="conversations">
          {isloading ? (
            <ContactTile />
          ) : (
            contacts.map((contact) => {
              return (
                <ContactTile
                  name={contact.name}
                  image={contact.profil}
                  _id={contact._id}
                  key={contact._id}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
