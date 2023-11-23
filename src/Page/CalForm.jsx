import { useState } from "react";
import Fetch from "../Component/Fetch";
import Navbar from "../Component/Navbar";
import parse from "html-react-parser";
import Footer from "../Component/Footer";
import Authen from "../Component/Authen";
import Users from "../Component/Users";
import "chartjs-gauge";
import Solve from "../Component/Solve";
import axios from "axios";

const CalForm = () => {

  Authen();

  const [file, setFile] = useState();
  const [printf, setPrintf] = useState([]);
  const [fetchs, setFetchs] = useState([]);
  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  const [qt1, setQt1] = useState([]);
  const [qt2, setQt2] = useState([]);
  const [qt3, setQt3] = useState([]);
  const [qt4, setQt4] = useState([]);
  var fetc = Fetch();
  var fusers = Users();
  var ta = [];
  var hos;
  var deid = 0;
  var ag = 12;
  var ress = <div>
    <div id='tm1'><label>ไตรมาสที่ ๑: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
  </div>
  try {
    if (sessionStorage.getItem("qur") == 2) {
      ress = <div>
        <div id='tm1'><label>ไตรมาสที่ ๑: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ ๒: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
      </div>
    }
    else if (sessionStorage.getItem("qur") == 3) {
      ress = <div>
        <div id='tm1'><label>ไตรมาสที่ ๑: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ ๒: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
        <div id='tm3'><label>ไตรมาสที่ ๓: </label><br /><textarea id='rre3' className='textarea60100' name='result3' required /><br /></div>
      </div>
    }
    else if (sessionStorage.getItem("qur") == 4) {
      ress = <div>
        <div id='tm1'><label>ไตรมาสที่ ๑: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
        <div id='tm2'><label>ไตรมาสที่ ๒: </label><br /><textarea id='rre2' className='textarea60100' name='result2' required /><br /></div>
        <div id='tm3'><label>ไตรมาสที่ ๓: </label><br /><textarea id='rre3' className='textarea60100' name='result3' required /><br /></div>
        <div id='tm4'><label>ไตรมาสที่ ๔: </label><br /><textarea id='rre4' className='textarea60100' name='result4' required /><br /></div>
      </div>
    }
  } catch {
    console.log("err")
  }

  // const dis = () => {
  //    console.log(gg(s))
  //    console.log(qg(s))
  //    console.log(hg(s))
  //    console.log(deid)
  //  } 

  const handleonChange = (val) => {

    if (localStorage.getItem("token").split("$")[1] === "9" || localStorage.getItem("token").split("$")[1] === "1") {
      fetch(import.meta.env.VITE_APP_API + `/all/${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setSelect(data)
        })
    } else {
      fetch(import.meta.env.VITE_APP_API + `/all/hp/${localStorage.getItem("id")}/${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setSelect(data)
        })
    }

    if (n != []) {

      fetch(import.meta.env.VITE_APP_API + `/checked/id/${n}/1`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt1(data);
        });

      fetch(import.meta.env.VITE_APP_API + `/checked/id/${n}/2`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt2(data);
        });

      if (n != undefined) {
        fetch(import.meta.env.VITE_APP_API + `/checked/id/${n}/3`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setQt3(data);
          });
      }
      fetch(import.meta.env.VITE_APP_API + `/checked/id/${n}/4`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setQt4(data);
        });

      fetch(import.meta.env.VITE_APP_API + `/result/${n}`)
        .then(response3 => {
          return response3.json();
        })
        .then(data3 => {
          setFetchs(data3);
        });


    }


  }

  const agen = fusers.map(u => u.us_agency)
  var an = [];
  for (var i = 0; i <= agen.length - 4; i++) {
    an.push(agen[i])
    if (i === agen.length - 4) {
      an.push("ภาพรวมทั้งสำนักการแพทย์")
    }
  }

  var v = "นิยามตัวชี้วัด"
  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";
  var vcon;
  
  try {
    if (select !== null) {
      var io;
      vcon = select.map(qof => qof.fm_con)[0]
      try{io = vcon.split(", ")}
      catch{}
      //console.log(vcon.split(", ")[Number(sessionStorage.getItem("qur"))-1])
      var t = select.map(f => [f.fm_solve, f.fm_method])[0]
      v = select.map(vv => vv.fm_define)[0]
      q = select[0].fm_solve
      var w = select[0].fm_method
      var a = select.map(aa => aa.de_paras.split(", "))
      var s = select.map(ss => ss.fm_paras.split(", "))[0]
      var fc = select.map(ffc => ffc.fm_com)[0]
      var ss = s.map((m, i) => {
        var nn = <p className='inline textr p'><input className='input30' type="number" id={m} required /></p>
      if(io.length === 4 && i === s.length-1){
      nn = <p className='inline textr p'><input className='input30' type="number" id={m} defaultValue={vcon.split(", ")[Number(sessionStorage.getItem("qur"))-1]} readOnly/></p>
      }
      else if(vcon != 0 && i === s.length-1)
      nn = <p className='inline textr p'><input className='input30' type="number" id={m} defaultValue={vcon} readOnly/></p>
      return (
      <div key={i}>
        <div><p className='inline p'><label>{m}: &nbsp;&nbsp;</label></p>
          {nn}
        </div>
      </div>
      )
    }
    )
      ;
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

  if (qt1 != [] && qt2 != [] && qt3 != [] && qt4 != []) {

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
          nqq1p1.push(Number((q1[j])[2].split(", ")[ta[0]]))
          nqq1p2.push(Number((q1[j])[2].split(", ")[ta[1]]))

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
          if ((q1par2 / q1par1) * 100 > q)
            re1.push("ผ่าน")
          else re1.push("ไม่ผ่าน")
        }
        else {
          qq1.push(((q1par1 / q1par2) * 100).toFixed(2))
          if ((q1par1 / q1par2) * 100 > q)
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
          if ((q2par2 / q2par1) * 100 > q)
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq2.push(((q2par1 / q2par2) * 100).toFixed(2))
          if ((q2par1 / q2par2) * 100 > q)
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
          if ((q3par2 / q3par1) * 100 > q)
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq3.push(((q3par1 / q3par2) * 100).toFixed(2))
          if ((q3par1 / q3par2) * 100 > q)
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
          if ((q4par2 / q4par1) * 100 > q)
            re4.push("ผ่าน")
          else re4.push("ไม่ผ่าน")
        }
        else {
          qq4.push(((q4par1 / q4par2) * 100).toFixed(2))
          if ((q4par1 / q4par2) * 100 > q)
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
    if (qq12[11] > 100)
      qq12[11] = ((qq12[11] ** -1) * 10000).toFixed(2)

    //qq3-4
    var qqn1p34 = nqq3p1.map((q, i) => q + nqq4p1[i]);
    var qqn2p34 = nqq3p2.map((q, i) => q + nqq4p2[i]);
    var qq34 = qqn1p34.map((q, i) => ((q / qqn2p34[i]) * 100).toFixed(2));
    var re34 = [];
    if (qq34[11] > 100)
      qq34[11] = ((qq34[11] ** -1) * 10000).toFixed(2)

    //qq1-3
    var qqn1p13 = qqn1p12.map((q, i) => q + nqq3p1[i]);
    var qqn2p13 = qqn2p12.map((q, i) => q + nqq3p2[i]);
    var qq13 = qqn1p13.map((q, i) => ((q / qqn2p13[i]) * 100).toFixed(2));
    var re13 = [];
    if (qq13[11] > 100)
      qq13[11] = ((qq13[11] ** -1) * 10000).toFixed(2)

    //qq1-4
    var qqn1p14 = qqn1p12.map((q, i) => q + qqn1p34[i]);
    var qqn2p14 = qqn2p12.map((q, i) => q + qqn2p34[i]);
    var qq14 = qqn1p14.map((q, i) => ((q / qqn2p14[i]) * 100).toFixed(2));
    var re14 = [];
    if (qq14[11] > 100)
      qq14[11] = ((qq14[11] ** -1) * 10000).toFixed(2)

    if (fc === 1 && !isNaN(qq4[11])) {
      qq14[11] = qq4[11]
      //console.log("o1")
    } else if (fc === 1 && !isNaN(qq3[11])) {
      qq14[11] = qq3[11]
      //console.log("o2")
    } else if (fc === 1 && !isNaN(qq2[11])) {
      qq14[11] = qq2[11]
      //console.log("o3")
    } else if (fc === 1 && !isNaN(qq1[11])) {
      qq14[11] = qq1[11]
      //console.log("o4")
    } 
      
    //var qqall = qq1.map(q => [qq1[11], qq2[11], qq12[11], qq3[11], qq4[11], qq34[11], qq14[11]])[0]
  }

  const dissi = (d) => {
    if (document.getElementById(d).disabled === true) {
      (document.getElementById(d).disabled = false)
    }
    else document.getElementById(d).disabled = true
  }


  const setid = (id, dep, para, qur) => {
    deid = id;
    var pp = para.split(", ")
    fetch(import.meta.env.VITE_APP_API + `/event/${deid}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPrintf(data);
      });

    var ha;
    var hb;

    if (dep === "รพ.กลาง") {
      hos = "h1";
      ag = "โรงพยาบาลกลาง";
      ha = 0
      hb = 1
    }
    else if (dep === "รพ.ตากสิน") {
      hos = "h2";
      ag = "โรงพยาบาลตากสิน"
      ha = 2
      hb = 3
    }
    else if (dep === "รพ.เจริญกรุงประชารัก") {
      hos = "h3"
      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
      ha = 4
      hb = 5
    }
    else if (dep === "รพ.หลวงพ่อทวีศักดิ์") {
      hos = "h4"
      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
      ha = 6
      hb = 7
    }

    else if (dep === "รพ.เวชการุณย์รัศมิ์") {
      hos = "h5"
      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
      ha = 8
      hb = 9
    }

    else if (dep === "รพ.ลาดกระบัง") {
      hos = "h6"
      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
      ha = 10
      hb = 11
    }

    else if (dep === "รพ.ราชพิพัฒน์") {
      hos = "h7"
      ag = "โรงพยาบาลราชพิพัฒน์"
      ha = 12
      hb = 13
    }

    else if (dep === "รพ.สิรินธร") {
      hos = "h8"
      ag = "โรงพยาบาลสิรินธร"
      ha = 14
      hb = 15
    }

    else if (dep === "รพ.ผู้สูงอายุบางขุนเทียน") {
      hos = "h9"
      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
      ha = 16
      hb = 17
    }

    else if (dep === "รพ.คลองสามวา") {
      hos = "h10"
      ag = "โรงพยาบาลคลองสามวา"
      ha = 18
      hb = 19
    }

    else if (dep === "รพ.บางนา") {
      hos = "h11"
      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
      ha = 20
      hb = 21
    }
    sessionStorage.setItem("ag", ag)
    sessionStorage.setItem("deid", id)
    sessionStorage.setItem("hos", hos)
    sessionStorage.setItem("ha", ha)
    sessionStorage.setItem("hb", hb)
    sessionStorage.setItem("pp", pp)
    sessionStorage.setItem("qur", qur)
    //console.log("deid = ", deid, hos, ag, pp)
    //console.log(pa2(s)[0], pa2(s)[1], pa2(s)[2], pa2(s)[3], pa2(s)[4], pa2(s)[5])
  }

  function reu() {
    var rr
    if (sessionStorage.getItem("qur") == 1)
      rr = document.getElementById("rre1").value
    if (sessionStorage.getItem("qur") == 2)
      rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value
    if (sessionStorage.getItem("qur") == 3)
      rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value + ", " + document.getElementById("rre3").value
    if (sessionStorage.getItem("qur") == 4)
      rr = document.getElementById("rre1").value + ", " + document.getElementById("rre2").value + ", " + document.getElementById("rre3").value + ", " + document.getElementById("rre4").value
    return rr
  }


  //console.log(printf)


  const handlesum = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData = {
      paras: gg(s),
      ans: qg(s),
      result: hg(s),
      deid: sessionStorage.getItem("deid")
    };
    const JsonData2 = {
      "h": pa2(s)[3],
      "hpa1": pa2(s)[4],
      "hpa2": pa2(s)[5],
      "pa1": pa2(s)[0],
      "pa2": pa2(s)[1],
      "sum": pa2(s)[2]
    };

    fetch(import.meta.env.VITE_APP_API + "/update/detail", {
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
          //window.location = "calform";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

    fetch(import.meta.env.VITE_APP_API + `/result/update/${sessionStorage.getItem("hos")}/${select[0].fm_id}`, {
      method: "PUT",
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
          alert("แก้ไขสำเร็จ");
          window.location = "calform";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

  }

  const handleeved = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData5 = {
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
      str: data.get("et"),
      evimg: name,
      deid: sessionStorage.getItem("deid")
    };

    fetch(import.meta.env.VITE_APP_API + "/ev/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JsonData5)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === "ok") {
          alert("บันทึกสำเร็จ")
          //window.location = "post";
          window.location = "calform"
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

  }

  var name = "";

  const upload = () => {
    const formdata = new FormData();
      if(file != undefined) {
      formdata.append("file", file)
      axios.post(import.meta.env.VITE_APP_API+"/upload", formdata)
      .then(res => {
       name = res.data.filename
       sessionStorage.setItem("img", name)
      })
      .catch(er => console.log(er));

      setTimeout(() => {
        const jsonImg = {
          "evimg": sessionStorage.getItem("img"),
          //"evimg": name,
          "deid": sessionStorage.getItem("deid")
        }
        fetch(import.meta.env.VITE_APP_API + "/ev/edit/img", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jsonImg)
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data.status === "ok") {
              // console.log(jsonImg)
              alert("บันทึกสำเร็จ");
            } else {
              alert("บันทึกไม่สำเร็จ");
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }, 300)

    } else {
      alert("เลือกไฟล์ก่อน")
    }
    }

  const handelPrint = () => {

    setTimeout(() => {
      window.print();
    }, 300);

  }

  function show(props) {
    var a;
    //console.log(props)
    if (props !== null) {
        if(localStorage.getItem("token").split("$")[1] === "9" && fc === 0) 
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                  {/* <th className="textc" scope="col">{w}</th> */}
                  <th className="textc" scope="col">ร้อยละ</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  {/* <th scope="col">เวลา</th> */}
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3'>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col" rowSpan="2">ส่วนราชการ</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                  <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                  {/* <th scope="col" colSpan="2">ผลดำเนินการ</th> */}
                  {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

                </tr>

                <tr>
                  {/* <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th> */}
                  {/* <th scope='col'>ผล</th>
                  <th scope="col">สรุป</th> */}
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
                    qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q34
                  if (qq34[index] > 100)
                    qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  if (qq13[index] > 100)
                    qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q14
                  if (qq14[index] > 100)
                    qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (Number(qq14[index]) > Number(q))
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
                      {/* <td className="textc">{qq2[index]}</td>
                      <td className="textc">{uu2}</td> */}
                      <td className="textc">{qq12[index]}</td>
                      <td className="textc">{re12[index]}</td>
                      {/* <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td> */}
                      <td className="textc">{qq13[index]}</td>
                      <td className="textc">{re13[index]}</td>
                      {/* <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td> */}
                      {/* <td className="textc">{qq34[index]}</td>
                      <td className="textc">{re34[index]}</td> */}
                      {/* <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td> */}
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
              <div style={{ width: 650 }}>
                <Solve name={qq14[11]} do={650} name2={q} />
              </div>
            </div>

          </div>

        </div>
        else if (localStorage.getItem("token").split("$")[1] === "1" && fc === 0)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                  {/* <th className="textc" scope="col">{w}</th> */}
                  <th className="textc" scope="col">ร้อยละ</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  {/* <th scope="col">เวลา</th> */}
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                      <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3'>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col" rowSpan="2">ส่วนราชการ</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                  <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                  <th scope="col" colSpan="2">ผลดำเนินการ</th>
                  {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

                </tr>

                <tr>
                  {/* <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th> */}
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
                    qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13


                  //q34
                  if (qq34[index] > 100)
                    qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  if (qq13[index] > 100)
                    qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;
                  
                  //q14
                  if (qq14[index] > 100)
                    qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (Number(qq14[index]) > Number(q))
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
                      {/* <td className="textc">{qq12[index]}</td>
                      <td className="textc">{re12[index]}</td> */}
                      <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td>
                      <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td>
                      {/* <td className="textc">{qq34[index]}</td>
                      <td className="textc">{re34[index]}</td> */}
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
              <div style={{ width: 650 }}>
                <Solve name={qq14[11]} do={650} name2={q} />
              </div>
            </div>

          </div>

        </div>
        else if (localStorage.getItem("token").split("$")[1] === "0" && fc === 0)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                  {/* <th className="textc" scope="col">{w}</th> */}
                  <th className="textc" scope="col">ร้อยละ</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  {/* <th scope="col">เวลา</th> */}
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3'>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col" rowSpan="2">ส่วนราชการ</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                  <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                  <th scope="col" colSpan="2">ผลดำเนินการ</th>
                  {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

                </tr>

                <tr>
                  {/* <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th> */}
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
                    qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13


                  //q34
                  if (qq34[index] > 100)
                    qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  if (qq13[index] > 100)
                    qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;
                  
                  //q14
                  if (qq14[index] > 100)
                    qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (Number(qq14[index]) > Number(q))
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
                      {/* <td className="textc">{qq12[index]}</td>
                      <td className="textc">{re12[index]}</td> */}
                      <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td>
                      <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td>
                      {/* <td className="textc">{qq34[index]}</td>
                      <td className="textc">{re34[index]}</td> */}
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
              <div style={{ width: 650 }}>
                <Solve name={qq14[11]} do={650} name2={q} />
              </div>
            </div>

          </div>

        </div>
        else if (localStorage.getItem("token").split("$")[1] === "9" && fc === 1)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                  {/* <th className="textc" scope="col">{w}</th> */}
                  <th className="textc" scope="col">ร้อยละ</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  {/* <th scope="col">เวลา</th> */}
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3'>
            <br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th scope="col" rowSpan="2">ส่วนราชการ</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                  <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                  <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                  {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                  {/* <th scope="col" colSpan="2">ผลดำเนินการ</th> */}
                  {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

                </tr>

                <tr>
                  {/* <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th>
                  <th scope='col'>ผล</th>
                  <th scope='col'>สรุป</th> */}
                  {/* <th scope='col'>ผล</th>
                  <th scope="col">สรุป</th> */}
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
                    qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13


                  //q34
                  if (qq34[index] > 100)
                    qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  if (qq13[index] > 100)
                    qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;
                  
                  //q14
                  if (qq14[index] > 100)
                    qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (Number(qq14[index]) > Number(q))
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
                      {/* <td className="textc">{qq12[index]}</td>
                      <td className="textc">{re12[index]}</td> */}
                      <td className="textc">{qq3[index]}</td>
                      <td className="textc">{uu3}</td>
                      <td className="textc">{qq4[index]}</td>
                      <td className="textc">{uu4}</td>
                      {/* <td className="textc">{qq34[index]}</td>
                      <td className="textc">{re34[index]}</td> */}
                      {/* <td className="textc">{qq14[index]}</td>
                      <td className="textc">{re14[index]}</td> */}
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
              <div style={{ width: 650 }}>
                <Solve name={qq14[11]} do={650} name2={q} />
              </div>
            </div>

          </div>

        </div>
        else if (localStorage.getItem("token").split("$")[1] === "1" && fc === 1)
        a = <div>

        <div className='container mt-3'>
          <h3>รายละเอียดการส่งตัวชี้วัด </h3>
          <br />
          <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
          <br /><br />
          <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
          <br /><br />
          <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                {/* <th className="textc" scope="col">{w}</th> */}
                <th className="textc" scope="col">ร้อยละ</th>
                <th className="textc" scope="col">วันที่ส่ง</th>
                {/* <th scope="col">เวลา</th> */}
                <th className="textc" scope="col">สรุปผล</th>
                <th className="textc" scope="col">ข้อมูลโครงการ</th>
                <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                    <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                    <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br /><br />

        </div>
        <div className="textc"><h3>สรุปผล</h3></div>
        <div className='container mt-3'>
          <br />
          <table className='table table-bordered border-primary'>

            <thead className="table-dark">
              <tr>
                <th scope="col" rowSpan="2">ส่วนราชการ</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                {/* <th scope="col" colSpan="2">ผลดำเนินการ</th> */}
                {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

              </tr>

              <tr>
                {/* <th scope='col'>ผล</th>
                <th scope='col'>สรุป</th>
                <th scope='col'>ผล</th>
                <th scope='col'>สรุป</th> */}
                {/* <th scope='col'>ผล</th>
                <th scope="col">สรุป</th> */}
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
                  qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq12[index]))
                  qq12[index] = "-"
                if (Number(qq12[index]) > Number(q))
                  re12.push("ผ่าน")
                else re12.push("ไม่ผ่าน")
                if (re12[index] === "ผ่าน")
                  re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q34
                if (qq34[index] > 100)
                  qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq34[index]))
                  qq34[index] = "-"
                if (Number(qq34[index]) > Number(q))
                  re34.push("ผ่าน")
                else re34.push("ไม่ผ่าน")
                if (re34[index] === "ผ่าน")
                  re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q13
                if (qq13[index] > 100)
                  qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq13[index]))
                  qq13[index] = "-"
                if (Number(qq13[index]) > Number(q))
                  re13.push("ผ่าน")
                else re13.push("ไม่ผ่าน")
                if (re13[index] === "ผ่าน")
                  re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q14
                if (qq14[index] > 100)
                  qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq14[index]))
                  qq14[index] = "-"
                if (Number(qq14[index]) > Number(q))
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
                    {/* <td className="textc">{qq12[index]}</td>
                    <td className="textc">{re12[index]}</td> */}
                    <td className="textc">{qq3[index]}</td>
                    <td className="textc">{uu3}</td>
                    <td className="textc">{qq4[index]}</td>
                    <td className="textc">{uu4}</td>
                    {/* <td className="textc">{qq34[index]}</td>
                    <td className="textc">{re34[index]}</td> */}
                    {/* <td className="textc">{qq4[index]}</td>
                    <td className="textc">{uu4}</td> */}
                    {/* <td className="textc">{qq14[index]}</td>
                    <td className="textc">{re14[index]}</td> */}
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
            <div style={{ width: 650 }}>
              <Solve name={qq14[11]} do={650} name2={q} />
            </div>
          </div>

        </div>

      </div>

      else if (localStorage.getItem("token").split("$")[1] === "0" && fc === 1)
        a = <div>

        <div className='container mt-3'>
          <h3>รายละเอียดการส่งตัวชี้วัด </h3>
          <br />
          <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
          <br /><br />
          <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
          <br /><br />
          <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ "+q} />
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
                {/* <th className="textc" scope="col">{w}</th> */}
                <th className="textc" scope="col">ร้อยละ</th>
                <th className="textc" scope="col">วันที่ส่ง</th>
                {/* <th scope="col">เวลา</th> */}
                <th className="textc" scope="col">สรุปผล</th>
                <th className="textc" scope="col">ข้อมูลโครงการ</th>
                <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                <th className="textc" scope="col">แก้ไขโครงการ</th>
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
                    <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                    <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br /><br />

        </div>
        <div className="textc"><h3>สรุปผล</h3></div>
        <div className='container mt-3'>
          <br />
          <table className='table table-bordered border-primary'>

            <thead className="table-dark">
              <tr>
                <th scope="col" rowSpan="2">ส่วนราชการ</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 1</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 2</th>
                {/* <th scope='col' colSpan="2">ครี่งปีแรก</th> */}
                <th scope='col' colSpan="2">ไตรมาสที่ 3</th>
                <th scope='col' colSpan="2">ไตรมาสที่ 4</th>
                {/* <th scope='col' colSpan="2">ครี่งปีหลัง</th> */}
                {/* <th scope="col" colSpan="2">ผลดำเนินการ</th> */}
                {/* <th scope="col" rowSpan="2">รายละเอียด</th> */}

              </tr>

              <tr>
                {/* <th scope='col'>ผล</th>
                <th scope='col'>สรุป</th>
                <th scope='col'>ผล</th>
                <th scope='col'>สรุป</th> */}
                {/* <th scope='col'>ผล</th>
                <th scope="col">สรุป</th> */}
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
                  qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq12[index]))
                  qq12[index] = "-"
                if (Number(qq12[index]) > Number(q))
                  re12.push("ผ่าน")
                else re12.push("ไม่ผ่าน")
                if (re12[index] === "ผ่าน")
                  re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q34
                if (qq34[index] > 100)
                  qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq34[index]))
                  qq34[index] = "-"
                if (Number(qq34[index]) > Number(q))
                  re34.push("ผ่าน")
                else re34.push("ไม่ผ่าน")
                if (re34[index] === "ผ่าน")
                  re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q13
                if (qq13[index] > 100)
                  qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq13[index]))
                  qq13[index] = "-"
                if (Number(qq13[index]) > Number(q))
                  re13.push("ผ่าน")
                else re13.push("ไม่ผ่าน")
                if (re13[index] === "ผ่าน")
                  re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                //q14
                if (qq14[index] > 100)
                  qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                if (isNaN(qq14[index]))
                  qq14[index] = "-"
                if (Number(qq14[index]) > Number(q))
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
                    {/* <td className="textc">{qq12[index]}</td>
                    <td className="textc">{re12[index]}</td> */}
                    <td className="textc">{qq3[index]}</td>
                    <td className="textc">{uu3}</td>
                    <td className="textc">{qq4[index]}</td>
                    <td className="textc">{uu4}</td>
                    {/* <td className="textc">{qq34[index]}</td>
                    <td className="textc">{re34[index]}</td> */}
                    {/* <td className="textc">{qq4[index]}</td>
                    <td className="textc">{uu4}</td> */}
                    {/* <td className="textc">{qq14[index]}</td>
                    <td className="textc">{re14[index]}</td> */}
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
            <div style={{ width: 650 }}>
              <Solve name={qq14[11]} do={650} name2={q} class={"responcal"}/>
            </div>
          </div>

        </div>

      </div>

      else{
        a = <div className="textc"><h1>ไม่พบการส่งข้อมูลเข้ามา</h1></div>
      }

    } else
      a = <div className="textc"><h1>เลือกตัวชี้วัด</h1></div>

    return a

  }


  function pagePrint(val) {
    try {
      var dp = val[0]
      var pag;
      var ap = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
      if (dp != undefined) {
        ap = <>{sessionStorage.getItem("ag")}</>
        var img = dp.ev_img
        if(img === "{}")
        img = "noimg.PNG"
        var cp = dp.ev_name
        //var c1 = c.substring(71, 0)
        //var c2 = c.substring(71)
        var ep = dp.fms_id
        var fp = dp.ev_res
        var gp = dp.ev_status
        var guu2 = <><input type="checkbox" />&nbsp; ม.ค.-มี.ค. ๖๗</>;
        var guu3 = <><input type="checkbox" /> เม.ย.-มิ.ย. ๖๗</>
        var guu4 = <><input type="checkbox" />&nbsp; ก.ค.-ก.ย. ๖๗</>


        if (sessionStorage.getItem("qur") == "2") {
          guu2 = <><input type="checkbox" checked readOnly={true} />&nbsp; ม.ค.-มี.ค. ๖๗</>;
          guu3 = <><input type="checkbox" checked={false} readOnly={true} /> เม.ย.-มิ.ย. ๖๗</>
          guu4 = <><input type="checkbox" checked={false} readOnly={true} />&nbsp; ก.ค.-ก.ย. ๖๗</>

        }
        else if (sessionStorage.getItem("qur") == "3") {
          guu2 = <><input type="checkbox" checked readOnly={true} />&nbsp; ม.ค.-มี.ค. ๖๗</>
          guu3 = <><input type="checkbox" checked readOnly={true} /> เม.ย.-มิ.ย. ๖๗</>
          guu4 = <><input type="checkbox" checked={false} readOnly={true} />&nbsp; ก.ค.-ก.ย. ๖๗</>

        }
        else if (sessionStorage.getItem("qur") == "4") {
          guu2 = <><input type="checkbox" checked readOnly={true} />&nbsp; ม.ค.-มี.ค. ๖๗</>
          guu3 = <><input type="checkbox" checked readOnly={true} /> เม.ย.-มิ.ย. ๖๗</>
          guu4 = <><input type="checkbox" checked readOnly={true} />&nbsp; ก.ค.-ก.ย. ๖๗</>

        }
        else {
          guu2 = <><input type="checkbox" checked={false} readOnly={true} />&nbsp; ม.ค.-มี.ค. ๖๗</>
          guu3 = <><input type="checkbox" checked={false} readOnly={true} /> เม.ย.-มิ.ย. ๖๗</>
          guu4 = <><input type="checkbox" checked={false} readOnly={true} />&nbsp; ก.ค.-ก.ย. ๖๗</>
        }
        var gpp = <></>;
        if (gp == 1)
          gpp = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="status" id="inlineRadio1" value="แล้วเสร็จ" checked readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio3" value="ยกเลิก" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
            </div> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio4" value="กำลังดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio5" value="ชะลอ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
            </div></>
        else if (gp == 2)
          gpp = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="status" id="inlineRadio1" value="แล้วเสร็จ" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio3" value="ยกเลิก" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
            </div> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio4" value="กำลังดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio5" value="ชะลอ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
            </div></>
        else if (gp == 3)
          gpp = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="status" id="inlineRadio1" value="แล้วเสร็จ" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio3" value="ยกเลิก" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
            </div> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio4" value="กำลังดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio5" value="ชะลอ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
            </div></>
        else if (gp == 4)
          gpp = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="status" id="inlineRadio1" value="แล้วเสร็จ" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio3" value="ยกเลิก" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
            </div> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio4" value="กำลังดำเนินการ" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio5" value="ชะลอ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
            </div></>
        else if (gp == 5)
          gpp = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="status" id="inlineRadio1" value="แล้วเสร็จ" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio3" value="ยกเลิก" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
            </div> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio4" value="กำลังดำเนินการ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="status" id="inlineRadio5" value="ชะลอ" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
            </div></>
        var hp = dp.ev_point
        var ip = dp.ev_target
        var jp = dp.ev_result
        var jpp = <></>
        if (sessionStorage.getItem("qur") == 2) {
          var rjp1 = jp.split(", ")[1]
          jpp = <div className='border border-dark mb-2 mt-1 m-0 p-2 pbi'>
            <label>ไตรมาสที่ ๒</label>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp1}</div>
            {/* <br /> */}
          </div>
        } else if (sessionStorage.getItem("qur") == 3) {
          var rjp1 = jp.split(", ")[1]
          var rjp2 = jp.split(", ")[2]
          jpp = <><div className='border border-dark mb-2 mt-1 m-0 p-2 pbi'>
            <label>ไตรมาสที่ ๒</label>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp1}</div>
            <br />
            <label>ไตรมาสที่ ๓</label>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp2}</div>
            {/* <br /> */}
          </div>
            <div className="pbb"><div className="textc d-none d-print-block">- ๓ -</div></div><br />
          </>
        } else if (sessionStorage.getItem("qur") == 4) {
          var rjp1 = jp.split(", ")[1]
          var rjp2 = jp.split(", ")[2]
          var rjp3 = jp.split(", ")[3]
          jpp = <><div className='border border-dark mb-2 mt-1 m-0 p-2 pbi'>
            <label>ไตรมาสที่ ๒</label>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp1}</div>
            {/* <br /> */}
            <label>ไตรมาสที่ ๓</label>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp2}</div>
            {/* <br /> */}</div>
            <div className="pbb"><div className="textc d-none d-print-block">- ๓ -</div></div><br />
            <div className='border border-dark mb-2 mt-1 m-0 p-2 pbi'>
              <label>ไตรมาสที่ ๔</label>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rjp3}</div>
              {/* <br /> */}
            </div>
            <br />
          </>
        }
        var kp = dp.ev_budget
        var kkp = kp.split(", ")
        var budd = <><div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" name="budget" id="inlineRadio21" value="ไม่ได้ใช้งบประมาณ" readOnly={true} checked={false} />
          <label className="form-check-label" htmlFor="inlineRadio21">ไม่ได้ใช้งบประมาณ</label>
        </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="budget" id="inlineRadio22" value="ใช้งบประมาณ" readOnly={true} checked />
            <label className="form-check-label" htmlFor="inlineRadio22">ใช้งบประมาณ</label>
          </div></>
        if (kp === "0, 0, 0") {
          var budd = <><div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="budget" id="inlineRadio21" value="ไม่ได้ใช้งบประมาณ" readOnly={true} checked />
            <label className="form-check-label" htmlFor="inlineRadio21">ไม่ได้ใช้งบประมาณ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="budget" id="inlineRadio22" value="ใช้งบประมาณ" readOnly={true} checked={false} />
              <label className="form-check-label" htmlFor="inlineRadio22">ใช้งบประมาณ</label>
            </div></>
        }
        var lp = dp.ev_buded
        var llp = lp.split(", ")
        var mp = dp.ev_problem
        var resf = <>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio31" value="เป็นไปตามแผน" checked readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio31">เป็นไปตามแผน</label>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio32" value="เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio32">เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ</label>
          </div> &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio33" value="ไม่เป็นไปตามแผน" checked={false} readOnly={true} />
            <label className="form-check-label" htmlFor="inlineRadio33">ไม่เป็นไปตามแผน</label>
          </div>
        </>
        if (dp.ev_str == 2) {
          var resf = <>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio31" value="เป็นไปตามแผน" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio31">เป็นไปตามแผน</label>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio32" value="เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio32">เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio33" value="ไม่เป็นไปตามแผน" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio33">ไม่เป็นไปตามแผน</label>
            </div>
          </>
        } else if (dp.ev_str == 3) {
          var resf = <>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio31" value="เป็นไปตามแผน" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio31">เป็นไปตามแผน</label>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio32" value="เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ" checked={false} readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio32">เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ</label>
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="resul" id="inlineRadio33" value="ไม่เป็นไปตามแผน" checked readOnly={true} />
              <label className="form-check-label" htmlFor="inlineRadio33">ไม่เป็นไปตามแผน</label>
            </div>
          </>
        }

        pag = <div className='fonts col-print-12'>
          <div className='textr0'>
            ไตรมาสที่ ๑ <input id="q1" type="checkbox" checked readOnly={true} />&nbsp; ต.ค.-ธ.ค. ๖๖
            <br />ไตรมาสที่ ๒ {guu2}
            <br />แบบรายงานความก้าวหน้ารายโครงการ/กิจกรรม&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไตรมาสที่ ๓ {guu3}
            <br /><b>ส่วนราชการ </b> &nbsp;&nbsp;&nbsp; {ap} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ไตรมาสที่ ๔ {guu4}
          </div>
          <div className='row textl5'>
            <div className='col'>
              ชื่อโครงการ/กิจกรรม
            </div>
            <div className='col-10'>{cp}</div>
          </div>

          <div className='textl5'>ลำดับโครงการ / กิจกรรมตามแผนสนพ. &nbsp;&nbsp;&nbsp; {ep}
            <br /><b>หน่วยงานที่รับผิดชอบ</b> &nbsp;&nbsp;&nbsp; {fp}
            <br />สถานะของโครงการ: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {gpp}
            <br />รายละเอียดการดำเนินงานในไตรมาสนี้ บอกถึงเป้าหมาย วัตถุประสงค์ วิธีดำเนินการและผล (ถ้ามี) รวมถึงความก้าวหน้า ของโครงการ (%)
            <div className='border border-dark mb-2 mt-1 m-0 p-2 pbi'>
              {/* <br /> */}
              <b><u>วัตถุประสงค์</u></b>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {hp}</div>
              <b><u>เป้าหมาย</u></b>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ip}</div>
              <b><u>ผลการดำเนินโครงการ</u></b><br />
              <label>ไตรมาสที่ ๑</label>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {jp.split(", ")[0]}</div></div>
            <div>
              <div className="pbb"><div className="textc d-none d-print-block">- ๒ -</div></div><br />
              {jpp}
            </div>
            <b><u>การใช้จ่ายงบประมาณ</u></b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {budd}
            <div className='m-0 mt-1 mb-0'><table className='table table-bordered border-primary textc pbi'>
              <thead>
                <tr>
                  {/* <th colSpan="2">งบประมาณและแหล่งที่มา<br />ของงบประมาณ</th> */}
                  <th colSpan="3">งบประมาณที่ได้รับทั้งหมด</th>
                  <th colSpan="3">งบประมาณที่ใช้ไปทั้งหมด</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th>งบฯกทม.</th><th>งบฯอุดหนุน<br />/อื่นๆ</th> */}
                  <th>งบฯ<br />ดำเนินการ</th>
                  <th>งบฯ<br />ลงทุน</th>
                  <th>รวม</th>
                  <th>งบฯ<br />ดำเนินการ</th>
                  <th>งบฯ<br />ลงทุน</th>
                  <th>รวม</th>
                </tr>
                <tr>
                  {/* <th>123</th><th>123</th> */}
                  <th>{kkp[0]}</th>
                  <th>{kkp[1]}</th>
                  <th>{kkp[2]}</th>
                  <th>{llp[0]}</th>
                  <th>{llp[1]}</th>
                  <th>{llp[2]}</th>
                </tr>
              </tbody>
            </table></div><b><u>สรุปผลการดำเนินงาน: </u></b><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {resf}
            <br /><b><u>ข้อคิดเห็นเพิ่มเติม / ปัญหาและอุปสรรค</u></b>
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp}

            {/* </div> */}
          </div>
          <br />
          <div className="textc pbi">
          <img src={ import.meta.env.VITE_APP_API + "/images/" + img } alt="img" className="responsive" width="700" height="500" />
          </div>
        </div>

      } else pag = <>ไม่พบการส่งข้อมูลเข้ามา</>
    } catch {
      console.log("err")
    }

    return pag
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
    if (t[1] === 3)
      q = q
    else if (t[1] === 2)
      q = q / val.length
    else if (t[1] === 1) {
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

    if (g * 100 > 100)
      g = g ** (-1)

    if (g * 100 >= t[0]) {
      h = "ผ่าน"
    } else {
      h = "ไม่ผ่าน"
    }
    return h
  }

  const pa = () => {
    var fp1 = fetchs.map(a => [a.pa1, a.pa2, a.h1pa, a.h1pb, a.h2pa, a.h2pb, a.h3pa, a.h3pb, a.h4pa, a.h4pb, a.h5pa, a.h5pb, a.h6pa, a.h6pb, a.h7pa, a.h7pb, a.h8pa, a.h8pb, a.h9pa, a.h9pb, a.h10pa, a.h10pb, a.h11pa, a.h11pb])
    var ffp1 = fp1[0]
    var ffp = [ffp1[0], ffp1[1], ffp1[Number(sessionStorage.getItem("ha")) + 2], ffp1[Number(sessionStorage.getItem("hb")) + 2]]
    return ffp
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

  const pa2 = (val) => {
    var pa2;
    var p1 = 0;
    var p2 = 0;
    var pp1 = 0;
    var pp2 = 0;
    var po1 = 0;
    var po2 = 0;
    var parar = sessionStorage.getItem("pp").split(",")
    var sare;
    var are;
    var oo;
    var iff = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
        if (iff === 0) {
          p1 = 0
          pp1 = 0
          p1 += pa()[0] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp1 += pa()[2] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          po1 += Number(document.getElementById(`${val[i - 1]}`).value);
          iff = 1
        }
        else {
          p2 = 0
          pp2 = 0
          p2 += pa()[1] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp2 += pa()[3] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          po2 += Number(document.getElementById(`${val[i - 1]}`).value);
          //console.log("p1", p1, pp1)
          //console.log("p2", p2, pp2)
        }
      }
    }
    if ((p1 / p2) * 100 > 100) {
      are = (((p1 / p2) ** (-1)) * 100).toFixed(2)
      sare = (((pp1 / pp2) ** (-1)) * 100).toFixed(2)
      oo = (((po1 / po2) ** (-1)) * 100).toFixed(2)
    }
    else {
      are = ((p1 / p2) * 100).toFixed(2)
      sare = ((pp1 / pp2) * 100).toFixed(2)
      oo = ((po1 / po2) * 100).toFixed(2)
    }
    if (isNaN((sare))) {
       sare = 0
     }
     else if (isNaN(are)) {
      are = 0
     }
     else if (isNaN(oo)) {
      oo = 0
     }
     if(fc === 1) {
      p1 = po1
      p2 = po2
      pp1 = po1
      pp2 = po2
      are = oo
      sare = oo
     }

    pa2 = [p1, p2, are, sare, pp1, pp2]

    return pa2

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

        <div className="modal fade" id="eventm" tabIndex={-1} aria-labelledby="eventm" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <form onSubmit={handleeved}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="eventm"><b>แก้ไขแบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</b></h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body textl7">

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
                    <input type="radio" value={1} name="evstatus" /> แล้วเสร็จ &nbsp;&nbsp;&nbsp;
                    <input type="radio" value={2} name="evstatus" /> ยังไม่เริ่มดำเนินการ &nbsp;&nbsp;&nbsp;
                    <input type="radio" value={3} name="evstatus" /> ยกเลิก &nbsp;&nbsp;&nbsp;
                    <input type="radio" value={4} name="evstatus" /> กำลังดำเนินการ &nbsp;&nbsp;&nbsp;
                    <input type="radio" value={5} name="evstatus" /> ชะลอ
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
                  {/* <textarea className='textarea60100' name='result' required />
                  <br /> */}
                  <label>ปัญหาและอุปสรรค</label>
                  <br />
                  <textarea className='textarea60100' name='problem' required />
                  <br />
                  <label>สรุปผลการดำเนินงาน</label>
                  <br />
                  <div>
                    <input id="et1" type="radio" value="1" name="et" /> เป็นไปตามแผน &nbsp;&nbsp;&nbsp;<br />
                    <input id="et2" type="radio" value="2" name="et" /> เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ &nbsp;&nbsp;&nbsp;<br />
                    <input id="et3" type="radio" value="3" name="et" /> ไม่เป็นไปตามแผน &nbsp;&nbsp;&nbsp;
                  </div>
                  <div className='up'>
                        <br />
                        <label>แนบไฟล์รูปภาพ: &nbsp;&nbsp;</label><br />
                        <input type='file' name='evimg' onChange={(e) => setFile(e.target.files[0])} required />
                        <button className='btn btn-primary' onClick={upload}>Upload</button>
                        <br />
                        <label>**หมายเหตุชื่อไฟล์ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น**</label>
                        <br />
                      </div>
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
      <div className='d-print-none'>
        <div className="modal fade" id="print" tabIndex="-1" aria-labelledby="#print" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header d-print-none">
                <h5 className="modal-title" id="print">พิมพ์รายงานการดำเนินงานของโครงการ</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {pagePrint(printf)}
              </div>
              <div className="modal-footer d-print-none">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => handelPrint()}><i className="bi bi-printer" ></i> พิมพ์รายงาน</button>
              </div>
            </div>
          </div>
        </div>

      </div><div className='d-none d-print-block'>{pagePrint(printf)}</div>



    </div>

  )

}

export default CalForm
