import "./FloatingButton.css";

export default function FloatingButton(props) {
  return (
    <div className="floating-buttonContainer">
      <button
        className="floating-buttonAction"
        type="button"
        onClick={props.onClick}
      >
        {props.buttonText}
      </button>
    </div>
  );
}
