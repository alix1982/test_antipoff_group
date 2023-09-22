import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, checkToken } from '../../store/authSlice.jsx';

import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import FieldForm from '../FieldForm/FieldForm.jsx';
import {useFormWithValidation} from '../formValidation.js';

function Register () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, textButton } = useSelector(state => state.auth)
  const { values, errors, isValid, isValidInputs, setIsValid, setIsValidInputs, handleChange, resetForm, setErrors } = useFormWithValidation();
  
  useEffect(()=>{
    dispatch(checkToken());
    resetForm();
    setIsValidInputs({
      email: false,
      password: false,
      passwordReplay: false,
      name: false,
    })
  }, [])

  useEffect(()=>{
    loggedIn ? navigate('/users') : navigate('/')
  },[loggedIn])

  function handleSubmit (e) {
    e.preventDefault();
    if (values.password === values.passwordReplay) {
      dispatch(fetchAuth(values.email, values.password));
    } else {
      setErrors({...errors, passwordReplay: "Пароли не совпадают" });
    } 
    setIsValid(false);
  }

  return(
    <PopupWithForm  name="Register" title="Добро пожаловать!" text="Уже зарегистрированы?" auth="Auth"
      textButton={textButton} 
      handleSubmit={handleSubmit}
      onChange={handleChange}
      values={values} errors={errors} 
      isValidInputs={isValidInputs}
      isValid={isValid} 
    >
      <FieldForm
        formType="Auth" heading="Имя"
        type="text" inputName="name" placeholder="Артур" 
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.name} onChange={handleChange} errors={errors.name}
      />
      <FieldForm
        formType="Auth" heading="Электронная почта"
        type="email" inputName="email" placeholder="example@mail.ru"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.email} onChange={handleChange} errors={errors.email}
      />
      <FieldForm
        formType="Auth" heading="Пароль"
        type="password" inputName="password" placeholder="******"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.password} onChange={handleChange} errors={errors.password}
      />
      <FieldForm
        formType="Auth" heading="Подтвердите пароль"
        type="password" inputName="passwordReplay" placeholder="******"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.passwordReplay} onChange={handleChange} errors={errors.passwordReplay}
      />
    </PopupWithForm>
  )
}

export default Register