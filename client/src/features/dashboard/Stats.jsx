import { GiWallet } from "react-icons/gi";
import {
  HiOutlineBanknotes,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { BsHouseGear } from "react-icons/bs";

import Stat from "./Stat";

import { formatCurrency } from "../../utils/helpers";

function Stats({ orders, totalOrders, purchases, parts }) {
  const sales = orders.reduce(
    (accumulator, currentValue) => accumulator + currentValue.cost,
    0
  );

  const expenses = purchases.reduce(
    (accumulator, currentValue) => accumulator + currentValue.purchaseCost,
    0
  );

  return (
    <>
      <Stat
        title="Purchase"
        color="expense"
        icon={<GiWallet />}
        value={`${formatCurrency(expenses)}`}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={`${formatCurrency(sales)}`}
      />

      <Stat
        title="Orders"
        color="blue"
        icon={<HiOutlineClipboardDocumentCheck />}
        value={totalOrders.length}
      />

      <Stat
        title="Stockout"
        color="orange"
        icon={<BsHouseGear />}
        value={parts.length}
      />
    </>
  );
}

export default Stats;
