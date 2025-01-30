import styled from "styled-components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledRevenueChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function RevenueChart({ purchases, orders, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), `${numDays === "all" ? 365 : numDays - 1}`),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      sales: orders
        .filter((order) => isSameDay(date, new Date(order.createdAt)))
        .reduce((acc, cur) => acc + cur.cost, 0),
      expenses: purchases
        .filter((purchase) =>
          isSameDay(date, new Date(purchase.orderPlacedOnDate))
        )
        .reduce((acc, cur) => acc + cur.purchaseCost, 0),
    };
  });

  const colors = {
    sales: { stroke: "var(--color-green-800)", fill: "var(--color-green-700)" },
    expenses: {
      stroke: "var(--color-expense-100)",
      fill: "var(--color-expense-800)",
    },
    text: "var(--color-grey-800)",
    background: "var(--color-gold-400)",
  };

  return (
    <StyledRevenueChart>
      <Heading as="h5">
        Revenue from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            style={{
              fontSize: "1rem",
            }}
          />

          <YAxis
            unit="₹"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            style={{
              fontSize: "1rem",
            }}
          />

          <CartesianGrid strokeDasharray="4" />

          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="sales"
            type="monotone"
            stroke={colors.sales.stroke}
            fill={colors.sales.fill}
            strokeWidth={2}
            name="Sales"
            unit="₹"
          />

          <Area
            dataKey="expenses"
            type="monotone"
            stroke={colors.expenses.stroke}
            fill={colors.expenses.fill}
            strokeWidth={2}
            name="Purchases"
            unit="₹"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledRevenueChart>
  );
}

export default RevenueChart;
