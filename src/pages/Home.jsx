import Card from '../components/Card';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddtoCard,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    return (isLoading ? [...Array(7)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={onAddtoCard}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className=" p-40 content">
      <div className="d-flex align-center m-0 mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className="search-block d-flex ">
          <img
            src="/img/search.svg"
            alt="search"
          />
          <input
            onChange={onChangeSearchInput}
            className="search-style"
            placeholder="Поиск..."
            value={searchValue}
          ></input>
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            ></img>
          )}
        </div>
      </div>
      <div className="d-flex flex-wrap ">{renderItems()}</div>
    </div>
  );
}

export default Home;
