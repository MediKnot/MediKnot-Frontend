import React from 'react';
import { Bar } from 'react-chartjs-2';


function BarChart({ data }) {
    const [chartdata, setChartData] = React.useState([]); 
    const [colors, setColors] = React.useState([]);


    const bardata = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            backgroundColor: colors,
            data: chartdata,

            label: 'Monthly Doctor Visits'
        }]
    }

    var chartData = () => {
        var arr = [];
        for(var i=0; i<12;i++) {
            arr.push(0);
            var temp = colors;
            temp.push(`rgba(${Math.floor(Math.random() * 1000) % 256},${Math.floor(Math.random() * 100) % 256},${Math.floor(Math.random() * 100) % 256}, 0.7 )`);
            setColors(temp);
        }
        data.forEach((con) => {
            const idx = parseInt(con.consultationDate?.substring(5, 7));
            arr[idx - 1] = arr[idx-1]+1;
        })
        console.log(colors);
        return arr;
    }
    React.useEffect(() => {
        console.log(data);
        setChartData(chartData());
    }, [])

    return (
        <Bar
            data={bardata}
        />
    )
}

export default BarChart
