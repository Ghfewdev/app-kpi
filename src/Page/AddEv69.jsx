import { useEffect, useState } from "react";
import PrintLayout from "../Component/PrintLayout";

/* ===============================
   PAGE
================================ */
export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    const usid = localStorage.getItem("new");
    const fmid = sessionStorage.getItem("fmid");

    useEffect(() => {
        if (!usid || !fmid) return;

        setLoading(true);
        fetch(`${import.meta.env.VITE_APP_API}/api/event/res/${usid}/${fmid}`)
            .then((res) => res.json())
            .then((data) => setEvents(Array.isArray(data) ? data : []))
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, [usid, fmid]);

    return (
        <div className="container mt-3">

            <h4 className="mb-3">รายการโครงการ / กิจกรรม</h4>

            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th width="60">#</th>
                            <th>ชื่อโครงการ</th>
                            <th width="100">ไตรมาส</th>
                            <th width="180">สถานะ</th>
                            <th width="160">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((ev, i) => (
                            <tr key={ev.id}>
                                <td>{i + 1}</td>
                                <td>{ev.evname}</td>
                                <td className="text-center">Q{ev.qur}</td>
                                <td>{statusText(ev.evstatus)}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#print"
                                        onClick={() => setDetailData([ev])}
                                    >
                                        รายละเอียด
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!events.length && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    ไม่พบข้อมูล
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* ===== DETAIL + PRINT MODAL ===== */}
            <EventDetailModal data={detailData} />
        </div>
    );
}

/* ===============================
   DETAIL MODAL (ฝังในหน้า)
================================ */
function EventDetailModal({ data }) {
    return (
        <div className="d-print-none">
            <div
                className="modal fade"
                id="print"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                พิมพ์รายงานการดำเนินงานของโครงการ
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            {pagePrint(data)}
                        </div>

                        <div className="modal-footer d-print-none">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                ปิด
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => window.print()}
                            >
                                🖨️ พิมพ์รายงาน
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.print()}
                            >
                                พิมพ์รายงาน
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* สำหรับ print จริง */}
            <div className="d-none d-print-block">
                {pagePrint(data)}
            </div>
        </div>
    );
}

/* ===============================
   PRINT CONTENT
================================ */
function pagePrint(val) {
    if (!val || !val.length) return <>ไม่พบการส่งข้อมูลเข้ามา</>;

    const dp = val[0];
    const qur = Number(sessionStorage.getItem("qur")) || dp.qur;
    const ag = sessionStorage.getItem("ag");

    //   const img = dp.image_file || "noimg.PNG";
    const img = dp.id;

    const statusList = [
        "แล้วเสร็จ",
        "ยังไม่เริ่มดำเนินการ",
        "ยกเลิก",
        "กำลังดำเนินการ",
        "ชะลอ",
    ];

    return (
        <div className="fonts col-print-12">

            <div className="mb-3">
                <b>แบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</b><br />
                <b>ส่วนราชการ:</b> {ag}
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

/* ===============================
   helper
================================ */
function statusText(v) {
    switch (Number(v)) {
        case 1: return "แล้วเสร็จ";
        case 2: return "ยังไม่เริ่ม";
        case 3: return "ยกเลิก";
        case 4: return "กำลังดำเนินการ";
        case 5: return "ชะลอ";
        default: return "-";
    }
}
