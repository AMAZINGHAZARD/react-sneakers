import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from './hooks/useCart';

function Header(props) {

 const {totalPrice}=useCart()

  return (
    <header className="d-flex justify-between align-center">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            src="/img/logo.png"
          />
          <div>
            <h3 className="text-uppercase mb-10">React Sneakers</h3>
            <p className="opacity-6 mt-10 ">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li
          onClick={props.onClickCart}
          className="mr-30 cu-p"
        >
          <img
            className="mr-15"
            width={18}
            height={18}
            src="/img/cart.svg"
            alt="Корзина"
          />
          <span>{totalPrice} uah</span>
        </li>
        <Link to="/favorites">
          <img
            className="mr-20 cu-p"
            width={18}
            height={18}
            src="/img/heart.svg"
            alt="Закладки"
          />
        </Link>
        <li>
        <Link to="/orders">
          <img
            className="mr-20 cu-p"
            width={18}
            height={18}
            src="/img/user.svg"
            alt="Пользователь"
          />
        </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
