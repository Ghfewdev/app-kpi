import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Modal from "../Component/modal";
import { postForms } from "../Component/api";
import Authlevel from "../Component/Authlevel";
import Modal2 from "../Component/modal2";
import IndicatorCumulativeChart from "../Component/chart";
import axios from "axios";

function App2() {
  Authlevel();

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
  const [sa, setSa] = useState(0);
  const [sb, setSb] = useState(0);
  const [sc, setSc] = useState(null);
  const [values, setValues] = useState({});
  const [indi, setIndi] = useState(0);
  const [detailq, setDetailq] = useState([]);
  // const [nv, setNv] = useState([]);

  const cbv = (value) => {
    if (value === null) {
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
            {key}: &nbsp;<br />
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
    fetch(`${import.meta.env.VITE_APP_API}/api/admin/indicatorde/${year}/${val}`)
      .then((res) => res.json())
      .then((d) => setDetailq(d));

    console.log(detail)
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

  const renderInputse = (formData, index) => {
    if (!formData) return null;

    return Object.keys(formData).map((key) => (
      <div key={key} className="mt-2">
        <label>{key} : &nbsp;</label>
        <input
          type="text"
          value={formData[key]}
          onChange={(e) =>
            handleFormDataChange(index, key, e.target.value)
          }
        />
      </div>
    ));
  };

  const submitData = async (event) => {
    event.preventDefault();

    var jso

      if (values == {}) {
        jso = null;
      } else {
        jso = values;
      }

      if (sb === 0) {
        setSb(null)
      }

    const fill = [
        {
          indicator_id: indi,
          agency_id: localStorage.getItem("new"),
          fiscal_year: year,
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

      console.log(fill)

    if (confirm("ต้องการส่งรายงานหรือไม่ !\n") == true) {
      

      try {
        const res = await postForms(fill);
        alert("บันทึกข้อมูลสำเร็จ");
        window.location.reload();
        // console.log("SUCCESS:", res.fill);
      } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);
      }
    }
    // else {
    //   alert("ยกเลิกรายการ")
    // }

  };

  const updateReport = (e, id, index) => {
    e.preventDefault(); // สำคัญมาก

    console.log(JSON.stringify(detailq[index]?.form_data))

    if (confirm("ต้องการแก้ไขหรือไม่ !\n") == true) {

      axios.put(`${import.meta.env.VITE_APP_API}/api/indicator-reports/${id}`, {
        value_a: detailq[index]?.value_a,
        value_b: detailq[index]?.value_b,
        form_data: detailq[index]?.form_data, // 🔥 สำคัญ
        status: "SUBMITTED",
        updated_by: localStorage.getItem("new"),
      })
        .then((res) => {
          alert("อัปเดตสำเร็จ");
          console.log(res.data);
          location.reload()
        })
        .catch((err) => {
          console.error(err);
          alert("เกิดข้อผิดพลาด");
        });
    }
    // else {
    //   alert("ยกเลิกรายการ")
    // }


  };

  const handleChangee = (index, field, value) => {
    const newData = [...detailq];

  newData[index] = {
    ...newData[index],
    [field]: value,
    form_data: newData[index]?.form_data
      ? typeof newData[index].form_data === "string"
        ? JSON.parse(newData[index].form_data)
        : newData[index].form_data
      : {},
  };

  setDetailq(newData);
  };

  const handleFormDataChange = (index, key, value) => {
    const newData = [...detailq];

    newData[index].form_data = {
      ...newData[index].form_data,
      [key]: value,
    };
    console.log(detailq)
    setDetailq(newData);
  };

  const calculateValue = (formula, A, B) => {
    A = Number(A || 0);
    B = Number(B || 0);

    if (B === 0 && formula.includes("B")) return 0;

    switch (formula) {
      case "(A/B)*100": return (A / B) * 100;
      case "(A+B)/2": return (A + B) / 2;
      case "A": return A;
      case "A*B": return A * B;
      case "((A-B)/B)*100": return ((A - B) / B) * 100;
      case "A/B": return A / B;
      case "(A/B)*1.25": return (A / B) * 1.25;
      case "A-B": return A - B;
      default: return 0;
    }
  };

  const evaluateResult = (result, operator, target) => {
    result = Number(result);
    target = Number(target);

    switch (operator) {
      case ">=": return result >= target;
      case "<=": return result <= target;
      case ">": return result > target;
      case "<": return result < target;
      default: return false;
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API}/api/indicatores`)
      .then((res) => res.json())
      .then((d) => setData(d));
    fetch(`${import.meta.env.VITE_APP_API}/api/checks`)
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
        หมายเหตุ: <br />
        {String(detail[0]).split(", ")[0]} <br />
        {String(detail[0]).split(", ")[1]} <br />
        {/* {detail[3]} */}
        <br />
        สูตรคำนวณ: {detail[1]} <br />
        ค่าเป้าหมาย: {Number(detail[2]).toFixed(0)}<br />
        <form onSubmit={submitData}>
          <label>กรอกค่าตัวชี้วัด A : &nbsp;<br /></label>
          <input value={sa} onChange={e => setSa(e.target.value)} min={0} type="number" step="0.1" required autoFocus />
          <div hidden={!bv}>
            <label >กรอกค่าตัวชี้วัด B : &nbsp;<br /></label>
            <input value={sb} onChange={e => setSb(e.target.value)} required={bv} min={0} className="mt-2" type="number" step="0.1" />
          </div>
          <div>
            {renderInputs(c)}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </div>

          <br />

          <br />
          <button type="submit" className="open-btn2" >รายงานตัวชี้วัด</button>
        </form>
      </Modal>

      <Modal2 isOpen={open2} onClose={() => setOpen2(false)}>
        <div className="col4">
          {detailq.map((item, index) => {
            // const sa = values[item.id]?.sa || "";
            // const sb = values[item.id]?.sb || "";
            const res = calculateValue(detail[1], detailq[index]?.value_a, detailq[index]?.value_b)
            const cals = evaluateResult(res, detail[5], Number(detail[2]))

            var trc
            if (cals === false) {
              trc = "ไม่ผ่าน"
            } else
              trc = "ผ่าน"

            return (
              <div key={item.id} className="mb-4 border p-3 rounded">
                <h2 className="modal-title">
                  ตัวชี้วัด {head} ไตรมาสที่ {index + 1} ปีงบ {year + 543}
                </h2>



                หมายเหตุ: <br />
                {String(detail[0]).split(", ")[0]} <br />
                {String(detail[0]).split(", ")[1]} <br />
                {/* {detail[3]} <br /> */}
                สูตรคำนวณ: {detail[1]} <br />
                ค่าเป้าหมาย: {Number(detail[2]).toFixed(0)}
                <br /><br />

                <form onSubmit={(e) => updateReport(e, item.report_id, index)}>
                  <label> A : &nbsp;<br /></label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    value={detailq[index]?.value_a || ""}
                    onChange={(e) =>
                      handleChangee(index, "value_a", e.target.value)
                    }
                  />
                  <br />
                  <div hidden={!item.value_b || item.value_b === "0.00"}>
                    <label className="mt-2"> B : &nbsp;<br /></label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      value={detailq[index]?.value_b || ""}
                      onChange={(e) =>
                        handleChangee(index, "value_b", e.target.value)
                      }
                    />
                  </div>
                  <br hidden={item.value_b} />
                  <br />
                  ผลลัพธ์: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input className="text-center" value={res.toFixed(2)}></input> <br />
                  การประเมิน: <input className="text-center mt-2 mb-2" value={trc}></input> <br />
                  <hr />
                  <div>
                    {renderInputse(detailq[index]?.form_data, index)}
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
          agencyId={0}
          indicatorId={indi}
        />

      </Modal2>

      <div style={{ padding: 20 }}>
        <h1>รายละเอียดตัวชี้ทั้งหมด</h1>

        <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อ</th>
              <th>องค์ประกอบที่</th>
              <th>ปีงบ</th>
              <th>ไตรมาสที่ส่ง</th>
              {/* <th>ส่งตัวชี้วัด</th> */}
              <th>รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => {
              // ดึงข้อมูลตาม id
              const chk = checkMap[item.id];

              // ถ้ามีข้อมูล ก็ใช้ total_quarters, ถ้าไม่มีก็เป็น 0
              const q = chk ? chk.total_quarters : 0;

              var qq = q

              if ((q) === 4) {
                qq = 3
              }

              return (
                <tr key={i}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.year + 543}</td>
                  <td>{qq}</td>
                  {/* <td>
                    <button disabled={q === 4} className="open-btn" onClick={() => { setSa(0), setSb(0), setOpen(true), setValues({}), setIndi(item.id), setQt(q), setHead(item.code), setYear(item.year), cbv(item.variable_b_name), setC(item.form), ccv(item.form), setDetail([item.description, item.formula, item.target_value, item.form, item.detail, item.operator]) }}>ตอบตัวชี้วัด</button>
                  </td> */}
                  <td>
                    <button disabled={q === 0} className="edit-btn" onClick={e => { setSa(0), setSb(0), setIndi(item.id), setQt(q), setHead(item.code), setYear(item.year), cbv(item.variable_b_name), setC(item.form), ccv(item.form), setDetail([item.description, item.formula, item.target_value, item.form, item.detail, item.operator]), showdetail(item.id), setOpen2(true) }}>การส่งตัวชี้วัด</button>
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

export default App2;
