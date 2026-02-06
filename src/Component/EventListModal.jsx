import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import EventDetailModal from "./EventDetailModal";

export default function EventListModal({ open, onClose }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [viewEvent, setViewEvent] = useState(null);
    const [editEvent, setEditEvent] = useState(null);

    const [list, setList] = useState([]);

    const usid = localStorage.getItem("new");
    const fmid = sessionStorage.getItem("fmid");

    const showdetail = (val) => {
        fetch(`${import.meta.env.VITE_APP_API}/api/event/res/${val}/${fmid}`)
            .then((res) => res.json())
            .then((d) => setEvents(d));

    }

    var dep = ["โรงพยาบาลกลาง", "โรงพยาบาลตากสิน", "โรงพยาบาลเจริญกรุงประชารักษ์", 
        "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ", "โรงพยาบาลเวชการุณย์รัศมิ์", "โรงพยาบาลนคราภิบาลกรุงเทพมหานคร",
        "โรงพยาบาลราชพิพัฒน์", "โรงพยาบาลสิรินธร", "โรงพยาบาลผู้สูงอายุบางขุนเทียน", "โรงพยาบาลรัตนประชารักษ์",
        "โรงพยาบาลบางนากรุงเทพมหานคร", "สก.", "ศบฉ.", "สพบ"
    ]

    useEffect(() => {
        if (!open || !usid || !fmid) return;

        setLoading(true);

        fetch(
            `${import.meta.env.VITE_APP_API}/api/event/res/${usid}/${fmid}`
        )
            .then((res) => res.json())
            .then((data) => {
                setEvents(Array.isArray(data) ? data : []), 
                setList(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("FETCH EVENT ERROR:", err);
                setEvents([]);
            })
            .finally(() => setLoading(false));
    }, [open, usid, fmid]);

    if (!open) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box modal-lg">
                <button className="modal-close" onClick={onClose}>✕</button>

                <h2>รายการโครงการ / กิจกรรม</h2>
                <div hidden={localStorage.getItem("new") !== "14"}>
                <label>เลือกหน่อยงาน</label>: &nbsp;
                <select onChange={e => showdetail(e.target.value)}>
                    <option value={"14"}>
                        ทั้งหมด
                    </option>
                    {list.map((a, i) => {
                        return (
                            <option key={a} value={a.submitid} >
                                {dep[a.submitid-1]}
                            </option>
                        )
                    })}
                </select>
                </div>

                {loading ? (
                    <p>กำลังโหลดข้อมูล...</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อโครงการ</th>
                                <th>ไตรมาส</th>
                                <th>สถานะ</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((ev, index) => (
                                <tr key={ev.id}>
                                    <td>{index + 1}</td>
                                    <td>{ev.evname}</td>
                                    <td>Q{ev.qur}</td>
                                    <td>{statusText(ev.evstatus)}</td>
                                    <td className="actions">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => setViewEvent(ev)}
                                        >
                                            รายละเอียด
                                        </button>
                                        &emsp;
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => setEditEvent(ev)}
                                        >
                                            แก้ไข
                                        </button>
                                        &emsp;
                                        <button disabled={!ev.pdf_file} onClick={() => { window.open(`${import.meta.env.VITE_APP_API}/api/file/pdf/${ev.id}`) }} type="button" className="btn btn-danger">PDF</button>

                                    </td>
                                </tr>
                            ))}

                            {!events.length && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        ไม่พบข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                <button className="modal-close-btn" onClick={onClose}>ปิด</button>
            </div>

            {/* modal รายละเอียด */}
            <EventDetailModal
                open={!!viewEvent}
                event={viewEvent}
                onClose={() => setViewEvent(null)}
            />

            {/* modal แก้ไข */}
            {editEvent && (
                <div className="modal-backdrop">
                    <div className="modal-box modal-lg">
                        {/* <button
                            className="modal-close"
                            onClick={() => setEditEvent(null)}
                        >
                            ✕
                        </button> */}

                        <EventForm
                            mode="edit"
                            eventId={editEvent.id}
                            initialData={editEvent}
                            onSuccess={() => {
                                setEditEvent(null);
                                // reload list
                                fetch(
                                    `${import.meta.env.VITE_APP_API}/api/event/res/${usid}/${fmid}`
                                )
                                    .then(res => res.json())
                                    .then(data => setEvents(data || []));
                            }}

                        />
                        <button className="modal-close-btn" onClick={() => setEditEvent(null)}>ปิด</button>
                    </div>

                </div>

            )}

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
