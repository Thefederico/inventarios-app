import "./SelectOption.css";

export default function SelectOption(props) {
  let arrayOptions = props.arrayOptions;

  return (
    <div className="select-container">
      <label className="select-label" htmlFor={props.id}>
        {props.labelText}
      </label>
      <select name={props.name} id="" className="select-option" onChange={props.onChange} required>
        {arrayOptions &&
          arrayOptions.map((item) => {
            return (
              <option
                key={`${item.id}`}
                className="option-item"
                name={`${item.optionName}`}
                value={`${item.optionValue}`}
                defaultValue={item.optionSelected && true}
              >{`${item.optionText}`}</option>
            );
          })}
      </select>
    </div>
  );
}
