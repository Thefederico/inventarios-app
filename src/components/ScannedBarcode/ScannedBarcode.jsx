import { useContext, useEffect, useState } from "react";
import "./ScannedBarcode.css";
import { GlobalContext } from "../../Context/GlobalContext";
import { postApiSheetData } from "../../menuData/GasApi";
import {
  optionsGlobalImpresos,
  optionsGlobalMaterial,
} from "../../menuData/optionsGlobalUnits";
import InputText from "../UI/Input/InputText/InputText";
import SelectOption from "../UI/Select/SelectOption/SelectOption";
import { useHistory } from "react-router";
import OkCancelModal from "../UI/Modal/OkCancelModal/OkCancelModal";
import FloatingButton from "../UI/Button/FloatingButton/FloatingButton";

export default function ScannedBarcode() {
  const { currentState, setGlobalState } = useContext(GlobalContext);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [barcodes, setBarcodes] = useState([]);

  const filterBarcode = async () => {
    let [impresos] = document.querySelectorAll('[name="impresos"]');
    let [material] = document.querySelectorAll('[name="material"]');
    let [codigoMes] = document.querySelectorAll('[name="codigoMes"]');
    let [ordenCompra] = document.querySelectorAll('[name="ordenCompra"]');
    let arrayConditions = [];
    let arrayBarcodes = [...currentState.scannedStickers];

    document.getElementById("selctAllBarcode").checked = false;

    let pritState = impresos.value;

    if (pritState !== "") {
      pritState = JSON.parse(pritState);
      arrayConditions.push({ impreso: pritState });
    }

    if (material.value !== "") {
      arrayConditions.push({ material: material.value });
    }

    if (codigoMes.value !== "") {
      arrayConditions.push({ codigoMes: parseInt(codigoMes.value) });
    }

    if (ordenCompra.value !== "") {
      arrayConditions.push({ ordenCompra: parseInt(ordenCompra.value) });
    }

    arrayConditions.forEach((cond) => {
      let newCond = Object.keys(cond);
      let newValue = Object.values(cond);
      let newFilter = arrayBarcodes.filter((item) => {
        return item[newCond[0]] === newValue[0];
      });

      arrayBarcodes = [...newFilter];
    });

    setBarcodes([...arrayBarcodes]);
    console.log([...arrayBarcodes]);
  };

  const handleCheck = (e) => {
    console.log("sticker", e.target.name, "checked?", e.target.checked);
  };

  const handleFilter = (e) => {
    console.log("filter", e.target.value);
    filterBarcode();
  };

  useEffect(() => {
    async function fetchData() {
      const printedStickers = await postApiSheetData({
        sheetUrl:
          "https://docs.google.com/spreadsheets/d/1oQKTkMhe3VgiW4j5PUAIRDSd9tpK2ynJXLbF97r6ZPE/edit#gid=237460667",
        sheetName: "etiquetas-materiaprima",
        action: "getApiSheetAllData",
      });

      await setGlobalState("scannedStickers", printedStickers);
      setBarcodes(printedStickers);
      console.log("etiquetasBarcode", printedStickers);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectAll = (e) => {
    let enabledSelectAll = e.target.checked;
    let currentBarcodes = Array.from(
      document.getElementsByClassName("printCheck")
    );

    if (enabledSelectAll) {
      currentBarcodes.forEach((item) => {
        item.checked = true;
      });
      return;
    }

    if (enabledSelectAll === false) {
      currentBarcodes.forEach((item) => {
        item.checked = false;
      });
      return;
    }
  };

  const handlePrint = async (e) => {
    let currentBarcodes = Array.from(
      document.getElementsByClassName("printCheck")
    );

    let selectedBarcode = currentBarcodes.filter((item) => {
      return item.checked === true;
    });

    if (selectedBarcode.length === 0) {
      alert("debe seleccionar al menos un elemento");
      return;
    }

    let divBarcode = selectedBarcode.map((item) => {
      return item.name;
    });

    console.log("divBarcode", divBarcode);

    let barcodesToPrint = divBarcode.map((item) => {
      let sticker = currentState.scannedStickers.filter((stick) => {
        return stick.id === item;
      });

      return sticker[0];
    });

    let addDiv = barcodesToPrint.map((item) => {
      return `<div class="sticker-wp">${item.stickerHtml}</div>`;
    });

    let barcodeJoint = addDiv.join("");

    await setGlobalState("stickerHtml", barcodeJoint);
    await setGlobalState("barcodesToPrint", barcodesToPrint);

    try {
      await setModalOpen(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleModalOkButton = async (e) => {
    e.target.disabled = true;

    let arrayDataToUpdate = currentState.barcodesToPrint.map((item) => {
      return { id: item.id, value: true };
    });

    console.log(arrayDataToUpdate);

    const updateCells = await postApiSheetData({
      sheetUrl:
        "https://docs.google.com/spreadsheets/d/1oQKTkMhe3VgiW4j5PUAIRDSd9tpK2ynJXLbF97r6ZPE/edit#gid=237460667",
      sheetName: "etiquetas-materiaprima",
      action: "updateCells",
      jsonData: {
        arrayDataToUpdate: arrayDataToUpdate,
        nameColumToUpdate: "impreso",
        nameColumIdToUpdate: "id",
      },
    });

    console.log(updateCells);

    await setGlobalState("hideFixComponents", true);

    history.push("/doublesticker");

    let mainContainer = document.getElementById("mainContainer");
    mainContainer.className = "containerToDoubleSticker";
  };

  return (
    <div>
      <div className="filterContainer">
        <SelectOption
          name="impresos"
          labelText="Impresos"
          arrayOptions={[...optionsGlobalImpresos]}
          onChange={(e) => {
            handleFilter(e);
          }}
        />
        <SelectOption
          name="material"
          labelText="Material"
          arrayOptions={[...optionsGlobalMaterial]}
          onChange={(e) => {
            handleFilter(e);
          }}
        />
        <InputText
          type="number"
          name="codigoMes"
          labelText="CodigoMes"
          onBlur={(e) => {
            handleFilter(e);
          }}
        />
        <InputText
          type="text"
          name="ordenCompra"
          labelText="OC"
          onBlur={(e) => {
            handleFilter(e);
          }}
        />
      </div>
      <hr />
      <div className="selectAllBarcode">
        <input
          type="checkbox"
          id="selctAllBarcode"
          onChange={(e) => {
            handleSelectAll(e);
          }}
        />
        <label htmlFor="selctAllBarcode">
          {" "}
          Activar todos / Desactivar todos
        </label>
      </div>
      <hr />
      {barcodes.map((item) => {
        return (
          <div key={item.id}>
            <input
              type="checkbox"
              className="printCheck"
              name={`${item.id}`}
              onClick={(e) => {
                handleCheck(e);
              }}
            />
            <p className="printInfo">{`Código : ${item.barcode}`}</p>
            <p className="printInfo">{`OC : ${item.ordenCompra}`}</p>
            <p className="printInfo">{`Material : ${item.material}`}</p>
            <p className="printInfo">{`Descripción : ${item.matDescrip}`}</p>
            <p className="printInfo">{`CodigoMes : ${item.codigoMes}`}</p>
            <p className="printInfo">{`impreso : ${item.impreso}`}</p>
            <hr />
          </div>
        );
      })}
      <FloatingButton
        buttonText="Imprimir códigos de barras"
        onClick={(e) => {
          handlePrint(e);
        }}
      />
      {modalOpen && (
        <OkCancelModal
          setOpenModal={setModalOpen}
          onClick={(e) => {
            handleModalOkButton(e);
          }}
          message="¿Desea imprimir las"
          okText="Imprimir"
          cancelText="Cancelar"
          modalBody="etiquetas seleccionadas?"
        />
      )}
    </div>
  );
}
