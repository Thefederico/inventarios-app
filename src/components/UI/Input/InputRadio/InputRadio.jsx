export default function InputRadio(props) {
  return (
    <div className={props.className}>
      <input
        type="radio"
        name={props.optionName}
        value={props.optionValue}
        disabled={props.disabled}
        required={true}
      ></input>
      <label htmlFor="option-1">{props.optionText}</label>
      {props.children}
    </div>
  );
}
