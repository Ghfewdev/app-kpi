import React, { useEffect, useState } from 'react'
import Authen from '../Component/Authen';
import Footer from '../Component/Footer';
import Details from '../Component/Details';
import axios from "axios";


const Form = () => {

  Authen();

  const [file, setFile] = useState();
  const [quar, setQuar] = useState([]);
  const [fetchs, setFetchs] = useState([]);
  const [forms, setForms] = useState({
    form: [],
    fill: []
  });
  const [secec, setSececs] = useState({
    sece: "",
    check: ""
  });

  var detail = Details();
  if (detail == [] || detail == undefined || detail == -Infinity) {
   detail = 0
  }
  const dep = sessionStorage.getItem("department");
  var hos;
  var ha;
  var hb;
  var qqi = <></>;
  var ress = <></>;
  var qc = 0;
  if (dep === "รพ.กลาง") {
    hos = "h1"
    ha = 0
    hb = 1
  }

  else if (dep === "รพ.ตากสิน") {
    hos = "h2"
    ha = 2
    hb = 3
  }

  else if (dep === "รพ.เจริญกรุงประชารัก") {
    hos = "h3"
    ha = 4
    hb = 5
  }

  else if (dep === "รพ.หลวงพ่อทวีศักดิ์") {
    hos = "h4"
    ha = 6
    hb = 7
  }

  else if (dep === "รพ.เวชการุณย์รัศมิ์") {
    hos = "h5"
    ha = 8
    hb = 9
  }

  else if (dep === "รพ.ลาดกระบัง") {
    hos = "h6"
    ha = 10
    hb = 11
  }

  else if (dep === "รพ.ราชพิพัฒน์") {
    hos = "h7"
    ha = 12
    hb = 13
  }

  else if (dep === "รพ.สิรินธร") {
    hos = "h8"
    ha = 14
    hb = 15
  }

  else if (dep === "รพ.ผู้สูงอายุบางขุนเทียน") {
    hos = "h9"
    ha = 16
    hb = 17
  }

  else if (dep === "รพ.คลองสามวา") {
    hos = "h10"
    ha = 18
    hb = 19
  }

  else if (dep === "รพ.บางนา") {
    hos = "h11"
    ha = 20
    hb = 21
  }

  const quc = (qq) => {

    if (qq != []) {
      var che = quar.map(a => a.de_qur)
      var st = String(che)
      if (st == "") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
        ress = <div>
        <div id='tm1'><label>ไตรมาสที่ 1: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        {/* <div hidden><textarea className='textarea60100' name='result' required /></div> */}
        </div>
        qqi = <>
          <option value={"1"}>ไตรมาสที่ 1</option>
          {/* <option value={"2"}>ไตรมาสที่ 2</option>
          <option value={"3"}>ไตรมาสที่ 3</option>
          <option value={"4"}>ไตรมาสที่ 4</option> */}
        </>
      }
      else if (st == "1") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
        qc = 1;
        ress = <div>
        <div id='tm1'><label>ไตรมาสที่ 1: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ 2: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
        {/* <div hidden><textarea className='textarea60100' name='result' required /></div> */}
        </div>
        qqi = <>
          <option value={"2"}>ไตรมาสที่ 2</option>
          {/* <option value={"3"}>ไตรมาสที่ 3</option>
          <option value={"4"}>ไตรมาสที่ 4</option> */}
        </>
      }
      else if (st == "1,2") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
        ress = <div>
        <div id='tm1'><label>ไตรมาสที่ 1: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ 2: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
        <div id='tm3'><label>ไตรมาสที่ 3: </label><br /><textarea id='rre3' className='textarea60100' name='result3' required /><br /></div>
        {/* <div hidden><textarea className='textarea60100' name='result' required /></div> */}
        </div>
        qc = 2;
        qqi = <>
          <option value={"3"}>ไตรมาสที่ 3</option>
          {/* <option value={"4"}>ไตรมาสที่ 4</option> */}
        </>
      }
      else if (st == "1,2,3") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
        ress = <div>
        <div id='tm1'><label>ไตรมาสที่ 1: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ 2: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
        <div id='tm3'><label>ไตรมาสที่ 3: </label><br /><textarea id='rre3' className='textarea60100' name='result3' required /><br /></div>
        <div id='tm4'><label>ไตรมาสที่ 4: </label><br /><textarea id='rre4' className='textarea60100' name='result4' required /><br /></div>
        {/* <div hidden><textarea className='textarea60100' name='result' required /></div> */}
        </div>
        qc = 3;
        qqi = <>
          <option value={"4"}>ไตรมาสที่ 4</option>
        </>
      }

      else {
        document.getElementById("c1").hidden = true;
        document.getElementById("c2").hidden = false;
      }
    }

    return qqi

  }

  //console.log(hos)

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData = {
      formid: d[1],
      qur: data.get("qur"),
      paras: g(z),
      ans: q(z),
      result: h(z)
    };
    const JsonData2 = {
      deid: detail + 1,
      fmsid: data.get("fmsid"),
      evname: data.get("evname"),
      evres: data.get("evres"),
      evstatus: data.get("evstatus"),
      evbudget: dcdd("dc"),
      evbuded: dcdd("dd"),
      evpoint: data.get("evpoint"),
      evtarget: data.get("evtarget"),
      result: reu(),
      problem: data.get("problem"),
      evimg: file.name
    };
    const JsonData3 = {
      "h": pa2(z)[3],
      "hpa1": pa2(z)[4],
      "hpa2": pa2(z)[5],
      "pa1": pa2(z)[0],
      "pa2": pa2(z)[1],
      "sum": pa2(z)[2]
    };

  //   const formdata = new FormData();
  //   if(file != undefined) {
  //   formdata.append("file", file)
  //   axios.post(import.meta.env.VITE_APP_API+"/upload", formdata)
  //   .then(res => {})
  //   .catch(er => console.log(er));
  //   //alert("บันทึกสำเร็จ")
  // } else {
  //   alert("เลือกไฟล์ก่อน")
  // }

    fetch(import.meta.env.VITE_APP_API+"/form/fill", {
      method: "POST",
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
          //window.location = "post";
        } else {
          alert("บันทึกไม่สำเร็จ");
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

    fetch(import.meta.env.VITE_APP_API+"/ev/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JsonData2)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === "ok") {
          //window.location = "post";
        } else {
          alert("บันทึกไม่สำเร็จ");
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

    fetch(`https://kpi-api.onrender.com/result/update/${hos}/${d[1]}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JsonData3)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === "ok") {
          window.location = "post";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

  }

  const dissi = (d) => {
    if (document.getElementById(d).disabled === true) {
      (document.getElementById(d).disabled = false)
    }
    else document.getElementById(d).disabled = true
  }

  const fetchUserDataForm = () => {

    fetch(import.meta.env.VITE_APP_API+"/form")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })


  }

  var d = secec.sece.split("ที่่: ")

  var c
  if (d[1] === undefined) {
    c = <div>
      <br /><br /><br />
      <h2>กรุณาเลือกตัวชี้วัดเพื่อดำเนินการ</h2>
      <br /><br /><br />
    </div>
  } else c

  const handleonChange = (val) => {

    fetch(`https://kpi-api.onrender.com/form/${val}`)
      .then(response2 => {
        return response2.json();
      })
      .then(data2 => {
        setForms({ ...forms, fill: data2 })
      })

    fetch(`https://kpi-api.onrender.com/result/${val}`)
      .then(response3 => {
        return response3.json();
      })
      .then(data3 => {
        setFetchs(data3);
      });

    fetch(`https://kpi-api.onrender.com/checked/user/${sessionStorage.getItem("id")}/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setQuar(data);
      });

  }

  var w = forms.fill.map(fil => fil.fm_paras)
  var y = w[0]
  var t = forms.fill.map(f => [f.fm_solve, f.fm_method])[0]
  //console.log(t)
  try {
    var z = y.split(", ")
    var n = z.map((m, i) => (
      <div key={i}>
        <div><p className='inline p'><label>{m}: &nbsp;&nbsp;</label></p>
          <p className='inline textr p'><input className='input30' type="number" id={m} required /></p>
        </div>
      </div>
    )
    )

  } catch {
  }

  function reu() {
    var rr
    if (qc == 0)
    rr = document.getElementById("rre1").value
  if (qc == 1)
    rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value
  if (qc == 2)
    rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value + ", " + document.getElementById("rre3").value
  if (qc == 3)
    rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value + ", " + document.getElementById("rre3").value + ", " + document.getElementById("rre4").value
    return rr
  }

  function g(val) {
    var g = "";
    for (var i = 1; i <= val.length; i++) {
      g += document.getElementById(`${val[i - 1]}`).value;
      if (i != val.length) {
        g += ", "
      }
    }
    return g
  }

  function dcdd(id) {
    var g = "";
    for (var i = 1; i <= 3; i++) {
      if (document.getElementById(`${id + i}`).value === "")
        g += 0
      else
        g += document.getElementById(`${id + i}`).value;
      if (i != 3) {
        g += ", "
      }
    }
    return g
  }

  function q(val) {
    var q = 0;
    var p = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
        q += parseFloat(document.getElementById(`${val[i - 1]}`).value);
        if (p === 0)
          p += parseFloat(document.getElementById(`${val[i - 1]}`).value);
        else
          p /= parseFloat(document.getElementById(`${val[i - 1]}`).value);
      }
    }
    if (t[1] === "ผลรวม")
      q = q
    else if (t[1] === "ค่าเฉลี่ย")
      q = q / val.length
    else if (t[1] === "ร้อยละ") {
      if (p * 100 <= 100)
        q = p * 100
      else if (isNaN(q))
      q = 0
      else
        q = (p ** (-1)) * 100
    }

    return q

  }

  function h(val) {
    var h;
    var g = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
        if (g === 0)
          g += Number(document.getElementById(`${val[i - 1]}`).value);
        else {
          g /= Number(document.getElementById(`${val[i - 1]}`).value);
        }
      }
    }
    if (isNaN(g))
    h = "ไม่ผ่าน"

    if (g * 100 >= 100)
      g = g ** (-1)

    if (g * 100 >= t[0].split(" ")[1]) {
      h = "ผ่าน"
    } else {
      h = "ไม่ผ่าน"
    }
    return h
  }

  // const upload = () => {
  //   const formdata = new FormData();
  //   if(file != undefined) {
  //   formdata.append("file", file)
  //   axios.post("http://localhost:3000/upload", formdata)
  //   .then(res => {})
  //   .catch(er => console.log(er));
  //   alert("บันทึกสำเร็จ")
  // } else {
  //   alert("เลือกไฟล์ก่อน")
  // }
  // }

  const pa = () => {
    var fp1 = fetchs.map(a => [a.pa1, a.pa2, a.h1pa, a.h1pb, a.h2pa, a.h2pb, a.h3pa, a.h3pb, a.h4pa, a.h4pb, a.h5pa, a.h5pb, a.h6pa, a.h6pb, a.h7pa, a.h7pb, a.h8pa, a.h8pb, a.h9pa, a.h9pb, a.h10pa, a.h10pb, a.h11pa, a.h11pb])
    var ffp1 = fp1[0]
    var ffp = [ffp1[0], ffp1[1], ffp1[ha + 2], ffp1[hb + 2]]
    return ffp
  }

  const pa2 = (val) => {
    var pa2;
    var p1 = 0;
    var p2 = 0;
    var pp1 = 0;
    var pp2 = 0;
    //var parar = sessionStorage.getItem("pp").split(",")
    var sare;
    var are;
    var iff = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
        if (iff === 0) {
          p1 = 0
          pp1 = 0
          p1 += pa()[0] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp1 += pa()[2] + Number(document.getElementById(`${val[i - 1]}`).value);
          iff = 1
        }
        else {
          p2 = 0
          pp2 = 0
          p2 += pa()[1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp2 += pa()[3] + Number(document.getElementById(`${val[i - 1]}`).value);
          //console.log("p1", p1, pp1)
          //console.log("p2", p2, pp2)
        }
      }
    }
    if ((p1 / p2) * 100 >= 100) {
      are = (((p1 / p2) ** (-1)) * 100).toFixed(2)
      sare = (((pp1 / pp2) ** (-1)) * 100).toFixed(2)
    }
    else {
      are = ((p1 / p2) * 100).toFixed(2)
      sare = ((pp1 / pp2) * 100).toFixed(2)
    }
    if (isNaN((sare))) {
       sare = 0
     }
     else if (isNaN(are)) {
      are = 0
     }
    pa2 = [p1, p2, are, sare, pp1, pp2]

    return pa2

  }

  const dis = () => {
    //console.log(pa2(z), detail, pa(), reu());
    //console.log(file.name)
    if (document.getElementById("submit").disabled === true) {
      document.getElementById("submit").disabled = false
      //console.log("n[1]", `${z[0]}`[(z[0].length) - 1])
    }
    else document.getElementById("submit").disabled = true
  }

  useEffect(() => {
    fetchUserDataForm()
  }, [])

  return (

    <>

      <div className='bgi'>
        <br /><br />
        <div className="card">

          <div className="container">
            <br />
            <h1 className='textc'>
              แบบประเมินตัวชี้วัด
            </h1>
            <br /><br />
            <div className="textl2">

              <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                <option> ชื่อและรหัสตัวชี้วัด </option>
                {forms.form.map(form => (
                  <option key={form.fm_id}>ตัวชี่้วัดลำดับที่่: {form.fm_id}</option>
                ))}
              </select>
            </div>
            <div id='c2' hidden className='textc'>
              <br /><br /><br />
              <h1 style={{ color: "red" }}>ดำเนินการส่งข้อมูลครบแล้ว</h1>
              <br /><br /><br />
            </div>
            <div id='c1'>
              <br />
              <div className="textc">{c}</div>

              <form onSubmit={handleSubmit} className='textl2'>

                {forms.fill.map(fill => (

                  <div key={fill.fm_id}>
                    <br /><label>ชื่อตัวชี้วัด: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{fill.fm_name}</b></label>
                    <br /><br />

                    <p className='inline p'><label>ส่งข้อมูลประจำ:&nbsp;&nbsp;</label></p>
                    <p className='inline textr p'><select name="qur">
                      {quc(quar)}
                      {/* <option value={"1"}>ไตรมาสที่ 1</option>
                    <option value={"2"}>ไตรมาสที่ 2</option>
                    <option value={"3"}>ไตรมาสที่ 3</option>
                    <option value={"4"}>ไตรมาสที่ 4</option> */}
                    </select></p>
                    <br /><br />
                    {n}
                    <div>
                      <br />
                      <label><b>แบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</b></label>
                      <br />
                      <br />
                      <label>ชื่อโครงการ / กิจกรรม</label>
                      <br />
                      <input type="text" className='input60' name='evname' required />
                      <br />
                      <label>ลำดับโครงการ / กิจกรรมตามแผนสนพ.</label>
                      <br />
                      <input type="number" className='input60' name='fmsid' required />
                      <br />
                      <label>ผู้รับผิดชอบ</label>
                      <br />
                      <input type="text" className='input60' name='evres' required />
                      <br />
                      <label>สถานะโครงการ</label>
                      <br />
                      <div>
                        <input type="radio" value="แล้วเสร็จ" name="evstatus" /> แล้วเสร็จ &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="ยังไม่ดำเนินการ" name="evstatus" /> ยังไม่ดำเนินการ &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="ยกเลิก" name="evstatus" /> ยกเลิก &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="กำลังดำเนินการ" name="evstatus" /> กำลังดำเนินการ &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="ชะลอ" name="evstatus" /> ชะลอ
                      </div>
                      <br />
                      <label>งบประมาณที่ได้รับ</label>
                      <br />
                      <div className="input-group mb-3">
                        <div className="input-group-text">กทม:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dc1")} />
                        </div>
                        <input type="text" className="input10" id='dc1' disabled />
                        <div className="input-group-text">เงินบำรุง:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dc2")} />
                        </div>
                        <input type="text" className="input10" id='dc2' disabled />
                        <div className="input-group-text">อื่นๆ:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dc3")} />
                        </div>
                        <input type="text" className="input10" id='dc3' disabled />
                      </div>
                      <label>งบประมาณที่ใช้</label>
                      <br />
                      <div className="input-group mb-3">
                        <div className="input-group-text">กทม:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dd1")} />
                        </div>
                        <input type="text" className="input10" id='dd1' disabled />
                        <div className="input-group-text">เงินบำรุง:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dd2")} />
                        </div>
                        <input type="text" className="input10" id='dd2' disabled />
                        <div className="input-group-text">อื่นๆ:&nbsp;&nbsp;
                          <input className="form-check-input mt-0" type="checkbox" value="" onClick={e => dissi("dd3")} />
                        </div>
                        <input type="text" className="input10" id='dd3' disabled />
                      </div>
                      <label>วัตถุประสงค์</label>
                      <br />
                      <textarea className='textarea60100' name='evpoint' required />
                      <br />
                      <label>เป้าหมาย</label>
                      <br />
                      <textarea className='textarea60100' name='evtarget' required />
                      <br />
                      <label>ผลการดำเนินงาน</label>
                      <br />
                      {ress}
                      <label>ปัญหาและอุปสรรค</label>
                      <br />
                      <textarea className='textarea60100' name='problem' required />
                      <br />
                      <label>แนบไฟล์รูปภาพ: &nbsp;&nbsp;</label>
                      <input type='file' name='evimg' onChange={(e) => setFile(e.target.files[0])} required />
                      <br /><label>**หมายเหตุชื่อไฟล์ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น**</label>
                      <div className='textr2'>
                        <br />
                        <label>ยืนยัน: <input type="checkbox" value={secec.check} onClick={e => dis()} /> </label>
                        <br />
                      </div>
                    </div>
                    <div className='textr2'>
                      <br />
                      <button id="submit" type="submit" className='btn btn-success' disabled> ส่งข้อมูล </button>
                    </div>
                  </div>

                ))}

              </form>
              </div>
              <br />
              <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
                <p className='inline textr'><a href="/"></a></p>
              </div>
            
          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /></div>

      </div>
      <Footer />

    </>
  )
}

export default Form
