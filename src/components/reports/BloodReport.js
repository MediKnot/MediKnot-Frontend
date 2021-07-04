import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import '../../App.css'

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme) => {
    const isDark = getThemePaletteMode(theme.palette) === 'dark';

    return {
      root: {
        '& .MuiDataGrid-cellEditing': {
          backgroundColor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
        },
        '& .Mui-error': {
          backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
          color: isDark ? '#ff4343' : '#750f0f',
        },
        backgroundColor: '#DBF5DC',
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: '#9BBB59'
        }
      },
    };
  },
  { defaultTheme },
);

export default function BloodReport({data}) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    var row = []
    data.map((x) => {
      row.push({bloodtest: x['COMPLETE BLOOD COUNT (CBC)'], result: x['Unnamed: 0'] ? x['Unnamed: 0'] : 'NA', id: x['COMPLETE BLOOD COUNT (CBC)']});
    })
    setRows(row);
  }, [])

  return (
    <div style={{ height: 350, width: '100%', maxWidth: 500 }}  className="mh mv">
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
}

const columns = [
  { field: 'bloodtest', headerName: 'Blood Test', width: 320 },
  { field: 'result', headerName: 'Result', width: 180 }
];
