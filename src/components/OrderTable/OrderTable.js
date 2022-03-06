import React, { useState, useEffect } from 'react';
import CartItem from 'pages/Cart/CartItem';
import { TABLE_MENU_LIST } from './tablecolsdata';
import './OrderTable.scss';

function OrderTable() {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetch('http://10.58.0.168:8000/users/shoppingcart')
      .then(response => response.json())
      .then(data => setCartList(data.cart_info));
  }, []);

  return (
    <table className="orderTable">
      <thead>
        <tr>
          <th className="check">
            <input type="checkbox" />
          </th>
          {TABLE_MENU_LIST.map(menu => (
            <th key={menu.id} scope="col" className={menu.className}>
              {menu.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cartList.map(item => (
          <CartItem key={item.cart_id} item={item} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="10" className="orderTableBottom">
            <div className="wrapper">
              <span className="type">[기본배송]</span>
              <div className="totalPriceArea">
                <span>상품구매금액</span>
                <span className="price">24,600</span>
                <span>+</span>
                <span>배송비</span>
                <span className="shippingFee">4,000</span>
                <span>=</span>
                <span>합계 :</span>
                <span className="totalPrice">
                  28,600<span className="won">원</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default OrderTable;
