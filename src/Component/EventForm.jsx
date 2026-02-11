import { useEffect, useState } from "react";

export default function EventForm({
    mode = "add",          // "add" | "edit"
    initialData = null,    // ข้อมูลเดิมตอน edit
    eventId = null,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [form, setForm] = useState({
        fmid: "",
        submitid: "",
        fmsid: "",
        qur: 1,
        evname: "",
        evres: "",
        evstatus: 4,
        dc1: "",
        dc2: "",
        dc3: "",
        dd1: "",
        dd2: "",
        dd3: "",
        evpoint: "",
        evtarget: "",
        result1: "",
        result2: "",
        result3: "",
        result4: "",
        problem: "",
        et: 1,
    });

    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    /* ===============================
       preload ตอนแก้ไข
    ================================ */
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({
                fmid: initialData.fmid || "",
                submitid: initialData.submitid || "",
                fmsid: initialData.fmsid || "",
                qur: initialData.qur || 1,
                evname: initialData.evname || "",
                evres: initialData.evres || "",
                evstatus: initialData.evstatus || 4,
                dc1: initialData.budget_dc1 || "",
                dc2: initialData.budget_dc2 || "",
                dc3: initialData.budget_dc3 || "",
                dd1: initialData.budget_dd1 || "",
                dd2: initialData.budget_dd2 || "",
                dd3: initialData.budget_dd3 || "",
                evpoint: initialData.evpoint || "",
                evtarget: initialData.evtarget || "",
                result1: initialData.result_q1 || "",
                result2: initialData.result_q2 || "",
                result3: initialData.result_q3 || "",
                result4: initialData.result_q4 || "",
                problem: initialData.problem || "",
                et: initialData.summary_status || 1,
            });
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
        // setForm(prev => ({
        //     ...prev,
        //     fmid: sessionStorage.getItem("fmid"),
        //     submitid: localStorage.getItem("new")
        //   }))

    };

    /* ===============================
       submit
    ================================ */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!confirm) {
            alert("กรุณายืนยันข้อมูล");
            return;
        }

        setLoading(true);

        const fd = new FormData();

        Object.entries(form).forEach(([k, v]) => fd.append(k, v));

        fd.append(
            "result",
            JSON.stringify({
                q1: form.result1,
                q2: form.result2,
                q3: form.result3,
                q4: form.result4,
            })
        );

        if (imageFile) fd.append("image", imageFile);
        if (pdfFile) fd.append("pdf", pdfFile);

        const url =
            mode === "add"
                ? `${import.meta.env.VITE_APP_API}/api/event/add`
                : `${import.meta.env.VITE_APP_API}/api/event/${eventId}`;

        const method = mode === "add" ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                body: fd,
            });

            const json = await res.json();

            if (json.status === "ok") {
                alert(mode === "add" ? "บันทึกสำเร็จ" : "อัปเดตสำเร็จ");
                onSuccess?.();
            }
            else {
                alert("เกิดข้อผิดพลาด");
                console.log(res)
            }
        } catch (err) {
            console.error(err);
            alert("ระบบขัดข้อง");
        } finally {
            setLoading(false);
        }
    };

    /* ===============================
       UI
    ================================ */
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{mode === "add" ? "เพิ่มโครงการ / กิจกรรม" : "แก้ไขโครงการ / กิจกรรม"}</h2>

            <label>ไตรมาส</label>
            <select name="qur" value={form.qur} onChange={handleChange}>
                <option value={1}>ไตรมาสที่ 1</option>
                <option value={2}>ไตรมาสที่ 2</option>
                <option value={3}>ไตรมาสที่ 3</option>
                <option value={4}>ไตรมาสที่ 4</option>
            </select>

            <label>ชื่อโครงการ</label>
            <input name="evname" value={form.evname} onChange={handleChange} required />

            <label>ลำดับโครงการ</label>
            <input name="fmsid" value={form.fmsid} onChange={handleChange} required />

            <label>ผู้รับผิดชอบ</label>
            <input name="evres" value={form.evres} onChange={handleChange} required />

            <label>สถานะ</label>
            <select name="evstatus" value={form.evstatus} onChange={handleChange}>
                <option value={1}>แล้วเสร็จ</option>
                <option value={2}>ยังไม่เริ่ม</option>
                <option value={3}>ยกเลิก</option>
                <option value={4}>กำลังดำเนินการ</option>
                <option value={5}>ชะลอ</option>
            </select>

            <label>งบประมาณที่ได้รับ</label>
            <div className="grid3">
                <input name="dc1" type="number" placeholder="กทม." value={form.dc1} onChange={handleChange} />
                <input name="dc2" type="number" placeholder="เงินบำรุง" value={form.dc2} onChange={handleChange} />
                <input name="dc3" type="number" placeholder="อื่นๆ" value={form.dc3} onChange={handleChange} />
            </div>

            <label>งบประมาณที่ใช้</label>
            <div className="grid3">
                <input name="dd1" type="number" placeholder="กทม." value={form.dd1} onChange={handleChange} />
                <input name="dd2" type="number" placeholder="เงินบำรุง" value={form.dd2} onChange={handleChange} />
                <input name="dd3" type="number" placeholder="อื่นๆ" value={form.dd3} onChange={handleChange} />
            </div>

            <label>วัตถุประสงค์</label>
            <textarea name="evpoint" value={form.evpoint} onChange={handleChange} />

            <label>เป้าหมาย</label>
            <textarea name="evtarget" value={form.evtarget} onChange={handleChange} />

            <label>ผลการดำเนินงาน</label>
            <textarea name="result1" placeholder="ไตรมาส 1" value={form.result1} onChange={handleChange} />
            <textarea name="result2" placeholder="ไตรมาส 2" value={form.result2} onChange={handleChange} />
            <textarea name="result3" placeholder="ไตรมาส 3" value={form.result3} onChange={handleChange} />
            <textarea name="result4" placeholder="ไตรมาส 4" value={form.result4} onChange={handleChange} />

            <label>ปัญหาและอุปสรรค</label>
            <textarea name="problem" value={form.problem} onChange={handleChange} />

            <label>สรุปผล</label>
            <select name="et" value={form.et} onChange={handleChange}>
                <option value={1}>เป็นไปตามแผน</option>
                <option value={2}>ควรติดตามเป็นพิเศษ</option>
                <option value={3}>ไม่เป็นไปตามแผน</option>
            </select>

            <label>แนบรูปภาพ</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

            <label>แนบไฟล์ PDF</label>
            <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />

            <label className="confirm">
                <label htmlFor="chk1" className="text-danger h4"> ***ยืนยันข้อมูลถูกต้อง*** {"==>>"} </label>
                <input type="checkbox" className="form-check-input h4" id="chk1" onClick={e => {
                    setForm(prev => ({
                        ...prev,
                        fmid: sessionStorage.getItem("fmid"),
                        submitid: localStorage.getItem("new")
                    })), console.log(form)
                }} checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
                
            </label>

            <button disabled={loading}>
                {loading ? "กำลังบันทึก..." : mode === "add" ? "บันทึก" : "อัปเดต"}
            </button>
        </form>
    );
}
