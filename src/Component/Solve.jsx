import { useRef, useEffect } from 'react'
import "chartjs-gauge";

const sSolve = (val, val2) => {
  const canvasRef = useRef();

  var randomData = function () {
    return [
      100,
      val2,
      60
    ];
  };


  var data = randomData();
  var value = val;

  var config = {
    type: "gauge",
    data: {
      // labels: ['Success', 'Warning', 'Warning', 'Error'],
      datasets: [
        {
          data: data,
          value: value,
          backgroundColor: ["red", "yellow", "green"],
          borderWidth: 4
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: "Gauge chart"
      },
      layout: {
        padding: {
          bottom: 30
        }
      },
      needle: {
        // Needle circle radius as the percentage of the chart area width
        radiusPercentage: 2,
        // Needle width as the percentage of the chart area width
        widthPercentage: 3.2,
        // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
        lengthPercentage: 80,
        // The color of the needle
        color: "rgba(0, 0, 0, 1)"
      },
      valueLabel: {
        formatter: Math.round()
      }
    }
  };

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    let context = canvasRef.current.getContext("2d");
    //console.log(context);
    window.myGauge = new Chart(context, config);
  });

  return (
    <div>
      {/* <h4 className='textc'>ผลดำเนินการโดยรวมสำนักการแพทย์ ของตัวชี้วัดนี้</h4>
      <br /><br /> */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
 
const Solve = (val) => {
  return (
    <div style={{ width: val.do   }}>
      {sSolve(val.name, val.name2)}
    </div>
  )
}

export default Solve
