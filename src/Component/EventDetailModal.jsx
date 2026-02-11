import pagePrint from "./EventDetailPrint";

export default function EventDetailModal({ open, event, onClose }) {
    if (!open || !event) return null;

    function pagePrints(val) {
        if (!val) return <>ไม่พบการส่งข้อมูลเข้ามา</>;

        const dp = val;
        const qur = Number(sessionStorage.getItem("qur")) || dp.qur;
        // const ag = sessionStorage.getItem("ag");

        //   const img = dp.image_file || "noimg.PNG";
        const img = dp.id;

        const statusList = [
            "แล้วเสร็จ",
            "ยังไม่เริ่มดำเนินการ",
            "ยกเลิก",
            "กำลังดำเนินการ",
            "ชะลอ",
        ];

        const dep = ["โรงพยาบาลกลาง", "โรงพยาบาลตากสิน", "โรงพยาบาลเจริญกรุงประชารักษ์", 
        "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ", "โรงพยาบาลเวชการุณย์รัศมิ์", "โรงพยาบาลนคราภิบาลกรุงเทพมหานคร",
        "โรงพยาบาลราชพิพัฒน์", "โรงพยาบาลสิรินธร", "โรงพยาบาลผู้สูงอายุบางขุนเทียน", "โรงพยาบาลรัตนประชารักษ์",
        "โรงพยาบาลบางนากรุงเทพมหานคร", "สก.", "ศบฉ.", "สพบ"
    ]

        return (
            <div className="fonts col-print-12">

                <div className="mb-3">
                    <b>แบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</b><br />
                    <b>ส่วนราชการ:</b> {dep[Number(dp.submitid-1)]}
                </div>

                <div className="mb-2">
                    <b>ชื่อโครงการ:</b> {dp.evname}<br />
                    <b>ลำดับโครงการ:</b> {dp.fmsid}<br />
                    <b>ผู้รับผิดชอบ:</b> {dp.evres}
                </div>

                <div className="mb-2">
                    <b>สถานะโครงการ:</b><br />
                    {statusList.map((s, i) => (
                        <label className="me-3" key={i}>
                            <input type="checkbox" checked={dp.evstatus === i + 1} readOnly /> {s}
                        </label>
                    ))}
                </div>

                <div className="border p-2 mb-2">
                    <b>วัตถุประสงค์</b>
                    <div>{dp.evpoint}</div>
                    <b>เป้าหมาย</b>
                    <div>{dp.evtarget}</div>
                </div>

                <div className="border p-2 mb-2">
                    <b>ผลการดำเนินงาน</b>
                    {dp.result_q1 && qur >= 1 && <div>ไตรมาส 1 : {dp.result_q1}</div>}
                    {dp.result_q2 && qur >= 2 && <div>ไตรมาส 2 : {dp.result_q2}</div>}
                    {dp.result_q3 && qur >= 3 && <div>ไตรมาส 3 : {dp.result_q3}</div>}
                    {dp.result_q4 && qur >= 4 && <div>ไตรมาส 4 : {dp.result_q4}</div>}
                </div>

                <b>การใช้จ่ายงบประมาณ</b>
                <table className="table table-bordered text-center mt-1">
                    <thead>
                        <tr>
                            <th colSpan="3">งบประมาณที่ได้รับ</th>
                            <th colSpan="3">งบประมาณที่ใช้</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{dp.budget_dc1}</td>
                            <td>{dp.budget_dc2}</td>
                            <td>{dp.budget_dc3}</td>
                            <td>{dp.budget_dd1}</td>
                            <td>{dp.budget_dd2}</td>
                            <td>{dp.budget_dd3}</td>
                        </tr>
                    </tbody>
                </table>

                <b>สรุปผลการดำเนินงาน</b><br />
                <label className="me-3">
                    <input type="checkbox" checked={dp.summary_status === 1} readOnly /> เป็นไปตามแผน
                </label>
                <label className="me-3">
                    <input type="checkbox" checked={dp.summary_status === 2} readOnly /> ควรติดตาม
                </label>
                <label>
                    <input type="checkbox" checked={dp.summary_status === 3} readOnly /> ไม่เป็นไปตามแผน
                </label>

                <div className="mt-2">
                    <b>ปัญหาและอุปสรรค</b>
                    <div>{dp.problem}</div>
                </div>

                <div className="text-center mt-3">
                    <img
                        src={`${import.meta.env.VITE_APP_API}/api/file/image/${img}`}
                        alt="img"
                        style={{ maxWidth: "700px" }}
                    />
                </div>

            </div>
        );
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-box modal-lg">
                <button className="modal-close" onClick={onClose}>✕</button>

                {pagePrints(event)}
                
                <button className="modal-print2" onClick={() => pagePrint([event]
                )}>
                    🖨️ พิมพ์รายงาน
                </button>
                {/* <button onClick={e => console.log(event)}>ddd</button> */}
                <button className="modal-close-btn" onClick={onClose}>ปิด</button>
            </div>

        </div>
    );
}
