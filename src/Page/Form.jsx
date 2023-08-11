import React, { useEffect, useState } from 'react'
import Authen from '../Component/Authen';
import Footer from '../Component/Footer';


const Form = () => {

  Authen();
  
  const [forms, setForms] = useState({
    form: [],
    fill: []
  });
  const [secec, setSececs] = useState({
    sece: "",
    check: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData = {
      formid: d[1],
      qur: data.get("qur"),
      paras: g(z),
      des: data.get("des"),
      ans: q(z),
      result: h(z)
    };

    fetch("http://localhost:3000/form/fill", {
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
          window.location = "post";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      
  }

  const fetchUserDataForm = () => {

    fetch("http://localhost:3000/form")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })

  }

  var d = secec.sece.split("รหัส: ")

  var c
  if (d[1] === undefined) {
    c = <div>
      <br /><br /><br />
      <h2>กรุณาเลือกตัวชี้วัดเพื่อดำเนินการ</h2>
      <br /><br /><br />
    </div>
  } else c

  const handleonChange = (val) => {

    fetch(`http://localhost:3000/form/${val}`)
      .then(response2 => {
        return response2.json();
      })
      .then(data2 => {
        setForms({ ...forms, fill: data2 })
      })

  }

  var w = forms.fill.map(fil => fil.fm_paras)
  var y = w[0]
  var t = forms.fill.map(f => [f.fm_solve, f.fm_method])[0]
  console.log(t)
  try {
    var z = y.split(", ")
    var n = z.map((m, i) => (
      <div key={i}>

        <label>{m}: <input type="number" id={m} /></label>
        <br /><br />
      </div>
    )
    )

  } catch {
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

  function q(val) {
    var q = 0;
    var p = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i-1]}`[(z[i-1].length)-1] === "*") {
      q += parseFloat(document.getElementById(`${val[i - 1]}`).value);
      if(p === 0)
      p += parseFloat(document.getElementById(`${val[i - 1]}`).value);
      else
      p /= parseFloat(document.getElementById(`${val[i - 1]}`).value);
    }
  }
    if (t[1] === "ผลรวม")
    q = q
    else if (t[1] === "ค่าเฉลี่ย")
    q = q/val.length
    else if (t[1] === "ร้อยละ") {
      if (p*100 <= 100)
      q = p*100
      else 
      q = (p**(-1))*100
    }
    
    return q
    
  }

  function h(val) {
    var h;
    var g = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i-1]}`[(z[i-1].length)-1] === "*") {
        if(g === 0)
        g += Number(document.getElementById(`${val[i - 1]}`).value);
        else {
        g /= Number(document.getElementById(`${val[i - 1]}`).value);
      }
      }
    }

    if (g*100 >= 100)
    g = g**(-1)

    if (g*100 >= t[0].split(" ")[1]) {
      h = "ผ่าน"
    } else {
      h = "ไม่ผ่าน"
    }
    return h
  }

  const dis = () => {
    console.log(q(z), h(z));
    if (document.getElementById("submit").disabled === true) {
      document.getElementById("submit").disabled = false
      console.log("n[1]", `${z[0]}`[(z[0].length)-1])
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

            <div className="textr2">

              <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                <option> ชื่อและรหัสตัวชี้วัด </option>
                {forms.form.map(form => (
                  <option key={form.fm_id}>{form.fm_name} รหัส: {form.fm_id}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="textc">{c}</div>

            <form onSubmit={handleSubmit} className='textr2'>
                  
              {forms.fill.map(fill => (
                
                <div key={fill.fm_id}>
                  <br /><label>ชื่อตัวชี้วัด: {fill.fm_name}</label>
                  <br /><br />
                  <label>ส่งข้อมูลประจำ:&nbsp;&nbsp;</label>
                  <select name="qur">
                    <option value={"1"}>ไตรมาสที่ 1</option>
                    <option value={"2"}>ไตรมาสที่ 2</option>
                    <option value={"3"}>ไตรมาสที่ 3</option>
                    <option value={"4"}>ไตรมาสที่ 4</option>
                  </select>
                  <br /><br />
                  {n}
                  <div>
                  <label>ความก้าวหน้ารายโครงการ/กิจกรรม และ อัพโหลดไฟล์แนบ</label>
                  <br />
                  <textarea name='des' type='text'/>
                  <br />
                  <input type='file' />
                  <br />
                  <label>ยืนยัน: <input type="checkbox" value={secec.check} onClick={e => dis()} /> </label>
                  <br />
                  </div>

                </div>

              ))}
              <br />

              <button id="submit" type="submit" className='btn btn-success' disabled> ส่งข้อมูล </button>
            </form>
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
