import "./InputWithButton.css";

export default function InputWithButton(props) {
  return (
    <div className="InputWithButton-container">
      <label className="labelInputWithButton" htmlFor={props.id}>
        {props.labelText}
      </label>
      <div className="input-wrap">
        <div>
          <input
            type="text"
            name={props.name}
            className="InputWithButton"
            required={props.required}
            autoComplete="off"
          />
        </div>
        <div>
          <button
            type="button"
            className="buttonInputWithButton"
            onClick={props.onClickButton}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
