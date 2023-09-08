import { useMatches, Link } from "react-router-dom";
import "./styles.scss";

const Breadcrumbs = ({ title }) => {
  let matches = useMatches();
  let crumbs = matches;

  return (
    <section className="breadcrumbs">
      <nav className="content-center center breadcrumbs__wrap">
        <ul className="breadcrumbs__list">
          {crumbs.map(({ handle }, index) => (
            <li key={index} className="breadcrumbs__item">
              <Link to={handle.path} className="breadcrumbs__link">
                {handle.crumb}
              </Link>
            </li>
          ))}
          <li key={title} className="breadcrumbs__item">
            <span className="breadcrumbs__title">{title}</span>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
