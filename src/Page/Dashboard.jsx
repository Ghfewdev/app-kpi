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
import KPIProgress from "../Component/Pc";

const Dashboard = () => {
  Authen();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [data, setData] = useState([]);
  const [openKeys, setOpenKeys] = useState(["1.1"]);

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

  const toggle = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key) // ปิด
        : [...prev, key] // เปิดเพิ่ม
    );
  };

  function countPassedFast(datat) {
    const passed = datat.filter(d => d.passed).length;
    return [passed, datat.length];
  }

  function getAllPassed(data) {
    return Object.entries(data)
        .filter(([key]) => key !== "indicators ทั้งหมด" && key !== "data" && key !== "type")
        .map(([agencyName, value]) => {
            // return {
            //     agency: agencyName,
            //     result: [value.pass || 0, value.sent ?? 0, value.must ?? 13]
            // };
            return [value.pass || 0, value.sent ?? 0, value.must ?? 13]
        });
}

function sumAll(data) {
    return Object.entries(data)
        .filter(([key]) => key !== "indicators ทั้งหมด" && key !== "data" && key !== "type")
        .reduce(
            (acc, [_, value]) => {
                acc.pass += value.pass || 0;
                acc.sent += value.sent ?? 0;
                acc.must += value.must ?? 13;
                return acc;
            },
            { pass: 0, sent: 0, must: 0 }
        );
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

    // console.log(getAllPassed(summary))
    console.log(sumAll(summary))

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
      // console.log(datat)
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // =========================
  // ✅ SUMMARY BAR
  // =========================
  const datag = Object.entries(summary)
    .filter(([key]) => key !== "indicators ทั้งหมด" && key !== "type")
    .map(([agency, info]) => ({
      name: agency,
      percent: Number(info.persent),
    }));

  const datat = Object.entries(summary)
    .filter(([key]) => key === "type" || key === "indicators ทั้งหมด")
    ;

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
      const ind = String(item.indicators_name);
      const pass = checkPass(result, target, item.operator);

      if (!grouped[type]) grouped[type] = {};
      if (!grouped[type][code]) grouped[type][code] = [];

      grouped[type][code].push({
        name: item.agency_name,
        result,
        target,
        pass,
        ind
      });
    });

    return grouped;
  }

  const groupedCharts = buildCharts(data);

  // =========================
  // ✅ COMPONENT CHART
  // =========================

  const ChartSection = ({ title, charts, open, onToggle }) => {
    return (
      <div className="mb-1">
        <div
          className="d-flex justify-content-between align-items-center bg-success text-white p-2 border border-dark rounded"
          style={{ cursor: "pointer" }}
          onClick={onToggle}
        >
          <span className="fs-5">{title}</span>
          <span className="fs-5">{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <div className="grid-container mt-2">
            {Object.entries(charts || {}).map(([kpi, list]) => {
              // console.log(list)
              return (
                <div key={kpi} className="mb-3 p-2 border rounded">
                  <h6>
                    ตัวชี้วัด: {kpi} | เป้าหมาย: {list[0]?.target}
                  </h6>
                  <p className="fonts">
                    {list[0]?.ind}
                  </p>


                  <ResponsiveContainer width="90%" height={120}>
                    <BarChart data={list}>
                      <XAxis dataKey="name" />

                      <YAxis
                        domain={[0, list[0]?.target || 0]}
                        tickFormatter={(v) => v.toFixed(2)}
                      />

                      <Tooltip formatter={(v) => v.toFixed(2)} />
                      {/* <Legend /> */}

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
              )
            })}
          </div>
        )}
      </div>
    );
  };


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

        {/* {countPassedFast(data)[0]}
        <br />
        {countPassedFast(data)[1]}
        <br /> */}

        
        {/* {getAllPassed(summary)} */}

        {/* SUMMARY */}
        <div className="a6">
          {/* {Object.entries(summary).map(([key, val]) => {
            if (key === "indicators ทั้งหมด") {
              return (
                <div key={key} className="a7 mb-4">
                  <h2 className="a8">ตัวชี้วัดทั้งหมด</h2>
                  <p className="a9">{val}</p>
                </div>
              );
            }
            return null;
          })} */}

          {/* BAR SUMMARY */}


          <div>
            <div className="row">
              <div className="col-8 m-3 p-2 border rounded">
                <div className="text-center bg-success text-white p-2 mb-2 border border-dark rounded">
                  <span className="fs-3">สัดส่วนการบรรลุผลสำเร็จตัวชี้วัด</span>
                </div>
                <br />
                <ResponsiveContainer width="95%" height={300}>
                  <BarChart data={datag}>
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(v) => v.toFixed(2)} />

                    <Bar
                      dataKey="percent"
                      name="% สำเร็จ"
                      fill="rgb(112, 212, 99)"
                    // label={{
                    //   position: "top",
                    //   formatter: (v) => v.toFixed(2),
                    // }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col m-3 p-2 border rounded">
                <div className="text-center bg-success text-white p-2 mb-2 border border-dark rounded">
                  <span className="fs-3">ประเภทตัวชี้วัด</span>
                </div>
                {Object.entries(summary).map(([key, val]) => {
                  if (key === "indicators ทั้งหมด") {
                    return (
                      <div key={key} className="a7 mb-1">
                        <h2 className="a8">ตัวชี้วัดทั้งหมด: <span className="text-primary">{val}</span></h2>
                        
                        <KPIProgress data={summary} />
                      </div>
                    );
                  }
                  return null;
                })}

                {Object.entries(summary).map(([key, val]) => {
                  if (key === "type") {
                    // console.log(val)
                    return (
                      <div key={key} className="a7 mb-1">
                        <div className="row">
                          <h2 className="a8 col">องค์ประกอบที่ 1.1: <br /><span className="text-primary">{val.type1}</span></h2>
                          <h2 className="a8 col">องค์ประกอบที่ 1.2: <br /><span className="text-primary">{val.type2}</span></h2>
                        </div>
                        <div className="row">
                          <h2 className="a8 col">องค์ประกอบที่ 2: <br /><span className="text-primary">{val.type3}</span></h2>
                          <h2 className="a8 col">ตัวชี้วัดงานประจำ: <br /><span className="text-primary">{val.type3}</span></h2>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* {datat[0]} */}
              </div>
              {/* <div className="col">
                One of three columns
              </div> */}
            </div>
          </div>


          {/* TYPE */}
          <ChartSection
            title="องค์ประกอบที่ 1.1"
            charts={groupedCharts["1.1"]}
            open={openKeys.includes("1.1")}
            onToggle={() => toggle("1.1")}
          />
          <ChartSection
            title="องค์ประกอบที่ 1.2"
            charts={groupedCharts["1.2"]}
            open={openKeys.includes("1.2")}
            onToggle={() => toggle("1.2")}
          />
          <ChartSection
            title="องค์ประกอบที่ 2"
            charts={groupedCharts["2"]}
            open={openKeys.includes("2")}
            onToggle={() => toggle("2")}
          />
          <ChartSection
            title="ตัวชี้วัดงานประจำ"
            charts={groupedCharts["3"]}
            open={openKeys.includes("3")}
            onToggle={() => toggle("3")}
          />
        </div>
      </div>

      <Footer />
      <br />
    </div>
  );
};

export default Dashboard;