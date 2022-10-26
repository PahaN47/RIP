import React, { useMemo } from "react";
import {
  PRODUCT_LINK,
  PRODUCT_REQUEST,
  SELLING_PRODUCT_REQUEST,
  SELLING_REQUEST,
} from "../../constant/links";
import { Product, Selling, SellingProduct } from "../../constant/types";
import { useFetch } from "../../hooks/useFetch";
import {
  OrderElementStyled,
  OrdersHeadStyled,
  OrdersWrapStyled,
  ProductLinkStyled,
} from "./OrdersPage.styles";

export const OrdersPage = () => {
  const { data: productData } = useFetch<Product[]>(PRODUCT_REQUEST);
  const { data: sellingData } = useFetch<Selling[]>(SELLING_REQUEST);
  const { data: spData } = useFetch<SellingProduct[]>(SELLING_PRODUCT_REQUEST);

  const renderedItems = useMemo(() => {
    if (!productData || !sellingData || !spData) return [];
    let result: any = spData?.map((sp) => {
      return {
        ...sp,
        product: productData.find(({ pk }) => pk === sp.product_id),
      };
    });
    result = sellingData.map((selling) => {
      return {
        ...selling,
        bought: result.filter((item: any) => item.selling_id === selling.pk),
      };
    });

    return (
      <ul>
        {result.map((selling: any) => (
          <OrderElementStyled>
            <div>
              {selling.bought.map((item: any) => (
                <div>
                  <ProductLinkStyled
                    href={`${PRODUCT_LINK}/${item.product.pk}`}
                  >
                    &ldquo;{item.product.name}&ldquo;
                  </ProductLinkStyled>{" "}
                  X {item.count}
                </div>
              ))}
            </div>
          </OrderElementStyled>
        ))}
      </ul>
    );
  }, [productData, sellingData, spData]);

  return (
    <OrdersWrapStyled>
      <div>
        <OrdersHeadStyled>История заказов</OrdersHeadStyled>
        {renderedItems}
      </div>
    </OrdersWrapStyled>
  );
};
