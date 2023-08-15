import { useState } from "react";
import Table1 from "./Table1";
import parse from "html-react-parser";


const Tests = () => {
  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  var fetc = Table1();
  const handleonChange = (val) => {

    fetch(`https://kpi-api.onrender.com/all/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSelect(data)
      })
      document.getElementById("pass").disabled = true;
    document.getElementById("no").disabled = true;

  }

  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";
  var p = "ค่าเฉลี่ย";
  var r = "รวม";

  try {
    if (select !== null) {
      q = select[0].fm_solve
      var w = select[0].fm_method
      // var a = select.map(aa => aa.de_paras.split(", "))
      // var b = a[0]
      // var c = []
      // for (var i = 0; i < b.length; i++) {
      //   c.push(parseFloat(b[i]))
      // }
      // var d = c.reduce((a, b) => a + b, 0)
      // var e = d / b.length
      // p = e.toFixed(2)
      // r = d
    } else
      console.log("err")
  } catch {
    console.log("err2")
  }

  const handlesum = (val) => {
    var a = select.map(aa => aa.de_paras.split(", "))
    var a1 = select.map(aa1 => aa1.fm_name)[val]
    var b = a[val]
    var c = []
    for (var i = 0; i < b.length; i++) {
      c.push(parseFloat(b[i]))
    }
    var d = c.reduce((a, b) => a + b, 0)
    var e = d / b.length
    document.getElementById("pass").disabled = false;
    document.getElementById("no").disabled = false;
    document.getElementById("percen").value = d
    document.getElementById("sum").value = e.toFixed(2)
    document.getElementById("namesum").value = a1
  }

  function show(props) {
    var a;
    console.log(props)
    if (props !== null) {
      try {
        a = <div>
          <h2>ข้อมูลที่ถูกส่งเข้ามา</h2>
          <div className='container mt-3'>
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col">ส่วนราชการ</th>
                  <th scope='col'>ไตรมาส</th>
                  {props[0].fm_paras.split(', ').map((p) => {
                    return (
                      <th key={p}>{p}</th>
                    );
                  })}
                  <th scope="col">{w}</th>
                  <th scope="col">วันที่ส่ง</th>
                  <th scope="col">เวลา</th>
                  <th scope="col">เลือกสรุป</th>
                </tr>
              </thead>
              <tbody>
                {props.map((item, index) => {
                  var y = "";
                  var x = 0;
                  for (var i = 1; i <= props[0].fm_paras.split(', ').length; i++) {
                    y += `<td>${item.de_paras.split(", ")[i - 1]}</td>`
                    x += parseFloat(item.de_paras.split(", ")[i - 1])
                  }
                  if(w === "ค่าเฉลี่ย")
                  x = (x/props[0].fm_paras.split(', ').length).toFixed(2)
                  else if (w === "ร้อยละ")
                  x = x
                  else if (w === "ผลรวม")
                  x = x
                  return (
                    <tr key={index}>
                      <td>{item.us_agency}</td>
                      <td>{item.de_qur}</td>
                      {parse(y)}
                      <td>{x}</td>
                      <td>{item.fd_date}</td>
                      <td>{item.fd_time}</td>
                      <td><button className="btn btn-success" onClick={e => handlesum(index)}>เลือก</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      <div>
        <h3>รายละเอียด </h3>
        <br />
        <form>
        <label>ชื่อตัวชี้วัด: </label> <input id="namesum" disabled value={z}/>
        <br /><br />
        <label>ค่าเป้าหมาย: </label> <input id="solve" disabled value={q} />
        <br /><br />
        <label>สรุปด้วย: </label> 
        
        <br /><br />
        <label>ผลรวม: </label> <input id="percen" value={r} disabled />
        <br /><br />
        <label>ค่าเฉลี่ย: </label> <input id="sum" value={p} disabled />
        <br /><br />
        <button className="btn btn-success" id="pass" disabled>ผ่าน</button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-danger" id="no" disabled>ไม่ผ่าน</button>
        </form>
      </div>
      <br /><br />

    </>
  )


}

export default Tests
