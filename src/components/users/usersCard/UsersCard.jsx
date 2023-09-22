import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLike } from '../../../store/usersSlice';
import {ReactComponent as Like} from "../../../images/like.svg";
import {ReactComponent as Dislike} from "../../../images/dislike.svg";

function Card ({card}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullName = card.first_name + ' ' + card.last_name;

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(setLike(card.id))
  }

  return (
    <li className="card" onClick={()=>{navigate(`../userPage/${card.id}`)}}>
      <img src={card.avatar} className="card__avatar" alt="аватар"/>
      <p className="card__name">{fullName}</p>
      <button className="card__like" onClick={(e)=>{handleLike(e)}}>
        {card.like ? <Like/> : <Dislike/>}
      </button>
    </li>
  )
}

export default Card