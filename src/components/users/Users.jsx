import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, checkUsers } from '../../store/usersSlice';
import UsersCard from './usersCard/UsersCard';
import {ReactComponent as Arrow} from '../../images/arrow.svg';
import Preloader from '../Preloader/Preloader';

function Users () {
  const dispatch = useDispatch();
  const {users, isButtonMore, page, status} = useSelector(state => state.users);
  
  const handleAddUsers = () => {
    dispatch(fetchUsers(page));
  }

  const loadFirstUsers = () => {
    dispatch(checkUsers());
    const arrUsersLocal = (JSON.parse(localStorage.getItem('arrUsers')));
    (users.length === 0 && arrUsersLocal === null) && handleAddUsers();
  }
  useEffect(() => {
    loadFirstUsers();
  },[])

  return(
    <main  className="usersCardList">
      <ul className="usersCardList__gallery">
        { users?.length > 0  ? 
          (users.map ((card) => <UsersCard card = {card} key={card.id} />)) :
          (status === 'resolved' ? <p>Ничего не найдено</p> : <p></p>)
        }
      </ul>

      {status === 'loading' && <Preloader />}

      {isButtonMore &&
        <button className='usersCardList__more' onClick={handleAddUsers}>
          Показать еще
          <Arrow/>
        </button>
      }
    </main>
  )
}

export default Users