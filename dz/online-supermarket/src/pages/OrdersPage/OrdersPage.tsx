import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RadioInput } from "../../components/RadioInput";
import { Product, SellingStatus } from "../../constant/types";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  confirmSelling,
  getFullOrderList,
  rejectSelling,
} from "../../store/order/order.actions";
import { setProduct } from "../../store/product";
import {
  ButtonContainerStyled,
  ConfirmButtonStyled,
  DateInputStyled,
  FilterButtonContainerStyled,
  FilterContainerStyled,
  ListStyled,
  OrderElementStyled,
  OrdersHeadStyled,
  OrdersWrapStyled,
  ProductLinkStyled,
  RejectButtonStyled,
  UserTitleStyled,
} from "./OrdersPage.styles";

export const OrdersPage = () => {
  const { fullOrderList, orderListEmpty, user } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();

  const [filterStatus, setFilterStatus] = useState<string>();
  const [filterDate, setFilterDate] = useState<string>();

  useEffect(() => {
    if (!fullOrderList.length && !orderListEmpty) {
      dispatch(getFullOrderList());
    }
  }, [dispatch, fullOrderList.length, orderListEmpty]);

  const makeHandleClick = useCallback(
    (product?: Product) => () => {
      product && void dispatch(setProduct(product));
    },
    [dispatch]
  );

  const makeHandleConfirmClick = useCallback(
    (id: number) => () => dispatch(confirmSelling(id)),
    [dispatch]
  );

  const makeHandleRejectClick = useCallback(
    (id: number) => () => dispatch(rejectSelling(id)),
    [dispatch]
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setFilterDate(e.target.value),
    []
  );

  const handleResetClick = useCallback(() => {
    setFilterDate(undefined);
    setFilterStatus(undefined);
    dispatch(getFullOrderList());
  }, [dispatch]);

  const handleFilterClick = useCallback(
    () =>
      dispatch(
        getFullOrderList({ createdDate: filterDate, status: filterStatus })
      ),
    [dispatch, filterDate, filterStatus]
  );

  const renderedItems = useMemo(() => {
    return (
      <ListStyled>
        {fullOrderList
          .filter((selling) => {
            if (user?.is_staff) return selling.products.length;
            return (
              selling.status !== SellingStatus.PENDING &&
              selling.status !== SellingStatus.PAID
            );
          })
          .map((selling) => (
            <OrderElementStyled
              isConfirm={selling.status === SellingStatus.PAID}
            >
              {user?.is_staff ? (
                <UserTitleStyled>
                  {`Пользователь #${selling.customer_id}, ${
                    selling.status === SellingStatus.PENDING
                      ? "Корзина"
                      : "Заказ"
                  } №${selling.id}, 
                    ${selling.created_date}`}
                </UserTitleStyled>
              ) : undefined}
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
                        {` (${count} шт.)`}
                      </div>
                    )
                )}
              </div>
              {selling.status === SellingStatus.PAID && user?.is_staff && (
                <ButtonContainerStyled>
                  <ConfirmButtonStyled
                    onClick={makeHandleConfirmClick(selling.id ?? 0)}
                  >
                    Подтвердить
                  </ConfirmButtonStyled>
                  <RejectButtonStyled
                    onClick={makeHandleRejectClick(selling.id ?? 0)}
                  >
                    Отказать
                  </RejectButtonStyled>
                </ButtonContainerStyled>
              )}
            </OrderElementStyled>
          ))}
      </ListStyled>
    );
  }, [
    filterStatus,
    fullOrderList,
    makeHandleClick,
    makeHandleConfirmClick,
    makeHandleRejectClick,
    user?.is_staff,
  ]);

  return (
    <OrdersWrapStyled>
      <div>
        <OrdersHeadStyled>История заказов</OrdersHeadStyled>
        {user?.is_staff && (
          <FilterContainerStyled>
            <FilterButtonContainerStyled>
              <DateInputStyled
                type="date"
                value={filterDate}
                onChange={handleDateChange}
              />
              <RadioInput
                values={Object.values(SellingStatus)}
                selectedValue={filterStatus}
                setSelectedValue={setFilterStatus}
                title="Статус:"
              />
            </FilterButtonContainerStyled>
            <FilterButtonContainerStyled>
              <RejectButtonStyled onClick={handleResetClick}>
                Сброс
              </RejectButtonStyled>
              <ConfirmButtonStyled onClick={handleFilterClick}>
                Поиск
              </ConfirmButtonStyled>
            </FilterButtonContainerStyled>
          </FilterContainerStyled>
        )}
        {renderedItems}
      </div>
    </OrdersWrapStyled>
  );
};
