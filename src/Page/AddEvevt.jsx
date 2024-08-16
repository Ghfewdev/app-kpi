import React, { useEffect, useState } from 'react'
import Authen from '../Component/Authen';
import Footer from '../Component/Footer';
import axios from "axios";
import parse from "html-react-parser";


const AddEvevt = () => {

    Authen();

    const [tableData1, setTableData1] = useState([]);
    const [file, setFile] = useState();
    const [file2, setFile2] = useState();
    const [events, setEvents] = useState([]);
    const [eventsq, setEventsq] = useState([]);
    const [quar, setQuar] = useState([]);
    const [qrc, setQrc] = useState(1);
    const [autoo, setAutoo] = useState("");
    const [forms, setForms] = useState({
        form: [],
        fill: [],
        formres: []
    });
    const [nqq, setNqq] = useState(1)
    const [secec, setSececs] = useState({
        sece: "",
        check: ""
    });

    var formmm
    if (tableData1 != undefined) {
        formmm = tableData1.map(form => {
            return (
                <option key={form.fm_id}>ตัวชี่้วัดลำดับที่่: {form.fm_id}</option>
            )
        });
    }

    const dep = localStorage.getItem("department");
    var hos;
    var ha;
    var hb;
    var qc = 0;
    var qqc;
    var name;
    var name2;
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        document.getElementById("submit").disabled = true

        const JsonData2 = {
            fmid: d[1],
            qur: qrc,
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
            pdf: name2
        };

        console.log(JsonData2)

        fetch(import.meta.env.VITE_APP_API + "/ev/add", {
            method: "POST",
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
                    sessionStorage.setItem("postev", "1")
                    setTimeout(() => {
                        window.location = "postev";
                    }, 500)
                } else {
                    alert("02 บันทึกไม่สำเร็จ");
                    window.location = "addevent"
                }
            })
            .catch((error) => {
                console.log("error2", error);
            })
    }

    const dissi = (d) => {
        if (document.getElementById(d).disabled === true) {
            document.getElementById(d).disabled = false
        }
        else {
            document.getElementById(d).disabled = true
        }
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

    // const refech = () => {
    //     fetch(import.meta.env.VITE_APP_API + `/form/res/${localStorage.getItem("id")}`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data2 => {
    //         setForms({ ...forms, formres: data2 })
    //     })
    // }

    var d = secec.sece.split("ที่่: ")

    //console.log(d)

    var c
    if (d[1] === undefined) {
        c = <div>
            <br /><br /><br />
            <h2>กรุณาเลือกตัวชี้วัดเพื่อดำเนินการ</h2>
            <h5 className='redt'>***กรณีตัวชี้วัดไม่แสดงต้องส่งตัวชี้วัดก่อน***</h5>
            <br /><button className='btn btn-info' onClick={e => window.location = "fillup"}>ไปส่งตัวชี้วัด</button>
            <br /><br /><br />
        </div>
        try {
            document.getElementById("c3").hidden = true;
        } catch {
            console.log("loading ...")
        }
    } else document.getElementById("c3").hidden = false;

    const handleonChange = (val) => {

        fetch(import.meta.env.VITE_APP_API + `/evde/${val}/${localStorage.getItem("id")}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEvents(data);
            });

        fetch(import.meta.env.VITE_APP_API + `/form/${val}`)
            .then(response2 => {
                return response2.json();
            })
            .then(data2 => {
                setForms({ ...forms, fill: data2 })
            })

        fetch(import.meta.env.VITE_APP_API + `/checked/user/${localStorage.getItem("id")}/${val}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setQuar(data);
            });

        // fetch(import.meta.env.VITE_APP_API + `/evdeq/${d[1]}/${localStorage.getItem("id")}/1`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         setEventsq(data);
        //     });

        //console.log(val)

    }

    var vcon;
    try {
        vcon = forms.fill.map(io => io.fm_con)[0].split(", ")
        //console.log(vcon[qqc - 1], qqc)
    } catch {
        vcon = forms.fill.map(io => io.fm_con)[0]
    }


    function reu() {
        var rr

        if (!qqc) {
            console.log(nqq)
            if (nqq === "1") {
                rr = String(document.getElementById("rre1").value).replaceAll(", ", " ")
            }
            else if (nqq === "2")
                rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ")
            else if (nqq === "3") {
                rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre3").value).replaceAll(", ", " ")
            }
            else if (nqq === "4") {
                rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre3").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre4").value).replaceAll(", ", " ")
            }
        } else {
            if (qqc === 1)
            rr = String(document.getElementById("rre1").value).replaceAll(", ", " ")
        else if (qqc === 2)
            rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ")
        else if (qqc === 3)
            rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre3").value).replaceAll(", ", " ")
        else if (qqc === 4)
            rr = String(document.getElementById("rre1").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre2").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre3").value).replaceAll(", ", " ") + ", " + String(document.getElementById("rre4").value).replaceAll(", ", " ")
        
        }
        
        return rr

        
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


    const upload = () => {
        const formdata = new FormData();
        if (file != undefined) {
            formdata.append("file", file)
            axios.post(import.meta.env.VITE_APP_API + "/upload", formdata)
                .then(res => {
                    name = res.data.filename
                    //console.log(name)
                })
                .catch(er => console.log(er));
        } else {
            name = ""
        }
    }

    const upload2 = () => {
        const formdata = new FormData();
        if (file2 != undefined) {
            formdata.append("file", file2)
            axios.post(import.meta.env.VITE_APP_API + "/upload2", formdata)
                .then(res => {
                    name2 = res.data.filename
                    console.log(name2)
                })
                .catch(er => console.log(er));
        } else {
            name2 = ""
        }
    }

    const dis = () => {
        //console.log(file.name)
        console.log(reu())
        if (document.getElementById("submit").disabled === true) {
            document.getElementById("submit").disabled = false
            upload();
            upload2();
        }
        else {
            document.getElementById("submit").disabled = true
            console.log(name)
        }
    }

    const shooow = () => {
        if (document.getElementById("def").checked === true) {
           var inl = eventsq.length
            for (var f = 0; f <= 11; f++) {
                if (f > inl - 1) {
                    document.getElementById(`dbu${f}`).hidden = true
                } else {
                    document.getElementById(`dbu${f}`).hidden = false
                }
            }
        } else {
            document.getElementById("evnaem").value = ""
            document.getElementById("fmsid").value = ""
            document.getElementById("evres").value = ""
            document.getElementById("evpoint").value = ""
            document.getElementById("evtarget").value = ""
            if (qqc === 2)
                document.getElementById("rre1").value = ""
            else if (qqc === 3) {
                document.getElementById("rre1").value = ""
                document.getElementById("rre2").value = ""
            }
            else if (qqc === 4) {
                document.getElementById("rre1").value = ""
                document.getElementById("rre2").value = ""
                document.getElementById("rre3").value = ""
            }
            document.getElementById("problem").value = ""
            var inl = eventsq.length
            for (var f = 0; f <= 11; f++) {
                    document.getElementById(`dbu${f}`).hidden = true
            }
            
        }
        
    }

    const defu = (val) => {
        
        //console.log(eventsq, qqc, d[1], document.getElementById("0"))

        var autoevent = eventsq.map(e => [e.ev_name, e.fms_id, e.ev_res, e.ev_point, e.ev_target, e.ev_result, e.ev_problem])[val]

        if (document.getElementById(`def${val}`).checked === true) {
            document.getElementById("evnaem").value = autoevent[0]
            document.getElementById("fmsid").value = autoevent[1]
            document.getElementById("evres").value = autoevent[2]
            document.getElementById("evpoint").value = autoevent[3]
            document.getElementById("evtarget").value = autoevent[4]
            // console.log(autoevent)
            console.log(d[1])
            if (qqc === 2)
                document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
            else if (qqc === 3) {
                document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
                document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
            }
            else if (qqc === 4) {
                document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
                document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
                document.getElementById("rre3").value = (autoevent[5]).split(", ")[2]
            }
            if (!qqc) {
                console.log(nqq)
                if (nqq === "2")
                    document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
                else if (nqq === "3") {
                    document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
                    document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
                }
                else if (nqq === "4") {
                    document.getElementById("rre1").value = (autoevent[5]).split(", ")[0]
                    document.getElementById("rre2").value = (autoevent[5]).split(", ")[1]
                    document.getElementById("rre3").value = (autoevent[5]).split(", ")[2]
                }
            }
            document.getElementById("problem").value = autoevent[6]
        }
        else {
            document.getElementById("evnaem").value = ""
            document.getElementById("fmsid").value = ""
            document.getElementById("evres").value = ""
            document.getElementById("evpoint").value = ""
            document.getElementById("evtarget").value = ""
            if (qqc === 2)
                document.getElementById("rre1").value = ""
            else if (qqc === 3) {
                document.getElementById("rre1").value = ""
                document.getElementById("rre2").value = ""
            }
            else if (qqc === 4) {
                document.getElementById("rre1").value = ""
                document.getElementById("rre2").value = ""
                document.getElementById("rre3").value = ""
            }
            document.getElementById("problem").value = ""
        }


    }

    const qurc = (val) => {



        fetch(import.meta.env.VITE_APP_API + `/evdeq/${d[1]}/${localStorage.getItem("id")}/${val - 1}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEventsq(data);
            });



        if (val === "2") {
            qqc = 2
            document.getElementById("rre2").required = true
            document.getElementById("rre3").required = false
            document.getElementById("rre4").required = false
            document.getElementById("tm2").hidden = false
            document.getElementById("tm3").hidden = true
            document.getElementById("tm4").hidden = true
            document.getElementById("dbu").hidden = false


        } else if (val === "3") {
            qqc = 3
            document.getElementById("rre2").required = true
            document.getElementById("rre3").required = true
            document.getElementById("rre4").required = false
            document.getElementById("tm2").hidden = false
            document.getElementById("tm3").hidden = false
            document.getElementById("tm4").hidden = true
            document.getElementById("dbu").hidden = false
        } else if (val === "4") {
            qqc = 4
            document.getElementById("rre2").required = true
            document.getElementById("rre3").required = true
            document.getElementById("rre4").required = true
            document.getElementById("tm2").hidden = false
            document.getElementById("tm3").hidden = false
            document.getElementById("tm4").hidden = false
            document.getElementById("dbu").hidden = false
        } else if (val === "1") {
            qqc = 1
            document.getElementById("rre2").required = false
            document.getElementById("rre3").required = false
            document.getElementById("rre4").required = false
            document.getElementById("tm2").hidden = true
            document.getElementById("tm3").hidden = true
            document.getElementById("tm4").hidden = true
            document.getElementById("dbu").hidden = true
        }




    }


    useEffect(() => {
        fetchUserDataForm();

        fetch(import.meta.env.VITE_APP_API + "/checked/1/" + localStorage.getItem("id"))
            .then((data) => data.json())
            .then((data) => setTableData1(data));
    }, [])

    return (

        <>

            <div className='bgi'>
                <br /><br />
                <div className="card">

                    <div className="container">
                        <br />
                        <h1 className='textc'>
                            ส่งข้อมูลโครงการ
                        </h1>
                        <br /><br />
                        <div className="textc">

                            <select value={secec.sece} onClick={e => handleonChange(d[1])} onChange={e => setSececs({ ...secec, sece: e.target.value })} >
                                <option> ชื่อและรหัสตัวชี้วัด </option>
                                {formmm}
                            </select>
                        </div>

                        <br />
                        <div className="textc">{c}</div>

                        <div id='c1'>
                            <div id='c3'>
                                <form onSubmit={handleSubmit} className='textl2'>

                                    {forms.fill.map(fill => {

                                        return (
                                            <div key={fill.fm_id}>
                                                <div className='textl6'>
                                                    <br /><label>ชื่อตัวชี้วัด:&nbsp;&nbsp;<b>{fill.fm_name}</b></label>
                                                    <br /><br />
                                                </div>
                                                <p className='inline p'><label>ส่งข้อมูลประจำ:&nbsp;&nbsp;</label></p>
                                                <p className='inline textr p'><select value={qrc} name="qur" onClick={e => qurc(qrc)} onChange={e => { qurc(qrc), setQrc(e.target.value), setNqq(e.target.value) }} >
                                                    <option value={1} >ไตรมาสที่ 1</option>
                                                    <option value={2} >ไตรมาสที่ 2</option>
                                                    <option value={3} >ไตรมาสที่ 3</option>
                                                    <option value={4} >ไตรมาสที่ 4</option>
                                                </select></p>
                                                <br /><br />

                                                <div>
                                                    <br />
                                                    <label><b>แบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</b></label>
                                                    <br />
                                                    <br />
                                                    <div id='dbu' hidden>
                                                        <div><label>ใช้ข้อมูลจากไตรมาสก่อนหน้า</label>: <input type='checkbox' id="def" onClick={() => shooow()} /><br /></div>
                                                        <div id='dbu0' hidden><label>กิจกรรม 1</label>: <input type='radio' name='deff' id="def0" onClick={() => defu(0)} /><br /></div>
                                                        <div id='dbu1' hidden><label>กิจกรรม 2</label>: <input type='radio' name='deff' id="def1" onClick={() => defu(1)} /><br /></div>
                                                        <div id='dbu2' hidden><label>กิจกรรม 3</label>: <input type='radio' name='deff' id="def2" onClick={() => defu(2)} /><br /></div>
                                                        <div id='dbu3' hidden><label>กิจกรรม 4</label>: <input type='radio' name='deff' id="def3" onClick={() => defu(3)} /><br /></div>
                                                        <div id='dbu4' hidden><label>กิจกรรม 5</label>: <input type='radio' name='deff' id="def4" onClick={() => defu(4)} /><br /></div>
                                                        <div id='dbu5' hidden><label>กิจกรรม 6</label>: <input type='radio' name='deff' id="def5" onClick={() => defu(5)} /><br /></div>
                                                        <div id='dbu6' hidden><label>กิจกรรม 7</label>: <input type='radio' name='deff' id="def6" onClick={() => defu(6)} /><br /></div>
                                                        <div id='dbu7' hidden><label>กิจกรรม 8</label>: <input type='radio' name='deff' id="def7" onClick={() => defu(7)} /><br /></div>
                                                        <div id='dbu8' hidden><label>กิจกรรม 9</label>: <input type='radio' name='deff' id="def8" onClick={() => defu(8)} /><br /></div>
                                                        <div id='dbu9' hidden><label>กิจกรรม 10</label>: <input type='radio' name='deff' id="def9" onClick={() => defu(9)} /><br /></div>
                                                        <div id='dbu10' hidden><label>กิจกรรม 11</label>: <input type='radio' name='deff' id="def10" onClick={() => defu(10)} /><br /></div>
                                                        <div id='dbu11' hidden><label>กิจกรรม 12</label>: <input type='radio' name='deff' id="def11" onClick={() => defu(11)} /><br /></div>
                                                        <br />
                                                    </div>
                                                    <label>ชื่อโครงการ / กิจกรรม</label>
                                                    <br />
                                                    <input type="text" className='input60' id='evnaem' name='evname' required />
                                                    <br />
                                                    <label>ลำดับโครงการ / กิจกรรมตามแผนสนพ.</label>
                                                    <br />
                                                    <input type="number" className='input60' id='fmsid' name='fmsid' required />
                                                    <br />
                                                    <label>ผู้รับผิดชอบ</label>
                                                    <br />
                                                    <input type="text" className='input60' id='evres' name='evres' required />
                                                    <br />
                                                    <label>สถานะโครงการ</label>
                                                    <br />
                                                    <div>
                                                        <input type="radio" value={1} name="evstatus" /> แล้วเสร็จ &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" value={2} name="evstatus" /> ยังไม่เริ่มดำเนินการ &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" value={3} name="evstatus" /> ยกเลิก &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" value={4} name="evstatus" defaultChecked /> กำลังดำเนินการ &nbsp;&nbsp;&nbsp;
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
                                                    <textarea className='textarea60100' id='evpoint' name='evpoint' required />
                                                    <br />
                                                    <label>เป้าหมาย</label>
                                                    <br />
                                                    <textarea className='textarea60100' id='evtarget' name='evtarget' required />
                                                    <br />
                                                    <label>ผลการดำเนินงาน</label>
                                                    <br />
                                                    <div>
                                                        <div id='tm1'><label>ไตรมาสที่ 1: </label><br /><textarea id='rre1' className='textarea60100' name='result1' required /><br /></div>
                                                        <div id='tm2' hidden><label>ไตรมาสที่ 2: </label><br /><textarea id='rre2' className='textarea60100' name='result2' /><br /></div>
                                                        <div id='tm3' hidden><label>ไตรมาสที่ 3: </label><br /><textarea id='rre3' className='textarea60100' name='result3' /><br /></div>
                                                        <div id='tm4' hidden><label>ไตรมาสที่ 4: </label><br /><textarea id='rre4' className='textarea60100' name='result4' /><br /></div>
                                                        {/* <div hidden><textarea className='textarea60100' name='result' required /></div> */}
                                                    </div>
                                                    <label>ปัญหาและอุปสรรค</label>
                                                    <br />
                                                    <textarea className='textarea60100' id='problem' name='problem' required />
                                                    <br />
                                                    <label>สรุปผลการดำเนินงาน</label>
                                                    <br />
                                                    <div>
                                                        <input type="radio" value="1" name="et" defaultChecked /> เป็นไปตามแผน &nbsp;&nbsp;&nbsp;<br />
                                                        <input type="radio" value="2" name="et" /> เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ &nbsp;&nbsp;&nbsp;<br />
                                                        <input type="radio" value="3" name="et" /> ไม่เป็นไปตามแผน &nbsp;&nbsp;&nbsp;
                                                    </div>
                                                    <div className='up'>
                                                        <br />
                                                        <label>แนบไฟล์รูปภาพ: &nbsp;&nbsp;</label><br />
                                                        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
                                                        {/* <button id="upl" className='btn btn-primary' onClick={upload}>Upload</button> */}
                                                        <br /><br />
                                                        <label>**หมายเหตุชื่อไฟล์ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น**</label>
                                                        <br />
                                                    </div>
                                                    <br />
                                                    <hr style={{ "width": "80%" }} />

                                                    <div className='up2'>
                                                        <br />
                                                        <label>แนบไฟล์ PDF: &nbsp;&nbsp;</label><br />
                                                        <input type='file' onChange={(e) => setFile2(e.target.files[0])} />
                                                        {/* <button id="upl" className='btn btn-primary' onClick={upload}>Upload</button> */}
                                                        <br /><br />
                                                        <label>**หมายเหตุชื่อไฟล์ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น**</label>
                                                        <br />
                                                    </div>
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

export default AddEvevt
