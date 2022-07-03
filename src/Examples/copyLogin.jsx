import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import "../../globalStyles/globalStyles.css";

import { auth } from "../../Config/firebase/firebaseConfig";
import { GlobalContext } from "../../Context/GlobalContext";
import { useHistory } from "react-router";
import InputText from "../UI/Input/InputText/InputText";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";

const Login = () => {
  const history = useHistory();
  const { currentState, inputChange, userLogin } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        currentState.user,
        currentState.pw
      );
      console.log("ingresó el usuario:", userCredential);
      history.replace("/menu");
      userLogin();
      alert(`Bienvenido ${userCredential.user.email}`);
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          return alert("la contraseña debe tener al menos 6 caractéres");
        case "auth/email-already-in-use":
          return alert("el usuario ya existe");
        default:
          console.log(error.message);
          return alert("Usuario o Contraseña no validos");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (currentState.user !== "") {
        history.replace("/menu");
        return
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="global-section">
      <form className="global-form" onSubmit={handleSubmit}>
        <fieldset className="global-fieldset">
          <InputText
            required={true}
            type="text"
            name="user"
            labelText="Usuario"
            onChange={(e) => inputChange(e)}
          />
          <InputText
            required={true}
            type="password"
            name="pw"
            labelText="Contraseña"
            onChange={(e) => inputChange(e)}
          />
          <ButtonSubmit buttonText="Ingresar" />
          <NavLink exact to="/register" className="global-msg">
            Registrarse
          </NavLink>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
