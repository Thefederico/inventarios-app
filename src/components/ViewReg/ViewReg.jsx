import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import ButtonAction from "../UI/Button/ButtonAction/ButtonAction";

export default function ViewReg() {
  const { currentState, updateGlobalState } = useContext(GlobalContext);

  const history = useHistory();

  const handleRadioSelect = async (e) => {
    if (e.target.value) {
      await updateGlobalState({
        nextPage: `${e.target.value}`,
        previousPage: `${history.location.pathname}`,
      });
    }
  };

  const handleNextPage = () => {
    switch (currentState.nextPage) {
      case "leidos-materiaprima":
        window.open(
          "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=1259555060",
          "_blank"
        );
        break;
      case "leidos-enproceso":
        window.open(
          "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=0",
          "_blank"
        );
        break;
      case "etiquetas-materiaprima":
        window.open(
          "https://docs.google.com/spreadsheets/d/1oQKTkMhe3VgiW4j5PUAIRDSd9tpK2ynJXLbF97r6ZPE/edit#gid=237460667",
          "_blank"
        );
        break;
      case "referencias-telas":
        window.open(
          "https://docs.google.com/spreadsheets/d/1_fNVV-VmQEr0S9ZSgtxW65W17XWIodWil8PZC1jLP80/edit#gid=844156937",
          "_blank"
        );
        break;
      case "referencias-espuma":
        window.open(
          "https://docs.google.com/spreadsheets/d/1_fNVV-VmQEr0S9ZSgtxW65W17XWIodWil8PZC1jLP80/edit#gid=1204929849",
          "_blank"
        );
        break;
      case "ots-enproceso":
        window.open(
          "https://docs.google.com/spreadsheets/d/1W8pVqnzJiqlJQnIrG80ptz8oiY_jG0TFR3Ybt4k8kZM/edit#gid=0",
          "_blank"
        );
        break;
      default:
        currentState.nextPage === "" && alert("Seleccione una opción");
        break;
    }
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
    <div className="menu-container">
      <div className="title-container">
        <h2 className="menu-title">Ver Registros</h2>
      </div>
      <div className="option-container">
        <p className="option-title">Opciones</p>
        <div className="option-body" onClick={(e) => handleRadioSelect(e)}>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-1"
              value="leidos-materiaprima"
              required={true}
            ></input>
            <label htmlFor="option-1">Leidos Materia Prima</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-2"
              value="leidos-enproceso"
              required={true}
            ></input>
            <label htmlFor="option-1">Leidos Producto en Proceso</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="etiquetas-materiaprima"
              required={true}
            ></input>
            <label htmlFor="option-1">Etiquetas Creadas de Materia Prima</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="referencias-telas"
              required={true}
            ></input>
            <label htmlFor="option-1">Referencias de Telas</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="referencias-espuma"
              required={true}
            ></input>
            <label htmlFor="option-1">Referencias de Espuma</label>
          </div>
          <div className="option-radio">
            <input
              type="radio"
              name="nextPage"
              id="option-3"
              value="ots-enproceso"
              required={true}
            ></input>
            <label htmlFor="option-1">Listado Ots en Proceso</label>
          </div>
        </div>
      </div>
      <ButtonAction
        onClick={() => {
          handleNextPage();
        }}
        buttonText="Abrir"
      />
    </div>
  );
}
