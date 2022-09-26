import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './components/context';

import Drawer from './Drawer/Drawer';
import Header from './components/Header';
import Orders from './pages/Orders';

import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setOpenedCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://6327175fba4a9c47533089b9.mockapi.io/cart'),
            axios.get('https://6327175fba4a9c47533089b9.mockapi.io/favorites'),
            axios.get('https://6327175fba4a9c47533089b9.mockapi.io/items'),
          ]); 

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        {
          alert('Ошибка при запросе данных ;(');
          console.error(error);
        }
      }
    }
    fetchData();
  }, []);

  const onAddtoCard = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://6327175fba4a9c47533089b9.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post('https://6327175fba4a9c47533089b9.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      {
        alert('Ошибка при удалении из корзину');
        console.error(error);
      }
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6327175fba4a9c47533089b9.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
    } catch (error) {
      {
        alert('Ошибка при удалении из корзины');
        console.error(error);
      }
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6327175fba4a9c47533089b9.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://6327175fba4a9c47533089b9.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  const onChangeSearchInput = (event) => setSearchValue(event.target.value);

  return (
    <AppContext.Provider
      value={{
        favorites,
        cartItems,
        isItemAdded,
        onAddToFavorite,
        setOpenedCart,
        setCartItems,
        onAddtoCard,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onCloseCart={() => setOpenedCart(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setOpenedCart(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddtoCard={onAddtoCard}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                items={favorites}
                onAddToFavorite={onAddToFavorite}
              />
            }
          ></Route>
          <Route
            path="/orders"
            element={<Orders></Orders>}
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
