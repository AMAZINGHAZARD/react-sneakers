import axios from 'axios';
export const getItems = async () => {
  return await axios.get('https://6327175fba4a9c47533089b9.mockapi.io/items');
};

export const getFavorites = async () => {
  return await axios.get('https://6327175fba4a9c47533089b9.mockapi.io/favorites');
};

export const getCart = async () => {
  return await axios.get(`https://6327175fba4a9c47533089b9.mockapi.io/cart`);
};
export const deleteCart = async (id) => {
  return await axios.delete(`https://6327175fba4a9c47533089b9.mockapi.io/cart/${id}`);
};

export const postCart =async (obj)=>{
  return await axios.post('https://6327175fba4a9c47533089b9.mockapi.io/cart', obj);
}
