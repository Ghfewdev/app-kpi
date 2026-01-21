"use client";

import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine
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
                return A / B;

            default:
                console.warn("Unknown formula:", formula);
                return 0;
        }
    };

    const buildCumulativeAvg = (rows) => {
        let sum = 0;

        return rows.map((item, index) => {
            const A = Number(item.value_a);
            const B = Number(item.value_b);

            const value = calculateByFormula(A, B, item.formula);
            sum += value;

            return {
                quarter: item.quarter,
                cumulativeAvg: Number((sum / (index + 1)).toFixed(2)),
                value: Number(value.toFixed(2)),
                target: Number(item.target_value)
            };
        });
    };

    useEffect(() => {
        if (!year || !agencyId || !indicatorId) return;

        setLoading(true);

        var url = `${import.meta.env.VITE_APP_API}/api/indicatorde/${year}/${agencyId}/${indicatorId}`;

        if (agencyId === 0) {
            url = `${import.meta.env.VITE_APP_API}/api/admin/indicatorde/${year}/${indicatorId}`;
        }

        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(result => {
                // กัน Q สลับลำดับ
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

    const chartData = buildCumulativeAvg(data);
    const targetValue = chartData[0]?.target;





    return (

        <div
            style={{
                width: "100%",
                height: 350,
                display: "flex",
                justifyContent: "center", // จัดกลางแนวนอน
                alignItems: "center",     // จัดกลางแนวตั้ง
            }}
        >

            <div style={{ width: "70%", height: "100%" }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="cumulativeAvg"
                            name="ค่าเฉลี่ยสะสม"
                            strokeWidth={3}
                        />

                        {/* Target */}
                        {targetValue !== undefined && (
                            <ReferenceLine
                                y={targetValue}
                                stroke="red"
                                strokeDasharray="5 5"
                                label={{
                                    value: `Target ${targetValue}`,
                                    position: "bottom",
                                    // dy: 8,
                                    fill: "red",
                                    fontSize: 12
                                }}
                            />

                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IndicatorCumulativeChart;
