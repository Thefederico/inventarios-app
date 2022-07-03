import "./ButtonAction.css";

export default function ButtonAction(props) {
  return (
    <div className="buttonContainer">
      <button className="buttonAction" type="button" onClick={props.onClick}>
        {props.buttonText}
      </button>
    </div>
  );
}
