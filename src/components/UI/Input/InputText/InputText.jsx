import "./InputText.css";

export default function InputText(props) {
  return (
    <div className="inputContainer">
      <label className="labelInput" htmlFor={props.id}>
        {props.labelText}
      </label>
      <input
        id={props.id}
        name={props.name}
        className="inputText"
        type={props.type}
        step={props.step}
        required={props.required}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        value={props.value}
        autoComplete="off"
        maxLength={props.maxLength}
      ></input>
    </div>
  );
}
