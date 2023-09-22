import { useState } from 'react'
import {ReactComponent as Eye} from '../../images/eye.svg'

function FieldForm (props) {
  
  const [isTypeInput, setIsTypeInput] = useState(true);

  const switchTypeInput = () => {
    setIsTypeInput(!isTypeInput);
  }

  return(
    <fieldset className="form__fieldInput">
      <h3 className="form__inputHeading">{props.heading}</h3>
      <label className='form__label'>  
        <input className="form__input"
          type={isTypeInput ? props.type : 'text'} name={props.inputName} placeholder={props.placeholder}
          minLength="2" maxLength="30"
          value={props.values || ''} onChange={props.onChange} required
        />
        {props.type === 'password' && <Eye className='form__inputShowPasword' onClick={switchTypeInput} />}
      </label>

      <span className="form__message-error">{props.errors}</span>
    </fieldset>
  )
}

export default FieldForm