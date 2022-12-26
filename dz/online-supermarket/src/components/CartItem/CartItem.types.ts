import { SellingProductPopulated } from "../../store/order/order.types";

export type CartItemProps = SellingProductPopulated & { disabled?: boolean };
