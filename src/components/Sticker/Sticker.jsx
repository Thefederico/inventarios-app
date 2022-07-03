import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import "./Sticker.css";

export default function Sticker() {
  const { currentState, setGlobalState, resetGlobalState } =
    useContext(GlobalContext);

  const history = useHistory();

  let navbar = document.getElementsByClassName("navbar");
  let footer = document.getElementsByClassName("footer");

  let {
    referenciaEspuma,
    referenciaTela,
    ordenCompra,
    material,
    matDescrip,
    hideFixComponents,
  } = currentState;

  let inicialCharacter = material.substring(0, 1);

  let barcode = `${inicialCharacter}${referenciaTela}${referenciaEspuma}${ordenCompra}`;

  if (material === "Bondeo") {
    matDescrip = `BONDEO TELA ${referenciaTela} ESPUMA ${referenciaEspuma}`;
  }

  const getBarcodeData = async () => {
    let barcodeHtml = document.getElementsByClassName("sticker-wp");
    let stickerHtml = barcodeHtml[0].innerHTML;
    await setGlobalState("stickerHtml", stickerHtml);
    await setGlobalState("barcode", barcode);
  };

  useEffect(() => {
    if (hideFixComponents) {
      navbar[0].style.display = "none";
      footer[0].style.display = "none";
    }

    window.onpopstate = function (e) {
      resetGlobalState();

      navbar[0].style.display = "grid";
      footer[0].style.display = "grid";

      let mainContainer = document.getElementById("mainContainer");
      mainContainer.className = "container";

      history.push("/createbarcode");
    };

    getBarcodeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sticker-wp">
      <div className="description-wp">
        <label htmlFor="" className="matDescription">
          {matDescrip}
        </label>
      </div>
      <div className="barcode-wp">
        <label htmlFor="" className="barcode">
          {`*${barcode}*`}
        </label>
      </div>
      <div className="barcodeText-wp">
        <label htmlFor="">{barcode}</label>
      </div>
      <div className="info-wp">
        <div className="mat-oc-wp">
          <div className="material-wp">
            <label htmlFor="">Mat:</label>
          </div>
          <div className="order-wp">
            <label htmlFor="">{material}</label>
          </div>
        </div>
        <div className="refs-wp">
          <div className="tela-wp">
            <label htmlFor="">codTela:</label>
          </div>
          <div className="espuma-wp">
            <label htmlFor="">{referenciaTela}</label>
          </div>
        </div>
      </div>
      <div className="info-wp">
        <div className="mat-oc-wp">
          <div className="material-wp">
            <label htmlFor="">OC:</label>
          </div>
          <div className="order-wp">
            <label htmlFor="">{ordenCompra}</label>
          </div>
        </div>
        <div className="refs-wp">
          <div className="tela-wp">
            <label htmlFor="">codEsp:</label>
          </div>
          <div className="espuma-wp">
            <label htmlFor="">{referenciaEspuma}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
