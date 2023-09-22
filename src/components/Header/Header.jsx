import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '../../store/authSlice';
import { resetUsers, setWidthWindow } from '../../store/usersSlice'
import { ReactComponent as Exit } from '../../images/exit.svg';

function Header () {
  const dispatch = useDispatch();
  const { widthWindow } = useSelector((state) => state.users);

  useEffect(()=>{
    dispatch(setWidthWindow())
  },[]);

  window.onresize = ()=>{dispatch(setWidthWindow())};

  const handleExit = () => {
    dispatch(exit());
    dispatch(resetUsers());
  }
  return (
    <header className='header'>
      <div className='header__container'>
        <button className='header__exit' onClick={handleExit}>
          {widthWindow > 800 ? 'Выход' : <Exit/>}
        </button>
        <h1 className='header__heading'>Наша команда</h1>
        <p className='header__text'>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p>
      </div>
    </header>
  )
}

export default Header
