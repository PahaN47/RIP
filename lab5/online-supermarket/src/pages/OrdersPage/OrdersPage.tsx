import React, { useCallback, useEffect, useMemo } from "react";
import { Product } from "../../constant/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFullOrderList } from "../../store/order/order.actions";
import { setProduct } from "../../store/product";
import {
  OrderElementStyled,
  OrdersHeadStyled,
  OrdersWrapStyled,
  ProductLinkStyled,
} from "./OrdersPage.styles";

export const OrdersPage = () => {
  const { fullOrderList } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fullOrderList.length) {
      dispatch(getFullOrderList());
    }
  }, []);

  const makeHandleClick = useCallback(
    (product?: Product) => () => {
      product && void dispatch(setProduct(product));
    },
    [dispatch]
  );

  const renderedItems = useMemo(() => {
    return (
      <ul>
        {fullOrderList.map((selling) => (
          <OrderElementStyled>
            <div>
              {selling.products.map(
                ({ product, count }) =>
                  product && (
                    <div>
                      <ProductLinkStyled
                        to={`product/${product.id}`}
                        onClick={makeHandleClick(product)}
                      >
                        &ldquo;{product.name}&ldquo;
                      </ProductLinkStyled>{" "}
                      {` X${count}`}
                    </div>
                  )
              )}
            </div>
          </OrderElementStyled>
        ))}
      </ul>
    );
  }, [fullOrderList]);

  return (
    <OrdersWrapStyled>
      <div>
        <OrdersHeadStyled>История заказов</OrdersHeadStyled>
        {renderedItems}
      </div>
    </OrdersWrapStyled>
  );
};
