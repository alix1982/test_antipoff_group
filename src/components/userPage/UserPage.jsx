import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { findUser } from "../../store/usersSlice"
import { ReactComponent as Phone } from "../../images/phone.svg";
import { ReactComponent as Email } from "../../images/email.svg";

function UserPage () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(findUser({ id }))
  }, []);

  if (!user) {
      return <Preloader />;
  }

  return (
    <section className="userPage">
      <p className="userPage__description">
        {/* {user.discription ? user.discription : 'Нет данных'} */}
        Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты. <br/><br/>В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно". <br/><br/>Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
      </p>
      <div className="userPage__contacts">
        <p className="userPage__phone">
          <Phone/>
          <span className="userPage__phoneText">
            {/* {user.phone ? user.phone : 'Нет данных'} */}
            +7 (954) 333-44-55
          </span>
        </p>
        <p className="userPage__email">
          <Email />
          <span className="userPage__emailText">{user.email ? user.email : 'Нет данных'}</span>
        </p>
      </div>
    </section>
  )
}

export default UserPage
