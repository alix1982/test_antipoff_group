import React from 'react';

function PopupWithForm (props) {
  
  return(
    <section className="form__position">
      <form className="form" name={props.name} type="submit" onSubmit={props.handleSubmit} noValidate >
        <h2 className="form__heading">Регистрация</h2>
        {props.children}
        <button className={`form__save ${!props.isValid && `form__save_disable`}` } 
          type="submit" disabled={!props.isValid}>
          {props.textButton}
        </button>
      </form>
    </section>
  )
}

export default PopupWithForm