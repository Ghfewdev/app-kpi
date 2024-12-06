import React, { useState } from 'react'
import Footer from '../Component/Footer';
import Authlevel from '../Component/Authlevel';

const AddForm = () => {

    Authlevel();

    const [numpara, setNumpara] = useState(0);
    const [parass, setParass] = useState("");
    const [solv, setSolv] = useState(3);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const JsonData1 = {
            id: data.get("id"),
            name: data.get("name"),
            solve: data.get("solve"),
            method: data.get("method"),
            // method: 1,
            numpara: Number(data.get("numpara")) + 1,
            def: data.get("define"),
            paras: g(numpara),
            com: com(),
            con: fixc(),
            res: resp
        };
        const JsonData2 = {
            fmid: data.get("id"),
        };

        fetch(import.meta.env.VITE_APP_API + "/form/add", {
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

        fetch(import.meta.env.VITE_APP_API + "/result/add", {
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
        if (document.getElementById(999).checked === true) {
            document.getElementById("combo").hidden = false;
            // document.getElementById("com").checked = true;
            // com();
            // document.getElementById("com").disabled = true;

        } else {
            document.getElementById("combo").hidden = true;
            // document.getElementById("com").checked = false;
            // com();
            // document.getElementById("com").disabled = false;
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
        if (document.getElementById(222).checked === true) {
            document.getElementById("mt").hidden = false;
            document.getElementById("mty").hidden = true;
            document.getElementById(100).required = true;
        } else {
            document.getElementById("mt").hidden = true;
            document.getElementById("mty").hidden = false;
            document.getElementById(100).required = false;
        }
    }

    var mtq = () => {
        var mtqq;
        if (document.getElementById(111).checked === true) {
            document.getElementById("mty").hidden = false;
            document.getElementById("mt").hidden = true;
            document.getElementById(701).required = true;
            document.getElementById(702).required = true;
            document.getElementById(703).required = true;
            document.getElementById(704).required = true;
            document.getElementById(705).required = true;
            document.getElementById(706).required = true;
            document.getElementById(707).required = true;
            document.getElementById(708).required = true;
            document.getElementById(709).required = true;
            document.getElementById(710).required = true;
            document.getElementById(711).required = true;

        } else {
            document.getElementById("mty").hidden = true;
            document.getElementById("mt").hidden = false;
            document.getElementById(701).required = false;
            document.getElementById(702).required = false;
            document.getElementById(703).required = false;
            document.getElementById(704).required = false;
            document.getElementById(705).required = false;
            document.getElementById(706).required = false;
            document.getElementById(707).required = false;
            document.getElementById(708).required = false;
            document.getElementById(709).required = false;
            document.getElementById(710).required = false;
            document.getElementById(711).required = false;
        }
    }

    function fixc() {
        var o = "";
        if (document.getElementById(111).checked === true) {
            for (var i = 701; i <= 711; i++) {
                o += document.getElementById(`${i}`).value;
                if (i < 711)
                    o += ", "
            }
        } else {
            if (document.getElementById(999).checked === false)
                o = 0;
            else
                o = document.getElementById(100).value;
        }
        
        // if (document.getElementById("nob").checked === true) {
        //     o = ""
        // }

        return o

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
    console.log(resp)
    var par = (val) => {
        let ht = '';
        let pas = '';
        for (let i = 1; i <= val; i++) {
            pas = `para${i}`
            ht += `<label>ข้อมูลที่ ${i}:&nbsp;&nbsp;</label> <label>( กรณีใช้ค่านี้ในการประเมินผลตัวชี้วัดติ๊กถูกตรงนี้ (ตัวตั้ง) <input type="checkbox" id=${i * 10}> )</label><br /> <input required type="text1" name=${pas} id=${i} /><br /><br />`;
        }

        return ht
    }

    function g(ve) {
        var o = "";
        try {
            for (var i = 1; i <= ve; i++) {
                o += document.getElementById(`${i}`).value;

                if (document.getElementById(`${i * 10}`).checked === true) {
                    o += "*"
                }

                //if (i != ve) {
                o += ", "
                // }

            }
            //o += document.getElementById(`${98}`).value;
            //o += "*, ";
            // if (document.getElementById(`${999}`).checked === true) {
            //     o += document.getElementById(100).value;
            //     o += "^"
            // }
            o += document.getElementById(`${99}`).value;

            o += "*"

            // console.log(o)
            // document.getElementById("sum").value = o

            if (document.getElementById("nob").checked === true) {
                o = "-"
            }

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
            console.log(document.getElementById("99").required === false)
            document.getElementById("submit").disabled = false
        }
        else {
            document.getElementById("submit").disabled = true;
        }
    }

    const hided = () => {
        if (document.getElementById("no").hidden === true) {
            document.getElementById("no").hidden = false
            document.getElementById("99").required = true
        } else {
            document.getElementById("no").hidden = true
            document.getElementById("99").required = false
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

                            <label>เป็นตัวชี้วัดที่ไม่ได้มีการเก็บข้อมูลเชิงสถิติ:&nbsp;&nbsp; </label><input id='nob' type="checkbox" onClick={e => hided()} />
                            <br /><br />
                            <label>ชื่อตัวชี้วัด:&nbsp;&nbsp; </label><br /><textarea className='tarea70' type="text" name="name" autoFocus required />
                            <br /><br />
                            <label>นิยามของตัวชี้วัด:&nbsp;&nbsp; </label><br /><textarea className='textarea60100' type="text" name="define" required />
                            <br /><br />
                            <label>ลำดับตัวชี้วัด:&nbsp;&nbsp; </label><input className='input10' type="text" min={1} max={1000} name="id" required defaultValue={1} />
                            <br /><br />
                            <div id='no'>
                                <label>ค่าเป้าหมายคิดเป็นร้อยละ:&nbsp;&nbsp; </label><input type="number" min={1} max={100} name="solve" required defaultValue={100} />
                                <br />
                                <div>
                                    <br />
                                    <label>วิธีการคำนวณ: &nbsp;&nbsp;</label>
                                    <select name='method' value={solv} onChange={e => { setSolv(e.target.value) }} >
                                        <option value={1}>ร้อยละ</option>
                                        <option value={2}>ผลรวม</option>
                                        <option value={3}>ไม่มีการคำนวณ</option>
                                        {/* <option>ค่าเฉลี่ย</option> */}
                                    </select>
                                </div>
                                <br />
                                <label>จำนวนข้อมูลที่ใช้ในตัวชี้วัดนี้:&nbsp;&nbsp; </label><input className='input10' type="number" min="0" max="99" name="numpara" value={numpara}
                                    onChange={e => setNumpara(e.target.value)} />
                                <br /><br />
                                <div dangerouslySetInnerHTML={{ __html: par(numpara) }}>
                                </div>
                                {/* <label>ข้อมูลเปรี่ยบเทียบที่ 1 (ตัวตั้ง):&nbsp;&nbsp;</label> <label hidden>( กรณีใช้ค่านี้ในการประเมินผลตัวชี้วัดติ๊กถูกตรงนี้ <input type="checkbox" id={980}/> )</label><br /> <input required type="text1" name="para98" id={98} /><br /><br /> */}
                                {/* <label>ข้อมูลเปรี่ยบเทียบที่ 2 (ตัวหาร):&nbsp;&nbsp;</label> <label>( กรณีเป็นค่าเปรียบเทียบคงที่: <input type="checkbox" id={999} onClick={e => fixx()} /> <input hidden defaultChecked type="checkbox" id={990} /> )</label><br /> <input required type="text1" name="para99" id={99} /><br /><br /> */}
                                <label>ข้อมูลเปรี่ยบเทียบ (ตัวหาร):&nbsp;&nbsp;</label> <label>( กรณีเป็นค่าเปรียบเทียบคงที่: <input type="checkbox" id={999} onClick={e => fixx()} /> <input hidden defaultChecked type="checkbox" id={990} /> )</label><br /> <input required type="text1" name="para99" id={99} /><br /><br />
                                <div id='combo' hidden> แบ่งรายโรงพยาบาล:&nbsp;&nbsp; <input type="radio" id={111} name='met' onClick={e => mtq()} />&nbsp;&nbsp;&nbsp;&nbsp; รายปี:&nbsp;&nbsp;    <input type="radio" name='met' id={222} onClick={e => mty()} /> <br /><br />
                                    <div id="mt" hidden><label>ใส่ค่าเปรียบเทียบคงที่:&nbsp;&nbsp;</label> <input id={100} name='fix' className='input20' type="number" /><br /><br /></div>
                                    <div id="mty" hidden>
                                        <label>รพก:&nbsp;&nbsp;</label> <input id={701} name='fixq1' className='input20' type="number" /><br /><br />
                                        <label>รพต:&nbsp;&nbsp;</label> <input id={702} name='fixq2' className='input20' type="number" /><br /><br />
                                        <label>รพจ:&nbsp;&nbsp;</label> <input id={703} name='fixq3' className='input20' type="number" /><br /><br />
                                        <label>รพท:&nbsp;&nbsp;</label> <input id={704} name='fixq4' className='input20' type="number" /><br /><br />
                                        <label>รพว:&nbsp;&nbsp;</label> <input id={705} name='fixq5' className='input20' type="number" /><br /><br />
                                        <label>รพภ:&nbsp;&nbsp;</label> <input id={706} name='fixq6' className='input20' type="number" /><br /><br />
                                        <label>รพร:&nbsp;&nbsp;</label> <input id={707} name='fixq7' className='input20' type="number" /><br /><br />
                                        <label>รพส:&nbsp;&nbsp;</label> <input id={708} name='fixq8' className='input20' type="number" /><br /><br />
                                        <label>รพข:&nbsp;&nbsp;</label> <input id={709} name='fixq9' className='input20' type="number" /><br /><br />
                                        <label>รพป:&nbsp;&nbsp;</label> <input id={710} name='fixq10' className='input20' type="number" /><br /><br />
                                        <label>รพบ:&nbsp;&nbsp;</label> <input id={711} name='fixq11' className='input20' type="number" /><br /><br />
                                    </div>
                                </div>
                                <label>การเก็บข้อมูลในตัวชี้วัดนี้เป็นเก็บแบบสะสมหรือไม่:&nbsp;&nbsp;</label><input id='com' type='checkbox' onClick={e => com()}></input>
                                <br /><br />
                            </div>
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
                            <input id='res-15' type="checkbox" onClick={e => res("15")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพภ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-16' type="checkbox" onClick={e => res("16")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพร.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-17' type="checkbox" onClick={e => res("17")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพส.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-18' type="checkbox" onClick={e => res("18")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพข.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-19' type="checkbox" onClick={e => res("19")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพป.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <input id='res-20' type="checkbox" onClick={e => res("20")} />&nbsp;:&nbsp;&nbsp;&nbsp;<label>รพบ.&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <br /><br />
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
