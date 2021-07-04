import React from 'react';
import { Bar } from 'react-chartjs-2';


function DiseasePrediction({ data }) {
    const [chartdata, setChartData] = React.useState([]); 
    const [colors, setColors] = React.useState([]);
    const [labels, setLabels] = React.useState([]);


    const bardata = {
        labels: labels,
        datasets: [{
            backgroundColor: colors,
            data: chartdata,

            label: 'Monthly Doctor Visits'
        }]
    }

    var chartData = () => {
        var arr = [];
        var lab = [];
        data.map(({score, name}) => {arr.push(score); lab.push(name)});
        
        setLabels(lab);
        setChartData(arr);
    }
    React.useEffect(() => {
        console.log(data);
        chartData();
    }, [])

    return (
        <Bar
            data={bardata}
        />
    )
}

export default DiseasePrediction
