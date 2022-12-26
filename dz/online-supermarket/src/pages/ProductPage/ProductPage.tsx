import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AddProductButton,
  ChangeButtonStyled,
  DeleteButtonStyled,
  FlexWrapStyled,
  NameInputStyled,
  ProductDescWrapStyled,
  ProductImageWrapStyled,
  ProductPriceTag,
  ProductRatingWrapStyled,
  ProductTitleWrapStyled,
  ProductWrapStyled,
  SaveChangesButtonStyled,
  StaffButtonWrap,
  StarStyled,
} from "./ProductPage.style";
import star from "../../assets/star.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { useLocation } from "react-router";
import {
  deleteProduct,
  getProduct,
  patchProduct,
  postProduct,
} from "../../store/product/product.actions";
import { addToCart } from "../../store/order/order.actions";

export const ProductPage = () => {
  const { product } = useAppSelector((state) => state.product);
  const { cartSelling, user } = useAppSelector((state) => state.order);
  const location = useLocation();
  const isCreate = location.state?.isCreate as boolean | undefined | null;

  const [isChange, setIsChange] = useState(isCreate);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(+pathname.slice(pathname.lastIndexOf("/") + 1)));
    }
    if (product) {
      setName(product.name);
      setRating(product.rating);
      setPrice(product.price);
      setImageUrl(product.image_url);
    }
  }, [dispatch, pathname, product]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value ?? ""),
    []
  );

  const handleRatingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setRating(+e.target.value.replace(/\D/, "") ?? 0),
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPrice(+e.target.value.replace(/\D/, "") ?? 0),
    []
  );

  const handleImageUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setImageUrl(e.target.value ?? ""),
    []
  );

  const stars = useMemo(() => {
    const arr1 = new Array(product?.rating ?? 0).fill(1);
    const arr2 = new Array(5 - (product?.rating ?? 0)).fill(1);
    return (
      <>
        {arr1.map(() => (
          <StarStyled src={star} />
        ))}
        {arr2.map(() => (
          <StarStyled fade src={star} />
        ))}
      </>
    );
  }, [product]);

  const handleAddToCartClick = useCallback(() => {
    if (cartSelling) {
      dispatch(
        addToCart({ cartId: cartSelling.id ?? 0, productId: product?.id ?? 0 })
      );
    }
  }, [cartSelling, dispatch, product?.id]);

  const handleChangeClick = useCallback(() => {
    setIsChange(true);
  }, []);

  const handleSaveClick = useCallback(() => {
    if (isCreate)
      dispatch(postProduct({ name, rating, price, image_url: imageUrl }));
    else if (product)
      dispatch(
        patchProduct({
          id: product.id,
          name,
          rating,
          price,
          image_url: imageUrl,
        })
      );
  }, [dispatch, imageUrl, isCreate, name, price, product, rating]);

  const handleDeleteClick = useCallback(() => {
    if (product?.id) dispatch(deleteProduct(product.id));
  }, [dispatch, product]);

  return (
    <ProductWrapStyled isChange={isChange}>
      {!isChange ? (
        <>
          <ProductImageWrapStyled>
            <img src={product?.image_url} alt="Nothing" />
          </ProductImageWrapStyled>
          <ProductDescWrapStyled>
            <FlexWrapStyled>
              <ProductTitleWrapStyled>{product?.name}</ProductTitleWrapStyled>
              <ProductRatingWrapStyled>
                Рейтинг: {stars}
              </ProductRatingWrapStyled>
            </FlexWrapStyled>
            <FlexWrapStyled>
              <ProductPriceTag>{product?.price} руб.</ProductPriceTag>
              {!user?.is_staff && (
                <AddProductButton
                  onClick={handleAddToCartClick}
                  disabled={!user}
                >
                  Добавить в корзину
                </AddProductButton>
              )}
              {user?.is_staff && (
                <ChangeButtonStyled onClick={handleChangeClick}>
                  Изменить
                </ChangeButtonStyled>
              )}
            </FlexWrapStyled>
          </ProductDescWrapStyled>
        </>
      ) : (
        <>
          <NameInputStyled
            placeholder="Наименование..."
            value={name}
            onChange={handleNameChange}
          />
          <NameInputStyled
            placeholder="Рейтинг..."
            value={rating}
            onChange={handleRatingChange}
          />
          <NameInputStyled
            placeholder="Стоимость..."
            value={price}
            onChange={handlePriceChange}
          />
          <NameInputStyled
            placeholder="Изображение..."
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <StaffButtonWrap>
            <SaveChangesButtonStyled to="/" onClick={handleSaveClick}>
              Сохранить
            </SaveChangesButtonStyled>
            {!isCreate && (
              <DeleteButtonStyled to="/" onClick={handleDeleteClick}>
                Удалить
              </DeleteButtonStyled>
            )}
          </StaffButtonWrap>
        </>
      )}
    </ProductWrapStyled>
  );
};
