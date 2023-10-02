import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import FooterAccordionTab from "../FooterAccordionTab";
import Socials from "../../elements/Socials";
import { DESKTOP_WIDTH_LG } from "../../utils/constants";
import logo from "./logo-ft.svg";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const Footer = ({ categoriesList, isLoading }) => {
  const innerWidth = useSelector((state) => state.innerWidth);
  const [isAccordionOpen, setAccordionOpen] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    innerWidth > DESKTOP_WIDTH_LG ? true : false
  );

  const servicesList = [
    "Measurement Service",
    "Product Advice",
    "Interior Design",
  ];

  const IDX_ACCORDION_TAB_1 = 0,
    IDX_ACCORDION_TAB_2 = 1,
    IDX_ACCORDION_TAB_3 = 2;

  const onAccordionClick = (idx) => {
    if (idx === isAccordionOpen) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(idx);
    }
  };

  useEffect(() => {
    innerWidth > DESKTOP_WIDTH_LG ? setIsDesktop(true) : setIsDesktop(false);
  }, [innerWidth]);

  if (categoriesList || !isLoading) {
    return (
      <footer className="footer decor-bcg decor-bcg--btm">
        <div className="center footer__center">
          <div className="footer__top">
            <div className="footer__logo-wrap">
              <Link to="/" className="footer__logo">
                <img
                  src={logo}
                  alt="logo footer e-commerce"
                  className="footer__logo-img"
                />
              </Link>
            </div>
            <nav className="footer__nav">
              <ul className="footer__nav-row">
                <li className="footer__nav-col">
                  <FooterAccordionTab
                    idx={IDX_ACCORDION_TAB_1}
                    title="Products"
                    isAccordionOpen={isAccordionOpen}
                    onAccordionClick={onAccordionClick}
                    isDesktop={isDesktop}
                  >
                    <ul className="footer__nav-list">
                      {categoriesList &&
                        categoriesList.map(({ id, attributes }) => (
                          <li
                            className="footer__nav-item"
                            key={`category-ft-${id}`}
                          >
                            <NavLink
                              to={`/categories/${attributes.slug}`}
                              className={({ isActive }) =>
                                isActive
                                  ? "footer__nav-link is-footer__nav-link-active"
                                  : "footer__nav-link"
                              }
                            >
                              {attributes.Title}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </FooterAccordionTab>
                </li>
                <li className="footer__nav-col">
                  <FooterAccordionTab
                    idx={IDX_ACCORDION_TAB_2}
                    title="Services"
                    isAccordionOpen={isAccordionOpen}
                    onAccordionClick={onAccordionClick}
                    isDesktop={isDesktop}
                  >
                    <ul className="footer__nav-list">
                      {servicesList &&
                        servicesList.map((item) => (
                          <li
                            className="footer__nav-item"
                            key={`service-${item}`}
                          >
                            <Link to={`/`} className="footer__nav-link">
                              {item}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </FooterAccordionTab>
                </li>
                <li className="footer__nav-col">
                  <FooterAccordionTab
                    idx={IDX_ACCORDION_TAB_3}
                    title="Contact information"
                    isAccordionOpen={isAccordionOpen}
                    onAccordionClick={onAccordionClick}
                    isDesktop={isDesktop}
                  >
                    <p className="footer__contact-text">
                      3181 Al Imam Saud Ibn Abdul Aziz Branch Rd,
                      An&nbsp;Nuzhah, Riyadh&nbsp;12474,
                      <br />
                      Saudi&nbsp;Arabia
                    </p>
                  </FooterAccordionTab>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__bottom">
            <div className="footer__socials-wrap">
              <Socials />
            </div>
            <div className="footer__copy-wrap">
              <p className="footer__copy">
                Copyright © 2022 | All Rights Reserved.
              </p>
              <p className="footer__author">
                Created with love by thecreation.design
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return "";
};

export default memo(Footer);
