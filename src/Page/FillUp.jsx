import React, { useEffect, useState } from 'react'
import Authen from '../Component/Authen';
import Footer from '../Component/Footer';

const FillUp = () => {

  Authen();

  const [quar, setQuar] = useState([]);
  const [fetchs, setFetchs] = useState([]);
  const [forms, setForms] = useState({
    form: [],
    fill: [],
    formres: []
  });
  const [secec, setSececs] = useState({
    sece: "",
    check: ""
  });

  const dep = localStorage.getItem("department");
  var hos;
  var ha;
  var hb;
  var qqi = <></>;
  var qqc;
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

  else if (dep === "รพ.เจริญกรุงประชารักษ์") {
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

  else if (dep === "สก.") {
    hos = "d1"
    ha = 22
    hb = 23
  }

  else if (dep === "ศบฉ.") {
    hos = "d2"
    ha = 24
    hb = 25
  }

  if (quar != []) {
    if (quar.length == 0)
      qqc = 1
    else if (quar.length == 1) {
      qqc = 2
    } else if (quar.length == 2) {
      qqc = 3
    } else if (quar.length == 3) {
      qqc = 4
    }
  }

  const quc = (qq) => {

    if (qq != []) {
      var che = quar.map(a => a.de_qur)
      var st = String(che)
      if (st == "") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
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
        qqi = <>
          <option value={"2"}>ไตรมาสที่ 2</option>
          {/* <option value={"3"}>ไตรมาสที่ 3</option>
          <option value={"4"}>ไตรมาสที่ 4</option> */}
        </>
      }
      else if (st == "1,2") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
        qqi = <>
          <option value={"3"}>ไตรมาสที่ 3</option>
          {/* <option value={"4"}>ไตรมาสที่ 4</option> */}
        </>
      }
      else if (st == "1,2,3") {
        document.getElementById("c1").hidden = false;
        document.getElementById("c2").hidden = true;
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
      qur: qqc,
      paras: g(z),
      ans: q(z),
      result: h(z)
    };
    const JsonData3 = {
      "h": pa2(z)[3],
      "hpa1": pa2(z)[4],
      "hpa2": pa2(z)[5],
      "pa1": pa2(z)[0],
      "pa2": pa2(z)[1],
      "log": pa2(z)[6],
      "sum": pa2(z)[2]
    };

    fetch(import.meta.env.VITE_APP_API + "/form/fill", {
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
        } else {
          alert("01 บันทึกไม่สำเร็จ");
          window.location = "fillup"
        }
      })
      .catch((error) => {
        console.log("error1", error);
      })

    fetch(import.meta.env.VITE_APP_API + `/result/update/${hos}/${d[1]}`, {
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
          sessionStorage.setItem("postfi", "1")
          setTimeout(() => {
            window.location = "post";
          }, 500)
        } else {
          alert("03 บันทึกไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.log("error3", error);
      })

  }

  const fetchUserDataForm = () => {

    fetch(import.meta.env.VITE_APP_API + "/form")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })

    fetch(import.meta.env.VITE_APP_API + `/form/res/${localStorage.getItem("id")}`)
      .then(response => {
        return response.json();
      })
      .then(data2 => {
        setForms({ ...forms, formres: data2 })
      })

  }

  const refech = () => {
    fetch(import.meta.env.VITE_APP_API + `/form/res/${localStorage.getItem("id")}`)
      .then(response => {
        return response.json();
      })
      .then(data2 => {
        setForms({ ...forms, formres: data2 })
      })
  }

  var d = secec.sece.split("ที่่: ")

  //console.log(d)

  var c
  if (d[1] === undefined) {
    c = <div>
      <br /><br /><br />
      <h2>กรุณาเลือกตัวชี้วัดเพื่อดำเนินการ</h2>
      <br /><button onClick={e => refech()}>ตัวชี้วัดไม่แสดงคลิก</button>
      <br /><br /><br />
    </div>
    try {
      document.getElementById("c3").hidden = true;
    } catch {
      console.log("loading ...")
    }
  } else document.getElementById("c3").hidden = false;

  const handleonChange = (val) => {

    com = ""

    fetch(import.meta.env.VITE_APP_API + `/form/${val}`)
      .then(response2 => {
        return response2.json();
      })
      .then(data2 => {
        setForms({ ...forms, fill: data2 })
      })

    fetch(import.meta.env.VITE_APP_API + `/result/${val}`)
      .then(response3 => {
        return response3.json();
      })
      .then(data3 => {
        setFetchs(data3);
      });

    fetch(import.meta.env.VITE_APP_API + `/checked/user/${localStorage.getItem("id")}/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setQuar(data);
      });

    //console.log(val)

  }

  var w = forms.fill.map(fil => fil.fm_paras)
  var numpa = forms.fill.map(po => po.fm_numpara)[0]
  var y = w[0]
  var t = forms.fill.map(f => [f.fm_solve, f.fm_method])[0]
  var fc = forms.fill.map(c => c.fm_com)[0]
  var vcon;
  try {
    vcon = forms.fill.map(io => io.fm_con)[0].split(", ")
    //console.log(vcon[qqc - 1], qqc)
  } catch {
    vcon = forms.fill.map(io => io.fm_con)[0]
  }
  //console.log(fc)
  var parast = 0
  var com = ""
  var cheo = 0
  try {
    var z = y.split(", ")
    var n = z.map((m, i) => {
      const k = m.split("_")
      var g1 = <></>
      var g2 = <></>
      var pi = <></>
      var group = m;

      if (k.length === 2) {
        g1 = <><br /><b>{k[0]}: </b></>
        pi = <><br /> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;- {k[1]}</>
        if (com === "") {
          com = k[0]
          cheo = 0
        }
        if (com === k[0] && cheo === 0) {
          g1 = <><br /><b>{k[0]}: </b></>
          cheo = 1
        }
        else if (com === k[0]) {
          g1 = <></>
        }
        else {
          g1 = <><br /><b>{k[0]}: </b></>
          com = k[0]
        }

        // if (!(i%2 === 0)) {
        //   cuo = k[0]
        // if (cuo === k[0])
        //   g1 = <></>
        // }
        //  if (!(i % (3 ** 1) === 0))
        //    g1 = <></>
        group = <>{g1}{pi}</>
        //console.log(com, cheo)
      }
      else if (k.length === 3) {
        g1 = <><br /><b>{k[0]}: </b></>
        g2 = <><br /> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;- {k[1]}</>
        pi = <><br /> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;- <u>{k[2]}</u></>

        if (!(i % (3 ** 2) === 0)) {
          g1 = <></>
        }
        if (!(i % (3 ** 1) === 0))
          pi = <></>
        group = <>{g1}{pi}{g2}</>
      }

      var nn = <p className='inline textr p'><input className='input30' type="text" id={m} required /></p>
      if (vcon.length === 11 && i === z.length - 1)
        nn = <p className='inline textr p'><input className='input30' type="text" id={m} defaultValue={vcon[localStorage.getItem("id") - 10]} readOnly /></p>
      else if (vcon != 0 && i === z.length - 1)
        nn = <p className='inline textr p'><input className='input30' type="text" id={m} defaultValue={vcon} readOnly /></p>
      else if (m === "*" && i === z.length - 1) {
      nn = <p className='inline textr p hidden'><input className='input30' type="text" id={m} defaultValue={1} readOnly /></p>
    }
      try {
        if ((k[1])[2] === "1") {
          if (qqc === 3 || qqc === 4)
            nn = <p className='inline textr p'><input className='input30' type="text" id={m} disabled /></p>
        }
      } catch {}
      if (group === "-") {
        group = <></>
        nn = <></>
      }
      var sii = <></>
      if (y === "-") {
        sii = <button className='btn btn-primary'>บันทึกและส่งข้อมูลโครงการ</button>
      }

      return (
        <div key={i}>
          <div><p className='inline p'><label>{group} &nbsp;&nbsp;</label></p>
            {nn}{sii}
          </div>
        </div>
      )
    }
    )

  } catch {
  }

  function g(val) {
    var g = "";
    if (numpa === 0) {
      g = 1
    } else {
      for (var i = 1; i <= val.length; i++) {
        if (document.getElementById(`${val[i - 1]}`).value === "")
        g += "0"
        else
        g += document.getElementById(`${val[i - 1]}`).value;
        if (i != val.length) {
          g += ", "
        }
      }
    }

    if (numpa === 1 && t[1] === 1)
    g = "1, " + g
    // if(numpa === 0)
    // g = 1

    return g
  }

  const sts = (val) => {
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
        parast += 1
      }
    }
  }

  function q(val) {
    var q = 0;
    var p = 0;
    var pr1;
    var pr2;
    if (parast === 1) {
      for (var i = 1; i <= val.length; i++) {
        if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
          q += parseFloat(document.getElementById(`${val[i - 1]}`).value);
        }
      }
    } else {
      for (var i = 1; i <= val.length; i++) {
        if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
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
      else if (t[1] === 2)
        if (fc === 0 && pr2 != 0)
          q = pr1
        else
          q = pr2

      if (t[1] === 1 && pr2 === 1) {
        q = pr1
      } else if (t[1] === 1) {
        if (d[1] === "24" || d[1] === "26") {
        q = p*100;
        } else {
          q = (p ** (-1)) * 100;
        }
      }
    }

    if (numpa === 0) {
      q = 1
    }


    if (isNaN(q)) {
         sessionStorage.setItem("non", "no")
      } 

    // if (parast === 1)
    // q = document.getElementById([z]).value
    // else if (parast === 1)
    // q = 1

    return q
  }

  function h(val) {
    var h;
    var g = 0;
    var uioo1
    var uioo2
    if (numpa === 0) {
      h = "ผ่าน"
    } else {
      for (var i = 1; i <= val.length; i++) {
        if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
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
      if ((g**(-1))*100 >= t[0]) {
        h = "ผ่าน"
      } else {
        h = "ไม่ผ่าน"
      }

      if (d[1] === "5" || d[1] === "20" || d[1] === "20.2") {
        if ((g**(-1))*100 <= t[0]) {
          h = "ผ่าน"
        } else {
          h = "ไม่ผ่าน"
        }
      } else if (d[1] === "24" || d[1] === "26") {
        if ((g)*100 >= t[0]) {
          h = "ผ่าน"
        } else {
          h = "ไม่ผ่าน"
        }
      }

      if(t[1] === 2 && numpa >= 2) {
        if (Number(document.getElementById(val[val.length-1]).value) <= Number(uioo2)) {
          h = "ผ่าน"
        }
        else if (Number(uioo2)+Number(pa()[2]) <= document.getElementById(val[val.length-1]).value)
        h = "ผ่าน"
       else {
        h = "ไม่ผ่าน"
       }}

    }

    if (numpa === 1) {
      if (g >= t[0])
      h = "ผ่าน"
       else 
        h = "ไม่ผ่าน"
    } else if (numpa === 2 && d[1] === "39", d[1] === "15", d[1] === "48") {
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
    var fp1 = fetchs.map(a => [a.pa1, a.pa2, a.h1pa, a.h1pb, a.h2pa, a.h2pb, a.h3pa, a.h3pb, a.h4pa, a.h4pb, a.h5pa, a.h5pb, a.h6pa, a.h6pb, a.h7pa, a.h7pb, a.h8pa, a.h8pb, a.h9pa, a.h9pb, a.h10pa, a.h10pb, a.h11pa, a.h11pb, a.d1pa, a.d1pb, a.d2pa, a.d2pb, a.re_log])
    var ffp1 = fp1[0]
    var ffp = [ffp1[0], ffp1[1], ffp1[ha + 2], ffp1[hb + 2], ffp1[28]]
    return ffp
  }

  const pa2 = (val) => {
    var pa2;
    var p1 = 0;
    var p2 = 0;
    var pp1 = 0;
    var pp2 = 0;
    var po1 = 0;
    var po2 = 0;
    //var parar = localStorage.getItem("pp").split(",")
    var sare;
    var are;
    var oo;
    var lg = pa()[4];
    var iff = 0;
    for (var i = 1; i <= val.length; i++) {
      if (`${z[i - 1]}`[(z[i - 1].length) - 1] === "*") {
        if (iff === 0) {
          p1 = 0
          pp1 = 0
          p1 += pa()[0] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp1 += pa()[2] + Number(document.getElementById(`${val[i - 1]}`).value);
          po1 += Number(document.getElementById(`${val[i - 1]}`).value);
          iff = 1
        }
        else {
          p2 = 0
          pp2 = 0
          p2 += pa()[1] + Number(document.getElementById(`${val[i - 1]}`).value);
          pp2 += pa()[3] + Number(document.getElementById(`${val[i - 1]}`).value);
          po2 += Number(document.getElementById(`${val[i - 1]}`).value);
          //console.log("p1", p1, pp1)
          //console.log("p2", p2, pp2)
        }
      }
    }
    // if ((p1 / p2) * 100 > 100) {
    //   are = (((p1 / p2) ** (-1)) * 100).toFixed(2)
    //   sare = (((pp1 / pp2) ** (-1)) * 100).toFixed(2)
    //   oo = (((po1 / po2) ** (-1)) * 100).toFixed(2)
    // }
    // else {
    //   are = ((p1 / p2) * 100).toFixed(2)
    //   sare = ((pp1 / pp2) * 100).toFixed(2)
    //   oo = ((po1 / po2) * 100).toFixed(2)
    // }

    if (d[1] === "24" || d[1] === "26") {
      are = (((p2 / p1) ** (-1)) * 100).toFixed(2)
      sare = (((pp2 / pp1) ** (-1)) * 100).toFixed(2)
      oo = (((po2 / po1) ** (-1)) * 100).toFixed(2)
    } else if (d[1] === "39", d[1] === "15", d[1] === "48") {
      are = (((p2 / p1) ** (-1))).toFixed(2)
      sare = (((pp2 / pp1) ** (-1))).toFixed(2)
      oo = (((po2 / po1) ** (-1))).toFixed(2)
    }
    else {
      are = ((p2 / p1) * 100).toFixed(2)
      sare = ((pp2 / pp1) * 100).toFixed(2)
      oo = ((po2 / po1) * 100).toFixed(2)
    }
    
    if (fc === 1) {
      if (lg.includes(hos)) {
        // var loo = sessionStorage.getItem("hos") + "_" + sessionStorage.getItem("qur").split("_")
        p1 = p1 - pp1 + po1
        p2 = p2 - pp2 + po2
        // if (p1 < 0)
        //   p1 = 0
        // if (p1 < p2)
           //are = ((p1 / p2) * 100).toFixed(2)
        // else
           are = ((p2 / p1) * 100).toFixed(2)
        // if (isNaN(are))
        pp1 = po1
        pp2 = po2
        sare = oo
        lg += ", " + hos + "_" + qqc
      } else {
        if (isNaN(lg)) {
          lg += ", " + hos + "_" + qqc
        }
        else {
          lg += hos + "_" + qqc
        }
      }
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
      else if (fc === 0 && p2 != 0) {
        p1 = p1
        p2 = 0
        are = p2
        pp1 = 0
        pp2 = pp2
        sare = pp2
      } else {
        p1 = p1
        p2 = p2
        are = p1
        pp1 = pp1
        pp2 = 0
        sare = pp1
      }

    }

    if (numpa === 0) {
      p1 = 0
      p2 = 0
      are = 0
      pp1 = 0
      pp2 = 0
      sare = 0
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

    pa2 = [p1, p2, are, sare, pp1, pp2, lg]

    if (parast === 1) {

      if (lg.includes(hos)) {
        if (lg === "") {
          lg += hos + "_" + qqc
        }
        else {
          lg += ", " + hos + "_" + qqc
        }

        if (t[1] === 1) {
        var ps1 = Number(pa()[0]) + 1
      var ps2 = Number(pa()[1]) + Number(q(z))
      var ps3 = ps2/ps1
      var ps4 = Number(pa()[2]) + 1
      var ps5 = Number(pa()[3]) + Number(q(z))
      var ps6 = ps5/ps4
      pa2 = [ps1, ps2, ps3, ps6, ps4, ps5, lg]
      } else
        pa2 = [Number(pa()[0]) + Number(q(z)), Number(pa()[0]) + Number(q(z)), Number(pa()[0]) + Number(q(z)), Number(pa()[2]) + Number(q(z)), Number(pa()[2]) + Number(q(z)), Number(pa()[2]) + Number(q(z)), lg]
      } else {
        if (lg === "") {
          lg += hos + "_" + qqc
        }
        else {
          lg += ", " + hos + "_" + qqc
        }
        if (t[1] === 1) {
          var ps1 = Number(pa()[0]) + 1
        var ps2 = Number(pa()[1]) + Number(q(z))
        var ps3 = ps2/ps1
        var ps4 = Number(pa()[2]) + 1
        var ps5 = Number(pa()[3]) + Number(q(z))
        var ps6 = ps5/ps4
        pa2 = [ps1, ps2, ps3, ps6, ps4, ps5, lg]
        } else
        pa2 = [Number(pa()[0]) + Number(q(z)), Number(pa()[0]) + Number(q(z)), Number(pa()[0]) + Number(q(z)), q(z), q(z), q(z), lg]
      }

    }

    return pa2

  }

  const dis = () => {

    // console.log(d[1])
    // console.log(qqc)
     console.log(g(z))
     console.log(q(z))
     console.log(h(z))
    //console.log(parast)
    console.log(pa2(z))
    console.log(pa())



    if (document.getElementById("con").checked === true) {
      if (sessionStorage.getItem("non") === "no") {
        alert("ใส่ตัวเลข")
        // document.getElementById("con").checked = false
      }
      else {
        document.getElementById("submit").disabled = false;
        sessionStorage.removeItem("non")
      }
        
      //console.log(`${z[0]}`[(z[0].length) - 1])
    }
    else {
      // setTimeout(() => {
      // }, 500)
      // document.getElementById("upl").disabled = true
      document.getElementById("submit").disabled = true
      sessionStorage.removeItem("non")
    }
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
            <div className="textc">

              <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                <option> ชื่อและรหัสตัวชี้วัด </option>
                {forms.formres.map(form => (
                  <option key={form.fm_id}>ตัวชี่้วัดลำดับที่่: {form.fm_id}</option>
                ))}
              </select>
            </div>
            <div id='c2' hidden className='textc'>
              <br /><br /><br />
              <h1 style={{ color: "red" }}>ดำเนินการส่งข้อมูลครบแล้ว</h1>
              <br /><br /><br />
            </div>

            <br />
            <div className="textc">{c}</div>

            <div id='c1'>
              <div id='c3'>
                <form onSubmit={handleSubmit} className='textl2'>

                  {forms.fill.map(fill => {
                    sts(z);

                    return (
                      <div key={fill.fm_id}>
                        <div className='textl6'>
                          <br /><label>ชื่อตัวชี้วัด:&nbsp;&nbsp;<b>{fill.fm_name}</b></label>
                          <br /><br />
                        </div>
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
                          <div className='textr2'>
                            <br />
                            <label>ยืนยัน: <input id="con" type="checkbox" value={secec.check} onClick={e => dis()} /> </label>
                            <br />
                          </div>
                        </div>
                        <div className='textr2'>
                          <br />
                          <button id="submit" type="submit" className='btn btn-success' disabled> ส่งข้อมูล </button>
                        </div>
                      </div>

                    )
                  })}

                </form>
              </div>
            </div>
            <br />
            <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
              <p className='inline textr'><a href="/"></a></p>
            </div>

          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>

      </div>
      <Footer />

    </>
  )
}

export default FillUp
