import React, { useContext } from "react";
import "./Register.css";
import { auth } from "../../Config/firebase/firebaseConfig";
import { GlobalContext } from "../../Context/GlobalContext";
import { useHistory } from "react-router";
import InputText from "../UI/Input/InputText/InputText";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";

const Register = () => {
  let history = useHistory();

  const { currentState, inputChange } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        currentState.user,
        currentState.pw
      );

      console.log("nuevo usuario registrado:", newUser);

      history.push("/");

      alert("Registrado exitosamente");
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
        <ButtonSubmit buttonText="Registrarse" />
        <span className="global-msg">
          {" "}
          {currentState.register === true && "Registrado"}
        </span>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
