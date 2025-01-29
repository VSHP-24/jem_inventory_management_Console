import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import Heading from "../../ui/Heading";

import { generateRandomColor } from "../../utils/generateRandomColor";
import { device } from "../../utils/devices";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-gold-200);
  border: 1px solid var(--color-gold-700);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media ${device.laptopL} {
    grid-column: 1 / span 2;
  }

  @media ${device.mobileM} {
    grid-column: 1 / span 1;
  }
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  padding-top: 10rem;
`;

function setCategoryData(categories) {
  const startData = categories.map((categoryEl) => {
    const categorySet = {
      category: categoryEl.name,
      value: 0,
      color: generateRandomColor(),
    };

    return categorySet;
  });
  return startData;
}

function prepareData(startData, orders) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.category === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = orders
    .reduce((arr, cur) => {
      const check = cur.orderItems.reduce((accum, current) => {
        return incArrayValue(accum, current.product.category.name);
      }, arr);
      return check;
    }, startData)
    .filter((obj) => obj.value > 0);
  return data;
}

function CategoryChart({ orders, categories, numDays }) {
  const startData = setCategoryData(categories);
  const data = prepareData(startData, orders);

  return (
    <ChartBox>
      <Heading as="h2">Category Sales Summary</Heading>

      {data.length === 0 && (
        <NoActivity>No sales in the last {numDays} days 😶</NoActivity>
      )}

      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            nameKey="category"
            dataKey="value"
            innerRadius={"60%"}
            outerRadius={"80%"}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.category}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="middle"
            align="right"
            width="40%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default CategoryChart;
