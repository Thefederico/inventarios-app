import React from "react";
import "./OkCancelModal.css";

function OkCancelModal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            className="modalCloseButton"
          >
            X
          </button>
        </div>
        <div className="modalTitle">
          <h3>{props.message}</h3>
        </div>
        <div className="modalBody">
          <div>
            {props.modalBody}
          </div>
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            id="cancelBtn"
            className="modalCancelButton"
          >
            {props.cancelText}
          </button>
          <button className="modalOkButton" onClick={props.onClick}>
            {props.okText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OkCancelModal;
