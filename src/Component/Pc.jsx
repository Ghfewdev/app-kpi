"use client";

import React from "react";

export default function KPIProgress({ data }) {

function sumAll(data) {
  return Object.entries(data)
    .filter(([key]) => key !== "indicators ทั้งหมด" && key !== "data" && key !== "type")
    .reduce(
      (acc, [_, value]) => {
        acc.pass += value.pass || 0;
        acc.sent += value.sent ?? 0;
        acc.must += value.must ?? 13; // ⚠️ แนะนำใช้ 0
        return acc;
      },
      { pass: 0, sent: 0, must: 0 }
    );
}

function calcProgress({ pass = 0, sent = 0, must = 0 }) {
  return {
    passPercent: must ? Number(((pass / must) * 100).toFixed(2)) : 0,
    sentPercent: must ? Number(((sent / must) * 100).toFixed(2)) : 0,
  };
}


  const sum = sumAll(data);
  const { passPercent, sentPercent } = calcProgress(sum);

  return (
    <div className="w-100" style={{ maxWidth: "500px" }}>

  {/* 🔵 ส่ง */}
  <div className="mb-3">
    <div className="d-flex justify-content-between mb-1">
      <span className="fw-medium">ร้อยละ ตัวชี้วัดที่รายงานผลแล้ว</span>
      <span className="fw-semibold">ร้อยละ {sentPercent}</span>
    </div>

    <div className="progress" style={{ height: "16px" }}>
      <div
        className="progress-bar bg-primary"
        role="progressbar"
        style={{ width: `${sentPercent}%` }}
      />
    </div>
  </div>

  {/* 🟢 ผ่าน */}
  <div>
    <div className="d-flex justify-content-between mb-1">
      <span className="fw-medium">ร้อยละ ตัวชี้วัดที่ผ่าน</span>
      <span className="fw-semibold">ร้อยละ {passPercent}</span>
    </div>

    <div className="progress" style={{ height: "16px" }}>
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${passPercent}%` }}
      />
    </div>
  </div>

</div>
  );
}