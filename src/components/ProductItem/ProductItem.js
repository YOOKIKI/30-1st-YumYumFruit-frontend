import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductItem.scss';

function ProductItem({ product }) {
  const navigate = useNavigate();
  const { id, name, country, price, thumbnail_image_url } = product;

  const goToDetail = () => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <article className="productItem">
      <div className="imgContainer">
        <Link to="/">
          <img
            alt="img"
            src={thumbnail_image_url}
            className="img"
            onClick={goToDetail}
          />
        </Link>
      </div>
      <ul className="info">
        <li className="item">
          <Link to={`/products/detail/${id}`} className="link">
            {name}
          </Link>
        </li>
        <li className="item">{country}</li>
        <li className="item">
          <span className="price">{Math.floor(price).toLocaleString()}원</span>
        </li>
      </ul>
    </article>
  );
}

export default ProductItem;
