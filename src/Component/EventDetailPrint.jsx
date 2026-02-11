import { createRoot } from "react-dom/client"

export default function pagePrint(val) {
  const dp = val?.[0]
  if (!dp) return

  const year = new Date(dp.created_at).getFullYear() + 543

  const quarterCheck = (q) => (dp.qur >= q ? "☑" : "☐")
  const statusCheck = (s) => (dp.evstatus === s ? "☑" : "☐")

  var dep = ["โรงพยาบาลกลาง", "โรงพยาบาลตากสิน", "โรงพยาบาลเจริญกรุงประชารักษ์", 
        "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ", "โรงพยาบาลเวชการุณย์รัศมิ์", "โรงพยาบาลนคราภิบาลกรุงเทพมหานคร",
        "โรงพยาบาลราชพิพัฒน์", "โรงพยาบาลสิรินธร", "โรงพยาบาลผู้สูงอายุบางขุนเทียน", "โรงพยาบาลรัตนประชารักษ์",
        "โรงพยาบาลบางนากรุงเทพมหานคร", "สก.", "ศบฉ.", "สพบ"
    ]


  const html = `
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Print</title>
    <style>
      body {
        font-family: "TH Sarabun New", Tahoma;
        font-size: 16px;
        margin: 30px;
      }
      .center { text-align: center; }
      .line { border-bottom: 1px dotted #000; display: inline-block; min-width: 300px; }
      .section { margin-top: 16px; }
      .box {
        border: 1px solid #000;
        padding: 8px;
        min-height: 80px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8px;
      }
      td, th {
        border: 1px solid #000;
        padding: 6px;
      }
      @media print {
        body { margin: 20px; }
      }
    </style>
  </head>
  <body>

    <div>
      ไตรมาสที่ ๑ ${quarterCheck(1)} ต.ค.-ธ.ค. ${year - 1}
      <br/>
      ไตรมาสที่ ๒ ${quarterCheck(2)} ม.ค.-มี.ค. ${year}
      <br/>
      ไตรมาสที่ ๓ ${quarterCheck(3)} เม.ย.-มิ.ย. ${year}
      <br/>
      ไตรมาสที่ ๔ ${quarterCheck(4)} ก.ค.-ก.ย. ${year}
    </div>

    <h3 class="center">แบบรายงานความก้าวหน้ารายโครงการ / กิจกรรม</h3>

    <div class="section">
      ส่วนราชการ <span class="line">${dep[Number(dp.submitid-1)]}</span>
    </div>

    <div class="section">
      ชื่อโครงการ / กิจกรรม <span class="line">${dp.evname}</span>
    </div>

    <div class="section">
      ลำดับโครงการ / กิจกรรมตามแผน <span class="line">${dp.fmid}</span>
    </div>

    <div class="section">
      หน่วยงานที่รับผิดชอบ <span class="line"></span>
    </div>

    <div class="section">
      สถานะของโครงการ:
      ${statusCheck(1)} แล้วเสร็จ
      ${statusCheck(2)} ยังไม่เริ่มดำเนินการ
      ${statusCheck(3)} ยกเลิก
      ${statusCheck(4)} กำลังดำเนินการ
      ${statusCheck(5)} ชะลอ
    </div>

    <div class="section">
      <b>รายละเอียดการดำเนินงานในไตรมาสนี้</b>
      <div class="box">${dp.evres || ""}</div>
    </div>

    <div class="section">
      <b>วัตถุประสงค์</b>
      <div class="box">${dp.evtarget || ""}</div>
    </div>

    <div class="section">
      <b>เป้าหมาย</b>
      <div class="box">${dp.evpoint || ""}</div>
    </div>

    <div class="section">
      <b>การใช้จ่ายงบประมาณ</b>
      <table>
        <tr>
          <th></th>
          <th>งบฯ กทม.</th>
          <th>งบฯ อุดหนุน</th>
          <th>อื่นๆ</th>
        </tr>
        <tr>
          <td>งบที่ได้รับ</td>
          <td>${dp.budget_dc1}</td>
          <td>${dp.budget_dc2}</td>
          <td>${dp.budget_dc3}</td>
        </tr>
        <tr>
          <td>งบที่ใช้ไป</td>
          <td>${dp.budget_dd1}</td>
          <td>${dp.budget_dd2}</td>
          <td>${dp.budget_dd3}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <b>สรุปผลการดำเนินงาน</b><br/>
      ${dp.summary_status == 1 ? "☑" : "☐"} เป็นไปตามแผน
      ${dp.summary_status == 2 ? "☑" : "☐"} เป็นไปตามแผนแต่ควรติดตาม
      ${dp.summary_status == 3 ? "☑" : "☐"} ไม่เป็นไปตามแผน
    </div>
    
    <div class="page-break"></div>

    <div class="section">
      <b>ข้อคิดเห็นเพิ่มเติม / ปัญหาและอุปสรรค</b>
      <div class="box">${dp.problem || "-"}</div>
    </div>

  </body>
  </html>
  `

  const win = window.open("", "", "width=900,height=1200")
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 500)
}
