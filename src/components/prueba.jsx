import { postApiSheetData } from "../menuData/GasApi";

export default function prueba() {

  const sendData = async function () {
    const selData = await postApiSheetData({
      sheetUrl:
        "https://docs.google.com/spreadsheets/d/1B0TqJvIzFpCUSb9n0SU6W0nBaV-kWnwrxqnBwHA9pyU/edit#gid=237460667",
      sheetName: "etiquetas-materiaprima",
      action: "getSelectedData",
    });

    console.log("selData", selData);

  }
  

  return (
    <div>
      <button
        onClick={() => {
          sendData();
        }}
      >
        Enviar
      </button>
    </div>
  );
}
