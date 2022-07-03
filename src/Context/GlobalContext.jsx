import { createContext, useReducer } from "react";
import appReducer from "./AppReducer.jsx";

const initialState = {
  user: "",
  pw: "",
  login: false,
  usuarios: "",
  hideFixComponents: false,
  material: "",
  matRefs: [],
  matDescrip: "",
  telaRefs: [],
  espumaRefs: [],
  referenciaTela: "0000",
  referenciaEspuma: "000",
  telaDescrip: "",
  espumaDescrip: "",
  ordenCompra: "",
  descripcion: "",
  dimensiones: "",
  barcode: "",
  stickerHtml: "",
  currentPage: "",
  previousPage: "",
  nextPage: "",
  processType: "",
  printedStickers: [],
  otsProductionStickers: [],
  scannedStickers: [],
  processCodes: [],
  barcodesToPrint: [],
  readStickers:[],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  //Esta función llamada setGlobalState es un gran logro para mí
  // ya que con ésta función puedo crear una nueva variable en el estado
  // y asignarle cualquier valor y utilizarlo en cualquier
  // parte del proyecto y desde cualquier componente. :)
  // la función recibe 2 parametros:
  // - un string con el nombre de la Key del objeto
  // - el valor o los valores del objeto, que pueden ser un número,
  //   un array, otro objeto, una función, un booleano etc, etc

  function setGlobalState(objKey, objValues) {
    dispatch({
      type: "SET_GLOBAL_STATE",
      payload: {
        [objKey]: objValues,
      },
    });
  }

  function updateGlobalState(objectUpdate) {
    dispatch({
      type: "UPDATE_GLOBAL_STATE",
      payload: {
        ...objectUpdate,
      },
    });
  }

  function resetGlobalState() {
    dispatch({
      type: "RESET_GLOBAL_STATE",
      payload: {
        hideFixComponents: false,
        material: "",
        matRefs: [],
        matDescrip: "",
        telaRefs: [],
        espumaRefs: [],
        referenciaTela: "0000",
        referenciaEspuma: "000",
        telaDescrip: "",
        espumaDescrip: "",
        ordenCompra: "",
        descripcion: "",
        dimensiones: "",
        barcode: "",
        stickerHtml: "",
        currentPage: "",
        previousPage: "",
        nextPage: "",
        processType: "",
        printedStickers: [],
        otsProductionStickers: [],
        scannedStickers: [],
      },
    });
  }

  function inputChange(event) {
    dispatch({
      type: "INPUT_CHANGE",
      payload: {
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  }

  function userRegister(event) {
    dispatch({
      type: "USER_REGISTER",
      payload: {
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  }

  function userLogin() {
    dispatch({
      type: "USER_LOGIN",
      payload: {
        login: true,
      },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        currentState: state,
        setGlobalState,
        updateGlobalState,
        resetGlobalState,
        inputChange,
        userRegister,
        userLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
