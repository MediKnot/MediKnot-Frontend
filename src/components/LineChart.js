import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import getDate from '../utils/dateConvert';

function LineChart({data, label}) {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const convertData = () => {
        var lb=[], v=[];
        data.map((d, i) => {
            if(d.healthField.length!==0){
                v.push(parseInt(d.healthField));
                lb.push(getDate(d.timestamp));
            }
        })
        setLabels(lb);
        setValues(v);
    }

    useEffect(() => {
        convertData();
    },[])

    const color = (opacity) => {
        const r = Math.floor(Math.random()*100)%256;
        const g = Math.floor(Math.random()*100)%256;
        const b = Math.floor(Math.random()*100)%256;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return (
        <Line
            data={{
                labels: labels,
                datasets: [{
                    label,
                    data: values,
                    borderColor: color(1),
                    tension: 0.1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: color(0.5)
                }]
            }}
        />
    )
}

export default LineChart
