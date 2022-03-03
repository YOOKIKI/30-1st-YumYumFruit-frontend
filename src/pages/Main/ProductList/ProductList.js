import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ProductListItem from './ProductListItem';
import { getProducts } from '../../../api/api';
// 상수 데이터 파일 사용 여부 질문
// <li> 마다 다른 함수를 등록하려고 하는데, 상수 데이터 파일에서 함수도 등록 가능한지?
// import { SORTMENU_LIST } from './sortmenudata.js';
import './ProductList.scss';

function ProductList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams('');
  const [sort, setSort] = useState('price');
  const [productList, setProductList] = useState([]);

  const handleLowPriceClick = () => setSort('price');
  const handleHighPriceClick = () => setSort('-price');
  const handleNameClick = () => setSort('name');
  const handleNewestClick = () => setSort('receiving_date');

  const handleLoad = async query => {
    const { results } = await getProducts(query);
    setProductList(results);
  };

  const goToDetail = item => {
    navigate(`/products/detail/${item.id}`);
  };

  // useLocation, locationSearch 사용해보기
  useEffect(() => {
    handleLoad({ category: searchParams.get('category'), sort });
  }, [searchParams.get('category'), sort]);

  return (
    <div className="productList">
      <div className="inner">
        <header className="menu">
          <div className="halfBox">
            <ul className="leftBox">
              <li className="item">TOTAL</li>
              <li className="item">
                <span className="totalNum">{productList.length}</span>
              </li>
              <li className="item">ITEMS</li>
            </ul>
          </div>
          <div className="halfBox">
            <ul className="rightBox">
              <li className="item" onClick={handleLowPriceClick}>
                LOW PRICE
              </li>
              <li className="item" onClick={handleHighPriceClick}>
                HIGH PRICE
              </li>
              <li className="item" onClick={handleNameClick}>
                NAME
              </li>
              <li className="item" onClick={handleNewestClick}>
                NEW
              </li>
              {/* {SORTMENU_LIST.map(menu => (
                <li key={menu.id} className="item">
                  {menu.name}
                </li>
              ))} */}
            </ul>
          </div>
        </header>
        <section className="list">
          {productList.map(product => (
            <ProductListItem
              key={product.id}
              product={product}
              onClick={goToDetail}
            />
          ))}
        </section>
        <div className="paging">
          <div className="pagingBox">
            <Link to="/" className="link">
              ←
            </Link>
          </div>
          <div className="pagingBox">
            <Link to="/" className="link">
              ←
            </Link>
          </div>
          <div className="pagingBox">
            <ul>
              <li>
                <Link to="/" className="link">
                  1
                </Link>
              </li>
            </ul>
          </div>
          <div className="pagingBox">
            <Link to="/" className="link">
              →
            </Link>
          </div>
          <p className="pagingBox">
            <Link to="/" className="link">
              →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
