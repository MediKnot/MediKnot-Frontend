import React,{useState} from 'react'
import '../App.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function MedicalEventModal() {
    const classes = useStyles();
    const theme = useTheme();

    const changeDiseases = (event) => {
        setdiseases(event.target.value);
    };

    const [critical, setcritical] = useState('no');
    const [active, setactive] = useState('no');
    const [diseases, setdiseases] = useState([]);
    const [location, setlocation] = useState("");
    const [date, setdate] = useState("");

    return (
        <div style={{backgroundColor:'white'}}>
            <form className="column">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Diseases</InputLabel>
                    <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={diseases}
                    onChange={changeDiseases}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, diseases, theme)}>
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Location" className="input-large shadow mh mv" />
                <div classname="row ai-c">
                    <InputLabel id="demo-mutiple-chip-label" className='mh-2 mv'>Critical</InputLabel>
                    <select id="critical" value={critical} onChange={(e) => setcritical(e.target.value)} name="critical" className="input-small shadow mh" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="Critical" >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <InputLabel id="demo-mutiple-chip-label" className='mh-2 mv'>Active</InputLabel>
                    <select id="active" value={active} onChange={(e) => setactive(e.target.value)} name="gender" className="input-small shadow mh" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="Active" >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <div>Reports</div>
                    <input type="file" className="input-large shadow mv"/>
                </div>
                <input type="date" value={date} onChange={(e) => setdate(e.target.value)} placeholder="dd-mm-yyyy" className="input-large shadow mv" style={{backgroundColor: 'white'}}/>
            </form>
        </div>
    )
}

export default MedicalEventModal
