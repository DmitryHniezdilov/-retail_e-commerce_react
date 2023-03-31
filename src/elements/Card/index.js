import { Link } from "react-router-dom";
import "./styles.scss";
import { CURRENT_URL } from "../../api/constAPI";
import { formatPrice } from "../../utils/helpers";

const Card = ({ product }) => {
  const { productName, oldPrice, price, img, title } = product.attributes || {};
  const IMG_PATH = CURRENT_URL + img.data.attributes.url;

  return (
    <div className="card" id="js-card-scroll">
      <Link to={`/catalogs/${product.id}`} className="card__link">
        <div className="card__img-wrap">
          <img className="card__img" src={IMG_PATH} alt={title}></img>
        </div>
        <div className="card__desc-wrap">
          <p className="card__title">{productName}</p>
          <p className="card__price-wrap">
            <span className="card__price-old">{formatPrice(oldPrice)}</span>
            <span className="card__price-cur">{formatPrice(price)}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
