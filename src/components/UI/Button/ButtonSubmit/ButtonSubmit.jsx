import "./ButtonSubmit.css";

export default function ButtonSubmit(props) {
  return (
    <div className="buttonContainer">
      <button className="buttonSubmit" type="submit" name={props.name}>
        {props.buttonText}
      </button>
    </div>
  );
}
