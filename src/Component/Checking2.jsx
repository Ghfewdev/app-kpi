import { useEffect, useState } from "react";

export default function CheckingMatrix() {
  const [data, setData] = useState([]);
  const [yearFilter, setYearFilter] = useState("ALL");

  // ✅ ใช้ radio → เลือกได้ตัวเดียว (default = q1)
  const [selectedQ, setSelectedQ] = useState("q1");

  const lis = ["รพก", "รพต", "รพจ", "รพท", "รพว", "รพภ", "รพร", "รพส", "รพข", "รพป", "รพบ", "สก", "ศบฉ", "สพบ"];

  // =========================
  // Fetch API
  // =========================
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API + "/api/checking")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  // =========================
  // Axis
  // =========================
  const agencies = [...new Set(data.map(d => d.agency_id))].sort((a, b) => a - b);
  const indicators = [...new Set(data.map(d => d.indicator_code))].sort();

  // =========================
  // Helpers
  // =========================
  const getRecord = (agencyId, code) =>
    data.find(
      d =>
        d.agency_id === agencyId &&
        d.indicator_code === code &&
        (
          yearFilter === "ALL"
            ? true
            : yearFilter === "NULL"
            ? d.fiscal_year === null
            : d.fiscal_year === Number(yearFilter)
        )
    );

  const getBgColorByQ = (r, q) => {
    if (!r) return "#e5e7eb"; // เทา
    return r[`has_${q}`] === 1 ? "#22c55e" : "#ef4444"; // เขียว / แดง
  };

  // =========================
  // Styles
  // =========================
  const thStyle = {
    border: "1px solid #000",
    padding: "6px",
    textAlign: "center"
  };

  const tdStyle = {
    border: "1px solid #000",
    padding: "4px",
    textAlign: "center",
    height: 28
  };

  // =========================
  // Render Table
  // =========================
  const renderTable = (q) => (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 10 }}>ไตรมาส {q.toUpperCase()}</h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "2px solid #000"
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={thStyle}>ตัวชี้วัด / หน่วยงาน</th>
              {agencies.map((a, i) => (
                <th key={a} style={thStyle}>{lis[i]}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {indicators.map(code => (
              <tr key={code}>
                <td style={{ ...tdStyle, fontWeight: "bold", background: "#f3f4f6" }}>
                  {code}
                </td>

                {agencies.map(a => {
                  const r = getRecord(a, code);

                  return (
                    <td
                      key={a}
                      style={{
                        ...tdStyle,
                        background: getBgColorByQ(r, q)
                      }}
                      title={
                        r
                          ? `${q.toUpperCase()}: ${r[`has_${q}`]}`
                          : "ไม่ต้องส่ง"
                      }
                    >
                      {r ? "" : "–"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>การส่งตัวชี้วัด (แยกตามไตรมาส)</h2>

      {/* Filter ปี */}
      <div style={{ marginBottom: 12 }}>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
          {[...new Set(data.map(d => d.fiscal_year).filter(Boolean))]
            .sort()
            .map(y => (
              <option key={y} value={y}>
                {y + 543}
              </option>
            ))}
        </select>
      </div>

      {/* ✅ Radio เลือก Q */}
      <div style={{ marginBottom: 16 }}>
        {["q1", "q2", "q3", "q4"].map(q => (
          <label key={q} style={{ marginRight: 16 }}>
            <input
              type="radio"
              name="quarter"
              value={q}
              checked={selectedQ === q}
              onChange={() => setSelectedQ(q)}
            />{" "}
            {q.toUpperCase()}
          </label>
        ))}
      </div>

      {/* ✅ แสดงแค่ Q ที่เลือก */}
      {renderTable(selectedQ)}
    </div>
  );
}