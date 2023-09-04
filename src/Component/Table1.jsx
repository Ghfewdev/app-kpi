import React from 'react'
import Doc from './Doc'


const Table1 = () => {
  
  var ap = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
  var dp = Doc()[0]
  if (dp != undefined) {
    ap = <>{dp.ev_name}</>
    var cp = dp.ev_name
    //var c1 = c.substring(71, 0)
    //var c2 = c.substring(71)
    var ep = dp.fms_id
    var fp = dp.ev_res
    var gp = dp.ev_status
    var hp = dp.ev_point
    var ip = dp.ev_target
    var jp = dp.ev_result
    var kp = dp.ev_budget
    var kkp = kp.split(", ")
    var lp = dp.ev_buded
    var llp = lp.split(", ")
    var mp = dp.ev_problem
    var prp = <div className='fonts col-print-12'>
    <div className='textr0'>
      ไตรมาสที่ 1 <input type="checkbox" />&nbsp; ต.ค.-ธ.ค. ๖๖
      <br />ไตรมาสที่ 2 <input type="checkbox" />&nbsp; ม.ค.-มี.ค. ๖๗
      <br />แบบรายงานความก้าวหน้ารายโครงการ/กิจกรรม&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไตรมาสที่ 3 <input type="checkbox" /> เม.ย.-มิ.ย. ๖๗
      <br /><b>ส่วนราชการ </b> &nbsp;&nbsp;&nbsp; {ap} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ไตรมาสที่ 4 <input type="checkbox" />&nbsp; ก.ค.-ก.ย. ๖๗
    </div>
    <div className='row textl5'>
      <div className='col'>
        ชื่อโครงการ/กิจกรรม
      </div>
      <div className='col-10'>{cp}</div>
    </div>

    <div className='textl5'>ลำดับโครงการ / กิจกรรมตามแผนสนพ. &nbsp;&nbsp;&nbsp; {ep}
      <br /><b>หน่วยงานที่รับผิดชอบ</b> &nbsp;&nbsp;&nbsp; {fp}
      <br />สถานะของโครงการ: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value="แล้วเสร็จ" defaultChecked />
        <label className="form-check-label" htmlFor="inlineRadio1">แล้วเสร็จ</label>
      </div> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value="ยังไม่เริ่มดำเนินการ" />
        <label className="form-check-label" htmlFor="inlineRadio2">ยังไม่เริ่มดำเนินการ</label>
      </div> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="status" id="inlineRadio3" value="ยกเลิก" />
        <label className="form-check-label" htmlFor="inlineRadio3">ยกเลิก</label>
      </div> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="status" id="inlineRadio4" value="กำลังดำเนินการ" />
        <label className="form-check-label" htmlFor="inlineRadio4">กำลังดำเนินการ</label>
      </div> &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="status" id="inlineRadio5" value="ชะลอ" />
        <label className="form-check-label" htmlFor="inlineRadio5">ชะลอ</label>
      </div>
      <br />รายละเอียดการดำเนินงานในไตรมาสนี้ บอกถึงเป้าหมาย วัตถุประสงค์ วิธีดำเนินการและผล (ถ้ามี) รวมถึงความก้าวหน้า ของโครงการ (%)
      <div className='border border-dark mb-2 mt-1 m-0 p-2'>
        <b><u>วัตถุประสงค์</u></b>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {hp}</div>
        <b><u>เป้าหมาย</u></b>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ip}</div>
        <b><u>ผลการดำเนินโครงการ</u></b>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {jp}</div>
        <b><u>การใช้จ่ายงบประมาณ</u></b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="budget" id="inlineRadio21" value="ไม่ได้ใช้งบประมาณ" />
          <label className="form-check-label" htmlFor="inlineRadio21">ไม่ได้ใช้งบประมาณ</label>
        </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="budget" id="inlineRadio22" value="ใช้งบประมาณ" defaultChecked />
          <label className="form-check-label" htmlFor="inlineRadio22">ใช้งบประมาณ</label>
        </div>
        <div className='m-0 mt-1 mb-0'><table className='table table-bordered border-primary textc'>
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
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="resul" id="inlineRadio31" value="เป็นไปตามแผน" defaultChecked />
          <label className="form-check-label" htmlFor="inlineRadio31">เป็นไปตามแผน</label>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="resul" id="inlineRadio32" value="เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ" />
          <label className="form-check-label" htmlFor="inlineRadio32">เป็นไปตามแผนแต่ควรติดตามเป็นพิเศษ</label>
        </div> &nbsp;&nbsp;&nbsp;&nbsp;
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="resul" id="inlineRadio33" value="ไม่เป็นไปตามแผน" />
          <label className="form-check-label" htmlFor="inlineRadio33">ไม่เป็นไปตามแผน</label>
        </div>
        <br /><b><u>ข้อคิดเห็นเพิ่มเติม / ปัญหาและอุปสรรค</u></b>
        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp}
        
      </div>
    </div>
  </div>
  }


  return (
    <div>

      {/* page1 */}
      {prp}
      
      
    </div>
  )
}

export default Table1
