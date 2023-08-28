import { useState, useEffect } from "react";
import Fetch from "../Component/Fetch";
import Navbar from "../Component/Navbar";
import parse from "html-react-parser";
import Footer from "../Component/Footer";
import Solve from "../Component/Solve";
import Authen from "../Component/Authen";
import Users from "../Component/Users";
import ChartCom from "../Component/ChartCom";
import "chartjs-gauge";


const CalForm = () => {

  Authen();
  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  const [qt1, setQt1] = useState([]);
  const [qt2, setQt2] = useState([]);
  const [qt3, setQt3] = useState([]);
  const [qt4, setQt4] = useState([]);

  var fetc = Fetch();
  var fusers = Users();

  var ta = [];

  // const dis = () => {
  //    console.log(gg(s))
  //    console.log(qg(s))
  //    console.log(hg(s))
  //    console.log(deid)
  //  } 

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

    if (n != []) {
      fetch(`https://kpi-api.onrender.com/checked/id/${n}/1`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt1(data);
        });

      fetch(`https://kpi-api.onrender.com/checked/id/${n}/2`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt2(data);
        });

      fetch(`https://kpi-api.onrender.com/checked/id/${n}/3`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt3(data);
        });

      fetch(`https://kpi-api.onrender.com/checked/id/${n}/4`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt4(data);
        });


    }


  }

  const agen = fusers.map(u => u.us_agency)
  var an = [];
  for (var i = 0; i <= agen.length - 4; i++) {
    an.push(agen[i])
    if (i === agen.length - 4) {
      an.push("ภาพรวมทั้งสำนักการแพทพ์")
    }
  }

  var v = "นิยามตัวชี้วัด"
  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";

  try {
    if (select !== null) {
      var t = select.map(f => [f.fm_solve, f.fm_method])[0]
      v = select.map(vv => vv.fm_define)[0]
      q = select[0].fm_solve
      var w = select[0].fm_method
      var a = select.map(aa => aa.de_paras.split(", "))
      var s = select.map(ss => ss.fm_paras.split(", "))[0]
      var ss = s.map((m, i) => (
        <div key={i}>
        <div><p className='inline p2'><label>{m}: &nbsp;&nbsp;</label></p>
          <p className='inline textr p2'><input className='input30' type="number" id={m} required /></p>
        </div>
      </div>
      )
      );
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
    //console.log("err2")
  }

  try {

    for (var i = 0; i <= s.length - 1; i++) {
      if ((s[i])[(s[i].length - 1)] === "*") {
        ta.push(i)
      }

    }

  } catch {
  }

  try {

    var q1 = qt1.map(q => [q.us_id, q.de_ans, q.de_paras, q.de_result])
    var q2 = qt2.map(q => [q.us_id, q.de_ans, q.de_paras, q.de_result])
    var q3 = qt3.map(q => [q.us_id, q.de_ans, q.de_paras, q.de_result])
    var q4 = qt4.map(q => [q.us_id, q.de_ans, q.de_paras, q.de_result])

    //qq1
    var q1par1 = 0;
    var q1par2 = 0;
    var qq1 = [];
    var nqq1p1 = [];
    var nqq1p2 = [];
    var re1 = [];

    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q1.length; j++) {
        if ((q1[j])[0] === i) {
          qq1.push(((q1[j])[1]).toFixed(2))
          re1.push((q1[j])[3])
          q1par1 += Number((q1[j])[2].split(", ")[ta[0]])
          q1par2 += Number((q1[j])[2].split(", ")[ta[1]])
          nqq1p1.push(Number((q2[j])[2].split(", ")[ta[0]]))
          nqq1p2.push(Number((q2[j])[2].split(", ")[ta[1]]))

        }
      }

      if (qq1.length <= i - 10) {
        qq1.push("-")
        re1.push("-")
        nqq1p1.push(0)
        nqq1p2.push(0)
      }
      if (i === 20) {
        nqq1p1.push(q1par1)
        nqq1p2.push(q1par2)
        if (q1par1 > q1par2) {
          qq1.push(((q1par2 / q1par1) * 100).toFixed(2))
          if ((q1par2 / q1par1) * 100 > q.split(" ")[1])
            re1.push("ผ่าน")
          else re1.push("ไม่ผ่าน")
        }
        else {
          qq1.push(((q1par1 / q1par2) * 100).toFixed(2))
          if ((q1par1 / q1par2) * 100 > q.split(" ")[1])
            re1.push("ผ่าน")
          else re1.push("ไม่ผ่าน")
        }
      }
    }

    //console.log("re1 = ", re1)
    //console.log("tests = ", q1par1, (q1par2 / q1par1) * 100)

    //qq2
    var q2par1 = 0;
    var q2par2 = 0;
    var qq2 = [];
    var nqq2p1 = [];
    var nqq2p2 = [];
    var re2 = [];

    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q2.length; j++) {
        if ((q2[j])[0] === i) {
          qq2.push(((q2[j])[1]).toFixed(2))
          re2.push((q2[j])[3])
          q2par1 += Number((q2[j])[2].split(", ")[ta[0]])
          q2par2 += Number((q2[j])[2].split(", ")[ta[1]])
          nqq2p1.push(Number((q2[j])[2].split(", ")[ta[0]]))
          nqq2p2.push(Number((q2[j])[2].split(", ")[ta[1]]))


        }
      }

      if (qq2.length <= i - 10) {
        qq2.push("-")
        re2.push("-")
        nqq2p1.push(0)
        nqq2p2.push(0)
      }
      if (i === 20) {
        nqq2p1.push(q2par1)
        nqq2p2.push(q2par2)
        if (q2par1 > q2par2) {
          qq2.push(((q2par2 / q2par1) * 100).toFixed(2))
          if ((q2par2 / q2par1) * 100 > q.split(" ")[1])
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq2.push(((q2par1 / q2par2) * 100).toFixed(2))
          if ((q2par1 / q2par2) * 100 > q.split(" ")[1])
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
      }
    }

    //qq3
    var q3par1 = 0;
    var q3par2 = 0;
    var qq3 = [];
    var nqq3p1 = [];
    var nqq3p2 = [];
    var re3 = [];

    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q3.length; j++) {
        if ((q3[j])[0] === i) {
          qq3.push(((q3[j])[1]).toFixed(2))
          re3.push((q3[j])[3])
          q3par1 += Number((q3[j])[2].split(", ")[ta[0]])
          q3par2 += Number((q3[j])[2].split(", ")[ta[1]])
          nqq3p1.push(Number((q3[j])[2].split(", ")[ta[0]]))
          nqq3p2.push(Number((q3[j])[2].split(", ")[ta[1]]))

        }
      }

      if (qq3.length <= i - 10) {
        qq3.push("-")
        re3.push("-")
        nqq3p1.push(0)
        nqq3p2.push(0)
      }
      if (i === 20) {
        nqq3p1.push(q3par1)
        nqq3p2.push(q3par2)
        if (q3par1 > q3par2) {
          qq3.push(((q3par2 / q3par1) * 100).toFixed(2))
          if ((q3par2 / q3par1) * 100 > q.split(" ")[1])
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq3.push(((q3par1 / q3par2) * 100).toFixed(2))
          if ((q3par1 / q3par2) * 100 > q.split(" ")[1])
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
      }
    }

    //qq4
    var q4par1 = 0;
    var q4par2 = 0;
    var qq4 = [];
    var nqq4p1 = [];
    var nqq4p2 = [];
    var re4 = [];

    for (var i = 10; i <= 20; i++) {
      for (var j = 0; j < q4.length; j++) {
        if ((q4[j])[0] === i) {
          qq4.push(((q4[j])[1]).toFixed(2))
          re4.push((q4[j])[3])
          q4par1 += Number((q4[j])[2].split(", ")[ta[0]])
          q4par2 += Number((q4[j])[2].split(", ")[ta[1]])
          nqq4p1.push(Number((q4[j])[2].split(", ")[ta[0]]))
          nqq4p2.push(Number((q4[j])[2].split(", ")[ta[1]]))
        }
      }

      if (qq4.length <= i - 10) {
        qq4.push("-")
        re4.push("-")
        nqq4p1.push(0)
        nqq4p2.push(0)
      }
      if (i === 20) {
        nqq4p1.push(q4par1)
        nqq4p2.push(q4par2)
        if (q4par1 > q4par2) {
          qq4.push(((q4par2 / q4par1) * 100).toFixed(2))
          if ((q4par2 / q4par1) * 100 > q.split(" ")[1])
            re4.push("ผ่าน")
          else re4.push("ไม่ผ่าน")
        }
        else {
          qq4.push(((q4par1 / q4par2) * 100).toFixed(2))
          if ((q4par1 / q4par2) * 100 > q.split(" ")[1])
            re4.push("ผ่าน")
          else re4.push("ไม่ผ่าน")
        }
      }
    }

    //qq1-2
    var qqn1p12 = nqq1p1.map((q, i) => q + nqq2p1[i]);
    var qqn2p12 = nqq1p2.map((q, i) => q + nqq2p2[i]);
    var qq12 = qqn1p12.map((q, i) => ((q / qqn2p12[i]) * 100).toFixed(2));
    var re12 = [];
    if (qq12[11] >= 100)
      qq12[11] = ((qq12[11] ** -1) * 10000).toFixed(2)

    //qq3-4
    var qqn1p34 = nqq3p1.map((q, i) => q + nqq4p1[i]);
    var qqn2p34 = nqq3p2.map((q, i) => q + nqq4p2[i]);
    var qq34 = qqn1p34.map((q, i) => ((q / qqn2p34[i]) * 100).toFixed(2));
    var re34 = [];
    if (qq34[11] >= 100)
      qq34[11] = ((qq34[11] ** -1) * 10000).toFixed(2)

    //qq1-4
    var qqn1p14 = qqn1p12.map((q, i) => q + qqn1p34[i]);
    var qqn2p14 = qqn2p12.map((q, i) => q + qqn2p34[i]);
    var qq14 = qqn1p14.map((q, i) => ((q / qqn2p14[i]) * 100).toFixed(2));
    var re14 = [];
    if (qq14[11] >= 100)
      qq14[11] = ((qq14[11] ** -1) * 10000).toFixed(2)

    var qqall = qq1.map(q => [qq1[11], qq2[11], qq12[11], qq3[11], qq4[11], qq34[11], qq14[11]])[0]

    var cha = {
      labels: ["ไตรมาสที่ 1", "ไตรมาสที่ 2", "ครึ่งปีแรก", "ไตรมาสที่ 3", "ไตรมาสที่ 4", "ครึ่งปีหลัง", "ผลรวมทั้งปี"],
      datasets: [
        {
          label: "ภาพรวมสำนักการแพทย์",
          data: qqall,
          backgroundColor: [
            "rgba(75,192,192,1)",
            // "#ecf0f1",
            // "#50AF95",
            // "#f3ba2f",
            // "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }

    var config = {
      type: "gauge",
      data: {
        // labels: ['Success', 'Warning', 'Warning', 'Error'],
        datasets: [
          {
            data: [
              100,
              88,
              70,
              50
            ],
            value: value,
            backgroundColor: ["red", "orange", "yellow", "green"],
            borderWidth: 4
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Gauge chart"
        },
        layout: {
          padding: {
            bottom: 30
          }
        },
        needle: {
          // Needle circle radius as the percentage of the chart area width
          radiusPercentage: 2,
          // Needle width as the percentage of the chart area width
          widthPercentage: 3.2,
          // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
          lengthPercentage: 80,
          // The color of the needle
          color: "rgba(0, 0, 0, 1)"
        },
        valueLabel: {
          formatter: Math.round()
        }
      }
    };
    //console.log("qqn1p12", qqn1p12, qqn2p12)
    //console.log("qq12", qq12)

  } catch {
    //console.log("qq1", qq1)
  }

  var deid;
  const setid = (id) => {
    deid = id
    console.log("deid = ", deid)
  }

  const handlesum = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData = {
      paras: gg(s),
      ans: qg(s),
      result: hg(s),
      deid: deid
    };

    fetch("https://kpi-api.onrender.com/update/detail", {
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
          window.location = "calform";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

  }

  function show(props) {
    var a;
    //console.log(props)
    if (props !== null) {
      try {
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input10" disabled value={q} />
            <br /><br />
            {/* <label>วิธีการคำนวณ: </label><br /> <input className="input10" disabled value={w} />
            <br /><br /> */}
            <div>หมายเหตุ:&nbsp;&nbsp; {f.map(ff => <a key={ff}><br />{ff}</a>)}</div>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th className="textc" scope="col">ส่วนราชการ</th>
                  <th className="textc" scope='col'>ไตรมาส</th>
                  {f.map(p => {
                    return (
                      <th className="textc" key={p}>{p[0]}</th>
                    );
                  })}
                  <th className="textc" scope="col">{w}</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  {/* <th scope="col">เวลา</th> */}
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">พิมพ์รายงาน</th>
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
                      {/*  <td>{item.fd_time}</td> */}
                      <td className="textc">{u}</td>
                      <td className="textc"><button onClick={e => setid(item.de_id)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">รายละเอียด</button></td>
                      <td className="textc"><button className="btn btn-primary" onClick={window.print}><i className="bi bi-printer"> พิมพ์</i></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <div className="textc"><h3>สรุปผล</h3> <button className="btn btn-primary" onClick={window.print}><i className="bi bi-printer"> ออกรายงาน</i></button></div>
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
                  {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

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
                  if (re2[index] === "ผ่าน")
                    uu2 = <h4 className="bi bi-check-circle greent"></h4>
                  if (re3[index] === "ผ่าน")
                    uu3 = <h4 className="bi bi-check-circle greent"></h4>
                  if (re4[index] === "ผ่าน")
                    uu4 = <h4 className="bi bi-check-circle greent"></h4>


                  //q1-4
                  if (isNaN(qq1[index]))
                    qq1[index] = "-"
                  if (isNaN(qq2[index]))
                    qq2[index] = "-"
                  if (isNaN(qq3[index]))
                    qq3[index] = "-"
                  if (isNaN(qq4[index]))
                    qq4[index] = "-"

                  //q12
                  if (qq12[index] > 100)
                    qq12[index] = [((qq12[index] ** -1) * 10000).toFixed(2)]
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (qq12[index] > q.split(" ")[1])
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q34
                  if (qq34[index] > 100)
                    qq34[index] = [((qq34[index] ** -1) * 10000).toFixed(2)]
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (qq34[index] > q.split(" ")[1])
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q14
                  if (qq14[index] > 100)
                    qq14[index] = [((qq14[index] ** -1) * 10000).toFixed(2)]
                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (qq14[index] > q.split(" ")[1])
                    re14.push("ผ่าน")
                  else re14.push("ไม่ผ่าน")
                  if (re14[index] === "ผ่าน")
                    re14[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re14[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //console.log("qqall" ,qqall)
                  return (
                    <tr key={index}>
                      <td>{an[index]}</td>
                      <td className="textc">{qq1[index]}</td>
                      <td className="textc">{uu1}</td>
                      <td className="textc">{qq2[index]}</td>
                      <td className="textc">{uu2}</td>
                      <td className="textc">{qq12[index]}</td>
                      <td className="textc">{re12[index]}</td>
                      <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td>
                      <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td>
                      <td className="textc">{qq34[index]}</td>
                      <td className="textc">{re34[index]}</td>
                      <td className="textc">{qq14[index]}</td>
                      <td className="textc">{re14[index]}</td>
                      {/* <td className="textc"><button className="btn btn-success" onClick={e => handlesum(index)}>เรียกดู</button></td> */}
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
          <br /><br />
          <div className="row">
            <div className="col-3 textc">
            </div>
            <div className="col-1 col-md-5">
              <div style={{ width: 700 }}>
                <ChartCom chartData={cha} />
              </div>
            </div>

          </div>

        </div>

      } catch {
        a = <div className="textc"><h1>ไม่พบการส่งข้อมูลเข้ามา</h1></div>
      }
    } else
      a = <div className="textc"><h1>เลือกตัวชี้วัด</h1></div>

    return a


  }



  const n = param.split("ลำดับที่: ")[1];

  function gg(val) {
    var g = "";
    for (var i = 1; i <= val.length; i++) {
      g += document.getElementById(`${val[i - 1]}`).value;
      if (i != val.length) {
        g += ", "
      }
    }
    return g
  }

  function qg(val) {
    var q = 0;
    var p = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
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
      else
        q = (p ** (-1)) * 100
    }

    return q

  }

  function hg(val) {
    var h;
    var g = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
        if (g === 0)
          g += Number(document.getElementById(`${val[i - 1]}`).value);
        else {
          g /= Number(document.getElementById(`${val[i - 1]}`).value);
        }
      }
    }

    if (g * 100 >= 100)
      g = g ** (-1)

    if (g * 100 >= t[0].split(" ")[1]) {
      h = "ผ่าน"
    } else {
      h = "ไม่ผ่าน"
    }
    return h
  }

  return (
    <div>
      <div className="d-print-none">
        <Navbar />
        <div className="textc">
          <br />
          <h1>การสรุปผลตัวชี้วัด</h1>
          <br />
          <select value={param} onClick={e => handleonChange(n)} onChange={e => setParam(e.target.value)} >
            <option>เลือกดูตัวชี้วัด</option>
            {fetc.map(form => (
              <option key={form.fm_id}>ตัวชี้วัด ลำดับที่: {form.fm_id}</option>
            ))}
          </select>
          <br />
          <br />
        </div>
        <div>{show(select)}</div>

        <br /><br />


        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <form onSubmit={handlesum}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">แก้ไขการส่งข้อมูล</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body textl4">
                  {ss}
                  {/* <br /><label>ยืนยัน: <input type="checkbox" onClick={e => dis()} /> </label><br /> */}
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                  <button id="submit" type="submit" className="btn btn-primary">แก้ไขข้อมูล</button>
                </div>
              </div>
            </form>
          </div>
        </div>


        <Footer />
      </div>
      <div>

        {/* page1 */}


        <pre className='d-none d-print-block fonts'>
          <br />                                                                                                                                                                             ไตรมาสที่ 1 <input type="checkbox" /> ต.ค.-ธ.ค. ๖๖
          <br />                                                                                                                                                                             ไตรมาสที่ 2 <input type="checkbox" /> ม.ค.-มี.ค. ๖๗
          <br />                                                                      แบบรายงานความก้าวหน้ารายโครงการ/กิจกรรม                        ไตรมาสที่ 3 <input type="checkbox" /> เม.ย.-มิ.ย. ๖๗
          <br />                                                                                 <b>ส่วนราชการ....................................</b>                                   ไตรมาสที่ 4 <input type="checkbox" /> ก.ค.-ก.ย. ๖๗
          <br />                  ชื่อโครงการ/กิจกรรม.........................................................................................................................................................
          <br />                                                    ..........................................................................................................................................................
          <br />                  ลำดับที่โครงการ/กิจกรรม..............................................(ตามแผน สนพ.)..................................................(ตามแผน รพ.)
          <br />                  <b>หน่วยงานที่รับผิดชอบ</b>
          <br />                  กลุ่มงาน/ผ่าย.....................................................................................................................................................................
          <br />                  เจ้าหน้าที่ผู้รับผิดชอบ.....................................................................................โทรศัพท์......................................................
          <br />                  <b>ผลการดำเนินงาน</b>
          <br />                  สถานะของโครงการ               <input type="checkbox" />         แล้วเสร็จ                     <input type="checkbox" />         ยังไม่เริ่มดำเนินการ               <input type="checkbox" />         ยกเลิก
          <br />                                                                 <input type="checkbox" />         กำลังดำเนินการ          <input type="checkbox" />         ชะลอ
          <br />                  รายละเอียดการดำเนินงานในไตรมาสนี้ บอกถึงเป้าหมาย วัตถุประสงค์ วิธีดำเนินการและผล (ถ้ามี) รวมถึงความก้าวหน้า
          <br />                  ของโครงการ (%)
          <div className='border border-dark mb-2 mt-1 m-5 p-2'>  <b><u>วัตถุประสงค์</u></b>
            <br />          โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
            <br />  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
            <br />  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
            <br />  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
            <br />  <b><u>เป้าหมาย</u></b>
            <br />          โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
            <br />  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
            <br />  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
            <br />  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมาด้วย
            <br />  <b><u>ผลการดำเนินโครงการ</u></b>
            <br />          โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
            <br />  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
            <br />  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
            <br />  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
            <br /><table className='table table-bordered border-primary'>
              <thead><tr><th>เดือน</th><th>ค่าที่1</th><th>ค่าที่2</th><th>รวม</th></tr></thead>
              <tbody>
                <tr><th>12</th><th>123</th><th>321</th><th>321</th></tr>
                <tr><th>12</th><th>123</th><th>321</th><th>321</th></tr>
                <tr><th>12</th><th>123</th><th>321</th><th>321</th></tr>
                <tr><th>12</th><th>123</th><th>321</th><th>321</th></tr>
                <tr><th>12</th><th>123</th><th>321</th><th>321</th></tr>
              </tbody>
            </table>  <b>หมายเหตุ</b>
            <br />  ..
            <br />  ..
          </div>
          <br />
          <br />                  <b>การใช้จ่ายงบประมาณ</b>             <input type="checkbox" />         ไม่ได้ใช้งบประมาณ                     <input type="checkbox" />         ใช้งบประมาณ
          <br /><div className='m-5 mt-1 mb-0'><table className='table table-bordered border-primary textc'>
            <thead><tr><th colSpan="2">งบประมาณและแหล่งที่มาของ<br />งบประมาณ</th><th colSpan="3">งบประมาณที่ใช้ไป<br />ในรอบการรายงานครั้งนี้</th><th colSpan="3">งบประมาณที่ใช้ไป<br />ทั้งหมด</th></tr></thead>
            <tbody>
              <tr><th>งบฯกทม.</th><th>งบฯอุดหนุน<br />/อื่นๆ</th><th>งบฯ<br />ดำเนินการ</th><th>งบฯลงทุน</th><th>รวม</th><th>งบฯ<br />ดำเนินการ</th><th>งบฯลงทุน</th><th>รวม</th></tr>
              <tr><th>..</th><th>..</th><th>..</th><th>..</th><th>..</th><th>..</th><th>..</th><th>..</th></tr>

            </tbody>
          </table></div>                  <b>สรุปผลการดำเนินงาน</b> ( <input type="checkbox" /> ) เป็นไปตามแผน ( <input type="checkbox" /> ) เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ ( <input type="checkbox" /> ) ไม่เป็นไปตามแผน
          <br />
          <br />                  <b>ข้อคิดเห็นเพิ่มเติม / ปัญหาและอุปสรรค</b>
          <br />                            โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
          <br />                  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
          <br />                  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
          <br />                  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
          <br />                            โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
          <br />                  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
          <br />                  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
          <br />                  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
          <br />                            โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
          <br />                  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
          <br />                  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
          <br />                  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
          <br />                            โรงเรียนโสตศึกษาจังหวัดนนทบุรี มีนักเรียนที่บกพร่องทางการได้ยิน และบกพร่องทางสติปัญญานักเรียนส่วนใหญ่
          <br />                  เป็นนักเรียนประจำพักอยู่ที่เรือนนอนภายในโรงเรียน ปัญหาที่พบได้บ่อย คือนักเรียนที่เข้าห้องน้ำมักจะลืมปิดน้ำเมื่อใช้
          <br />                  แล้วโดยเฉพาะนักเรียนที่มีความบกพร่องทางการได้ยิน จะมีปัญหาในการไม่ได้ยินเสียงน้ำไหล และหากเกิดพฤติกรรมที่
          <br />                  ลืมปิดน้ำบ่อยครั้ง จะทำให้ค่าน้ำปะปาของโรงเรียนเพิ่มสูงขึ้นตามมา
        </pre>

      </div>
    </div>

  )

}

export default CalForm
