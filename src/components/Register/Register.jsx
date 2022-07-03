import React, { useContext } from "react";
import "./Register.css";
import { GlobalContext } from "../../Context/GlobalContext";
import { useHistory } from "react-router";
import InputText from "../UI/Input/InputText/InputText";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";
import { postApiSheetData } from "../../menuData/GasApi";

const Register = () => {
  let history = useHistory();

  const { currentState, inputChange } = useContext(GlobalContext);

  function validatePassword(pwd) {
    let letter = /[a-zA-Z]/;
    let number = /[0-9]/;
    let valid = number.test(pwd) && letter.test(pwd);
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let filterUser = currentState.usuarios.filter((item) => {
      return item.usuario === `${currentState.user}`;
    });

    if (filterUser.length > 0) {
      alert("Ya existe un usuario con ese nombre");
      return;
    }

    if (!validatePassword(currentState.pw)) {
      alert("La contraseña debe incluir números y letras");
      return;
    }

    let data = {
      usuario: `${currentState.user}`,
      clave: `${currentState.pw}`,
    };

    const userRegister = await postApiSheetData({
      sheetUrl:
        "https://docs.google.com/spreadsheets/d/13vRrKnkPdIOv3vnZEr8LUUNQFw970rqGJ_sUOixsEgU/edit#gid=0",
      sheetName: "usuarios",
      action: "appendRowOnlyValues",
      jsonData: { ...data },
    });

    console.log("datos retornados API", userRegister);

    if (userRegister.status === 200) {
      history.push("/");
      alert("Registrado exitosamente");
      return;
    }

    alert("Los datos no se guardaron, intentelo nuevamente");
    return;
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
