import React from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { generalContext } from "../GeneralContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setLogIn } = useContext(generalContext);
  const { SetSingUpSelected } = useContext(generalContext);

  const submit = () => {
    const notify = (message) => toast(message);
    if (name === "" || password === "") {
      notify("Vueillez remplir tous les champs");
    } else {
      axios.post();
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="form">
          <h2 className="title">{"Bisochat"}</h2>
          <span className="sub-title">{"Connexion"}</span>
          <input
            type="text"
            placeholder="Nom"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de pass"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-group">
            <button onClick={submit}> se connecter</button>
            <ToastContainer />
            <span onClick={() => SetSingUpSelected(true)}>
              <NavLink>{"S'inscrire "}</NavLink>
            </span>
          </div>
        </div>
      </div>
      <div className="ilustartion-section">
        <Illustration image="illustration.svg" />
      </div>
    </div>
  );
};

export default Login;
