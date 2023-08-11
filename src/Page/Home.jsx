import React, { useEffect, useState } from 'react'
import Footer from '../Component/Footer';
import parse from "html-react-parser";

const Home = () => {

  const [forms, setForms] = useState({
    form: [],
    fill: []
  });
  const [secec, setSececs] = useState({
    sece: "",
    check: ""
  });

  function g(ve) {
    var o = "";
    try {
        for (var i = 1; i <= ve; i++) {
            o += document.getElementById(`${i}`).value;
            if (i != ve) {
                o += ", "
            }
        }
        return o

    } catch {

    }

}

  const dis = () => {
    if (document.getElementById("submit").disabled === true) {
      g(z.length)
      for (var i = 0;i < z.length;i++) {
        document.getElementById(`hd${i}`).hidden = false
      }
      document.getElementById("hd11").hidden = false
      document.getElementById("hd22").hidden = false
      document.getElementById("hd33").hidden = false
      document.getElementById("hd44").hidden = false
      document.getElementById("submit").disabled = false
    }
    else {
      for (var i = 0;i < z.length;i++) {
        document.getElementById(`hd${i}`).hidden = true
      }
      document.getElementById("hd11").hidden = true
      document.getElementById("hd22").hidden = true
      document.getElementById("hd33").hidden = true
      document.getElementById("hd44").hidden = true
      document.getElementById("submit").disabled = true

    }
  }
  var co1 = <></>;
  var co2 = <></>;
  try {
    if (localStorage.getItem("token").split("$")[1] === "9") {
      co1 = <>
      <label>ต้องการแก้ไขข้อมูลตัวชี้วัด:</label> <input type="checkbox" value={secec.check} onClick={e => dis()} /> 
        <br /><br /></>
      co2 = <>
        <button id="submit" type="submit" className='btn btn-success' disabled> แก้ไขข้อมูล </button>
      </>
    }
  } catch {
    co2 = <></>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
        const JsonData = {
            name: data.get("name"),
            solve: data.get("solve"),
            method: data.get("method"),
            def: data.get("define"),
            paras: g(z.length)
        };

        fetch("http://localhost:3000/update/form", {
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
          for (var i = 0; i < (fom.fm_paras.split(", ")).length; i++) {
            pa += i + 1 + ". " + fom.fm_paras.split(", ")[i] + "<br />"

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
  //console.log(t)
  try {
    var z = y.split(", ")
    var n = z.map((m, i) => (
      <div key={i}>

        <label>ข้อมูลที่ใช้สรุปตัวชี้วัด {i + 1}: </label> <br /> <input value={m} disabled /> <br /> <div id={"hd"+i} hidden><input id={i} /></div>
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
                  {co1}
                  <br /><label>ชื่อตัวชี้วัด: </label> <br /> <input value={fill.fm_name} disabled /> <br /> <div id='hd11' hidden><input id='fname' /></div>
                  <br /><br />
                  <label>นิยามตัวชี้วัด :&nbsp;</label> <br /><textarea value={fill.fm_define} disabled /><br /><div id='hd22' hidden><textarea id='define' /></div>
                  <br /><br />
                  <label>ค่าเป้าหมาย: </label> <br /> <input value={fill.fm_solve} disabled /> <br /> <div id='hd33' hidden> <input id='solve' /></div>
                  <br /><br />
                  <label>วิธีการคำนวณ: </label> <br /><input value={fill.fm_method} disabled /> <br /> <div id='hd44' hidden> <input id='method' /></div>
                  <br /><br />
                  {n}
                  <br />
                  <div className='textc'>{co2}</div>
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

export default Home
