import { Link } from 'react-router-dom';

function NoRoute () {
  return(
    <section className="noRoute">
      <h2 className="noRoute__heading">404</h2>
      <p className="noRoute__text">Страница не найдена</p>
      <Link to="/users" className="noRoute__link">На главную</Link>
    </section>
  )
}

export default NoRoute