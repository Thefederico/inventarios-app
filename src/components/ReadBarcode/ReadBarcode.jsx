import { useContext, useEffect, useRef } from "react";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";
import InputArea from "../UI/Input/InputArea/InputArea";
import InputText from "../UI/Input/InputText/InputText";
import { GlobalContext } from "../../Context/GlobalContext";
import InputWithButton from "../UI/Input/InputWithButton/InputWithButton";
import { keyWordBarcodeData } from "../../menuData/ReactBarcodeData";
import SelectOption from "../UI/Select/SelectOption/SelectOption";
import { optionsGlobalUnits } from "../../menuData/optionsGlobalUnits";
import { postApiSheetData } from "../../menuData/GasApi";

export default function ReadBarcode() {
  const { currentState, setGlobalState, updateGlobalState } =
    useContext(GlobalContext);
  const fieldRef = useRef();
  const keyWord = { ...keyWordBarcodeData };

  let matchSticker = [];

  useEffect(() => {
    async function fetchData() {
      if (currentState.processType === "materiaprima") {
        const printedStickers = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1oQKTkMhe3VgiW4j5PUAIRDSd9tpK2ynJXLbF97r6ZPE/edit#gid=237460667",
          sheetName: "etiquetas-materiaprima",
          action: "getApiSheetAllData",
        });

        await setGlobalState("printedStickers", printedStickers);

        const readStickers = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=1259555060",
          sheetName: "leidos-materiaprima",
          action: "getApiSheetAllData",
        });

        await setGlobalState("readStickers", readStickers);
      } else {
        const otsProductionStickers = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1W8pVqnzJiqlJQnIrG80ptz8oiY_jG0TFR3Ybt4k8kZM/edit#gid=0",
          sheetName: "ots-enproceso",
          action: "getOtsProduccion",
        });

        await setGlobalState("otsProductionStickers", otsProductionStickers);

        const readStickers = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=0",
          sheetName: "leidos-enproceso",
          action: "getApiSheetAllData",
        });

        await setGlobalState("readStickers", readStickers);

        if (currentState.processType === "copas") {
          const processCodes = await postApiSheetData({
            sheetUrl:
              "https://docs.google.com/spreadsheets/d/1W8pVqnzJiqlJQnIrG80ptz8oiY_jG0TFR3Ybt4k8kZM/edit#gid=0",
            sheetName: "procesos-copas",
            action: "getApiSheetAllData",
          });

          await setGlobalState("processCodes", processCodes);
        }

        if (currentState.processType === "tapabocas") {
          const processCodes = await postApiSheetData({
            sheetUrl:
              "https://docs.google.com/spreadsheets/d/1W8pVqnzJiqlJQnIrG80ptz8oiY_jG0TFR3Ybt4k8kZM/edit#gid=0",
            sheetName: "procesos-tapabocas",
            action: "getApiSheetAllData",
          });

          await setGlobalState("processCodes", processCodes);
        }
      }
      fieldRef.current.disabled = false;
      matchSticker = []; // eslint-disable-line react-hooks/exhaustive-deps
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValidate = (isSubmit) => {
    let inputBarcode = document.querySelector(".InputWithButton");
    let barcode = inputBarcode.value;
    let alreadyRead = [];

    if (barcode === "") {
      alert("No se ha ingresado el código de barras");
      return false;
    }

    let subBarcode = barcode.substring(0, 4);

    if (currentState.processType === "materiaprima") {
      matchSticker = currentState.printedStickers.filter((sticker) => {
        return sticker.barcode === barcode;
      });
      // éste código está a la espera para validar etiquetas repetidas de materia prima
      // alreadyRead = currentState.readStickers.filter((item) => {
      //   return `${item.barcode}` === `${barcode}`;
      // });
    } else {
      matchSticker = currentState.otsProductionStickers.filter((sticker) => {
        return sticker.id === subBarcode;
      });

      alreadyRead = currentState.readStickers.filter((item) => {
        return `${item.barcode}` === `${barcode}`;
      });
    }

    if (alreadyRead.length > 0) {
      alert("Ésta etiqueta ya fue leida");
      return false;
    }

    if (matchSticker.length <= 0) {
      alert(
        "El código de barras leido no está en el listado de etiquetas impresas"
      );
      return false;
    }

    let inputsBarcode = Array.from(
      document.getElementsByClassName("inputText")
    );

    let processKey = keyWord[currentState.nextPage];
    let barcodeKey = barcode.substring(
      processKey.startIndex,
      processKey.finalIndex
    );

    if (barcodeKey !== processKey.code) {
      alert(
        "El código de barras leido no pertenece a la operación seleccionada"
      );
      return false;
    }

    !isSubmit && inputsBarcode[0].focus();

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (handleValidate(e) === true) {
        e.target.btnEnviar.disabled = true;

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);
        formValues.cantidad = parseFloat(formValues.cantidad);

        let barcode = formValues.barcode;
        let processCode = parseInt(barcode.substring(4, 6));
        let talla = parseInt(barcode.substring(6, 8));

        let proccesData = currentState.processCodes.filter((item) => {
          return item.CODIGO === processCode;
        });

        let dateTime = new Date();
        let dateComponents = [
          dateTime.getFullYear(),
          (dateTime.getMonth() + 1).toString().padStart(2, "0"),
          dateTime.getDate().toString().padStart(2, "0"),
          dateTime.getHours().toString().padStart(2, "0"),
          dateTime.getMinutes().toString().padStart(2, "0"),
          dateTime.getSeconds().toString().padStart(2, "0"),
        ];

        let codeMonth = `${dateComponents[0]}${dateComponents[1]}`;
        let timeSpamId = dateComponents.join("");
        let becomeIsoDate =
          dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();

        const data = {
          ...formValues,
          ...matchSticker[0],
          ...proccesData[0],
          talla: talla,
          codigoMes: codeMonth,
          modificado: becomeIsoDate,
          usuario: currentState.user,
          id: timeSpamId + formValues.barcode,
        };

        console.log(data);

        if (currentState.processType === "materiaprima") {
          const leidosMateriaPrima = await postApiSheetData({
            sheetUrl:
              "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=1259555060",
            sheetName: "leidos-materiaprima",
            action: "appendRowOnlyValues",
            jsonData: { ...data },
          });

          updateGlobalState({
            readStickers: [...currentState.readStickers, { ...data }],
          });

          console.log("Leidos materia prima", leidosMateriaPrima);
        } else {
          const leidosEnProceso = await postApiSheetData({
            sheetUrl:
              "https://docs.google.com/spreadsheets/d/1INzW6Svc-zB-10hAp9Ggn0x3Vv7glA5hsopLZjtm9Vs/edit#gid=1259555060",
            sheetName: "leidos-enproceso",
            action: "appendRowOnlyValues",
            jsonData: { ...data },
          });

          updateGlobalState({
            readStickers: [...currentState.readStickers, { ...data }],
          });

          console.log("Leidos en proceso", leidosEnProceso);
        }

        matchSticker = [];

        await e.target.reset();
        e.target.btnEnviar.disabled = false;
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <section className="global-section">
      <form className="global-form" onSubmit={handleSubmit}>
        <fieldset className="global-fieldset" disabled={true} ref={fieldRef}>
          <div className="title-container">
            <h2 className="menu-title">{currentState.nextPage}</h2>
          </div>
          <InputWithButton
            required={true}
            type="text"
            name="barcode"
            labelText="Cógigo de Barras"
            buttonText="Validar"
            onChange="function"
            onClickButton={() => {
              handleValidate();
            }}
          />
          <InputText
            required={true}
            type="number"
            step="0.01"
            name="cantidad"
            labelText="Cantidad"
          />
          <SelectOption
            name="unidades"
            labelText="Unidades"
            arrayOptions={[...optionsGlobalUnits]}
          />
          <InputArea
            required={false}
            type="text"
            name="observaciones"
            labelText="Observaciones"
          />
          <ButtonSubmit type="submit" name="btnEnviar" buttonText="Enviar" />
        </fieldset>
      </form>
    </section>
  );
}
