import { useState } from "react";
import IndicatorSummaryModal from "../Component/IndicatorSummaryModal";

export default function IndicatorPage() {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = async (year, indicatorId) => {
    const res = await fetch(
      `http://localhost:3000/api/admin/indicatorde/${year}/${indicatorId}`
    );

    const data = await res.json();

    setReports(data);
    setShowModal(true);
  };

  return (
    <div>

      <button onClick={() => openModal(2026, 21)}>
        ดูสรุปปี 2026
      </button>

      {showModal && (
        <IndicatorSummaryModal
          reports={reports}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}
