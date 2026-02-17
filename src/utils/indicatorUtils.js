export const AGENCIES = {
  1: "โรงพยาบาลกลาง",
  2: "โรงพยาบาลตากสิน",
  3: "โรงพยาบาลเจริญกรุงประชารักษ์",
  4: "โรงพยาบาลหลวงพ่อทวีศักดิ์ ชุตินธฺโร อุทิศ",
  5: "โรงพยาบาลเวชการุณย์รัศมิ์",
  6: "โรงพยาบาลนคราภิบาลกรุงเทพมหานคร",
  7: "โรงพยาบาลราชพิพัฒน์",
  8: "โรงพยาบาลสิรินธร",
  9: "โรงพยาบาลผู้สูงอายุบางขุนเทียน",
  10: "โรงพยาบาลรัตนประชารักษ์",
  11: "โรงพยาบาลบางนากรุงเทพมหานคร",
  12: "สก.",
  13: "ศบฉ.",
  14: "สพบ"
};

export const calculateByFormula = (A, B, formula) => {
  switch (formula) {
    case "(A/B)*100": return (A / B) * 100;
    case "(A+B)/2": return (A + B) / 2;
    case "A": return A;
    case "A*B": return A * B;
    case "((A-B)/B)*100": return ((A - B) / B) * 100;
    case "A/B": return A / B;
    case "(A/B)*1.25": return (A / B) * 1.25;
    case "A-B": return A - B;
    case "A+B": return A + B;
  }
};

export const buildSummaryTable = (reports) => {
  const result = {};

  reports.forEach((r) => {
    const agencyId = r.agency_id;
    const quarter = r.quarter;

    if (!result[agencyId]) {
      result[agencyId] = {
        agency_id: agencyId,
        agency_name: AGENCIES[agencyId] || "-",
        target_value: parseFloat(r.target_value),
        operator: r.operator,
        formula: r.formula,
        quarters: { Q1: null, Q2: null, Q3: null, Q4: null },
        totalA: 0,
        totalB: 0
      };
    }

    const A = parseFloat(r.value_a || 0);
    const B = parseFloat(r.value_b || 0);

    const value = calculateByFormula(A, B, r.formula);

    result[agencyId].quarters[quarter] = value;
    result[agencyId].totalA += A;
    result[agencyId].totalB += B;
  });

  Object.values(result).forEach((item) => {
    item.yearlyValue = calculateByFormula(
      item.totalA,
      item.totalB,
      item.formula
    );
  });

  return Object.values(result);
};
