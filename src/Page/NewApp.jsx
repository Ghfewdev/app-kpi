import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Modal from "../Component/modal";
import { postForms } from "../Component/api";
import Authen from "../Component/Authen";
import Modal2 from "../Component/modal2";
import IndicatorCumulativeChart from "../Component/chart";

function App() {
  Authen();

  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [head, setHead] = useState("หัวเรื่อง");
  const [year, setYear] = useState("2026");
  const [qt, setQt] = useState(0);
  const [detail, setDetail] = useState([]);
  const [bv, setBv] = useState(true);
  const [cv, setCv] = useState(true);
  const [c, setC] = useState("");
  const [sa, setSa] = useState(null);
  const [sb, setSb] = useState(null);
  const [sc, setSc] = useState(null);
  const [values, setValues] = useState({});
  const [indi, setIndi] = useState(0);
  const [detailq, setDatailq] = useState([]);

  const cbv = (value) => {
    if (value === "") {
      setBv(false);
    } else {
      setBv(true);
    }
  }

  const ccv = (value) => {
    if (value === "") {
      setCv(false);
    } else {
      setCv(true);
    }
  }

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderInputs = (a) => {
    if (!a) return null;

    const items = a.split(",").map(s => s.trim());

    return items.map((item, index) => {
      const key = item.split("=")[0];

      return (
        <div key={index}>
          <label>
            กรอกค่าตัวชี้วัด {key}: &nbsp;<br />
          </label>
          <input
            hidden={!cv}
            required={cv}
            type="text"
            className="mt-2"
            value={values[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      );
    });
  };

  const showdetail = (val) => {
    fetch(`http://localhost:3000/api/indicatorde/${year}/${localStorage.getItem("new")}/${val}`)
      .then((res) => res.json())
      .then((d) => setDatailq(d));
      // console.log(detailq)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JsonData = {
      name: data.get("name"),
      solve: data.get("solve"),
      def: data.get("define"),
      id: String(d[1])
    };

    fetch(import.meta.env.VITE_APP_API + "/update/form", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JsonData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === "ok") {
          alert("ทำรายการสำเร็จ");
          window.location = "/";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });

  }



  const submitData = async () => {

    var jso

    if (values == {}) {
      jso = null;
    } else {
      jso = values;
    }

    const fill = [
      {
        indicator_id: indi,
        agency_id: localStorage.getItem("new"),
        fiscal_year: year+543,
        quarter: "Q" + String(qt + 1),
        value_a: sa,
        value_b: sb,
        calculated_value: null,
        form_data: jso,
        status: "SUBMITTED",
        updated_by: localStorage.getItem("new"),
        // updated_at: ,
      }
    ];

    try {
      const res = await postForms(fill);
      alert("บันทึกข้อมูลสำเร็จ"); 
      // window.location.reload();
      // console.log("SUCCESS:", res.fill);
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/indicator/${localStorage.getItem("new")}`)
      .then((res) => res.json())
      .then((d) => setData(d));
    fetch(`http://localhost:3000/api/check/${localStorage.getItem("new")}`)
      .then((res) => res.json())
      .then((d) => setCheck(d));
  }, []);

  const checkMap = Object.fromEntries(
    check.map(c => [c.indicator_id, c])
  );

  return (
    <>
      <Navbar />


      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="modal-title">ตอบตัวชี้วัด {head} ไตรมาสที่ {qt + 1} ปีงบ {year + 543}</h2>
        หมายเหตุ: {detail[0]} <br />
        {detail[3]}
        <br />
        สูตรคำนวณ: {detail[1]} <br />
        ค่าเป้าหมาย: {Number(detail[2]).toFixed(0)}<br />
        <form onSubmit={submitData}>
          <label>กรอกค่าตัวชี้วัด A : &nbsp;<br /></label>
          <input value={sa} onChange={e =>setSa(e.target.value)} min={0} type="number" required autoFocus />
          <div hidden={!bv}>
            <label >กรอกค่าตัวชี้วัด B : &nbsp;<br /></label>
            <input value={sb} onChange={e =>setSb(e.target.value)} required={bv} min={0} className="mt-2" type="number" />
          </div>
          <div>
            {renderInputs(c)}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </div>

          <br />

          <br />
          <button type="submit" className="open-btn2" >รายงาน</button>
        </form>
      </Modal>

    <Modal2 isOpen={open2} onClose={() => setOpen2(false)}>
      <div className="col4">
        {detailq.map((item, index) => {
        // const sa = values[item.id]?.sa || "";
        // const sb = values[item.id]?.sb || "";

        return (
          <div key={item.id} className="mb-4 border p-3 rounded">
            <h2 className="modal-title">
              ตัวชี้วัด {head} ไตรมาสที่ {index + 1} ปีงบ {year+543}
            </h2>

            หมายเหตุ: {detail[0]} <br />
            {detail[3]} <br />
            สูตรคำนวณ: {detail[1]} <br />
            ค่าเป้าหมาย: {Number(detail[2]).toFixed(0)}
            <br /><br />

            <form onSubmit={(e) => submitData(e, item)}>
              <label>กรอกค่าตัวชี้วัด A : &nbsp;<br /></label>
              <input
                type="number"
                min={0}
                defaultValue={detailq[index]?.value_a || ""}
              />

              <div hidden={!item.value_b}>
                <label className="mt-2">กรอกค่าตัวชี้วัด B : &nbsp;<br /></label>
                <input
                  type="number"
                  min={0}
                  defaultValue={detailq[index]?.value_b || ""}
                />
              </div>

              <div>
                {renderInputs(item.form_data)}
              </div>

              <br />
              <button type="submit" className="open-btn2">
                แก้ใขรายงานไตรมาส {item.quarter}
              </button>
            </form>
          </div>
          
        );
      })}
      </div>
      <IndicatorCumulativeChart
  year={year}
  agencyId={localStorage.getItem("new")}
  indicatorId={indi}
/>

      </Modal2>

      <div style={{ padding: 20 }}>
        <h1>Indicators Table</h1>

        <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Year</th>
              <th>Time</th>
              <th>Actions</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => {
              // ดึงข้อมูลตาม id
              const chk = checkMap[item.id];

              // ถ้ามีข้อมูล ก็ใช้ total_quarters, ถ้าไม่มีก็เป็น 0
              const q = chk ? chk.total_quarters : 0;

              return (
                <tr key={i}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.year + 543}</td>
                  <td>{q}</td>
                  <td>
                    <button disabled={q === 4} className="open-btn" onClick={() => { setOpen(true), setValues({}), setIndi(item.id), setQt(q), setHead(item.code), setYear(item.year), cbv(item.variable_b_name), setC(item.form), ccv(item.form), setDetail([item.description, item.formula, item.target_value, item.form, item.detail]) }}>ตอบตัวชี้วัด</button>
                  </td>
                  <td>
                    <button disabled={q === 0} className="edit-btn" onClick={e => { setIndi(item.id), setQt(q), setHead(item.code), setYear(item.year), cbv(item.variable_b_name), setC(item.form), ccv(item.form), setDetail([item.description, item.formula, item.target_value, item.form, item.detail]), showdetail(item.id), setOpen2(true) }}>การส่งตัวชี้วัด</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default App;
