import React, { useContext, useState } from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { generalContext } from "../GeneralContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { SetSingUpSelected } = useContext(generalContext);

  console.log(name);

  const addUser = () => {
    if (name === "" || password === "") {
      setError("vueillez remplir tous les champs");
      console.log(error);
    } else {
      console.log("success");

      axios({
        method: "post",
        url: "http://localhost:35000/signin",
        data: {
          name: `${name}`,
          password: ` ${password}`,
          profil: `https://ui-avatars.com/api/?name=${name}&background=random`,
        },
      }).then((data) => console.log(data));
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="form">
          <h2 className="title">Bisochat</h2>
          <span className="sub-title">Inscription</span>
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
            <button onClick={addUser}>{"S'inscrire"}</button>
            <span onClick={() => SetSingUpSelected()}>
              <NavLink>Se connecter </NavLink>
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

export default Signup;
