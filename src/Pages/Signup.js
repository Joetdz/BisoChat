import React, { useContext, useState } from "react";
import Illustration from "../Component /Illustration";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { generalContext } from "../GeneralContext";
import { MdAddAPhoto } from "react-icons/md";
import Avatar from "../Component /Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderLogin from "../Component /LoaderLogin";
import { accountService } from "../Services/Account.Services";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { SetSingUpSelected, setLogIn, setCurrentUserId } =
    useContext(generalContext);
  const [previewProfil, setPreviewProfil] = useState([]);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notify = (message) => toast(message);

  const handleImageChange = (e) => {
    setPreviewProfil(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const addUser = () => {
    if (name === "" || password === "") {
      notify("vueillez remplir tous les champs");
      console.log("successv");
    } else if (previewProfil.length === 0) {
      notify("Vueillez ajouter une photo de profil");
    } else {
      setIsLoading(true);
      console.log("success");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "pw405zry");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dvewnctgf/image/upload",
          formData
        )
        .then((imageSaved) => {
          console.log(imageSaved.data.url);

          axios({
            method: "post",
            url: ` ${process.env.REACT_APP_BASE_URL}/user/signin`,
            data: {
              name: `${name}`,
              password: `${password}`,
              profil: imageSaved.data.url,
            },
          })
            .then((data) => {
              console.log(data);
              setIsLoading(false);
              setCurrentUserId(data.data.userId);
              accountService.saveToken(data.data.token, data.data.userId);
              notify("Vous êtes connecter avec succès!");
              setTimeout(() => {
                setLogIn(true);
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          notify("Une erreur est survenue lors de l'ajout de l'image");
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="form">
          <h2 className="title">Bisochat</h2>
          <span className="sub-title">Inscription</span>
          <label htmlFor="file" className="file-upload">
            <div className="fileUploadButton">
              {previewProfil.length !== 0 ? (
                <Avatar url={previewProfil} />
              ) : (
                <Avatar url="avatarProfil.png" />
              )}
              <MdAddAPhoto />
              Profil
            </div>
          </label>
          <input
            accept="image/*"
            id="file"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
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
            <button onClick={addUser}>
              {isLoading ? <LoaderLogin /> : "S'inscrire"}
            </button>
            <ToastContainer />
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
