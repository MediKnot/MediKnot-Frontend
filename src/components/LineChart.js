import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import getDate from '../utils/dateConvert';

function LineChart({ data, label,i }) {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const convertData = () => {
        var lb = [], v = [];
        data.map((d, i) => {
            if (d.healthField.length !== 0) {
                v.push(parseInt(d.healthField));
                lb.push(getDate(d.timestamp));
            }
        })
        setLabels(lb);
        setValues(v);
    }

    useEffect(() => {
        convertData();
    }, [])

    // const color = (opacity) => {
    //     const r = Math.floor(Math.random() * 100) % 256;
    //     const g = Math.floor(Math.random() * 100) % 256;
    //     const b = Math.floor(Math.random() * 100) % 256;
    //     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    // }

    const color=['#FFCC80','#9FA8DA','#66BB6A','#F8BBD0','#F44336','black']

    return (
        <Line
            data={{
                labels: labels,
                datasets: [{
                    label,
                    data: values,
                    borderColor: color[5],
                    tension: 0.1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: color[i]
                }]
            }}
            options={{
                scales: {
                    yAxis:{
                        min: 0
                    }
                },
                // plugins: {
                //     legend: {
                //         labels: {
                //             // This more specific font property overrides the global property
                //             font: {
                //                 size: 30,
                //                 weight:'bold'
                //             }
                //         }
                //     }
                // }
            }}
        />
    )
}

export default LineChart
