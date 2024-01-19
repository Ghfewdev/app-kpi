import { useRef, useEffect } from 'react'
import "chartjs-gauge";

const sSolve2 = (val, val2) => {
  const canvasRef = useRef();

  var randomData = function () {
    if (val2 > 10)
    return [
      100,
      val2 + 20,
      val2
    ];
     else if (val2 < 1) {
       return [
         100,
         val2 + 100,
         val2 + 100
       ]
     }
     else {
      return [
        100,
        val2,
        val2-0.5
      ]
     }
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
          backgroundColor: ["green", "yellow", "red"],
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
 
const Solve2 = (val) => {
  return (
    <div style={{ width: val.do }} className={val.class}>
      {sSolve2(val.name, val.name2)}
    </div>
  )
}

export default Solve2
