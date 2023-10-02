import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";
import bcg from "./banner-secondary-bcg.jpg";

const BannerSecondary = ({ isLoading }) => {
  const { id: currentSlug } = useParams();
  const [title, setTitle] = useState("Catalog");

  const categoriesList = useSelector(
    (state) =>
      state?.categories?.queries['getCategories({"populate":"*"})']?.data
        ?.categoriesList
  );

  const getTitle = () => {
    if (!categoriesList) return;

    const findTitle = categoriesList.find(
      (item) => currentSlug === item.attributes.slug
    )?.attributes?.Title;

    return findTitle;
  };

  useEffect(() => {
    currentSlug ? setTitle(getTitle()) : setTitle("Catalog");
  }, [currentSlug, categoriesList]);

  if (!categoriesList) {
    return <Skeleton className="banner-secondary" />;
  }

  return (
    <div className="banner-secondary decor-bcg decor-bcg--top">
      <figure className="banner-secondary__img-box">
        <img
          className="banner-secondary__img"
          src={bcg}
          alt="secondary banner background"
        />
      </figure>
      <div className="banner-secondary__inner center">
        <div className="banner-secondary__text-wrap">
          <h1 className="banner-secondary__title">{title}</h1>
          <p className="banner-secondary__desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerSecondary;
