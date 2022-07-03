import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import { MenuReadBarcodeData } from "../../menuData/MenuReadBarcodeData";
import ButtonAction from "../UI/Button/ButtonAction/ButtonAction";
import InputRadio from "../UI/Input/InputRadio/InputRadio";

export default function MenuReadBarcode() {
  const { currentState, updateGlobalState } = useContext(GlobalContext);
  const history = useHistory();
  const menuStructure = [...MenuReadBarcodeData];

  const handleRadioSelect = async (e) => {
    if (e.target.value) {
      let itemClass = e.target.parentElement.className;

      if (itemClass === "subOption-item") {
        await updateGlobalState({
          nextPage: `${e.target.value}`,
          previousPage: `${history.location.pathname}`,
        });
        return;
      } else {
        await updateGlobalState({
          nextPage: "",
          previousPage: "",
          processType: e.target.value,
        });
      }

      let allSubOption = Array.from(
        document.getElementsByClassName("subOption-item")
      );

      allSubOption.forEach((item) => {
        item.style.display = "none";
        let arrayRadios = Array.from(item.getElementsByTagName("input"));
        arrayRadios.forEach((radio) => {
          radio.checked = false;
        });
      });

      let parent = e.target.parentElement;

      let arraySubOptions = Array.from(
        parent.getElementsByClassName("subOption-item")
      );

      arraySubOptions.forEach((item) => {
        item.style.display = "block";
      });
    }
  };

  const handleNextPage = () => {
    let currentPage = `${history.location.pathname}`;
    if (currentState.nextPage !== "" && currentState.nextPage !== currentPage) {
      history.push("/readbarcode");
      return;
    }

    alert("Seleccione una opción");
  };

  useEffect(() => {
    async function fetchData() {
      await updateGlobalState({
        nextPage: "",
        previousPage: "",
        processType: "",
      });
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="menu-container">
      <div className="title-container">
        <h2 className="menu-title">Leer códigos de barras</h2>
      </div>
      <div className="option-container">
        <p className="option-title">Opciones</p>
        <div className="option-body" onClick={(e) => handleRadioSelect(e)}>
          {menuStructure.map((item, num) => {
            return (
              <InputRadio
                key={`${item.optionValue}-${item.optionName}-${num}`}
                className={`${item.optionClassName}`}
                optionName={`${item.optionName}`}
                optionValue={`${item.optionValue}`}
                optionText={`${item.optionText}`}
              >
                {item.optionItems &&
                  item.optionItems.map((subItem, num) => {
                    return (
                      <InputRadio
                        key={`${subItem.optionValue}-${subItem.optionName}-${num}`}
                        className={`${subItem.optionClassName}`}
                        optionName={`${subItem.optionName}`}
                        optionValue={`${subItem.optionValue}`}
                        optionText={`${subItem.optionText}`}
                      />
                    );
                  })}
              </InputRadio>
            );
          })}
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
