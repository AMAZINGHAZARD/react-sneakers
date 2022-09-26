import styles from './Card.module.scss';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

function Card({
  id,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  title,
  favorited = false,
  added = false,
  loading = false,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, price, imageUrl });
    setIsAdded(!isAdded);
  };
  const onClickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#dcdcdc"
          foregroundColor="#ecebeb"
        >
          <rect
            x="1"
            y="0"
            rx="10"
            ry="10"
            width="155"
            height="155"
          />
          <rect
            x="0"
            y="167"
            rx="5"
            ry="5"
            width="155"
            height="15"
          />
          <rect
            x="0"
            y="187"
            rx="5"
            ry="5"
            width="100"
            height="15"
          />
          <rect
            x="1"
            y="234"
            rx="5"
            ry="5"
            width="80"
            height="25"
          />
          <rect
            x="124"
            y="230"
            rx="10"
            ry="10"
            width="32"
            height="32"
          />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                onClick={onClickFavorite}
                src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
                alt="Unliked"
              />
            </div>
          )}

          <img
            height={132}
            width={132}
            src={imageUrl}
            alt="Sneakers 1"
          />
          <h5 className={styles.font}>{title}</h5>

          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b >{price} uah</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
