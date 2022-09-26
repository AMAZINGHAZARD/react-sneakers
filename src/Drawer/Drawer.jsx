import { useState } from 'react';
import Info from '../components/Info';
import React from 'react';
import axios from 'axios';
import { useCart } from '../components/hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onCloseCart, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://6327175fba4a9c47533089b9.mockapi.io/orders/',
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://6327175fba4a9c47533089b9.mockapi.io/cart/' + item.id
        );
        console.log(item);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="basket mb-30 d-flex justify-between ">
          Корзина
          <img
            onClick={onCloseCart}
            height={40}
            width={40}
            className="img-remove cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          ></img>
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20 "
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5 size-kross">{`${obj.title}`}</p>
                    <b className="prise-kross">{`${obj.price} uah`}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="img-remove"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  ></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice}uah</b>
                </li>
                <li>
                  <span>Налог 7%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 7} uah</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img
                  src="/img/arrow.svg"
                  alt="Arrow"
                />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ  #${orderId} скоро будет доставлен курьером`
                : 'Добавьте хотя бы одну пару кроссовок что бы сделать заказ'
            }
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
          />
        )}
      </div>
      /
    </div>
  );
}
export default Drawer;
