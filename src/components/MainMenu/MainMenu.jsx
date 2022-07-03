import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import ButtonAction from "../UI/Button/ButtonAction/ButtonAction";

export default function MainMenu() {
  const { currentState, updateGlobalState } = useContext(GlobalContext);

  const history = useHistory();

  const handleRadioSelect = async (e) => {
    if (e.target.value) {
      await updateGlobalState({
        nextPage: `/${e.target.value}`,
        previousPage: `${history.location.pathname}`,
      });
    }
  };

  const handleNextPage = () => {
    if (currentState.nextPage !== "") {
      history.push(currentState.nextPage);
      return;
    }

    alert("Seleccione una opción");
  };

  useEffect(() => {
    async function fetchData() {
      updateGlobalState({
        nextPage: "",
        previousPage: "",
      });

      window.onpopstate = function (e) {
        history.push("/menu");
      };
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="menu-container">
      <div className="title-container">
        <h2 className="menu-title">menu principal</h2>
      </div>
      <div className="option-container">
        <p className="option-title">Opciones</p>
        <div className="option-body" onClick={(e) => handleRadioSelect(e)}>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-1"
              value="createbarcode"
              required={true}
            ></input>
            <label htmlFor="option-1">Crear códigos de barras</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-2"
              value="menureadbarcode"
              required={true}
            ></input>
            <label htmlFor="option-1">Leer códigos de barras</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="scannedbarcode"
              required={true}
            ></input>
            <label htmlFor="option-1">imprimir etiquetas</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="viewreg"
              required={true}
            ></input>
            <label htmlFor="option-1">Ver Registros</label>
          </div>
        </div>
      </div>
      <ButtonAction
        onClick={() => {
          handleNextPage();
        }}
        buttonText="Siguiente"
      />
    </div>
  );
}
