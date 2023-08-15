import React, { useEffect, useState } from 'react'
import Footer from '../Component/Footer';
import parse from "html-react-parser";

const EditForm = () => {
  
  const [forms, setForms] = useState({
    form: [],
    fill: []
  });
  const [secec, setSececs] = useState({
    sece: "",
    check: ""
  });

  var co = <></>;
  try {if(localStorage.getItem("token").split("$")[1] === "9") {
    co = <>
    <button id="submit" type="submit" className='btn btn-success'> แก้ไขข้อมูล </button>
    </>
    }
  } catch {
    co = <></>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      
  }

  const fetchUserDataForm = () => {

    fetch("https://kpi-api.onrender.com/form")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })

  }

  var d = secec.sece.split("รหัส: ")

  var c;
  if (d[1] === undefined) {
    c = <table className='table table-bordered border-primary'>
    <thead className="table-dark">
      <tr>
        <th>ลำดับที่</th>
        <th>ชื่อตัวชี้วัด</th>
        <th>ค่าเป้าหมาย</th>
        <th>ข้อมูลที่ใช้สรุปตัวชี้วัด</th>
        <th>การคำนวณ</th>
      </tr>
    </thead>
    <tbody>
      {forms.form.map((fom, ii) => {
        var pa = "";
        for(var i = 0; i < (fom.fm_paras.split(", ")).length;i++) {
          pa += i+1 + ". " + fom.fm_paras.split(", ")[i] + "<br />"
          
        }
        return (
          <tr key={ii}>
        <th>{fom.fm_id}</th>
        <th>{fom.fm_name}</th>
        <th>{fom.fm_solve}</th>
        <th className='textl3'>{parse(pa)}</th>
        <th>{fom.fm_method}</th>
      </tr>
        )
      })}
    </tbody>
  </table>
    
  } else c

  const handleonChange = (val) => {

    fetch(`https://kpi-api.onrender.com/form/${val}`)
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

        <label>ข้อมูลที่ใช้สรุปตัวชี้วัด {i+1}: </label><br /><input id={m} value={m} disabled />
        <br /><br />
      </div>
    )
    )

  } catch {
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
              ตัวชี้วัดทั้งหมด
            </h1>
            <br /><br />

            <div className="textl">
              <h4>เลือกดูรายละเอียดของตัวชี้วัด</h4>
              <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                <option> ตัวชี้วัดทั้งหมด </option>
                {forms.form.map(form => (
                  <option key={form.fm_id}>{form.fm_name} รหัส: {form.fm_id}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="textc">{c}</div>

            <form onSubmit={handleSubmit} className='textl2'>
                  
              {forms.fill.map(fill => (
                
                <div key={fill.fm_id}>
                  <br /><label>ชื่อตัวชี้วัด: </label> <br /><input value={fill.fm_name} disabled />
                  <br /><br />
                  <label>นิยามตัวชี้วัด :&nbsp;</label> <br /><textarea value={fill.fm_define} disabled />
                  <br /><br />
                  <label>ค่าเป้าหมาย: </label><br /> <input disabled value={fill.fm_solve} />
                  <br /><br />
                  <label>วิธีการคำนวณ: </label><br /> <input disabled value={fill.fm_method} />
                  <br /><br />
                  {n}
                  <br />
                  <br />
                  {co}
                  </div>

              ))}
              <br />
              

              
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

export default EditForm
