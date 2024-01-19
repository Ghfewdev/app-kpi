import { useState, useEffect } from "react";
import Fetch from "../Component/Fetch";
import Navbar from "../Component/Navbar";
import parse from "html-react-parser";
import Footer from "../Component/Footer";
import Authen from "../Component/Authen";
import Users from "../Component/Users";
import "chartjs-gauge";
import Solve from "../Component/Solve";
import axios from "axios";
import Solve2 from "../Component/solve2";

const CalForm = () => {

  Authen();


  const [events, setEvents] = useState([]);
  const [eve, setEve] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [file, setFile] = useState();
  const [printf, setPrintf] = useState([]);
  const [fetchs, setFetchs] = useState([]);
  const [param, setParam] = useState("");
  const [select, setSelect] = useState(null);
  const [qt1, setQt1] = useState([]);
  const [qt2, setQt2] = useState([]);
  const [qt3, setQt3] = useState([]);
  const [qt4, setQt4] = useState([]);
  const [formres, setFormres] = useState([])
  var fetc = Fetch();
  var fusers = Users();
  var ta = [];
  var hos;
  var deid = 0;
  var ag = 12;
  var parast = 0

  const sts = (val) => {
    parast = 0
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
        parast += 1
      }
    }
    //sessionStorage.setItem("tuo", parast)
  }

  var formmm
  if (tableData1 != undefined) {
    formmm = tableData1.map(form => {
      return (
        <option key={form.fm_id}>ตัวชี้วัด ลำดับที่: {form.fm_id}</option>
      )
    });
  }

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

      fetch(import.meta.env.VITE_APP_API + `/evde/f/${val}/a`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setEve(data);
        });


    } else {
      fetch(import.meta.env.VITE_APP_API + `/all/hp/${localStorage.getItem("id")}/${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setSelect(data)
        })

      fetch(import.meta.env.VITE_APP_API + `/evde/${val}/${localStorage.getItem("id")}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setEve(data);
        });

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

      fetch(import.meta.env.VITE_APP_API + `/form/res/${localStorage.getItem("id")}`)
        .then(response3 => {
          return response3.json();
        })
        .then(data7 => {
          setFormres(data7);
        });

    }


  }

  const agen = fusers.map(u => u.us_agency)
  var an = [];
  for (var i = 0; i <= agen.length - 2; i++) {
    an.push(agen[i])
    if (i === agen.length - 2) {
      an.push("ภาพรวมทั้งสำนักการแพทย์")
    }
  }

  var v = "นิยามตัวชี้วัด"
  var z = "ชื่อตัวชี้วัด";
  var q = "ค่าเป้าหมาย";
  var vcon;

  try {
    if (select != null) {
      var io;
      vcon = select.map(qof => qof.fm_con)[0]
      var tttt = vcon.split(", ")
      try { io = vcon.split(", ") }
      catch { }
      //console.log(vcon.split(", ")[Number(sessionStorage.getItem("qur")) - 1])
      var t = select.map(f => [f.fm_solve, f.fm_method])[0]
      v = select.map(vv => vv.fm_define)[0]
      q = select[0].fm_solve
      var w = select[0].fm_method
      var a = select.map(aa => aa.de_paras.split(", "))
      var s = select.map(ss => ss.fm_paras.split(", "))[0]
      var fc = select.map(ffc => ffc.fm_com)[0]
      var met = select.map(me => me.fm_method)[0]
      var nn;
      var ansl = q
      if (vcon != 0) {
        ansl = tttt.reduce((x, y) => Number(x) + Number(y), 0);
      } else
        ansl = select[0].fm_solve
      var ss = s.map((m, i) => {
        nn = <p className='inline textr p'><input className='input30' type="text" id={m} required /></p>
        if (io.length === 11 && i === s.length - 1) {
          nn = <p className='inline textr p'><input className='input30' type="text" id={m} defaultValue={vcon.split(", ")[Number(sessionStorage.getItem("qur")) - 1]} readOnly /></p>
        }
        else if (vcon != 0 && i === s.length - 1) {
          nn = <p className='inline textr p'><input className='input30' type="text" id={m} defaultValue={vcon} readOnly /></p>
        } else if (m === "*" && i === s.length - 1) {
          nn = <p className='inline textr p hidden'><input className='input30' type="text" id={m} defaultValue={1} readOnly /></p>
        }
        return (
          <div key={i}>
            <div><p className='inline p'><label>{m}: &nbsp;&nbsp;</label></p>
              {nn}
            </div>
          </div>
        )
      }
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

    for (var i = 10; i <= 22; i++) {
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
      if (i === 22) {
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

    for (var i = 10; i <= 22; i++) {
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
      if (i === 22) {
        nqq2p1.push(q2par1)
        nqq2p2.push(q2par2)
        if (q2par1 > q2par2) {
          qq2.push(((q2par2 / q2par1) * 100).toFixed(2))
          if ((q2par2 / q2par1) * 100 > q)
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq2.push(((q2par2 / q2par1) * 100).toFixed(2))
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

    for (var i = 10; i <= 22; i++) {
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
      if (i === 22) {
        nqq3p1.push(q3par1)
        nqq3p2.push(q3par2)
        if (q3par1 > q3par2) {
          qq3.push(((q3par2 / q3par1) * 100).toFixed(2))
          if ((q3par2 / q3par1) * 100 > q)
            re2.push("ผ่าน")
          else re2.push("ไม่ผ่าน")
        }
        else {
          qq3.push(((q3par2 / q3par1) * 100).toFixed(2))
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

    for (var i = 10; i <= 22; i++) {
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
      if (i === 22) {
        nqq4p1.push(q4par1)
        nqq4p2.push(q4par2)
        if (q4par1 > q4par2) {
          qq4.push(((q4par2 / q4par1) * 100).toFixed(2))
          if ((q4par2 / q4par1) * 100 > q)
            re4.push("ผ่าน")
          else re4.push("ไม่ผ่าน")
        }
        else {
          qq4.push(((q4par2 / q4par1) * 100).toFixed(2))
          if ((q4par1 / q4par2) * 100 > q)
            re4.push("ผ่าน")
          else re4.push("ไม่ผ่าน")
        }
      }
    }

    //qq1-2
    var qqn1p12 = nqq1p1.map((q, i) => q + nqq2p1[i]);
    var qqn2p12 = nqq1p2.map((q, i) => q + nqq2p2[i]);
    var qq12 = qqn1p12.map((q, i) => ((qqn2p12[i] / q) * 100).toFixed(2));
    var re12 = [];
    // if (qq12[11] > 100)
    //   qq12[11] = ((qq12[11] ** -1) * 10000).toFixed(2)

    //qq3-4
    var qqn1p34 = nqq3p1.map((q, i) => q + nqq4p1[i]);
    var qqn2p34 = nqq3p2.map((q, i) => q + nqq4p2[i]);
    var qq34 = qqn1p34.map((q, i) => ((q / qqn2p34[i]) * 100).toFixed(2));
    var re34 = [];
    // if (qq34[11] > 100)
    //   qq34[11] = ((qq34[11] ** -1) * 10000).toFixed(2)

    //qq1-3
    var qqn1p13 = qqn1p12.map((q, i) => q + nqq3p1[i]);
    var qqn2p13 = qqn2p12.map((q, i) => q + nqq3p2[i]);
    var qq13 = qqn1p13.map((q, i) => ((qqn2p13[i] / q) * 100).toFixed(2));
    var re13 = [];
    // if (qq13[11] > 100)
    //   qq13[11] = ((qq13[11] ** -1) * 10000).toFixed(2)

    //qq1-4
    var qqn1p14 = qqn1p12.map((q, i) => q + qqn1p34[i]);
    var qqn2p14 = qqn2p12.map((q, i) => q + qqn2p34[i]);
    var qq14 = qqn1p14.map((q, i) => ((qqn2p14[i] / q) * 100).toFixed(2));
    var re14 = [];
    // if (qq14[11] > 100)
    //   qq14[11] = ((qq14[11] ** -1) * 10000).toFixed(2)

    if (fc === 1 && !isNaN(qq4[13])) {
      qq14[13] = qq4[13]
      //console.log("o1")
    } else if (fc === 1 && !isNaN(qq3[13])) {
      qq14[13] = qq3[13]
      //console.log("o2")
    } else if (fc === 1 && !isNaN(qq2[13])) {
      qq14[13] = qq2[13]
      //console.log("o3")
    } else if (fc === 1 && !isNaN(qq1[13])) {
      qq14[13] = qq1[13]
      //console.log("o4")
    }

    setTimeout(() => {
      if (n === "24" || n === "26") {
        qq14[13] = qq14[13] ** (-1)
      } else if (n === "39", n === "15", n === "48") {
        qq14[13] = qq14[13]
        document.getElementById("ccc").hidden = true
      }
    }, 200)
    // if (n === "8" || n ==="24") {
    //   qq14 = qq14**(-1)
    // }

    //var qqall = qq1.map(q => [qq1[11], qq2[11], qq12[11], qq3[11], qq4[11], qq34[11], qq14[11]])[0]
  }

  const dissi = (d) => {
    if (document.getElementById(d).disabled === true) {
      (document.getElementById(d).disabled = false)
    }
    else document.getElementById(d).disabled = true
  }

  const detev = (val, dep, qur) => {
    fetch(import.meta.env.VITE_APP_API + `/evde/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPrintf(data);
      });


    if (dep === 10) {
      ag = "โรงพยาบาลกลาง";
    }
    else if (dep === 11) {
      ag = "โรงพยาบาลตากสิน"
    }
    else if (dep === 12) {
      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
    }
    else if (dep === 13) {
      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
    }
    else if (dep === 14) {
      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
    }
    else if (dep === 15) {
      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
    }
    else if (dep === 16) {
      ag = "โรงพยาบาลราชพิพัฒน์"
    }
    else if (dep === 17) {
      ag = "โรงพยาบาลสิรินธร"
    }
    else if (dep === 18) {
      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
    }
    else if (dep === 19) {
      ag = "โรงพยาบาลคลองสามวา"
    }
    else if (dep === 20) {
      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
    }
    else if (dep === 21) {
      ag = "สก."
    }
    else if (dep === 22) {
      ag = "ศบฉ."
    }

    sessionStorage.setItem("ag", ag)
    sessionStorage.setItem("qur", qur)
    sessionStorage.setItem("evid", val)
    sessionStorage.setItem("edid", dep)
  }

  const setp = (dep) => {

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
    else if (dep === "รพ.เจริญกรุงประชารักษ์") {
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

    else if (dep === "สก.") {
      hos = "d1"
      ag = "สก."
      ha = 22
      hb = 23
    }

    else if (dep === "ศบฉ.") {
      hos = "d2"
      ag = "ศบฉ."
      ha = 24
      hb = 25
    }

    // else if (dep === "สพบ.") {
    //   hos = "0"
    //   ag = "0"
    //   ha = 0
    //   hb = 0
    // }

    sessionStorage.setItem("ag", ag)
    sessionStorage.setItem("hos", hos)
    sessionStorage.setItem("ha", ha)
    sessionStorage.setItem("hb", hb)
  }

  const setid = (id, dep, para, qur) => {
    deid = id;
    var pp = para.split(", ")

    var ha;
    var hb;
    var fm;
    //console.log(dep)
    if (dep === "รพ.กลาง") {
      hos = "h1";
      ag = "โรงพยาบาลกลาง";
      ha = 0
      hb = 1
      fm = 10
    }
    else if (dep === "รพ.ตากสิน") {
      hos = "h2";
      ag = "โรงพยาบาลตากสิน"
      ha = 2
      hb = 3
      fm = 11
    }
    else if (dep === "รพ.เจริญกรุงประชารักษ์") {
      hos = "h3"
      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
      ha = 4
      hb = 5
      fm = 12
    }
    else if (dep === "รพ.หลวงพ่อทวีศักดิ์") {
      hos = "h4"
      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
      ha = 6
      hb = 7
      fm = 13
    }

    else if (dep === "รพ.เวชการุณย์รัศมิ์") {
      hos = "h5"
      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
      ha = 8
      hb = 9
      fm = 14
    }

    else if (dep === "รพ.ลาดกระบัง") {
      hos = "h6"
      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
      ha = 10
      hb = 11
      fm = 15
    }

    else if (dep === "รพ.ราชพิพัฒน์") {
      hos = "h7"
      ag = "โรงพยาบาลราชพิพัฒน์"
      ha = 12
      hb = 13
      fm = 16
    }

    else if (dep === "รพ.สิรินธร") {
      hos = "h8"
      ag = "โรงพยาบาลสิรินธร"
      ha = 14
      hb = 15
      fm = 17
    }

    else if (dep === "รพ.ผู้สูงอายุบางขุนเทียน") {
      hos = "h9"
      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
      ha = 16
      hb = 17
      fm = 18
    }

    else if (dep === "รพ.คลองสามวา") {
      hos = "h10"
      ag = "โรงพยาบาลคลองสามวา"
      ha = 18
      hb = 19
      fm = 19
    }

    else if (dep === "รพ.บางนา") {
      hos = "h11"
      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
      ha = 20
      hb = 21
      fm = 20
    }

    else if (dep === "สก.") {
      hos = "d1"
      ag = "สก."
      ha = 22
      hb = 23
      fm = 21
    }

    else if (dep === "ศบฉ.") {
      hos = "d2"
      ag = "ศบฉ."
      ha = 24
      hb = 25
      fm = 22
    }

    s.map((m, i) => {
      setTimeout(() => {
        document.getElementById(m).value = sessionStorage.getItem("pp").split(",")[i]
      }, 200)
    })

    sessionStorage.setItem("ag", ag)
    sessionStorage.setItem("deid", id)
    sessionStorage.setItem("hos", hos)
    sessionStorage.setItem("ha", ha)
    sessionStorage.setItem("hb", hb)
    sessionStorage.setItem("pp", pp)
    sessionStorage.setItem("qur", qur)
    sessionStorage.setItem("edid", fm)

    console.log(pa2(s), pa(), qq14[13], qg(s), hg(s), parast)
    //console.log(vcon.split(", ")[Number(sessionStorage.getItem("qur"))-1])
    //console.log(n)
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
      "log": pa2(s)[6],
      "sum": pa2(s)[2]
    };
    const JsonData6 = {
      user: sessionStorage.getItem("edid"),
      detail: sessionStorage.getItem("deid")
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
          //alert("แก้ไขสำเร็จ");
          //window.location = "calform";
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

    fetch(import.meta.env.VITE_APP_API + "/formed/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JsonData6)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.status === "ok") {
          console.log("logadd: success")
          alert("แก้ไขสำเร็จ")
          window.location = "calform"
        } else {
          console.log("logadd: failure")
          alert("แก้ไขไม่สำเร็จ")
        }
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

  }

  const handleeved = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const JsonData5 = {
      qur: sessionStorage.getItem("qur"),
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
      evid: sessionStorage.getItem("evid")
    };

    // const JsonData6 = {
    //   user: localStorage.getItem("id"),
    //   detail: sessionStorage.getItem("deid")
    // };

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
          window.location = "calform"
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })

    // fetch(import.meta.env.VITE_APP_API + "/formed/update", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(JsonData6)
    // })
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     if (data.status === "ok") {
    //       console.log("logadd: success")
    //       alert("บันทึกสำเร็จ")
    //       //window.location = "calform"
    //     } else {
    //       console.log("logadd: failure")
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error)
    //   })

  }

  var name = "";

  const upload = () => {
    const formdata = new FormData();
    if (file != undefined) {
      formdata.append("file", file)
      axios.post(import.meta.env.VITE_APP_API + "/upload", formdata)
        .then(res => {
          name = res.data.filename
          sessionStorage.setItem("img", name)
        })
        .catch(er => console.log(er));

      setTimeout(() => {
        const jsonImg = {
          "evimg": sessionStorage.getItem("img"),
          //"evimg": name,
          "evid": sessionStorage.getItem("evid")
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
    var qwe = 0;
    
    try {
      if (localStorage.getItem("token").split("$")[1] === "9")
        qwe = pa()[5]
      else {
        qwe = pa()[2]
      }
    } catch {
    }
    //console.log(props)
    if (props != null) {
      var sev = <div style={{ width: 530 }}>
                <Solve name={qq14[13]} do={530} name2={q} class={"responcal"} />
              </div>
      if (n === "20" || n === "20.2")
      var sev = <div style={{ width: 530 }}>
                <Solve2 name={qq14[13]} do={530} name2={q} class={"responcal"} />
              </div>

      var hosi = Number(localStorage.getItem("id")) - 10
      //console.log(hosi)
      if (localStorage.getItem("token").split("$")[1] === "9" && fc === 0 && met === 1)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ " + q} />
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
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">สรุปผล</th>
                  {/* <th className="textc" scope="col">ข้อมูลโครงการ</th> */}
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
                  {/* <th className="textc" scope="col">แก้ไขโครงการ</th> */}
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
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      {/* <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td> */}
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      {/* <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>

          <div className='container mt-3'>
            <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
            <br /><br />
            <table className='table table-bordered border-primary'>
              <thead className="table-dark">
                <tr>
                  <th className="textc" scope="col" width="20">ลำดับ</th>
                  <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                  <th className="textc" scope='col' width="20">ไตรมาส</th>
                  <th className="textc" scope='col'>ชื่อโครงการ</th>
                  <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                  <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                  <th className="textc" scope='col' width="170">รายละเอียด</th>
                  <th className="textc" scope='col' width="120">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {eve.map((e, j) => {
                  var rr = e.ev_id
                  var qq = e.ev_qur
                  var uu = e.us_id
                  var ag

                  if (uu === 10) {
                    ag = "โรงพยาบาลกลาง";
                  }
                  else if (uu === 11) {
                    ag = "โรงพยาบาลตากสิน"
                  }
                  else if (uu === 12) {
                    ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                  }
                  else if (uu === 13) {
                    ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                  }
                  else if (uu === 14) {
                    ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                  }
                  else if (uu === 15) {
                    ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                  }
                  else if (uu === 16) {
                    ag = "โรงพยาบาลราชพิพัฒน์"
                  }
                  else if (uu === 17) {
                    ag = "โรงพยาบาลสิรินธร"
                  }
                  else if (uu === 18) {
                    ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                  }
                  else if (uu === 19) {
                    ag = "โรงพยาบาลคลองสามวา"
                  }
                  else if (uu === 20) {
                    ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                  }
                  else if (uu === 21) {
                    ag = "สก."
                  }
                  else if (uu === 22) {
                    ag = "ศบฉ."
                  }

                  return (
                    <tr key={j}>
                      <td>{e.fms_id}</td>
                      <td>{ag}</td>
                      <td>{e.ev_qur}</td>
                      <td>{e.ev_name}</td>
                      <td>{e.ed_date.split("T")[0]}</td>
                      <td>{e.ed_update.split("T")[0]}</td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <br /><br />
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3' id="ccc">
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
                  // if (qq12[index] > 100) {
                  //   if (qq2[index] === "-")
                  //     qq12[index] = "-"
                  //   else
                  //     qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  // }
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q34
                  // if (qq34[index] > 100)
                  //   qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  // if (isNaN(qq34[index]))
                  //   qq34[index] = "-"
                  // if (Number(qq34[index]) > Number(q))
                  //   re34.push("ผ่าน")
                  // else re34.push("ไม่ผ่าน")
                  // if (re34[index] === "ผ่าน")
                  //   re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  // else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  // if (qq13[index] > 100) {
                  //   if (qq3[index] === "-")
                  //     qq13[index] = "-"
                  //   else
                  //     qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  // }
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q14
                  // if (qq14[index] > 100) {
                  //   if (qq4[index] === "-")
                  //     qq14[index] = "-"
                  //   else
                  //     qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
                  // }

                  if (n === "24" || n === "26") {
                    qq14[index] = ((qq14[index] ** (-1)) * 10000).toFixed(2)
                  } else if (n === "39", n === "15", n === "48") {
                    qq14[index] = ((qq14[index] ** (-1)) * 100).toFixed(2)
                    //console.log(qq1)
                    //console.log(qq12)
                    //console.log(qq13)
                  }

                  if (isNaN(qq14[index]))
                    qq14[index] = "-"
                  if (Number(qq14[index]) > Number(q))
                    re14.push("ผ่าน")
                  else re14.push("ไม่ผ่าน")
                  if (re14[index] === "ผ่าน")
                    re14[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re14[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  if (qq2[index] === "-")
                    qq12[index] = "-"
                  if (qq3[index] === "-")
                    qq13[index] = "-"

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
            <div className="col-4 textc">
            </div>
            <div className="col-1 col-md-4">
              {sev}
            </div>
          </div>

        </div>
      else if (met === 2)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={ansl} />
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
                  <th className="textc" scope="col">ผลรวม</th>
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
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
                      <td>{item.de_ans}</td>
                      <td>{item.fd_date}</td>
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

          </div>

          <div className='container mt-3'>
            <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
            <br /><br />
            <table className='table table-bordered border-primary'>
              <thead className="table-dark">
                <tr>
                  <th className="textc" scope="col" width="20">ลำดับ</th>
                  <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                  <th className="textc" scope='col' width="20">ไตรมาส</th>
                  <th className="textc" scope='col'>ชื่อโครงการ</th>
                  <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                  <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                  <th className="textc" scope='col' width="170">รายละเอียด</th>
                  <th className="textc" scope='col' width="120">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {eve.map((e, j) => {
                  var rr = e.ev_id
                  var qq = e.ev_qur
                  var uu = e.us_id
                  var ag

                  if (uu === 10) {
                    ag = "โรงพยาบาลกลาง";
                  }
                  else if (uu === 11) {
                    ag = "โรงพยาบาลตากสิน"
                  }
                  else if (uu === 12) {
                    ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                  }
                  else if (uu === 13) {
                    ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                  }
                  else if (uu === 14) {
                    ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                  }
                  else if (uu === 15) {
                    ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                  }
                  else if (uu === 16) {
                    ag = "โรงพยาบาลราชพิพัฒน์"
                  }
                  else if (uu === 17) {
                    ag = "โรงพยาบาลสิรินธร"
                  }
                  else if (uu === 18) {
                    ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                  }
                  else if (uu === 19) {
                    ag = "โรงพยาบาลคลองสามวา"
                  }
                  else if (uu === 20) {
                    ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                  }
                  else if (uu === 21) {
                    ag = "สก."
                  }
                  else if (uu === 22) {
                    ag = "ศบฉ."
                  }

                  return (
                    <tr key={j}>
                      <td>{e.fms_id}</td>
                      <td>{ag}</td>
                      <td>{e.ev_qur}</td>
                      <td>{e.ev_name}</td>
                      <td>{e.ed_date.split("T")[0]}</td>
                      <td>{e.ed_update.split("T")[0]}</td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <br /><br />
          <div className="textc"><h3>สรุปผล</h3></div>
          <br /><br />
          <div className="textc">
            <p className="fl">{qwe}</p>
          </div>

        </div>
      else if (met === 3)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <div className="textc"><h3>ข้อมูลการส่ง</h3></div>
            <br /><br />
            <table className='table table-bordered border-primary'>

              <thead className="table-dark">
                <tr>
                  <th className="textc" scope="col">ส่วนราชการ</th>
                  <th className="textc" scope='col'>ไตรมาส</th>
                  {/* <th className="textc" scope="col">{w}</th> */}
                  <th className="textc" scope="col">วันที่ส่ง</th>
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">ส่ง</th>
                  {/* <th className="textc" scope="col">ข้อมูลโครงการ</th>
                  <th className="textc" scope="col">แก้ไขโครงการ</th> */}
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
                      <td>{item.fd_date}</td>
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      {/* <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />


          </div>

          <div className='container mt-3'>
            <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
            <br /><br />
            <table className='table table-bordered border-primary'>
              <thead className="table-dark">
                <tr>
                  <th className="textc" scope="col" width="20">ลำดับ</th>
                  <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                  <th className="textc" scope='col' width="20">ไตรมาส</th>
                  <th className="textc" scope='col'>ชื่อโครงการ</th>
                  <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                  <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                  <th className="textc" scope='col' width="170">รายละเอียด</th>
                  <th className="textc" scope='col' width="120">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {eve.map((e, j) => {
                  var rr = e.ev_id
                  var qq = e.ev_qur
                  var uu = e.us_id
                  var ag

                  if (uu === 10) {
                    ag = "โรงพยาบาลกลาง";
                  }
                  else if (uu === 11) {
                    ag = "โรงพยาบาลตากสิน"
                  }
                  else if (uu === 12) {
                    ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                  }
                  else if (uu === 13) {
                    ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                  }
                  else if (uu === 14) {
                    ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                  }
                  else if (uu === 15) {
                    ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                  }
                  else if (uu === 16) {
                    ag = "โรงพยาบาลราชพิพัฒน์"
                  }
                  else if (uu === 17) {
                    ag = "โรงพยาบาลสิรินธร"
                  }
                  else if (uu === 18) {
                    ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                  }
                  else if (uu === 19) {
                    ag = "โรงพยาบาลคลองสามวา"
                  }
                  else if (uu === 20) {
                    ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                  }
                  else if (uu === 21) {
                    ag = "สก."
                  }
                  else if (uu === 22) {
                    ag = "ศบฉ."
                  }

                  return (
                    <tr key={j}>
                      <td>{e.fms_id}</td>
                      <td>{ag}</td>
                      <td>{e.ev_qur}</td>
                      <td>{e.ev_name}</td>
                      <td>{e.ed_date.split("T")[0]}</td>
                      <td>{e.ed_update.split("T")[0]}</td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                      <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <br /><br /><br /><br /><br /><br />
        </div>
      else if (localStorage.getItem("token").split("$")[1] === "0" && fc === 0) {
        var ois = qq14[hosi]
        if (n === "24" || n === "26")
          ois = ((qq14[hosi] ** -1) * 10000).toFixed(2)
        else if (n === "39", n === "15", n === "48") {
          ois = ((qq14[hosi] ** -1) * 100).toFixed(2)
        }

        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ " + q} />
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
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
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
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />
            <div className='container mt-3'>
              <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
              <br /><br />
              <table className='table table-bordered border-primary'>
                <thead className="table-dark">
                  <tr>
                    <th className="textc" scope="col" width="20">ลำดับ</th>
                    <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                    <th className="textc" scope='col' width="20">ไตรมาส</th>
                    <th className="textc" scope='col'>ชื่อโครงการ</th>
                    <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                    <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                    <th className="textc" scope='col' width="170">รายละเอียด</th>
                    <th className="textc" scope='col' width="120">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {eve.map((e, j) => {
                    var rr = e.ev_id
                    var qq = e.ev_qur
                    var uu = e.us_id
                    var ag

                    if (uu === 10) {
                      ag = "โรงพยาบาลกลาง";
                    }
                    else if (uu === 11) {
                      ag = "โรงพยาบาลตากสิน"
                    }
                    else if (uu === 12) {
                      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                    }
                    else if (uu === 13) {
                      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                    }
                    else if (uu === 14) {
                      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                    }
                    else if (uu === 15) {
                      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                    }
                    else if (uu === 16) {
                      ag = "โรงพยาบาลราชพิพัฒน์"
                    }
                    else if (uu === 17) {
                      ag = "โรงพยาบาลสิรินธร"
                    }
                    else if (uu === 18) {
                      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                    }
                    else if (uu === 19) {
                      ag = "โรงพยาบาลคลองสามวา"
                    }
                    else if (uu === 20) {
                      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                    }
                    else if (uu === 21) {
                      ag = "สก."
                    }
                    else if (uu === 22) {
                      ag = "ศบฉ."
                    }

                    return (
                      <tr key={j}>
                        <td>{e.fms_id}</td>
                        <td>{ag}</td>
                        <td>{e.ev_qur}</td>
                        <td>{e.ev_name}</td>
                        <td>{e.ed_date.split("T")[0]}</td>
                        <td>{e.ed_update.split("T")[0]}</td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br /><br />
          <div className="textc"><h3>สรุปผล</h3></div>
          <div className='container mt-3'>
            <br />
          </div>
          <br /><br />
          <div className="row">
            <div className="col-4 textc">
            </div>
            <div className="col-1 col-md-4">
              <div style={{ width: 530 }}>
                <Solve name={ois} do={530} name2={q} class={"responcal"} />
              </div>
            </div>

          </div>

        </div>
      }
      else if (localStorage.getItem("token").split("$")[1] === "9" && fc === 1)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ " + q} />
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
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
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
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

            <div className='container mt-3'>
              <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
              <br /><br />
              <table className='table table-bordered border-primary'>
                <thead className="table-dark">
                  <tr>
                    <th className="textc" scope="col" width="20">ลำดับ</th>
                    <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                    <th className="textc" scope='col' width="20">ไตรมาส</th>
                    <th className="textc" scope='col'>ชื่อโครงการ</th>
                    <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                    <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                    <th className="textc" scope='col' width="170">รายละเอียด</th>
                    <th className="textc" scope='col' width="120">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {eve.map((e, j) => {
                    var rr = e.ev_id
                    var qq = e.ev_qur
                    var uu = e.us_id
                    var ag

                    if (uu === 10) {
                      ag = "โรงพยาบาลกลาง";
                    }
                    else if (uu === 11) {
                      ag = "โรงพยาบาลตากสิน"
                    }
                    else if (uu === 12) {
                      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                    }
                    else if (uu === 13) {
                      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                    }
                    else if (uu === 14) {
                      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                    }
                    else if (uu === 15) {
                      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                    }
                    else if (uu === 16) {
                      ag = "โรงพยาบาลราชพิพัฒน์"
                    }
                    else if (uu === 17) {
                      ag = "โรงพยาบาลสิรินธร"
                    }
                    else if (uu === 18) {
                      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                    }
                    else if (uu === 19) {
                      ag = "โรงพยาบาลคลองสามวา"
                    }
                    else if (uu === 20) {
                      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                    }
                    else if (uu === 21) {
                      ag = "สก."
                    }
                    else if (uu === 22) {
                      ag = "ศบฉ."
                    }

                    return (
                      <tr key={j}>
                        <td>{e.fms_id}</td>
                        <td>{ag}</td>
                        <td>{e.ev_qur}</td>
                        <td>{e.ev_name}</td>
                        <td>{e.ed_date.split("T")[0]}</td>
                        <td>{e.ed_update.split("T")[0]}</td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br /><br /><br /><br /><br /><br />

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
                  // if (qq12[index] > 100)
                  // qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
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
                  // if (qq34[index] > 100)
                  //   qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  // if (qq13[index] > 100)
                  //   qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q14
                  // if (qq14[index] > 100)
                  //   qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
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
            <div className="col-4 textc">
            </div>
            <div className="col-1 col-md-4">
              <div style={{ width: 530 }}>
                <Solve name={qq14[13]} do={530} name2={q} class={"responcal"} />
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
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ " + q} />
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
                  <th className="textc" scope="col">วันที่อัปเดต</th>
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
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      <td className="textc"><button disabled onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
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
                  // if (qq12[index] > 100)
                  //   qq12[index] = ((qq12[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq12[index]))
                    qq12[index] = "-"
                  if (Number(qq12[index]) > Number(q))
                    re12.push("ผ่าน")
                  else re12.push("ไม่ผ่าน")
                  if (re12[index] === "ผ่าน")
                    re12[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re12[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q34
                  // if (qq34[index] > 100)
                  //   qq34[index] = ((qq34[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq34[index]))
                    qq34[index] = "-"
                  if (Number(qq34[index]) > Number(q))
                    re34.push("ผ่าน")
                  else re34.push("ไม่ผ่าน")
                  if (re34[index] === "ผ่าน")
                    re34[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re34[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q13
                  // if (qq13[index] > 100)
                  //   qq13[index] = ((qq13[index] ** -1) * 10000).toFixed(2)
                  if (isNaN(qq13[index]))
                    qq13[index] = "-"
                  if (Number(qq13[index]) > Number(q))
                    re13.push("ผ่าน")
                  else re13.push("ไม่ผ่าน")
                  if (re13[index] === "ผ่าน")
                    re13[index] = <h4 className="bi bi-check-circle greent"></h4>
                  else re13[index] = <h4 className="bi bi-x-circle redt"></h4>;

                  //q14
                  // if (qq14[index] > 100)
                  //   qq14[index] = ((qq14[index] ** -1) * 10000).toFixed(2)
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
            <div className="col-4 textc">
            </div>
            <div className="col-1 col-md-4">
              <div style={{ width: 530 }}>
                <Solve name={qq14[13]} do={530} name2={q} class={"responcal"} />
              </div>
            </div>

          </div>

        </div>

      else if (localStorage.getItem("token").split("$")[1] === "0" && fc === 1) {
        var ois = qq14[hosi]
        if (qq14[hosi] > 100)
          ois = ((qq14[hosi] ** -1) * 10000).toFixed(2)
        a = <div>

          <div className='container mt-3'>
            <h3>รายละเอียดการส่งตัวชี้วัด </h3>
            <br />
            <label>ชื่อตัวชี้วัด: </label><br /> <input className="input100" disabled value={z} />
            <br /><br />
            <label>นิยามตัวชี้วัด: </label><br /><textarea className="tacf" disabled value={v} />
            <br /><br />
            <label>ค่าเป้าหมาย: </label><br /> <input className="input20" disabled value={"ร้อยละ " + q} />
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
                  <th className="textc" scope="col">วันที่อัปเดต</th>
                  <th className="textc" scope="col">สรุปผล</th>
                  <th className="textc" scope="col">แก้ไขตัวชี้วัด</th>
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
                      <td>{item.fd_update}</td>
                      <td className="textc">{u}</td>
                      <td className="textc"><button onClick={e => setid(item.de_id, item.us_agency, item.de_paras, item.de_qur)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br /><br />

            <div className='container mt-3'>
              <div className="textc"><h3>ข้อมูลโครงการ</h3></div>
              <br /><br />
              <table className='table table-bordered border-primary'>
                <thead className="table-dark">
                  <tr>
                    <th className="textc" scope="col" width="20">ลำดับ</th>
                    <th className="textc" scope="col" width="200" >ส่วนราชการ</th>
                    <th className="textc" scope='col' width="20">ไตรมาส</th>
                    <th className="textc" scope='col'>ชื่อโครงการ</th>
                    <th className="textc" scope="col" width="100">วันที่ส่ง</th>
                    <th className="textc" scope="col" width="100">วันที่อัปเดต</th>
                    <th className="textc" scope='col' width="170">รายละเอียด</th>
                    <th className="textc" scope='col' width="120">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {eve.map((e, j) => {
                    var rr = e.ev_id
                    var qq = e.ev_qur
                    var uu = e.us_id
                    var ag

                    if (uu === 10) {
                      ag = "โรงพยาบาลกลาง";
                    }
                    else if (uu === 11) {
                      ag = "โรงพยาบาลตากสิน"
                    }
                    else if (uu === 12) {
                      ag = "โรงพยาบาลเจริญกรุงประชารักษ์"
                    }
                    else if (uu === 13) {
                      ag = "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ"
                    }
                    else if (uu === 14) {
                      ag = "โรงพยาบาลเวชการุณย์รัศมิ์"
                    }
                    else if (uu === 15) {
                      ag = "โรงพยาบาลลาดกระบังกรุงเทพมหานคร"
                    }
                    else if (uu === 16) {
                      ag = "โรงพยาบาลราชพิพัฒน์"
                    }
                    else if (uu === 17) {
                      ag = "โรงพยาบาลสิรินธร"
                    }
                    else if (uu === 18) {
                      ag = "โรงพยาบาลผู้สูงอายุบางขุนเทียน"
                    }
                    else if (uu === 19) {
                      ag = "โรงพยาบาลคลองสามวา"
                    }
                    else if (uu === 20) {
                      ag = "โรงพยาบาลบางนากรุงเทพมหานคร"
                    }
                    else if (uu === 21) {
                      ag = "สก."
                    }
                    else if (uu === 22) {
                      ag = "ศบฉ."
                    }

                    return (
                      <tr key={j}>
                        <td>{e.fms_id}</td>
                        <td>{ag}</td>
                        <td>{e.ev_qur}</td>
                        <td>{e.ev_name}</td>
                        <td>{e.ed_date.split("T")[0]}</td>
                        <td>{e.ed_update.split("T")[0]}</td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#print" >รายละเอียด</button></td>
                        <td className="textc"><button onClick={e => detev(rr, uu, qq)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#eventm" data-bs-whatever="@getbootstrap">แก้ไข</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br /><br /><br /><br /><br /><br />

          </div>
          <div className="textc"><h3>สรุปผลของหน่วยงาน</h3></div>
          <br /><br />
          <div className="row">
            <div className="col-4 textc">
            </div>
            <div className="col-1 col-md-4">
              <div style={{ width: 470 }}>
                <Solve name={ois} do={470} name2={q} class={"responcal"} />
              </div>
            </div>

          </div>

        </div>

      }
      else {
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
        if (img === "")
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
            <br /><b>แบบรายงานความก้าวหน้ารายโครงการ/กิจกรรม</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไตรมาสที่ ๓ {guu3}
            <br /><b>ส่วนราชการ </b> &nbsp;&nbsp;&nbsp; {ap} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ไตรมาสที่ ๔ {guu4}
          </div>
          <div className='row textl5'>
            <div className='col-auto'>
              <b>ชื่อโครงการ/กิจกรรม</b>
            </div>
            <div className='col'>{cp}</div>
          </div>

          <div className='textl5'><b>ลำดับโครงการ / กิจกรรมตามแผนสนพ.</b> &nbsp;&nbsp;&nbsp; {ep}
            <br /><b>หน่วยงานที่รับผิดชอบ</b> &nbsp;&nbsp;&nbsp; {fp}
            <br /><b>สถานะของโครงการ:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                  <th>งบฯ<br />กทม.</th>
                  <th>งบฯ<br />อุดหนุน</th>
                  <th>อื่นๆ</th>
                  {/* <th>งบฯ<br />ดำเนินการ</th>
                  <th>งบฯ<br />ลงทุน</th>
                  <th>รวม</th> */}
                  <th>งบฯ<br />กทม.</th>
                  <th>งบฯ<br />อุดหนุน</th>
                  <th>อื่นๆ</th>
                  {/* <th>งบฯ<br />ดำเนินการ</th>
                  <th>งบฯ<br />ลงทุน</th>
                  <th>รวม</th> */}
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
            <img src={import.meta.env.VITE_APP_API + "/images/" + img} alt="img" className="responsive" width="700" height="500" />
          </div>
        </div>

      } else pag = <>ไม่พบการส่งข้อมูลเข้ามา</>
    } catch {
      console.log("err")
    }

    return pag
  }

  const od = () => {
    //setTimeout(() => {
    // printf.map((t,i) => {
    //   document.getElementById("evname").value = t.ev_name

    //   })
    //}, 500)

    var autoevent = printf.map(e => [e.ev_name, e.fms_id, e.ev_res, e.ev_point, e.ev_target, e.ev_result, e.ev_problem])[0]
    if (document.getElementById("od").checked === true) {
      document.getElementById("evname").value = autoevent[0]
      document.getElementById("fmsid").value = autoevent[1]
      document.getElementById("evres").value = autoevent[2]
      document.getElementById("evpoint").value = autoevent[3]
      document.getElementById("evtarget").value = autoevent[4]
      //console.log(autoevent)
      if (sessionStorage.getItem("qur") === "1") {
        document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
      }
      else if (sessionStorage.getItem("qur") === "2") {
        document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
        document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
      }
      else if (sessionStorage.getItem("qur") === "3") {
        document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
        document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
        document.getElementById("rre3").value = (autoevent[5]).split(", ")[2]
      }
      else if (sessionStorage.getItem("qur") === "4") {
        document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
        document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
        document.getElementById("rre3").value = (autoevent[5]).split(", ")[2]
        document.getElementById("rre4").value = (autoevent[5]).split(", ")[3]
      }
      document.getElementById("problem").value = autoevent[6]
      setTimeout(() => {
        document.getElementById("od").checked = false
      }, 500);
    }
    else {
      document.getElementById("evname").value = ""
      document.getElementById("fmsid").value = ""
      document.getElementById("evres").value = ""
      document.getElementById("evpoint").value = ""
      document.getElementById("evtarget").value = ""
      if (sessionStorage.getItem("qur") === "1") {
        document.getElementById("rre1").value = ""
      }
      else if (sessionStorage.getItem("qur") === "2") {
        document.getElementById("rre1").value = ""
        document.getElementById("rre2").value = ""
      }
      else if (sessionStorage.getItem("qur") === "3") {
        document.getElementById("rre1").value = ""
        document.getElementById("rre2").value = ""
        document.getElementById("rre3").value = ""
      }
      else if (sessionStorage.getItem("qur") === "4") {
        document.getElementById("rre1").value = ""
        document.getElementById("rre2").value = ""
        document.getElementById("rre3").value = ""
        document.getElementById("rre4").value = ""
      }
      document.getElementById("problem").value = ""
    }
  }

  const n = param.split("ลำดับที่: ")[1];
  sessionStorage.setItem("fm", n)

  function gg(val) {
    var g = "";
    for (var i = 1; i <= val.length; i++) {
      g += document.getElementById(`${val[i - 1]}`).value;
      if (i != val.length) {
        g += ", "
      }
    }

    if (s.length === 1 && met === 1) {
      g = "1, " + g
    }

    return g
  }

  function qg(val) {
    sts(s);

    var q = 0;
    var p = 0;
    var pr1;
    var pr2;
    if (parast === 1) {
      for (var i = 1; i <= val.length; i++) {
        if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
          q += parseFloat(document.getElementById(`${val[i - 1]}`).value);
        }
      }
    } else {
      for (var i = 1; i <= val.length; i++) {
        if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
          q += parseFloat(document.getElementById(`${val[i - 1]}`).value);
          if (p === 0) {
            p += parseFloat(document.getElementById(`${val[i - 1]}`).value);
            pr1 = parseFloat(document.getElementById(`${val[i - 1]}`).value);
          }
          else {
            p /= parseFloat(document.getElementById(`${val[i - 1]}`).value);
            pr2 = parseFloat(document.getElementById(`${val[i - 1]}`).value);
          }

        }
      }

      if (t[1] === 3)
        q = q
      //q = q / val.length
      else if (t[1] === 2) {
        if (fc === 0 && pr2 != 0) {
          q = pr1
        }
         else
           q = pr2
      }
      else if (t[1] === 1 && pr2 === 1) {
        q = pr1
      } else if (t[1] === 1) {
        if (n === "24" || n === "26") {
          q = p * 100;
        } else {
          q = (p ** (-1)) * 100;
        }
      }
      else if (t[1] === 1) {
        if (n === "24" || n === "26") {
          q = p * 100;
        } else {
          q = (p ** (-1)) * 100;
        }
      }

    }
    //console.log(pr1)

    return q

  }

  function hg(val) {
    sts(s);
    var h;
    var g = 0;
    var uioo1;
    var uioo2;
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
        if (g === 0) {
          g += Number(document.getElementById(`${val[i - 1]}`).value);
          uioo1 = g
        }
          
        else {
          g /= Number(document.getElementById(`${val[i - 1]}`).value);
          uioo2 = g

        }
      }
    }

    // if (g * 100 > 100)
    //   g = g ** (-1)

    // if (g * 100 >= t[0]) {
    //   h = "ผ่าน"
    // } else {
    //   h = "ไม่ผ่าน"
    // }

    if ((g ** (-1)) * 100 >= t[0]) {
      h = "ผ่าน"
    } else {
      h = "ไม่ผ่าน"
    }

    if (n === "5" || n === "20" || n === "20.2") {
      if ((g ** (-1)) * 100 <= t[0]) {
        h = "ผ่าน"
      } else {
        h = "ไม่ผ่าน"
      }
    } else if (n === "24" || n === "26") {
      if ((g) * 100 >= t[0]) {
        h = "ผ่าน"
      } else {
        h = "ไม่ผ่าน"
      }
    }

    if (met === 2 && s.length >= 2) {
      if (Number(uioo2) <= Number(uioo1))
        h = "ผ่าน"
      else {
        h = "ไม่ผ่าน"
      }

    }

    if (s.length === 1) {
      if (g >= t[0])
        h = "ผ่าน"
      else
        h = "ไม่ผ่าน"
    } else if (s.length === 2 && n === "39", n === "15", n === "48") {
      if (g >= t[0])
      h = "ผ่าน"
       else 
        h = "ไม่ผ่าน"
    }

    if (parast === 1) {
      if (g >= t[0])
      h = "ผ่าน"
       else 
        h = "ไม่ผ่าน"
    }

    return h
  }

  const pa = () => {
    var fp1 = fetchs.map(a => [a.pa1, a.pa2, a.h1pa, a.h1pb, a.h2pa, a.h2pb, a.h3pa, a.h3pb, a.h4pa, a.h4pb, a.h5pa, a.h5pb, a.h6pa, a.h6pb, a.h7pa, a.h7pb, a.h8pa, a.h8pb, a.h9pa, a.h9pb, a.h10pa, a.h10pb, a.h11pa, a.h11pb, a.d1pa, a.d1pb, a.d2pa, a.d2pb, a.re_log, a.re_sum])
    var ffp1 = fp1[0]
    var ffp = [ffp1[0], ffp1[1], ffp1[Number(sessionStorage.getItem("ha")) + 2], ffp1[Number(sessionStorage.getItem("hb")) + 2], ffp1[28], ffp1[29]]
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
    var parar = sessionStorage.getItem("pp")
    if (parar.includes(","))
      parar = sessionStorage.getItem("pp").split(",")
    var sare;
    var are;
    var oo;
    var lg = pa()[4];
    var iff = 0;
    var t1 = 0
    var t2 = 0
    var tt1 = 0
    var tt2 = 0
    // var outr = 0
    for (var i = 1; i <= val.length; i++) {
      if (`${s[i - 1]}`[(s[i - 1].length) - 1] === "*") {
        if (iff === 0) {
          p1 = 0
          pp1 = 0
          p1 += pa()[0] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp1 += pa()[2] - parar[i - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          po1 += Number(document.getElementById(`${val[i - 1]}`).value);
          t1 += pa()[0] - Number(sessionStorage.getItem("pp")) + Number(document.getElementById(`${val[i - 1]}`).value);
          tt1 += pa()[2] - Number(sessionStorage.getItem("pp")) + Number(document.getElementById(`${val[i - 1]}`).value);
          iff = 1
        }
        else {
          p2 = 0
          pp2 = 0
          p2 += pa()[1] - parar[parar.length - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp2 += pa()[3] - parar[parar.length - 1] + Number(document.getElementById(`${val[i - 1]}`).value);
          po2 += Number(document.getElementById(`${val[i - 1]}`).value);
          t2 += pa()[0] - Number(sessionStorage.getItem("pp")) + Number(document.getElementById(`${val[i - 1]}`).value);
          tt2 += pa()[2] - Number(sessionStorage.getItem("pp")) + Number(document.getElementById(`${val[i - 1]}`).value);

          //console.log("p1", p1, pp1)
          //console.log("p2", p2, pp2)
        }
      }
    }

    if (n === "24" || n === "26") {
      are = (((p2 / p1) ** (-1)) * 100).toFixed(2)
      sare = (((pp2 / pp1) ** (-1)) * 100).toFixed(2)
      oo = (((po2 / po1) ** (-1)) * 100).toFixed(2)
    } else if (n === "39", n === "15", n === "48") {
      are = (((p2 / p1) ** (-1))).toFixed(2)
      sare = (((pp2 / pp1) ** (-1))).toFixed(2)
      oo = (((po2 / po1) ** (-1))).toFixed(2)
    }
    else {
      are = ((p2 / p1) * 100).toFixed(2)
      sare = ((pp2 / pp1) * 100).toFixed(2)
      oo = ((po2 / po1) * 100).toFixed(2)
    }

    // are = (((p1 / p2) ** (-1)) * 100).toFixed(2)
    // sare = (((pp1 / pp2) ** (-1)) * 100).toFixed(2)
    // oo = (((po1 / po2) ** (-1)) * 100).toFixed(2)

    if (isNaN((sare))) {
      sare = 0
    }
    else if (isNaN(are)) {
      are = 0
    }
    else if (isNaN(oo)) {
      oo = 0
    }
    if (fc === 1) {
      if (lg.includes(sessionStorage.getItem("hos"))) {
        // var loo = sessionStorage.getItem("hos") + "_" + sessionStorage.getItem("qur").split("_")
        var loo = lg.split("_")
        var lo2 = Number(loo[loo.length - 1])
        p1 = p1 - pp1 + po1
        p2 = p2 - pp2 + po2
        // if (p1 < 0)
        //   p1 = 0
        // if (p1 < p2)
        are = ((p1 / p2) * 100).toFixed(2)
        // else
        //   are = ((p2 / p1) * 100).toFixed(2)
        // if (isNaN(are))
        // are = oo
        if (Number(sessionStorage.getItem("qur") >= lo2)) {
          pp1 = po1
          pp2 = po2
          sare = oo
        } else {
          pp1 = pa()[2]
          pp2 = pa()[3]
          sare = ((pp1 / pp2) * 100).toFixed(2)
        }


      } else
        console.log("OK")
      // lg += ", " + sessionStorage.getItem("hos") + "_" + sessionStorage.getItem("qur")
    }

    if (t[1] === 2) {
      if (vcon != 0) {
        p1 = p1
        p2 = 0
        are = p1
        pp1 = pp1
        pp2 = 0
        sare = pp1
      }
      else if (fc === 0 && t2 != 0) {
        p1 = t1
        p2 = t2
        are = t2
        pp1 = 0
        pp2 = tt2
        sare = tt2
      } else {
        p1 = t1
        p2 = t2
        are = t1
        pp1 = tt1
        pp2 = 0
        sare = tt1
      }

    }
    //console.log(q1par2)
    //console.log(q1par1/q1par2)

    pa2 = [p1, p2, are, sare, pp1, pp2, lg]

    sts(s);

    if (parast === 1) {
      if (parast === 1 && t[1] === 1) {
        var ps1 = Number(pa()[0]) + 1
        var ps2 = Number(pa()[1]) + Number(qg(s))
        var ps3 = ps2 / ps1
        var ps4 = Number(pa()[2]) + 1
        var ps5 = Number(pa()[3]) + Number(qg(s))
        var ps6 = ps5 / ps4
        pa2 = [ps1, ps2, ps3, ps6, ps4, ps5, lg]
      } else {
        pa2 = [Number(pa()[0]) + Number(qg(s)), Number(pa()[0]) + Number(qg(s)), Number(pa()[0]) + Number(qg(s)), qg(s), qg(s), qg(s), lg]
      }
    }

    return pa2

  }

  useEffect(() => {
    if (localStorage.getItem("id") === "23") {
      fetch(import.meta.env.VITE_APP_API + "/checked/s/1/c")
        .then((data) => data.json())
        .then((data) => setTableData1(data));
    }
    else {
      fetch(import.meta.env.VITE_APP_API + "/checked/1/" + localStorage.getItem("id"))
        .then((data) => data.json())
        .then((data) => setTableData1(data));
    }

    setp(localStorage.getItem("department"));

  }, []);

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
            {formmm}
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
                  <label>ข้อมูลก่อนหน้า <input id="od" type="checkbox" onClick={e => od()} /></label>
                  <br />
                  <br />
                  <label>ชื่อโครงการ / กิจกรรม</label>
                  <br />
                  <input type="text" className='input80' id="evname" name='evname' required />
                  <br />
                  <label>ลำดับโครงการ / กิจกรรมตามแผนสนพ.</label>
                  <br />
                  <input type="number" className='input80' id="fmsid" name='fmsid' required />
                  <br />
                  <label>ผู้รับผิดชอบ</label>
                  <br />
                  <input type="text" className='input80' id="evres" name='evres' required />
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
                  <textarea className='textarea60100' id="evpoint" name='evpoint' required />
                  <br />
                  <label>เป้าหมาย</label>
                  <br />
                  <textarea className='textarea60100' id="evtarget" name='evtarget' required />
                  <br />
                  <label>ผลการดำเนินงาน</label>
                  <br />
                  {ress}
                  {/* <textarea className='textarea60100' name='result' required />
                  <br /> */}
                  <label>ปัญหาและอุปสรรค</label>
                  <br />
                  <textarea className='textarea60100' id="problem" name='problem' required />
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
                    <input type='file' name='evimg' onChange={(e) => setFile(e.target.files[0])} />
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