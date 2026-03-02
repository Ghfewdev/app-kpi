import { useState, useMemo } from "react";
import axios from "axios";

export default function Alledit({ reports, detail, onClose }) {

    const [data, setData] = useState(reports);

    const [quarterFilter, setQuarterFilter] = useState("all");
    const [agencyFilter, setAgencyFilter] = useState("all");

    console.log(detail.variable_b_name)
    const showB = detail?.variable_b_name !== null;

    const calc = (a, b, formula) => {
        const A = Number(a);
        const B = Number(b);

        // if (!B) return 0;

        if (formula === "(A/B)*100")
            return (A / B) * 100;
        else if (formula === "A")
            return A;
        else if (formula === "A*B")
            return A * B;
        else if (formula === "((A-B)/B)*100")
            return ((A - B) / B) * 100;
        else if (formula === "A/B")
            return A / B;
        else if (formula === "(A/B)*1.25")
            return (A / B) * 1.25;
        else if (formula === "A-B")
            return A - B;
        else if (formula === "A+B")
            return A + B;

        return 0;
    };

    const checkPass = (value, operator, target) => {
        const t = Number(target);

        switch (operator) {
            case ">=":
                return value >= t;
            case ">":
                return value > t;
            case "<=":
                return value <= t;
            case "<":
                return value < t;
            case "=":
                return value === t;
            default:
                return false;
        }
    };

    const handleChange = (index, field, val) => {
        const newData = [...data];
        newData[index][field] = val;
        setData(newData);
    };

    const handleSave = async (row) => {

        try {

            const payload = {
                value_a: row.value_a,
                updated_by: row.agency_id
            };

            if (showB) {
                payload.value_b = row.value_b;
            }

            await axios.put(
                `${import.meta.env.VITE_APP_API}/api/indicator-reports/${row.report_id}`,
                payload
            );

            alert("บันทึกสำเร็จ");

        } catch (err) {
            console.error(err);
            alert("บันทึกไม่สำเร็จ");
        }

    };

    /* ---------------- agency list ---------------- */

    const agencyList = useMemo(() => {
        const list = [...new Set(data.map(r => r.agency_name))];
        return list;
    }, [data]);

    /* ---------------- filter data ---------------- */

    const filteredData = useMemo(() => {

        return data.filter(r => {

            const quarterMatch =
                quarterFilter === "all" || r.quarter === quarterFilter;

            const agencyMatch =
                agencyFilter === "all" || r.agency_name === agencyFilter;

            return quarterMatch && agencyMatch;

        });

    }, [data, quarterFilter, agencyFilter]);

    /* ---------------- group agency ---------------- */

    const grouped = useMemo(() => {

        const map = {};

        filteredData.forEach(r => {
            if (!map[r.agency_name]) map[r.agency_name] = [];
            map[r.agency_name].push(r);
        });

        return map;

    }, [filteredData]);

    let grandA = 0;
    let grandB = 0;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>



                <div className="p-4 bg-white rounded">

                    <div>
                        <b>รายละเอียด</b>
                        <br />
                        {detail.detail}
                        <br />
                        <b>หมายเหตุ: </b> <br />
                        {detail.description}
                        <br />
                        <b>วิธีคำนวณและเป้าหมาย: </b><br />
                        {detail.formula} {detail.operator} <b><u>{detail.target_value}</u></b>

                    </div>

                    <br />

                    {/* FILTER */}

                    <div className="d-flex gap-3 mb-3">

                        <select
                            className="form-select"
                            style={{ width: 200 }}
                            value={quarterFilter}
                            onChange={(e) => setQuarterFilter(e.target.value)}
                        >
                            <option value="all">ทุก ไตรมาส</option>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </select>

                        <select
                            className="form-select"
                            style={{ width: 250 }}
                            value={agencyFilter}
                            onChange={(e) => setAgencyFilter(e.target.value)}
                        >
                            <option value="all">ทุกหน่วยงาน</option>

                            {agencyList.map(a => (
                                <option key={a} value={a}>
                                    {a}
                                </option>
                            ))}

                        </select>

                    </div>

                    <table className="table table-bordered text-center">

                        <thead>
                            <tr>
                                <th>หน่วยงาน</th>
                                <th>ไตรมาส</th>
                                <th>A</th>
                                {showB && <th>B</th>}
                                <th>ผลคำนวณ</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>

                        <tbody>

                            {Object.entries(grouped).map(([agency, rows]) => {

                                let sumA = 0;
                                let sumB = 0;

                                rows.forEach(r => {
                                    sumA += Number(r.value_a);
                                    sumB += Number(r.value_b);
                                });

                                grandA += sumA;
                                grandB += sumB;

                                const summaryValue = calc(sumA, sumB, rows[0].formula);
                                const pass = checkPass(summaryValue, rows[0].operator, rows[0].target_value);

                                return (
                                    <>

                                        <tr key={"sum-" + agency} className="table-secondary">
                                            <td><b><u>{agency}</u></b></td>
                                            <td>รวม</td>
                                            <td>{sumA}</td>
                                            {showB && <td>{sumB}</td>}
                                            <td className={pass ? "text-success" : "text-danger"}>
                                                <b>{summaryValue.toFixed(2)}</b>
                                            </td>
                                            <td>-</td>
                                        </tr>

                                        {rows.map((r) => {

                                            const value = calc(r.value_a, r.value_b, r.formula);
                                            const passRow = checkPass(value, r.operator, r.target_value);

                                            const index = data.findIndex(d => d.report_id === r.report_id);

                                            return (
                                                <tr key={r.report_id}>

                                                    <td>{r.agency_name}</td>

                                                    <td>{r.quarter}</td>

                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={r.value_a}
                                                            onChange={(e) =>
                                                                handleChange(index, "value_a", e.target.value)
                                                            }
                                                            style={{ width: 100 }}
                                                        />
                                                    </td>

                                                    {showB && (
                                                        <td>
                                                            <input
                                                                type="number"
                                                                value={r.value_b}
                                                                onChange={(e) =>
                                                                    handleChange(index, "value_b", e.target.value)
                                                                }
                                                                style={{ width: 100 }}
                                                            />
                                                        </td>
                                                    )}

                                                    <td className={passRow ? "text-success" : "text-danger"}>
                                                        {value.toFixed(2)}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handleSave(r)}
                                                        >
                                                            บันทึก
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </>
                                );

                            })}

                            {/* grand total */}

                            {(() => {

                                const value = calc(grandA, grandB, reports[0]?.formula);

                                return (
                                    <tr className="table-dark">
                                        <td>รวมทั้งหมด</td>
                                        <td>-</td>
                                        <td>{grandA}</td>
                                        {showB && <td>{grandB}</td>}
                                        <td>{value.toFixed(2)}</td>
                                        <td>-</td>
                                    </tr>
                                );

                            })()}

                        </tbody>

                    </table>

                    <button className="btn btn-danger mt-3" onClick={onClose}>
                        ปิด
                    </button>

                </div>
            </div>

        </div>

    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modalStyle = {
    background: "#fff",
    padding: "20px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto"
};