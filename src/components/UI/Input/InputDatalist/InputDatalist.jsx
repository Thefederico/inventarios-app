import './InputDatalist.css'
import '../InputText/InputText.css'

export default function InputDatalist(props) {

  return (
    <div>
      <label 
        htmlFor={props.inputid}
        className='labelInput'
      >
      {props.labelText}
      </label>
      <input
        type={props.type}
        id={props.inputid}
        className="inputText"
        name={props.name}
        required={props.required}
        onChange={props.onChange}
        disabled={props.disabled}
        list={props.datalistid}
        value={props.value}
      >
      </input>
      <datalist
        id={props.datalistid}
        className="inputDatalist"
      >
        {
        
          props.optionArray.map((ref)=>{

            return(

              <option key={ref.id} text={ref.id} value={ref.id}>{ref.id}</option>

            )

          })
        }
      </datalist>
    </div>
  )
}
