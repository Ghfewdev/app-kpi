import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Group A", value: 48 },
  { name: "Group B", value: 4 },
  { name: "Group C", value: 48 },
];
const COLORS = ["red", "black", "green"];


export default function Solve() {
  return (
    <PieChart width={350} height={200}>
      <Pie
        data={data}
        cx={185}
        cy={170}
        startAngle={180}
        endAngle={0}
        innerRadius={110}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
