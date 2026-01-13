import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import "chartjs-gauge";
import Authen from '../Component/Authen';
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";


const Dashboard = () => {

  Authen();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [data, setData] = useState([]);

  const [fiscalYear, setFiscalYear] = useState("2026");
  const [quarter, setQuarter] = useState("Q1");


  const fetchSummary = async () => {
    setLoading(true);
    console.log(data)
    try {
      const res = await axios.get("http://localhost:3000/api/kpi-summary", {
        params: {
          fiscal_year: fiscalYear,
          quarter: quarter,
        },
      });

      const { data: detail, ...summaryOnly } = res.data;

      setSummary(summaryOnly);
      setData(detail);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const datag = Object.entries(summary)
    .filter(([key]) => key !== "indicators ทั้งหมด")
    .map(([agency, info]) => ({
      name: agency,
      sent: info.sent,
      pass: info.pass,
      percent: Number(info.persent),
    }));


  function transformSummary(summary) {
    const result = {};

    summary.data.forEach(item => {
      const code = item.indicators_code;
      const agency = item.agency_name;

      if (!result[code]) {
        result[code] = {};
      }

      result[code][agency] = {
        actual_value: Number(item.actual_value),
        target_value: Number(item.target_value),
      };
    });

    return result;
  }

  const indicators = transformSummary({ data });

  const charts = Object.entries(indicators).map(([kpi, agencyList]) => ({
    kpi,
    data: Object.entries(agencyList).map(([agency, values]) => ({
      name: agency,
      actual_value: Number(values.actual_value),
      target_value: Number(values.target_value),
    })),
  }));


  useEffect(() => {

    fetchSummary();

  }, [])


  return (
    <div>
      <Navbar />
      <div className="a1">
        <h1 className="a2">📊 KPI DASHBOARD</h1>

        {/* FILTER */}
        <div className="a3">
          <div>
            <label className="font-semibold">ปีงบประมาณ</label>
            <select
              className="a4"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value={2026}>2569</option>
              <option value={2027}>2570</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">ไตรมาส</label>
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

        <button
          onClick={fetchSummary}
          className="a5"
        >
          🔍 Load Data
        </button>

        {/* SUMMARY */}
        <div className="a6">
          {Object.entries(summary).map(([key, val]) => {
            if (key === "indicators ทั้งหมด") {
              return (
                <div key={key} className="a7">
                  <h2 className="a8">ตัวชี้วัดทั้งหมด</h2>
                  <p className="a9">{val}</p>
                </div>
              );
            }
          })}

          <br />

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={datag}>
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(v) => `${v.toFixed(2)}`} />
              <Bar dataKey="percent" name="% สำเร็จ" fill="#3a564cff" label={{position: 'top', formatter: (value) => value.toFixed(2)}} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <br />


          <div className="grid-container">
            {charts.map(({ kpi, data }) => (
              <div key={kpi} className="">

                <h4 className="">
                  ตัวชี้วัด: {kpi} เป้าหมาย: {data[0].target_value}
                </h4>

                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, data[0].target_value]}  unit="" />
                    <Tooltip formatter={(v) => `${v.toFixed(2)}`} />
                    <Legend />

                    <Bar
                      dataKey="actual_value"
                      name="ผลลัพธ์"
                      fill="#34d399"
                      radius={[10, 10, 0, 0]}
                      label={{position: 'top', formatter: (value) => value.toFixed(2)}}
                    />

                    <ReferenceLine
                      y = {data[0].target_value}
                      stroke="#ef4444"
                      strokeWidth={3}
                      strokeDasharray="4 4"
                      
                    // label={data[0].target_value}
                    
                    />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

        </div>
        

        {/* TABLE */}
        {/* <h2 className="text-xl font-bold mt-10 mb-4">📄 รายละเอียดตัวชี้วัด</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">หน่วยงาน</th>
                <th className="p-2">Indicator</th>
                <th className="p-2">Formula</th>
                <th className="p-2">Actual</th>
                <th className="p-2">Target</th>
                <th className="p-2">Passed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{r.agency_name}</td>
                  <td className="p-2">
                    {r.indicators_code} - {r.indicators_name}
                  </td>
                  <td className="p-2">{r.formula}</td>
                  <td className="p-2">{r.actual_value}</td>
                  <td className="p-2">{r.target_value}</td>
                  <td className="p-2">
                    {r.passed ? (
                      <span className="text-green-600 font-bold">✔</span>
                    ) : (
                      <span className="text-red-600 font-bold">✘</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}
      </div>
      <Footer />
      <br />
    </div>
  )
}

export default Dashboard
