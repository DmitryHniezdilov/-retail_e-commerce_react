import { memo } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Search from "../../elements/Search";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const NavList = ({ navList, isDesktop, onClose }) => {
  return (
    <nav className={`nav-list__drop ${isDesktop && "nav-list__drop--xl"}`}>
      <ul className="nav-list__drop-list">
        {navList ? (
          <>
            <li className="nav-list__drop-item" key="category-all">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-list__drop-link is-header-nav-active"
                    : "nav-list__drop-link"
                }
                onClick={!isDesktop && onClose}
              >
                All tiles
              </NavLink>
            </li>

            {navList &&
              navList.map(({ id, attributes }) => (
                <li className="nav-list__drop-item" key={`category-${id}`}>
                  <NavLink
                    to={`/${attributes.slug}`}
                    className={({ isActive }) =>
                      isActive
                        ? "nav-list__drop-link is-header-nav-active"
                        : "nav-list__drop-link"
                    }
                    onClick={!isDesktop && onClose}
                  >
                    {attributes.Title}
                  </NavLink>
                </li>
              ))}
          </>
        ) : (
          Array(5)
            .fill()
            .map((item, idx) => (
              <li className="nav-list__drop-item" key={`category-${idx}`}>
                <Skeleton
                  width={130}
                  height={18}
                  className="nav-list__drop-link skeleton"
                />
              </li>
            ))
        )}
      </ul>
      <div className="nav-list__search-wrap">
        {navList ? <Search /> : <Skeleton width={18} height={18} />}
      </div>
    </nav>
  );
};

export default memo(NavList);
