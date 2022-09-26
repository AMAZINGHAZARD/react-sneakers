import Card from '../components/Card';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import AppContext from '../components/context';

function Orders() {
  const { onAddtoCard, onAddToFavorite } = React.useContext(AppContext);
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://6327175fba4a9c47533089b9.mockapi.io/orders'
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('cxcxcx');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className=" p-40 content">
      <div className="d-flex align-center m-0 mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap ">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
