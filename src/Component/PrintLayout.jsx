export default function PrintLayout({ data }) {
    if (!data) return null;

    const {
        evname,
        fmsid,
        evres,
        evpoint,
        evtarget,
        result_q1,
        result_q2,
        result_q3,
        result_q4,
        evstatus,
        summary_status,
        budget_dc1,
        budget_dc2,
        budget_dc3,
        budget_dd1,
        budget_dd2,
        budget_dd3,
        problem,
        image_file,
    } = data;

    const ag = sessionStorage.getItem("ag");
    const qur = Number(sessionStorage.getItem("qur"));

    const status = (v) => evstatus === v;
    const summary = (v) => summary_status === v;

    return (
        <div className="print-page">

            {/* ===== HEADER ===== */}
            <div className="print-header">
                <div>ไตรมาสที่ ๑ ต.ค.-ธ.ค.</div>
                <div>ไตรมาสที่ ๒ ม.ค.-มี.ค.</div>
                <div className="title">
                    แบบรายงานความก้าวหน้ารายโครงการ/กิจกรรม
                </div>
                <div>ไตรมาสที่ ๓ เม.ย.-มิ.ย.</div>
                <div>
                    <b>ส่วนราชการ</b> {ag}
                </div>
                <div>ไตรมาสที่ ๔ ก.ค.-ก.ย.</div>
            </div>

            {/* ===== BASIC INFO ===== */}
            <div className="row-line">
                <b>ชื่อโครงการ/กิจกรรม</b>
                <span>{evname}</span>
            </div>

            <div className="row-line">
                <b>ลำดับโครงการ / กิจกรรมตามแผนสนพ.</b>
                <span>{fmsid}</span>
            </div>

            <div className="row-line">
                <b>หน่วยงานที่รับผิดชอบ</b>
                <span>{evres}</span>
            </div>

            {/* ===== STATUS ===== */}
            <div className="section">
                <b>สถานะของโครงการ:</b>
                <div className="checkbox-row">
                    <label><input type="checkbox" checked={status(1)} readOnly /> แล้วเสร็จ</label>
                    <label><input type="checkbox" checked={status(2)} readOnly /> ยังไม่เริ่มดำเนินการ</label>
                    <label><input type="checkbox" checked={status(3)} readOnly /> ยกเลิก</label>
                    <label><input type="checkbox" checked={status(4)} readOnly /> กำลังดำเนินการ</label>
                    <label><input type="checkbox" checked={status(5)} readOnly /> ชะลอ</label>
                </div>
            </div>

            {/* ===== DETAIL ===== */}
            <div className="section bordered">
                <b>วัตถุประสงค์</b>
                <p>{evpoint}</p>

                <b>เป้าหมาย</b>
                <p>{evtarget}</p>

                <b>ผลการดำเนินโครงการ</b>
                {qur >= 1 && <p><b>ไตรมาสที่ ๑</b> {result_q1}</p>}
                {qur >= 2 && <p><b>ไตรมาสที่ ๒</b> {result_q2}</p>}
                {qur >= 3 && <p><b>ไตรมาสที่ ๓</b> {result_q3}</p>}
                {qur >= 4 && <p><b>ไตรมาสที่ ๔</b> {result_q4}</p>}
            </div>

            <div className="page-break" />

            {/* ===== BUDGET ===== */}
            <div className="section">
                <b>การใช้จ่ายงบประมาณ</b>
                <div className="checkbox-row">
                    <label>
                        <input
                            type="checkbox"
                            checked={budget_dc1 + budget_dc2 + budget_dc3 === 0}
                            readOnly
                        /> ไม่ได้ใช้งบประมาณ
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={budget_dc1 + budget_dc2 + budget_dc3 > 0}
                            readOnly
                        /> ใช้งบประมาณ
                    </label>
                </div>

                <table className="budget-table">
                    <thead>
                        <tr>
                            <th colSpan="3">งบประมาณที่ได้รับทั้งหมด</th>
                            <th colSpan="3">งบประมาณที่ใช้ไปทั้งหมด</th>
                        </tr>
                        <tr>
                            <th>กทม.</th><th>อุดหนุน</th><th>อื่นๆ</th>
                            <th>กทม.</th><th>อุดหนุน</th><th>อื่นๆ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{budget_dc1}</td>
                            <td>{budget_dc2}</td>
                            <td>{budget_dc3}</td>
                            <td>{budget_dd1}</td>
                            <td>{budget_dd2}</td>
                            <td>{budget_dd3}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== SUMMARY ===== */}
            <div className="section">
                <b>สรุปผลการดำเนินงาน</b>
                <div className="checkbox-row">
                    <label><input type="checkbox" checked={summary(1)} readOnly /> เป็นไปตามแผน</label>
                    <label><input type="checkbox" checked={summary(2)} readOnly /> ควรติดตามเป็นพิเศษ</label>
                    <label><input type="checkbox" checked={summary(3)} readOnly /> ไม่เป็นไปตามแผน</label>
                </div>
            </div>

            {/* ===== PROBLEM ===== */}
            <div className="section">
                <b>ข้อคิดเห็นเพิ่มเติม / ปัญหาและอุปสรรค</b>
                <p>{problem || "-"}</p>
            </div>

            {/* ===== IMAGE ===== */}
            {image_file && (
                <div className="image-box">
                    <img
                        src={`${import.meta.env.VITE_APP_API}/uploads/images/${image_file}`}
                        alt=""
                    />
                </div>
            )}
        </div>
    );
}
