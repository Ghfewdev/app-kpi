import { useState } from "react";
import Fetch from "../Component/Fetch";
import Navbar from "../Component/Navbar";
import parse from "html-react-parser";
import Footer from "../Component/Footer";
import Solve from "../Component/Solve";

const CalForm = () => {
  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  var fetc = Fetch();
  const handleonChange = (val) => {

    fetch(`https://kpi-api.onrender.com/all/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSelect(data)
      })

  }

  var v = "นิยามตัวชี้วัด"
  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";

  try {
    if (select !== null) {
      q = select[0].fm_solve
      var w = select[0].fm_method
      var a = select.map(aa => aa.de_paras.split(", "))
      var s = select.map(ss => ss.fm_paras.split(", "))[0]
      var b = a[0]
      var c = []
      for (var i = 0; i < b.length; i++) {
        c.push(parseFloat(b[i]))
      }
      var f = []
      for (var i = 0; i < b.length; i++) {
        f.push(String.fromCharCode(i + 65) + " = " + s[i])
      }
      var d = c.reduce((a, b) => a + b, 0)
      var e = d / b.length
      z = select.map(zz => zz.fm_name)[0]
      p = e.toFixed(2)
      r = d
      v = select.map(vv => vv.fm_define)[0]
    } else
      console.log("err")
  } catch {
    console.log("err2")
  }

  function show(props) {
    var a;
    console.log(props)
    if (props !== null) {
      try {
        a = <div>
          <h3>รายละเอียด </h3>
          <br />
          <div className='container mt-3'>
            <label>ชื่อตัวชี้วัด: </label> <input id="namesum" disabled value={z} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label> <input id="solve" disabled value={q} />
            <br /><br />
            <div>หมายเหตุ:&nbsp;&nbsp; {f.map(ff => <a key={ff}><br />{ff}</a>)}</div>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col">ส่วนราชการ</th>
                  <th scope='col'>ไตรมาส</th>
                  {f.map(p => {
                    return (
                      <th key={p}>{p[0]}</th>
                    );
                  })}
                  <th scope="col">{w}</th>
                  <th scope="col">วันที่ส่ง</th>
                  <th scope="col">เวลา</th>
                  <th scope="col">สรุปผล</th>
                </tr>
              </thead>
              <tbody>
                {props.map((item, index) => {
                  var y = "";
                  var x = 0;
                  var u = <h4 className="bi bi-x-circle redt"></h4>;
                  for (var i = 1; i <= props[0].fm_paras.split(', ').length; i++) {
                    y += `<td>${item.de_paras.split(", ")[i - 1]}</td>`
                    x += parseFloat(item.de_paras.split(", ")[i - 1])
                  }
                  if (w === "ค่าเฉลี่ย")
                    x = (x / props[0].fm_paras.split(', ').length).toFixed(2)
                  else if (w === "ผลรวม")
                    x = x
                  if (item.de_result === "ผ่าน")
                    u = <h4 className="bi bi-check-circle greent"></h4>
                  return (
                    <tr key={index}>
                      <td>{item.us_agency}</td>
                      <td>{item.de_qur}</td>
                      {parse(y)}
                      <td>{x}</td>
                      <td>{item.fd_date}</td>
                      <td>{item.fd_time}</td>
                      <td className="textc">{u}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea id="solve" disabled value={v} />
            <br /><br />

          </div>
<br /><br />
<div className="row">
    <div className="col-6 col-md-7 textr">
      สรุปผลภาพรวมตัวชี้วัด
      <br />80
    </div>
    <div className="col-6 col-md-5">
      <Solve />
      </div>
      
  </div>
  <br /><br />
  <div className="row">
    <div className="col-6 col-md-7 textr">
      สรุปผลภาพรวมตัวชี้วัด
      <br />80
    </div>
    <div className="col-6 col-md-5">
      <Solve />
      </div>
      
  </div>
                
        </div>

      } catch {
        a = <h1>ไม่พบการส่งข้อมูลเข้ามา</h1>
      }
    } else
      a = <h1>เลือกตัวชี้วัด</h1>

    return a


  }

  var b = param.split("ลำดับที่: ")[1];

  return (
    <>
      <Navbar />
      <br />
      <h1>การสรุปผลตัวชี้วัด</h1>
      <br />
      <br />
      <select value={param} onClick={e => handleonChange(b)} onChange={e => setParam(e.target.value)} >
        <option>เลือกดูตัวชี้วัด</option>
        {fetc.map(form => (
          <option key={form.fm_id}>ตัวชี้วัด ลำดับที่: {form.fm_id}</option>
        ))}
      </select>
      <br />
      <br />

      <div>{show(select)}</div>

      <br /><br />


      <Footer />
    </>
  )


}

export default CalForm
