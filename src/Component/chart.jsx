"use client";

import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    Cell
} from "recharts";

const IndicatorCumulativeChart = ({
    year,
    agencyId,
    indicatorId
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const calculateByFormula = (A, B, formula) => {
        switch (formula) {
            case "(A/B)*100":
                return B !== 0 ? (A / B) * 100 : 0;
            case "(A+B)/2":
                return (A + B) / 2;
            case "A":
                return A;
            case "A*B":
                return A * B;
            case "((A-B)/B)*100":
                return B !== 0 ? ((A - B) / B) * 100 : 0;
            case "(A/B)*1.25":
                return B !== 0 ? (A / B) * 1.25 : 0;
            case "A-B":
                return A - B;
            case "A/B":
                return B !== 0 ? A / B : 0;
            case "A+B":
                return A + B;
            default:
                console.warn("Unknown formula:", formula);
                return 0;
        }
    };

    const buildQuarterData = (rows) => {
        return rows.map((item) => {
            const A = Number(item.value_a);
            const B = Number(item.value_b);

            const value = calculateByFormula(A, B, item.formula);

            return {
                quarter: item.quarter,
                value: Number(value.toFixed(2)),
                target: Number(item.target_value)
            };
        });
    };

    useEffect(() => {
        if (!year || !agencyId || !indicatorId) return;

        setLoading(true);

        let url = `${import.meta.env.VITE_APP_API}/api/indicatorde/${year}/${agencyId}/${indicatorId}`;

        if (agencyId === 0) {
            url = `${import.meta.env.VITE_APP_API}/api/admin/indicatorde/${year}/${indicatorId}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(result => {
                const order = ["Q1", "Q2", "Q3", "Q4"];
                result.sort(
                    (a, b) =>
                        order.indexOf(a.quarter) - order.indexOf(b.quarter)
                );

                setData(result);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [year, agencyId, indicatorId]);

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (!data.length) return null;

    const chartData = buildQuarterData(data);
    const targetValue = chartData[0]?.target;

    return (
        <div
            style={{
                width: "100%",
                height: 350,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ width: "70%", height: "100%" }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="value" name="ค่ารายไตรมาส">
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.value >= entry.target
                                            ? "#16a34a" // เขียว (ผ่าน)
                                            : "#dc2626" // แดง (ไม่ผ่าน)
                                    }
                                />
                            ))}
                        </Bar>

                        {targetValue !== undefined && (
                            <ReferenceLine
                                y={targetValue}
                                stroke="red"
                                strokeDasharray="5 5"
                                label={{
                                    value: `Target ${targetValue}`,
                                    position: "top",
                                    fill: "red",
                                    fontSize: 12
                                }}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IndicatorCumulativeChart;