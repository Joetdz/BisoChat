import React from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { generalContext } from "../GeneralContext";
import LoaderLogin from "../Component /LoaderLogin";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { currentUserId, setCurrentUserId } = useContext(generalContext);
  const { setLogIn } = useContext(generalContext);
  const { SetSingUpSelected } = useContext(generalContext);
  const [isLoading, setIsloading] = useState(false);
  const { setCurrentToken } = useContext(generalContext);
  console.log(process.env.REACT_APP_BASE_URL);

  const submit = () => {
    setIsloading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/user/login`,
      data: {
        name: `${name}`,
        password: ` ${password}`,
        profil: `https://ui-avatars. /api/?name=${name}&background=random `,
      },
    })
      .then((data) => {
        setToken(data.data.token);
        setCurrentUserId(data.data.userId);
        setIsloading(false);
        console.log(data.data.userId);
      })

      .catch((error) =>
        console.log("message", error.response.status, error.response.data)
      );
  };

  useEffect(() => {
    console.log();
    let userConnectedLocalStorage =
      window.localStorage.getItem("userconnectedId");
    if (token) {
      setCurrentToken(token);
      window.localStorage.setItem("token", token);
      setCurrentToken(tokenLocalstorage);
      window.localStorage.setItem("userconnectedId", currentUserId);
      setLogIn(true);
    }
    if (tokenLocalstorage) {
      setLogIn(true);
      setCurrentToken(tokenLocalstorage);
    }
    if (userConnectedLocalStorage) setCurrentUserId(userConnectedLocalStorage);
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <LoaderLogin />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Login;
