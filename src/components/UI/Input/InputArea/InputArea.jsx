import "./InputArea.css";

export default function InputArea(props) {
  return (
    <div className="inputContainer">
      <label className="labelInput" htmlFor={props.id}>
        {props.labelText}
      </label>
      <textarea
        id={props.id}
        name={props.name}
        className="inputArea"
        type={props.type}
        required={props.required}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        value={props.value}
        autoComplete="off"
        maxLength={props.maxLength}
      ></textarea>
    </div>
  );
}
