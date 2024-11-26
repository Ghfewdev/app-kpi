import React, { useEffect, useState } from 'react'
import Footer from '../Component/Footer';
import parse from "html-react-parser";

const Form = () => {

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

const rese = () => {
  const jsonres = {
    res: resp,
    id: Number(d[1])
  }
  
  fetch(import.meta.env.VITE_APP_API+"/update/form/res", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonres)
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

  const dis = () => {
    if (document.getElementById("submit").disabled === true) {
      g(z.length)
      // for (var i = 0;i < z.length;i++) {
      //   document.getElementById(`hd${i}`).hidden = false
      // }
      document.getElementById("hd11").hidden = false
      document.getElementById("hd22").hidden = false
      document.getElementById("hd33").hidden = false
      //document.getElementById("hd44").hidden = false
      document.getElementById("submit").disabled = false
    }
    else {
      // for (var i = 0;i < z.length;i++) {
      //   document.getElementById(`hd${i}`).hidden = true
      // }
      document.getElementById("hd11").hidden = true
      document.getElementById("hd22").hidden = true
      document.getElementById("hd33").hidden = true
      //document.getElementById("hd44").hidden = true
      document.getElementById("submit").disabled = true

    }
  }
  var co1 = <></>;
  var co2 = <></>;
  var co3 = <></>;
  try {
    if (localStorage.getItem("token").split("$")[1] === "9") {
      co1 = <>
      <label>ต้องการแก้ไขข้อมูลตัวชี้วัด:&nbsp;&nbsp;</label> <input type="checkbox" value={secec.check} onClick={e => dis()} /> 
        <br /></>
      co2 = <>
        <button id="submit" type="submit" className='btn btn-success' disabled> แก้ไขข้อมูล </button>
      </>
      co3 = <>
      <label>กำหนดหน่วยงานที่รับผิดชอบ:&nbsp;&nbsp;</label>
                            <br />
                            {/* <input id='res-00' type="checkbox" onClick={e => res("00")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>หน่วยงานสังกัดสำนักการแพทย์&nbsp;&nbsp;&nbsp;&nbsp; </label> */}
                            <input id='res-all' type="checkbox" onClick={e => res("all")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>ทุกหน่วยงานในสังกัด&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-21' type="checkbox" onClick={e => res("21")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>สก.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-22' type="checkbox" onClick={e => res("22")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>ศบฉ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br /><label>โรงพยาบาลสังกัดสำนักการแพทย์:&nbsp;&nbsp;&nbsp;&nbsp; </label><br />
                            <input id='res-ah' type="checkbox" onClick={e => res("ah")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>ทุกโรงพยาบาลในสังกัด&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-10' type="checkbox" onClick={e => res("10")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพก.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-11' type="checkbox" onClick={e => res("11")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพต.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-12' type="checkbox" onClick={e => res("12")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพจ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-13' type="checkbox" onClick={e => res("13")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพท.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br />
                            <input id='res-14' type="checkbox" onClick={e => res("14")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพว.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-15' type="checkbox" onClick={e => res("15")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพล.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-16' type="checkbox" onClick={e => res("16")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพร.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-17' type="checkbox" onClick={e => res("17")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพส.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-18' type="checkbox" onClick={e => res("18")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพข.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-19' type="checkbox" onClick={e => res("19")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพค.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-20' type="checkbox" onClick={e => res("20")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพบ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br />
                            <br />
                            <button className='btn btn-info' onClick={e => rese()}> แก้ไขผู้รับผิดชอบ </button>
                            <br />
                            <br />
      </>;
    }
  } catch {
    co2 = <></>;
    co3 = <></>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
        const JsonData = {
            name: data.get("name"),
            solve: data.get("solve"),
            def: data.get("define"),
            id: Number(d[1])
        };

        fetch(import.meta.env.VITE_APP_API+"/update/form", {
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

    
    fetch(import.meta.env.VITE_APP_API+"/form/year/2567")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })

  }

  const fetchUserDataFormV = (val) => {

    
    fetch(import.meta.env.VITE_APP_API+`/form/year/${val}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setForms({ ...forms, form: data })
      })

  }

  var d = secec.sece.split("ที่: ")

  var c;
  if (d[1] === undefined) {
    c = <table className='table table-bordered border-primary'>
      <thead className="table-dark">
        <tr>
          <th>ลำดับที่</th>
          <th>ชื่อตัวชี้วัด</th>
          <th>ค่าเป้าหมาย</th>
          <th>ข้อมูลที่ถูกเก็บในตัวชี้วัด</th>
          {/* <th>การคำนวณ</th> */}
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
              <th>ร้อยละ {fom.fm_solve}</th>
              <th className='textl3'>{parse(pa)}</th>
              {/* <th>{fom.fm_method}</th> */}
            </tr>
          )
        })}
      </tbody>
    </table>
    try {
      document.getElementById("unknow").hidden = true
    } catch {}

  } else document.getElementById("unknow").hidden = false

  const handleonChange = (val) => {

    fetch(import.meta.env.VITE_APP_API+`/form/${val}`)
      .then(response2 => {
        return response2.json();
      })
      .then(data2 => {
        setForms({ ...forms, fill: data2 })
      })

      //console.log(val)

  }

  var resp = "23";

    var res = (v) => {
        if (v === "all")
            if (resp === "10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23") {
                resp = "23"
                document.getElementById("res-10").disabled = false
                document.getElementById("res-11").disabled = false
                document.getElementById("res-12").disabled = false
                document.getElementById("res-13").disabled = false
                document.getElementById("res-14").disabled = false
                document.getElementById("res-15").disabled = false
                document.getElementById("res-16").disabled = false
                document.getElementById("res-17").disabled = false
                document.getElementById("res-18").disabled = false
                document.getElementById("res-19").disabled = false
                document.getElementById("res-20").disabled = false
                document.getElementById("res-21").disabled = false
                document.getElementById("res-22").disabled = false
                document.getElementById("res-ah").disabled = false
            }

            else {
                resp = "10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23"
                document.getElementById("res-10").disabled = true
                document.getElementById("res-11").disabled = true
                document.getElementById("res-12").disabled = true
                document.getElementById("res-13").disabled = true
                document.getElementById("res-14").disabled = true
                document.getElementById("res-15").disabled = true
                document.getElementById("res-16").disabled = true
                document.getElementById("res-17").disabled = true
                document.getElementById("res-18").disabled = true
                document.getElementById("res-19").disabled = true
                document.getElementById("res-20").disabled = true
                document.getElementById("res-21").disabled = true
                document.getElementById("res-22").disabled = true
                document.getElementById("res-ah").disabled = true
            }
        else if (v === "ah")
            if (resp === "10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23") {
                resp = "23"
                document.getElementById("res-10").disabled = false
                document.getElementById("res-11").disabled = false
                document.getElementById("res-12").disabled = false
                document.getElementById("res-13").disabled = false
                document.getElementById("res-14").disabled = false
                document.getElementById("res-15").disabled = false
                document.getElementById("res-16").disabled = false
                document.getElementById("res-17").disabled = false
                document.getElementById("res-18").disabled = false
                document.getElementById("res-19").disabled = false
                document.getElementById("res-20").disabled = false
                document.getElementById("res-21").disabled = false
                document.getElementById("res-22").disabled = false
                document.getElementById("res-all").disabled = false
            }

            else {
                resp = "10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23"
                document.getElementById("res-10").disabled = true
                document.getElementById("res-11").disabled = true
                document.getElementById("res-12").disabled = true
                document.getElementById("res-13").disabled = true
                document.getElementById("res-14").disabled = true
                document.getElementById("res-15").disabled = true
                document.getElementById("res-16").disabled = true
                document.getElementById("res-17").disabled = true
                document.getElementById("res-18").disabled = true
                document.getElementById("res-19").disabled = true
                document.getElementById("res-20").disabled = true
                document.getElementById("res-21").disabled = true
                document.getElementById("res-22").disabled = true
                document.getElementById("res-all").disabled = true
            }

        else if (resp.includes(v)) {
            if (resp.includes(", "))
                resp = resp.replace(", " + v, "")
            else
                resp = resp.replace(v, "")
        }
        else {
            if (resp === "")
                resp += v
            else
                resp += ", " + v
        }
        console.log(resp)
    }

  var w = forms.fill.map(fil => fil.fm_paras)
  var y = w[0]
  var t = forms.fill.map(f => [f.fm_solve, f.fm_method])[0]
  //console.log(t)

    const selectyear = (val) => {
      fetchUserDataFormV(val);
    }

  try {
    var z = y.split(", ")
    var n = z.map((m, i) => (
      <div key={i}>

        <label>ข้อมูลที่ถูกเก็บในตัวชี้วัดลำดับที่ {i + 1}: </label> <br /> <input className='input60' value={m} disabled /> <br /> <div className='input60' id={"hd"+i} hidden><input id={i} /></div>
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

            <div className="textc">
            <h3>เลือกปีงบประมาณ</h3>
            <select name="d4" id="u1" onChange={e => selectyear(e.target.value)}>
              <option value="2567">2567</option>
              <option value="2568">2568</option>
            </select>
              <h4>เลือกดูรายละเอียดของตัวชี้วัด</h4>
              <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                <option> ตัวชี้วัดทั้งหมด </option>
                {forms.form.map(form => (
                  <option key={form.fm_id}> ลำดับตัวชี้วัดที่: {form.fm_id}</option>
                ))}
              </select>
            </div>
            <br />
            <div>{c}</div>
            <br />
            <div id='unknow' className='textl2' hidden>
              {co3}
            <form onSubmit={handleSubmit}>
              {forms.fill.map(fill => (

                <div key={fill.fm_id}>
                  
                  {co1}
                  <br /><label>ตัวชี้วัด KPI (ตามแผนฯ ของหน่วยงาน): </label> <br /> <textarea className='textarea60100' value={fill.fm_name} disabled /> <br /> <div id='hd11' hidden><textarea className='textarea60100' name='name' required/></div>
                  <br /><br />
                  <label>นิยาม/คำอธิบายตัวชี้วัด:&nbsp;</label> <br /><textarea className='tarea610' value={fill.fm_define} disabled /><br /><div id='hd22' hidden><textarea className='tarea610' name='define' required/></div>
                  <br /><br />
                  <label>ค่าเป้าหมาย: </label> <br /> <input className='input60' value={"ร้อยละ "+fill.fm_solve} disabled /> <br /> <div id='hd33' hidden> <input type='number' min={1} max={100} className='input60' name='solve' required/></div>
                  <br /><br />
                  {/* <label>วิธีการคำนวณ: </label> <br /><input className='input60' value={fill.fm_method} disabled /> <br /> <div id='hd44' hidden> <input className='input60' name='method'/></div> */}
                  {/* <br /><br /> */}
                  {n}
                  <div className='textr2'>{co2}</div>
                </div>

              ))}
              <br />

            </form>
            <br />
            </div>
            <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
              <p className='inline textr'><a href="/"></a></p>
            </div>
          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>

      </div>
      <Footer />

    </>
  )
}

export default Form
