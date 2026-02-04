import { useEffect, useState } from "react";

export default function CheckingMatrix() {
  const [data, setData] = useState([]);

  // filters
  const [yearFilter, setYearFilter] = useState("ALL");
  const [quarterCheck, setQuarterCheck] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false
  });

  const lis = ["รพก", "รพต", "รพจ", "รพท", "รพว", "รพภ", "รพร", "รพส", "รพข", "รพป", "รพบ", "สก", "ศบฉ", "สพบ"]

  // =========================
  // Fetch API
  // =========================
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API+"/api/checking")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  // =========================
  // Axis (❗ใช้ data ทั้งหมด)
  // =========================
  const agencies = [...new Set(data.map(d => d.agency_id))].sort(
    (a, b) => a - b
  );

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

  const countQuarters = r =>
    r.has_q1 + r.has_q2 + r.has_q3 + r.has_q4;

  const getBgColor = r => {
    if (!r) return "#dddde4";
    return (
      {
        0: "#e95656",
        1: "#3abe50",
        2: "#3ee6ca",
        3: "#2f8d9e",
        4: "#2c91e4"
      }[countQuarters(r)] || "#e5e7eb"
    );
  };

  const renderQ = v => (v === 1 ? "✔" : "✖");

  // 👉 Q1–Q4 filter ใช้แค่ลดความเด่น
  const isQuarterMatched = r => {
    const selected = Object.entries(quarterCheck)
      .filter(([, v]) => v)
      .map(([k]) => k);

    if (selected.length === 0) return true;
    if (!r) return false;

    return selected.some(q => r[`has_${q}`] === 1);
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: 20 }}>
      <h2>การส่งตัวชี้วัด</h2>

      {/* Filters */}
      <div style={{ marginBottom: 16 }}>
        {/* fiscal year */}
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
          {/* <option value="ALL">ทุกปีงบประมาณ</option> */}
          {/* <option value="NULL">ไม่ระบุปี</option> */}
          {[...new Set(data.map(d => d.fiscal_year).filter(Boolean))]
            .sort()
            .map(y => (
              <option key={y} value={y}>{y+543}</option>
            ))}
        </select>

        {/* Q1–Q4 checkbox */}
        <div style={{ marginTop: 8 }}>
          {["q1", "q2", "q3", "q4"].map(q => (
            <label key={q} style={{ marginRight: 12 }}>
              <input
                type="checkbox"
                checked={quarterCheck[q]}
                onChange={e =>
                  setQuarterCheck({
                    ...quarterCheck,
                    [q]: e.target.checked
                  })
                }
              />{" "}
              {q.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th>ตัวชี้วัด / หน่วยงาน</th>
              {agencies.map((a, i)=> (
                <th key={a}>{lis[i]}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {indicators.map(code => (
              <tr key={code}>
                <td style={{ fontWeight: "bold", background: "#f3f4f6" }}>{code}</td>

                {agencies.map(a => {
                  const r = getRecord(a, code);
                  const matched = isQuarterMatched(r);

                  return (
                    <td
                      key={a}
                      style={{
                        textAlign: "center",
                        background: getBgColor(r),
                        fontSize: 13,
                        opacity: matched ? 1 : 0.25,
                        filter: matched ? "none" : "grayscale(100%)"
                      }}
                      title={
                        r
                          ? `Q1:${r.has_q1} Q2:${r.has_q2} Q3:${r.has_q3} Q4:${r.has_q4}`
                          : "ไม่ต้องส่ง"
                      }
                    >
                      {r ? (
                        <>
                          {/* Q1 {renderQ(r.has_q1)}{" "}
                          Q2 {renderQ(r.has_q2)}{" "}
                          Q3 {renderQ(r.has_q3)}{" "}
                          Q4 {renderQ(r.has_q4)} */}
                        </>
                      ) : (
                        "–"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 16 }}>
        {/* ✔ = ส่งแล้ว &nbsp; ✖ = ยังไม่ส่ง &nbsp; – = ไม่ต้องส่ง */}
      </div>
    </div>
  );
}
