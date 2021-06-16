import React from 'react';
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
      },
    };
  },
  { defaultTheme },
);

export default function BloodReport() {
  const classes = useStyles();


  return (
    <div style={{ height: 350, width: '100%', maxWidth: 550 }}  className="mh mv">
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

const columns = [
  { field: 'bloodtest', headerName: 'Blood Test', width: 180 },
  { field: 'result', headerName: 'Result', width: 180 },
  { field: 'normalvalue', headerName: 'Normal Value', width: 180 }
];

const rows = [
  {
    id: 1,
    bloodtest: 'WBCs (billion/L)',
    result: 8.00,
    normalvalue: '3.5 to 10.5'
  },
  {
    id: 2,
    bloodtest: 'Neutrophils (%)',
    result: 62,
    normalvalue: '40 to 70'
  },
  {
    id: 3,
    bloodtest: 'Lumphocytes (%)',
    result: 28,
    normalvalue: '25 to 45'
  },
  {
    id: 4,
    bloodtest: 'Monocytes (%)',
    result: 10,
    normalvalue: '2 to 8'
  },
  
];
