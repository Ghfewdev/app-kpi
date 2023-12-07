import React, { useState } from 'react'
import Footer from '../Component/Footer';
import Authlevel from '../Component/Authlevel';

const AddForm = () => {

Authlevel();

    const [numpara, setNumpara] = useState(1);
    const [parass, setParass] = useState("");
    const [solv, setSolv] = useState(1);

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const JsonData1 = {
            id: data.get("id"),
            name: data.get("name"),
            solve: data.get("solve"),
            // method: data.get("method"),
            method: 1,
            numpara: Number(data.get("numpara"))+2,
            def: data.get("define"),
            paras: g(numpara),
            com: com(),
            con: fixc(),
            res: resp
        };
        const JsonData2 = {
            fmid: data.get("id"),
        };

        fetch(import.meta.env.VITE_APP_API+"/form/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(JsonData1)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status === "ok") {
                    //alert("ทำรายการสำเร็จ");
                    //window.location = "/";
                } else {
                    alert("บันทึกไม่สำเร็จ");
                    return
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

        fetch(import.meta.env.VITE_APP_API+"/result/add", {
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

    var fixx = () => {
        if(document.getElementById(999).checked === true) {
            document.getElementById("combo").hidden = false;
            document.getElementById("com").checked = true;
            com();
            document.getElementById("com").disabled = true;

        }else {
            document.getElementById("combo").hidden = true;
            document.getElementById("com").checked = false;
            com();
            document.getElementById("com").disabled = false;
        }

    }

    var com = () => {
        var fillcom;
        if (document.getElementById("com").checked === true) {
            fillcom = 1
            //console.log(fillcom)
        }
        else {
            fillcom = 0
            //console.log(fillcom)
        }
        return fillcom
    }

    // var con = () => {
    //     var conn;
    //     if(document.getElementById(100).hidden === false)
    //     conn = 0;
    //     else
    //     conn = document.getElementById(100).value;
        
    //     return conn
    // }

    var mty = () => {
        var mtyy;
        if(document.getElementById(222).checked === true) {
            document.getElementById("mt").hidden = false;
            document.getElementById("mty").hidden = true;
            document.getElementById(100).required = true;
        }else {
            document.getElementById("mt").hidden = true;
            document.getElementById("mty").hidden = false;
            document.getElementById(100).required = false;
        }
    }

    var mtq = () => {
        var mtqq;
        if(document.getElementById(111).checked === true) {
            document.getElementById("mty").hidden = false;
            document.getElementById("mt").hidden = true;
            document.getElementById(101).required = true;
            document.getElementById(102).required = true;
            document.getElementById(103).required = true;
            document.getElementById(104).required = true;

        }else {
            document.getElementById("mty").hidden = true;
            document.getElementById("mt").hidden = false;
            document.getElementById(101).required = false;
            document.getElementById(102).required = false;
            document.getElementById(103).required = false;
            document.getElementById(104).required = false;
        }
    }

    function fixc() {
        var o = "";
        if(document.getElementById(111).checked === true) {
            for (var i = 101; i <= 104; i++) {
                o += document.getElementById(`${i}`).value;
                if(i < 104 )
                    o += ", "
            }
        } else {
            if(document.getElementById(999).checked === false)
                o = 0;
            else
                o = document.getElementById(100).value;
        }

        return o

    }

    var resp = "23";

    var res = (v) => {
        if (resp.includes(v)) {
            if (resp.includes(", "))
            resp = resp.replace(", "+v,"")
            else
            resp = resp.replace(v,"")
        }
        else {
            if (resp === "")
            resp += v
            else
            resp += ", "+v
        }
        console.log(resp)
    }
    console.log(resp)
    var par = (val) => {
        let ht = '';
        let pas = '';
        for (let i = 1; i <= val; i++) {
            pas = `para${i}`
            ht += `<label>ข้อมูลที่ ${i}:&nbsp;&nbsp;</label> <label hidden>( กรณีใช้ค่านี้ในการประเมินผลตัวชี้วัดติ๊กถูกตรงนี้ <input type="checkbox" id=${i*10}> )</label><br /> <input required type="text1" name=${pas} id=${i} /><br /><br />`;
        }
        
        return ht
    }

    function g(ve) {
        var o = "";
        try {
            for (var i = 1; i <= ve; i++) {
                o += document.getElementById(`${i}`).value;

                if (document.getElementById(`${i*10}`).checked === true) {
                    o += "*"
                }

                //if (i != ve) {
                    o += ", "
                // }
                
            }
            o += document.getElementById(`${98}`).value;
            o += "*, ";
            // if (document.getElementById(`${999}`).checked === true) {
            //     o += document.getElementById(100).value;
            //     o += "^"
            // }
             o += document.getElementById(`${99}`).value;
            
            o += "*"
            
            // console.log(o)
            // document.getElementById("sum").value = o
            return o

        } catch {

        }

    }

    const dis = () => {
        if (document.getElementById("submit").disabled === true) {
            //g(numpara)
            console.log(g(numpara))
            console.log(fixc())
            console.log(resp)
            document.getElementById("submit").disabled = false
        }
        else {
            document.getElementById("submit").disabled = true;
        }
    }

    return (
        <>

            <div className='bgi'>
                <br /><br />
                <div className="card">
                    <div className="container">
                        <br />
                        <h1 className='textc'>
                            เพิ่มตัวชี้วัด
                        </h1>
                        <br /><br />
                        <form onSubmit={handleSubmit} className='textl2'>
                            <label>กำหนดหน่วยงานที่รับผิดชอบ:&nbsp;&nbsp;</label>
                            <br />
                            {/* <input id='res-00' type="checkbox" onClick={e => res("00")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>หน่วยงานสังกัดสำนักการแพทย์&nbsp;&nbsp;&nbsp;&nbsp; </label> */}
                            <input id='res-21' type="checkbox" onClick={e => res("21")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>สก.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-22' type="checkbox" onClick={e => res("22")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>ศบฉ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br /><label>โรงพยาบาลสังกัดสำนักการแพทย์:&nbsp;&nbsp;&nbsp;&nbsp; </label><br />
                            <input id='res-10' type="checkbox" onClick={e => res("10")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพก.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-11' type="checkbox" onClick={e => res("11")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพต.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-12' type="checkbox" onClick={e => res("12")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพจ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-13' type="checkbox" onClick={e => res("13")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพท.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-14' type="checkbox" onClick={e => res("14")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพว.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-15' type="checkbox" onClick={e => res("15")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพล.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br />
                            <input id='res-16' type="checkbox" onClick={e => res("16")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพร.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-17' type="checkbox" onClick={e => res("17")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพส.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-18' type="checkbox" onClick={e => res("18")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพข.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-19' type="checkbox" onClick={e => res("19")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพค.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-20' type="checkbox" onClick={e => res("20")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพบ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br /><br />
                            <label>ชื่อตัวชี้วัด:&nbsp;&nbsp; </label><br /><textarea className='tarea70' type="text" name="name" autoFocus required/>
                            <br /><br />
                            <label>นิยามของตัวชี้วัด:&nbsp;&nbsp; </label><br /><textarea className='textarea60100' type="text" name="define" required/>
                            <br /><br />
                            <label>ลำดับตัวชี้วัด:&nbsp;&nbsp; </label><input className='input10' type="number" min={1} max={1000} name="id" required defaultValue={1}/>
                            <br /><br />
                            <label>ค่าเป้าหมายคิดเป็นร้อยละ:&nbsp;&nbsp; </label><input type="number" min={1} max={100} name="solve" required defaultValue={35}/>
                            <br />
                            {/* <div hidden>
                            <label>วิธีการคำนวณ: &nbsp;&nbsp;</label>
                            <select name='method' value={solv} onChange={e => {setSolv(e.target.value)}} >
                                <option value={1}>ร้อยละ</option> */}
                                {/* <option>ค่าเฉลี่ย</option> */}
                                {/* <option value={2}>ผลรวม</option> */}
                            {/* </select>
                            </div> */}
                            <br />
                            <label>จำนวนข้อมูลที่ใช้ในตัวชี้วัดนี้:&nbsp;&nbsp; </label><input className='input10' type="number" min="1" max="99" name="numpara" value={numpara}
                                onChange={e => setNumpara(e.target.value)} />
                            <br /><br />

                            <div dangerouslySetInnerHTML={{ __html: par(numpara) }}>
                            </div>
                            <label>ข้อมูลเปรี่ยบเทียบที่ 1 (ตัวตั้ง):&nbsp;&nbsp;</label> <label hidden>( กรณีใช้ค่านี้ในการประเมินผลตัวชี้วัดติ๊กถูกตรงนี้ <input type="checkbox" id={980} defaultChecked/> )</label><br /> <input required type="text1" name="para98" id={98} /><br /><br />
                            <label>ข้อมูลเปรี่ยบเทียบที่ 2 (ตัวหาร):&nbsp;&nbsp;</label> <label>( กรณีเป็นค่าเปรียบเทียบคงที่: <input type="checkbox" id={999} onClick={e => fixx()} /> <input hidden defaultChecked type="checkbox" id={990} /> )</label><br /> <input required type="text1" name="para99" id={99} /><br /><br />
                            <div id='combo' hidden> แบ่งรายไตรมาส:&nbsp;&nbsp; <input type="radio" id={111} name='met' onClick={e => mtq()}/>&nbsp;&nbsp;&nbsp;&nbsp; รายปี:&nbsp;&nbsp;    <input type="radio" name='met' id={222} onClick={e => mty()}/> <br /><br />
                            <div id="mt" hidden><label>ใส่ค่าเปรียบเทียบคงที่:&nbsp;&nbsp;</label> <input id={100} name='fix' className='input20' type="number" /><br /><br /></div>
                            <div id="mty" hidden>
                                <label>ค่าเปรียบเทียบไตรมาสที่ 1:&nbsp;&nbsp;</label> <input id={101} name='fixq1' className='input20' type="number" /><br /><br />
                                <label>ค่าเปรียบเทียบไตรมาสที่ 2:&nbsp;&nbsp;</label> <input id={102} name='fixq2' className='input20' type="number" /><br /><br />
                                <label>ค่าเปรียบเทียบไตรมาสที่ 3:&nbsp;&nbsp;</label> <input id={103} name='fixq3' className='input20' type="number" /><br /><br />
                                <label>ค่าเปรียบเทียบไตรมาสที่ 4:&nbsp;&nbsp;</label> <input id={104} name='fixq4' className='input20' type="number" /><br /><br />
                                </div>
                            </div>
                            <label>การเก็บข้อมูลในตัวชี้วัดนี้เป็นเก็บแบบสะสมหรือไม่:&nbsp;&nbsp;</label><input id='com' type='checkbox' onClick={e => com()}></input>
                            <div className='textr2'>
                            <br />
                            <label>ยืนยัน: <input type="checkbox" value={parass}
                                onClick={e => { setParass(e.target.value), dis() }} /> </label>
                            <br /><br />
                            
                            {/* <label>ค่าการประเมินทั้งหมด <br /><input type='text' name='paras' id='sum' disabled /></label>
                            <br /> */}

                            <button id='submit' type='submit' className='btn btn-success' disabled> เพิ่มตัวชี้วัด </button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
                            <p className='inline textr'><a href="/"></a></p>
                        </div>
                    </div>
                </div>
                <div><br /><br /><br /><br /></div>
                <Footer />
            </div>

        </>
    )
}

export default AddForm
