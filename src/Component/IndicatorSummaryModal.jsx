import { buildSummaryTable } from "../utils/indicatorUtils";

export default function IndicatorSummaryModal({ reports, code, onClose }) {
    const data = buildSummaryTable(reports);

    console.log("reports", reports)
    console.log("data", data)

    const count = data.length || 1; // กันหาร 0

    const total = data.reduce(
        (acc, row) => {
            acc.Q1 += row.quarters.Q1 || 0;
            acc.Q2 += row.quarters.Q2 || 0;
            acc.Q3 += row.quarters.Q3 || 0;
            acc.Q4 += row.quarters.Q4 || 0;
            acc.yearly += row.yearlyValue || 0;
            acc.target += Number(row.target_value) || 0;
            return acc;
        },
        { Q1: 0, Q2: 0, Q3: 0, Q4: 0, yearly: 0, target: 0 }
    );

    const average = {
        Q1: total.Q1 / count,
        Q2: total.Q2 / count,
        Q3: total.Q3 / count,
        Q4: total.Q4 / count,
        yearly: total.yearly / count,
        target: total.target / count,
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>

                <h2>สรุปผล ตัวชี้วัด {code}</h2>

                <table border="1" width="100%" cellPadding="5">
                    <thead>
                        <tr>
                            <th>หน่วยงาน</th>
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
                            <th>สะสม</th>
                            <th>เป้าหมาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.agency_id}>
                                <td>{row.agency_name}</td>
                                <td>{Number(row.quarters.Q1?.toFixed(2)) || "-"}</td>
                                <td>{Number(row.quarters.Q2?.toFixed(2)) || "-"}</td>
                                <td>{Number(row.quarters.Q3?.toFixed(2)) || "-"}</td>
                                <td>{Number(row.quarters.Q4?.toFixed(2)) || "-"}</td>
                                <td><b>{Number(row.yearlyValue?.toFixed(2)) || "-"}</b></td>
                                <td>{row.target_value}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                            <td><b>ผลลัพธ์เฉลี่ย</b></td>
                            <td>{Number(average.Q1.toFixed(2))}</td>
                            <td>{Number(average.Q2.toFixed(2))}</td>
                            <td>{Number(average.Q3.toFixed(2))}</td>
                            <td>{Number(average.Q4.toFixed(2))}</td>
                            <td><b>{Number(average.yearly.toFixed(2))}</b></td>
                            <td>{average.target}</td>
                        </tr>

                    </tbody>
                </table>

                <br />
                <div style={{ textAlign: "right" }}>
                    <button className="btn btn-danger" onClick={onClose}>ปิด</button>
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
