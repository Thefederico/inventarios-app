import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import ButtonSubmit from "../UI/Button/ButtonSubmit/ButtonSubmit";
import InputText from "../UI/Input/InputText/InputText";
import "./CreateBarcode.css";
import { useHistory } from "react-router";
import OkCancelModal from "../UI/Modal/OkCancelModal/OkCancelModal";
import { postApiSheetData } from "../../menuData/GasApi";
import Sticker from "../Sticker/Sticker";

export default function CreateBarcode() {
  const { currentState, setGlobalState, updateGlobalState } =
    useContext(GlobalContext);

  const [modalOpen, setModalOpen] = useState(false);
  const fieldRef = useRef();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (currentState.material === "") {
        const telaRefs = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1_fNVV-VmQEr0S9ZSgtxW65W17XWIodWil8PZC1jLP80/edit#gid=844156937",
          sheetName: "Telas",
          action: "getApiSheetAllData",
        });

        await setGlobalState("telaRefs", telaRefs);

        const espumaRefs = await postApiSheetData({
          sheetUrl:
            "https://docs.google.com/spreadsheets/d/1_fNVV-VmQEr0S9ZSgtxW65W17XWIodWil8PZC1jLP80/edit#gid=1204929849",
          sheetName: "Espuma",
          action: "getApiSheetAllData",
        });

        await setGlobalState("espumaRefs", espumaRefs);

        if (telaRefs.length > 0 && espumaRefs.length > 0) {
          fieldRef.current.disabled = false;
        }

        console.log("telaRefs", telaRefs);
        console.log("espumaRefs", espumaRefs);
      }

      let inputs = Array.from(document.querySelectorAll("[type='text']"));
      inputs.map((item) => (item.value = ""));
    }
    fetchData();
  }, [currentState.material]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMaterial = async (e) => {
    await updateGlobalState({
      matDescrip: "",
      referenciaTela: "0000",
      referenciaEspuma: "000",
      telaDescrip: "",
      espumaDescrip: "",
      ordenCompra: "",
      descripcion: "",
      dimensiones: "",
      barcode: "",
      stickerHtml: "",
    });
    await setGlobalState(e.target.name, e.target.value);
  };

  const changeDescription = (e, mat) => {
    let keyState = e.target.name;
    let valueState = e.target.value;
    mat = mat.toLowerCase();

    if (mat === "") {
      e.currentTarget.value = "";
      alert("primero debe seleccionar el tipo de material");
      return;
    }

    let matData = currentState[`${mat}Refs`];

    let selectedDoc = matData.filter(
      (doc) => `${doc.CODIGO}` === `${e.currentTarget.value}`
    );

    if (selectedDoc.length > 0) {
      setGlobalState(`${keyState}`, valueState);
      setGlobalState(`${mat}Descrip`, selectedDoc[0].DESCRIPCION);
      setGlobalState("matDescrip", selectedDoc[0].DESCRIPCION);
    } else {
      setGlobalState(`${keyState}`, "");
      setGlobalState(`${mat}Descrip`, "");
      setGlobalState("matDescrip", "");
    }
  };

  const handleInputChange = (e) => {
    let keyState = e.target.name;
    let valueState = e.target.value;
    setGlobalState(`${keyState}`, valueState);
  };

  const handleModalOkButton = async (e) => {
    // es muy importante desactivar el botón,
    //para que no permita hacer click 2 veces
    e.target.disabled = true;

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

    const barcodeData = {};
    barcodeData.fechaCreacion = becomeIsoDate;
    barcodeData.id = timeSpamId + currentState.barcode;
    barcodeData.user = currentState.user;
    barcodeData.material = currentState.material;
    barcodeData.matDescrip = currentState.matDescrip;
    barcodeData.referenciaTela = currentState.referenciaTela;
    barcodeData.referenciaEspuma = currentState.referenciaEspuma;
    barcodeData.telaDescrip = currentState.telaDescrip;
    barcodeData.espumaDescrip = currentState.espumaDescrip;
    barcodeData.ordenCompra = currentState.ordenCompra;
    barcodeData.dimensiones = currentState.dimensiones;
    barcodeData.barcode = currentState.barcode;
    barcodeData.stickerHtml = currentState.stickerHtml;
    barcodeData.codigoMes = codeMonth;
    barcodeData.impreso = false;

    await setGlobalState("hideFixComponents", true);

    const etiquetasMateriaPrima = await postApiSheetData({
      sheetUrl:
        "https://docs.google.com/spreadsheets/d/1oQKTkMhe3VgiW4j5PUAIRDSd9tpK2ynJXLbF97r6ZPE/edit#gid=237460667",
      sheetName: "etiquetas-materiaprima",
      action: "appendRowOnlyValues",
      jsonData: { ...barcodeData },
    });

    console.log("Etiquetas Materia Prima", etiquetasMateriaPrima);
    
    history.push("/sticker");

    let mainContainer = document.getElementById("mainContainer");
    mainContainer.className = "containerToSticker";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState.matDescrip === "") {
      alert("codigo de material incorrecto");
      return;
    }

    if (
      currentState.material === "Bondeo" &&
      (currentState.referenciaTela === "" ||
        currentState.referenciaEspuma === "")
    ) {
      alert("codigo de material incorrecto");
      return;
    }

    try {
      setModalOpen(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="global-section">
      <form className="global-form" onSubmit={handleSubmit}>
        <fieldset className="global-fieldset" disabled={true} ref={fieldRef}>
          <div>
            <label className="labelInput">Tipo de material</label>
          </div>
          <div className="radioContainer" onClick={(e) => handleMaterial(e)}>
            <div>
              <input
                type="radio"
                name="material"
                id="mat1"
                value="Tela"
                required={true}
              ></input>
              <label htmlFor="mat1">Tela</label>
            </div>
            <div>
              <input
                type="radio"
                name="material"
                id="mat2"
                value="Espuma"
                required={true}
              ></input>
              <label htmlFor="mat2">Espuma</label>
            </div>
            <div>
              <input
                type="radio"
                name="material"
                id="mat3"
                value="Bondeo"
                required={true}
              ></input>
              <label htmlFor="mat3">Bondeo</label>
            </div>
          </div>
          <InputText
            required={true}
            type="text"
            name="ordenCompra"
            maxLength={6}
            labelText="Orden de compra"
            onChange={(e) => handleInputChange(e)}
          />
          {currentState.material === "Bondeo" ? (
            <>
              <div className="refContainer">
                <InputText
                  required={true}
                  type="text"
                  name="referenciaTela"
                  labelText={"Referencia Tela"}
                  onChange={(e) => changeDescription(e, "Tela")}
                />
                <InputText
                  required={true}
                  type="text"
                  name="referenciaEspuma"
                  labelText="Referencia Espuma"
                  onChange={(e) => changeDescription(e, "Espuma")}
                />
              </div>
              <div>
                <InputText
                  required={true}
                  type="text"
                  name="descripcion"
                  labelText="Descripción Tela"
                  disabled={true}
                  value={currentState.telaDescrip}
                />
              </div>
              <div>
                <InputText
                  required={true}
                  type="text"
                  name="descripcion"
                  labelText="Descripción Espuma"
                  disabled={true}
                  value={currentState.espumaDescrip}
                />
              </div>
            </>
          ) : (
            <>
              <InputText
                required={true}
                type="text"
                name={`referencia${currentState.material}`}
                labelText={`Referencia ${currentState.material}`}
                onChange={(e) =>
                  changeDescription(e, `${currentState.material}`)
                }
                disabled={false}
              />
              <InputText
                required={true}
                type="text"
                name="descripcion"
                labelText="Descripción"
                onChange={(e) => handleInputChange(e)}
                disabled={true}
                value={currentState.matDescrip}
              />
            </>
          )}
          <InputText
            required={true}
            type="text"
            name="dimensiones"
            labelText="Dimensiones"
            onChange={(e) => handleInputChange(e)}
          />
          <ButtonSubmit buttonText="Crear codigo de barras"></ButtonSubmit>
          {modalOpen && (
            <OkCancelModal
              setOpenModal={setModalOpen}
              onClick={(e) => {
                handleModalOkButton(e);
              }}
              message="Vista previa"
              okText="Crear"
              cancelText="Cancelar"
              modalBody={<Sticker />}
            />
          )}
        </fieldset>
      </form>
    </section>
  );
}
