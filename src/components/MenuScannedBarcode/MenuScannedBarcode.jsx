import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import ButtonAction from "../UI/Button/ButtonAction/ButtonAction";

export default function MenuScannedBarcode() {
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
      history.push("/scannedbarcode");
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
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="global-Section">
      <div className="global-form">
        <div className="menu-container">
          <div className="title-container">
            <h2 className="menu-title">Etiquetas leidas</h2>
          </div>
          <div className="option-container">
            <p className="option-title">Opciones</p>
            <div className="option-body" onClick={(e) => handleRadioSelect(e)}>
              <div className="option-radio">
                <input
                  type="radio"
                  name="nextPage"
                  id="option-1"
                  value="materiaprima"
                  required={true}
                ></input>
                <label htmlFor="option-1">Materia Prima</label>
              </div>
              <div className="option-radio">
                <input
                  type="radio"
                  name="nextPage"
                  id="option-2"
                  value="enproceso"
                  required={true}
                ></input>
                <label htmlFor="option-1">Producto en Proceso</label>
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
      </div>
    </div>
  );
}
