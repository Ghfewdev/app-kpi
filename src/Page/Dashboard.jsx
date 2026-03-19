"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Authen from "../Component/Authen";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

const Dashboard = () => {
  Authen();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [data, setData] = useState([]);

  const [fiscalYear, setFiscalYear] = useState("2026");
  const [quarter, setQuarter] = useState("Q1");

  // =========================
  // ✅ FORMULA (ใช้ value_a / value_b)
  // =========================
  function calculate(A, B, formula) {
    if (B === 0 && formula.includes("B")) return 0;

    switch (formula) {
      case "(A/B)*100": return (A / B) * 100;
      case "(A+B)/2": return (A + B) / 2;
      case "A": return A;
      case "A*B": return A * B;
      case "((A-B)/B)*100": return ((A - B) / B) * 100;
      case "A/B": return A / B;
      case "(A/B)*1.25": return (A / B) * 1.25;
      case "A-B": return A - B;
      case "A+B": return A + B;
      default: return 0;
    }
  }

  function checkPass(result, target, operator) {
    switch (operator) {
      case ">=": return result >= target;
      case "<=": return result <= target;
      case ">": return result > target;
      case "<": return result < target;
      default: return false;
    }
  }

  // =========================
  // ✅ FETCH DATA
  // =========================
  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_API + "/api/kpi-summary",
        {
          params: {
            fiscal_year: fiscalYear,
            quarter: quarter,
          },
        }
      );

      const { data: detail, ...summaryOnly } = res.data;

      setSummary(summaryOnly);
      setData(detail);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // =========================
  // ✅ SUMMARY BAR
  // =========================
  const datag = Object.entries(summary)
    .filter(([key]) => key !== "indicators ทั้งหมด")
    .map(([agency, info]) => ({
      name: agency,
      percent: Number(info.persent),
    }));

  // =========================
  // ✅ GROUP BY TYPE + KPI
  // =========================
  function buildCharts(data) {
    const grouped = {};

    data.forEach((item) => {
      const type = item.type;
      const code = item.indicators_code;

      // 🔥 ใช้ value_a / value_b (ตัวจริง)
      const A = Number(item.value_a);
      const B = Number(item.value_b);

      const result = calculate(A, B, item.formula);
      const target = Number(item.target_value);
      const pass = checkPass(result, target, item.operator);

      if (!grouped[type]) grouped[type] = {};
      if (!grouped[type][code]) grouped[type][code] = [];

      grouped[type][code].push({
        name: item.agency_name,
        result,
        target,
        pass,
      });
    });

    return grouped;
  }

  const groupedCharts = buildCharts(data);

  // =========================
  // ✅ COMPONENT CHART
  // =========================
  const ChartSection = ({ title, charts }) => (
    <>
      <div className="text-center bg-success text-white p-2 m-2 border border-dark rounded">
        <span className="fs-1">{title}</span>
      </div>
      <div className="grid-container">
        {Object.entries(charts || {}).map(([kpi, list]) => (
          <div key={kpi}>
            <h5>
              ตัวชี้วัด: {kpi} | เป้าหมาย: {list[0]?.target}
            </h5>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={list}>
                <XAxis dataKey="name" />

                <YAxis
                  domain={[0, list[0]?.target || 0]}
                  tickFormatter={(v) => v.toFixed(2)}
                />

                <Tooltip formatter={(v) => v.toFixed(2)} />
                <Legend />

                <Bar dataKey="result" name="ผลลัพธ์">
                  {list.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.pass ? "#22c55e" : "#ef4444"}
                    />
                  ))}
                </Bar>

                <ReferenceLine
                  y={list[0]?.target}
                  stroke="#000"
                  strokeDasharray="4 4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </>
  );

  // =========================
  // ✅ LOAD
  // =========================
  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="a1">
        <h1 className="a2">📊 KPI DASHBOARD</h1>

        {/* FILTER */}
        <div className="a3">
          <div>
            <label>ปีงบประมาณ</label>
            <select
              className="a4"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value="2026">2569</option>
              <option value="2027">2570</option>
            </select>
          </div>

          <div>
            <label>ไตรมาส</label>
            <select
              className="a4"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
          </div>
        </div>

        <button onClick={fetchSummary} className="a5">
          🔍 Load Data
        </button>

        {/* SUMMARY */}
        <div className="a6">
          {Object.entries(summary).map(([key, val]) => {
            if (key === "indicators ทั้งหมด") {
              return (
                <div key={key} className="a7 mb-4">
                  <h2 className="a8">ตัวชี้วัดทั้งหมด</h2>
                  <p className="a9">{val}</p>
                </div>
              );
            }
            return null;
          })}

          {/* BAR SUMMARY */}

          <div className="text-center bg-success text-white p-2 m-2 border border-dark rounded">
            <span className="fs-1">เปอร์เซ็นต์การผ่านของทุกหน่วยงาน</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={datag}>
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(v) => v.toFixed(2)} />

              <Bar
                dataKey="percent"
                name="% สำเร็จ"
                fill="rgb(112, 212, 99)"
                label={{
                  position: "top",
                  formatter: (v) => v.toFixed(2),
                }}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* TYPE */}
          <ChartSection title="ตัวชี้วัดประเภทที่ 1.1" charts={groupedCharts["1.1"]} />
          <ChartSection title="ตัวชี้วัดประเภทที่ 1.2" charts={groupedCharts["1.2"]} />
          <ChartSection title="ตัวชี้วัดประเภทที่ 2" charts={groupedCharts["2"]} />
          <ChartSection title="ตัวชี้วัดประเภทที่ 3" charts={groupedCharts["3"]} />
        </div>
      </div>

      <Footer />
      <br />
    </div>
  );
};

export default Dashboard;