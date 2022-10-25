import React from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { generalContext } from "../GeneralContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { setCurrentUserId } = useContext(generalContext);
  const { setLogIn } = useContext(generalContext);
  const { SetSingUpSelected } = useContext(generalContext);
  console.log(token);
  const submit = () => {
    axios({
      method: "post",
      url: "http://localhost:35000/login",
      data: {
        name: `${name}`,
        password: ` ${password}`,
        profil: `https://ui-avatars.com/api/?name=${name}&background=random `,
      },
    })
      .then((data) => {
        setToken(data.data.token);
        setCurrentUserId(data.data.userId);
        console.log(data.data.userId);
      })

      .catch((error) =>
        console.log(error.response.status, error.response.data)
      );
  };

  useEffect(() => {
    let tokenLocalstorage = window.localStorage.getItem("token");
    if (token) {
      window.localStorage.setItem("token", token);
      setLogIn(true);
    }
    if (tokenLocalstorage) setLogIn(true);
  });

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
