import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import "../../globalStyles/globalStyles.css";

import { GlobalContext } from "../../Context/GlobalContext";
import { useHistory } from "react-router";
import InputText from "../UI/Input/InputText/InputText";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";
import { postApiSheetData } from "../../menuData/GasApi";

const Login = () => {
  const history = useHistory();
  const { currentState, setGlobalState, inputChange } =
    useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let filterUser = currentState.usuarios.filter((item) => {
      return item.usuario === `${currentState.user}`;
    });

    if (filterUser.length === 0) {
      alert("Usuario incorrecto");
      return;
    }

    let filterPw = currentState.usuarios.filter((item) => {
      return item.clave === `${currentState.pw}`;
    });

    if (filterPw.length === 0) {
      alert("Contraseña incorrecta");
      return;
    }

    e.target.btnIngresar.disabled = true;

    await setGlobalState("login", true);

    history.replace("/menu");

    alert(`Bienvenido ${filterUser[0].usuario}`);
  };

  useEffect(() => {
    async function fetchData() {
      if (currentState.login) {
        history.replace("/menu");
        return;
      }

      const usuarios = await postApiSheetData({
        sheetUrl:
          "https://docs.google.com/spreadsheets/d/13vRrKnkPdIOv3vnZEr8LUUNQFw970rqGJ_sUOixsEgU/edit#gid=0",
        sheetName: "usuarios",
        action: "getApiSheetAllData",
      });

      await setGlobalState("usuarios", usuarios);

      window.onpopstate = function (e) {
        history.replace("/menu");
        return;
      };
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
          <ButtonSubmit buttonText="Ingresar" name="btnIngresar"  />
          <NavLink exact to="/register" className="global-msg">
            Registrarse
          </NavLink>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
