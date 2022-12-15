import React, { useCallback, useEffect, useMemo } from "react";
import { Product, SellingStatus } from "../../constant/types";
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
  }, [dispatch, fullOrderList.length]);

  const makeHandleClick = useCallback(
    (product?: Product) => () => {
      product && void dispatch(setProduct(product));
    },
    [dispatch]
  );

  const renderedItems = useMemo(() => {
    return (
      <ul>
        {fullOrderList
          .filter((selling) => selling.status !== SellingStatus.PENDING)
          .map((selling) => (
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
  }, [fullOrderList, makeHandleClick]);

  return (
    <OrdersWrapStyled>
      <div>
        <OrdersHeadStyled>История заказов</OrdersHeadStyled>
        {renderedItems}
      </div>
    </OrdersWrapStyled>
  );
};
