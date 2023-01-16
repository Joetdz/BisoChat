import React from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { generalContext } from "../GeneralContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountService } from "../Services/Account.Services";
import LoaderLogin from "../Component /LoaderLogin";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setLogIn } = useContext(generalContext);
  const { SetSingUpSelected, setCurrentUserId } = useContext(generalContext);
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true);
    const notify = (message) => toast(message);
    if (name === "" || password === "") {
      setIsLoading(false);
      notify("Vueillez remplir tous les champs");
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/user/login`,
        data: {
          name: name,
          password: password,
        },
      })
        .then((data) => {
          setIsLoading(false);
          setCurrentUserId(data.data.userId);
          accountService.saveToken(data.data.token, data.data.userId);
          notify("Vous êtes connecter avec succès!");
          setTimeout(() => {
            setLogIn(true);
          }, 2000);
          console.log(data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          notify(
            err.message == "Network Error"
              ? "Impossible de contacter le serveur"
              : err.response.data
          );
        });
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
            <button onClick={submit}>
              {isLoading ? <LoaderLogin /> : "Se connecter"}
            </button>
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
