import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '../../../store/authSlice';
import { resetUsers, setWidthWindow } from '../../../store/usersSlice';
import { ReactComponent as Exit } from '../../../images/exit.svg';
import { ReactComponent as Back } from '../../../images/back.svg';

function UserPageHeader () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, pages, widthWindow } = useSelector((state) => state.users);
  const fullName = user?.first_name + ' ' + user?.last_name;
  
  useEffect(()=>{
    pages === 0 && navigate('/users');
  },[]);
  
  window.onresize = ()=>{dispatch(setWidthWindow())};
  
  const handleExit = () => {
    dispatch(exit());
    dispatch(resetUsers());
  }

  return (
    user &&
    <header className='userPageHeader'>
      <div className='userPageHeader__container'>
        <button className='userPageHeader__back' onClick={() => navigate(-1)}>
          {widthWindow > 800 ? 'Назад' : <Back/>}
        </button>
        <img src={user?.avatar} className="userPageHeader__avatar" alt="аватар"/>
        <div className="userPageHeader__userData">
            <p className="userPageHeader__userName">{fullName}</p>
            <p className="userPageHeader__userPost">{user?.post ? user?.post : 'Нет данных'}</p>
        </div>
        <button className='userPageHeader__exit' onClick={handleExit}>
          {widthWindow > 800 ? 'Выход' : <Exit/>}
        </button>
      </div>
    </header>
  )
}

export default UserPageHeader
