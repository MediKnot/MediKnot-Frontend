import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import '../App.css'

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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function PrescriptionTable() {
  const classes = useStyles();

  return (
    <div style={{ height: 400, width: '100%'}} className="mv">
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

const columns = [
  { field: 'disease', headerName: 'Disease', width: 180, editable: true },
  { field: 'drname', headerName: 'Doctor Name', width: 180, editable: true },
  { field: 'medicines', headerName: 'Medicines', width: 250, editable: true },
  { field: 'note', headerName: 'Note', width: 400, editable: true },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    width: 180,
    editable: true,
  }
];

const rows = [
  {
    id: 1,
    disease: 'Malaria',
    drname: 'Krishnam Rathi',
    medicines: ['Paracetamol', 'Crocin', 'Sinarest'],
    note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
    date: '2021-1-12'
  },
  {
    id: 2,
    disease: 'Typhoid',
    drname: 'Saniya Agrawal',
    note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
    medicines: ['HydroChloroPhinol', 'Crocin', 'Sinarest'],
    date: '2020-1-12'
  },
  {
    id: 3,
    disease: 'Malaria',
    drname: 'Krishnam Rathi',
    medicines: ['Paracetamol', 'Crocin', 'Sinarest'],
    note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
    date: '2021-1-12'
  },
  {
    id: 4,
    disease: 'Typhoid',
    drname: 'Saniya Agrawal',
    note: 'Avoid touching your face, especially the nose, mouth, and eye areas.',
    medicines: ['HydroChloroPhinol', 'Crocin', 'Sinarest'],
    date: '2020-1-12'
  }
];
