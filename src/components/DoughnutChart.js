import React from 'react'
import { Doughnut } from 'react-chartjs-2';


function DoughnutChart({ data }) {
    const [values, setValues] = React.useState([]);
    const [labels, setLabels] = React.useState([]);
    const [colors, setColors] = React.useState([]);


    React.useEffect(() => {
        convertData();
    }, [])

    const convertData = () => {
        var obj = {};
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].concerns.length; j++) {
                const disease = data[i].concerns[j];
                if (obj[disease]) obj[disease]++;
                else obj[disease] = 1;
            }
        }
        for (var [key, value] of Object.entries(obj)) {
            var t1 = labels, t2 = values, t3 = colors;
            t3.push(`rgba(${Math.floor(Math.random() * 1000) % 256},${Math.floor(Math.random() * 100) % 256},${Math.floor(Math.random() * 100) % 256}, 0.7 )`);
            t1.push(key); t2.push(value);
            setLabels(t1);
            setValues(t2);
            setColors(t3);
        }
    }

    const doughdata = {
        labels: labels,
        datasets: [{
            label: 'Medical Diseases History',
            data: values,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };



    return (
        <div>
            <Doughnut data={doughdata} />
        </div>
    )
}

export default DoughnutChart
