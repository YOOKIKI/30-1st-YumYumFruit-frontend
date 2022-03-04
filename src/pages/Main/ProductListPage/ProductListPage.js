import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ProductItem from 'components/ProductItem/ProductItem';
import Pagination from 'components/Pagination/Pagination';
import { getProducts } from 'api/api';
import './ProductListPage.scss';

function ProductListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState('price');
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // useLoaction.search -> &sort 뒤에 짜르기 (초기화 필요)
  const handleLowPriceClick = () => {
    setSort('price');
    navigate(`?category=${searchParams.get('category')}&sort=price`);
  };

  const handleHighPriceClick = () => {
    setSort('-price');
    navigate(`?category=${searchParams.get('category')}&sort=-price`);
  };

  const handleNameClick = () => {
    setSort('name');
    navigate(`?category=${searchParams.get('category')}&sort=name`);
  };

  const handleNewestClick = () => {
    setSort('receiving_date');
    navigate(`?category=${searchParams.get('category')}&sort=receiving_date`);
  };

  const handleLoad = async query => {
    const { results, total_pages, total_items } = await getProducts(query);
    setProductList(results);
    setTotalPages(total_pages);
    setTotalItems(total_items);
  };

  // 리팩토링
  // 1) '' 빈 스트링은 데이터가 모두 나온다 (all) 필요 없음
  // 2) useLocation, location.search 사용해보기
  // 3) 쿼리스트링 키 순서는 상관없음
  // 이슈
  // 1) 메뉴 클릭 시 모두 location.search = ?category=all
  // 2) product/list 어떻게 출력 되는지? -> productList.map is not a function / category=null로 뜨는 듯
  // 3) product/list 만들고 -> category/all을 없애기 (초기값 || "" , `?limit=20&offset=0`) + 예솔님과 논의

  useEffect(() => {
    handleLoad({ category: searchParams.get('category'), sort, page });
  }, [searchParams, sort, page]);

  return (
    <div className="productList">
      <div className="inner">
        <header className="menu">
          <div className="halfBox">
            <ul className="leftBox">
              <li className="item">TOTAL</li>
              <li className="item">
                <span className="totalNum">{totalItems}</span>
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
              {/* 추후 맵을 쓸 수 있을 것 같아 남겨놓음
                s{SORTMENU_LIST.map(menu => (
                <li key={menu.id} className="item">
                  {menu.name}
                </li>
              ))} */}
            </ul>
          </div>
        </header>
        <section className="list">
          {productList.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </section>
        <div className="paging">
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;