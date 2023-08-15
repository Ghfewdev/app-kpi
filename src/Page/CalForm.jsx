import { useState } from "react";
import Fetch from "../Component/Fetch";
import Navbar from "../Component/Navbar";
import parse from "html-react-parser";
import Footer from "../Component/Footer";
import Solve from "../Component/Solve";
import Authen from "../Component/Authen";
import Users from "../Component/Users";
import AllSolve from "../Component/AllSolve";


const CalForm = () => {

  Authen();

  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  var fetc = Fetch();
  var fusers = Users();
  var q1 = AllSolve(1).map(q => [q.us_id, q.de_ans, q.de_paras, q.de_result])
  var r1 = AllSolve(1).map(q => q.de_paras)
  var q2 = AllSolve(2).map(q => [q.us_id, q.de_ans])
  var r2 = AllSolve(2).map(q => [q.us_id, q.de_result])
  var q3 = AllSolve(3).map(q => [q.us_id, q.de_ans])
  var r3 = AllSolve(3).map(q => [q.us_id, q.de_result])
  var q4 = AllSolve(4).map(q => [q.us_id, q.de_ans])
  var r4 = AllSolve(4).map(q => [q.us_id, q.de_result])
  var ta = [];
  var cou = 0;

  const handleonChange = (val) => {

    if (localStorage.getItem("token").split("$")[1] === "9") {
      fetch(`https://kpi-api.onrender.com/all/${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setSelect(data)
        })
    } else {
      fetch(`https://kpi-api.onrender.com/all/hp/${sessionStorage.getItem("id")}/${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setSelect(data)
        })
    }

  }


  const agen = fusers.map(u => u.us_agency)
  var an = [];
  for (var i = 0; i <= agen.length - 4; i++) {
    an.push(agen[i])
    if (i === agen.length - 4) {
      an.push("**ผลรวมทุกหน่วยงาน**")
    }
  }

  try {
    
    var par1 = 0;
    var par2 = 0;
    //qq1
    var qq1 = [];
    var nqq1 = 0;
    var re1 = [];
    var pr1 = [];
    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q1.length; j++) {
        if ((q1[j])[0] === i) {
          qq1.push(((q1[j])[1]).toFixed(2))
          re1.push((q1[j])[3])
          
        if (ta[j] != 0) {
          if (cou === 0)
          console.log(1)
        }
      


         
          if (nqq1 === 0)
            nqq1 += (q1[j])[1]
          else nqq1 /= (q1[j])[1]
        }
      }
      
      if (qq1.length <= i - 10) {
        qq1.push("-")
        re1.push("-")
      }
      if (i === 20) {
        qq1.push((nqq1 * 100).toFixed(2))
        re1.push("ผ่าน")
      }
    }
    console.log("re1 = ", re1)
    console.log("tests = ", (q1[0])[2].split(", ")[2])

    //qq2
    var qq2 = [];
    var nqq2 = 0;
    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q2.length; j++) {
        if ((q2[j])[0] === i) {
          qq2.push(((q2[j])[1]).toFixed(2))
          if (nqq2 === 0)
            nqq2 += (q2[j])[1]
          else nqq2 /= (q2[j])[1]
        }
      }
      if (qq2.length <= i - 10)
        qq2.push("-")
      if (i === 20)
        qq2.push((nqq2 * 100).toFixed(2))
    }

    //qq3
    var qq3 = [];
    var nqq3 = 0;
    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q3.length; j++) {
        if ((q3[j])[0] === i) {
          qq3.push(((q3[j])[1]).toFixed(2))
          if (nqq3 === 0)
            nqq3 += (q3[j])[1]
          else nqq3 /= (q3[j])[1]
        }
      }
      if (qq3.length <= i - 10)
        qq3.push("-")
      if (i === 20)
        qq3.push((nqq3 * 100).toFixed(2))
    }

    //qq4
    var qq4 = [];
    var nqq4 = 0;
    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q4.length; j++) {
        if ((q4[j])[0] === i) {
          qq4.push(((q4[j])[1]).toFixed(2))
          if (nqq4 === 0)
            nqq4 += (q4[j])[1]
          else nqq4 /= (q4[j])[1]
        }
      }
      if (qq4.length <= i - 10)
        qq4.push("-")
      if (i === 20)
        qq4.push((nqq4 * 100).toFixed(2))
    }


  } catch {
    console.log("qq1", qq1)
  }



  var v = "นิยามตัวชี้วัด"
  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";

  try {
    if (select !== null) {
      v = select.map(vv => vv.fm_define)[0]
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
    } else
      console.log("err")
  } catch {
    console.log("err2")
  }

  try {

    for (var i = 0; i <= s.length - 1; i++) {
      if ((s[i])[(s[i].length - 1)] === "*") {
        ta.push(i)
      } else 
      ta.push(0)
    }

    console.log("ta = ", ta)

    var rr = r1[0].split(", ")
    console.log("rr = ", rr)
    console.log("s = ", (s[0])[(s[0].length - 1)])
    var tat = ta.map((t, i) => [t, rr[i]])
    console.log("tat =", tat)

    //r1
    var rr1 = [];
    var nrr1 = 0;

      for (var j = 0; j < tat.length; j++) {
        if ((tat[j])[0] === 1) {
          rr1.push((tat[j])[1])
          if (nrr1 === 0)
            nrr1 += (tat[j])[1]
          else nrr1 /= (tat[j])[1]
        }
      }
      if (nrr1 >= 1) {
        nrr1 = nrr1**-1
      }
      
    console.log("rr1 = ", rr1)
    console.log("nrr1 = ", nrr1)

  } catch {
    console.log("rr = err = ", rr)
  }


  const handlesum = (val) => {

  }

  function show(props) {
    var a;
    console.log(props)
    if (props !== null) {
      try {
        a = <div>
          <h3>รายละเอียดการส่งตัวชี้วัด </h3>
          <br />
          <div className='container mt-3'>
            <label>ชื่อตัวชี้วัด: </label><br /> <input disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input disabled value={q} />
            <br /><br />
            <label>วิธีการคำนวณ: </label><br /> <input disabled value={w} />
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
                  var u = <h4 className="bi bi-x-circle redt"></h4>;
                  for (var i = 1; i <= props[0].fm_paras.split(', ').length; i++) {
                    y += `<td>${item.de_paras.split(", ")[i - 1]}</td>`
                  }
                  if (item.de_result === "ผ่าน")
                    u = <h4 className="bi bi-check-circle greent"></h4>
                  return (
                    <tr key={index}>
                      <td>{item.us_agency}</td>
                      <td>{item.de_qur}</td>
                      {parse(y)}
                      <td>{item.de_ans.toFixed(2)}</td>
                      <td>{item.fd_date}</td>
                      <td>{item.fd_time}</td>
                      <td className="textc">{u}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <h3>สรุปผล</h3>
          <div className='container mt-3'>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col" rowSpan="2">ส่วนราชการ</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                  <th scope='col' colSpan="2">ครี่งปีแรก</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                  <th scope='col' colSpan="2">ครี่งปีหลัง</th>
                  <th scope="col" colSpan="2">ทั้งปี</th>
                  <th scope="col" rowSpan="2">รายละเอียด</th>

                </tr>

                <tr>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope="col">สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                </tr>
              </thead>
              <tbody>

                {an.map((item, index) => {
                  var uu1 = <h4 className="bi bi-x-circle redt"></h4>;
                  var uu2 = <h4 className="bi bi-x-circle redt"></h4>;
                  var uu3 = <h4 className="bi bi-x-circle redt"></h4>;
                  var uu4 = <h4 className="bi bi-x-circle redt"></h4>;

                  if (re1[index] === "ผ่าน")
                    uu1 = <h4 className="bi bi-check-circle greent"></h4>


                  return (
                    <tr key={index}>
                      <td>{an[index]}</td>
                      <td className="textc">{qq1[index]}</td>
                      <td className="textc">{uu1}</td>
                      <td className="textc">{qq2[index]}</td>
                      <td className="textc">{uu2}</td>
                      <td className="textc">97</td>
                      <td className="textc">{uu1}</td>
                      <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td>
                      <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td>
                      <td className="textc">94</td>
                      <td className="textc">{uu1}</td>
                      <td className="textc">93</td>
                      <td className="textc">{uu1}</td>
                      <td className="textc"><button className="btn btn-success" onClick={e => handlesum(index)}>เรียกดู</button></td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
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
