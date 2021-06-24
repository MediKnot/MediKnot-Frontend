import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditConsultation from './EditConsultation';
import AddPrescription from './AddPrescription';
import AddTreatment from './AddTreatment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsComponent({ details }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          style={{ justifyContent: 'space-evenly', display: 'flex', flex: 1 }}
        >
          <Tab label="Consultation" icon={<PhoneIcon />} {...a11yProps(0)} />
          {details?<Tab label="Prescription" icon={<FavoriteIcon />} {...a11yProps(1)} />:null}
          {details?<Tab label="Treatment" icon={<PersonPinIcon />} {...a11yProps(2)} />:null}

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EditConsultation details={details} />
      </TabPanel>
      {details?<TabPanel value={value} index={1}>
        <AddPrescription details={details} />
      </TabPanel>:null}
      {details?<TabPanel value={value} index={2}>
        <AddTreatment details={details} />
      </TabPanel>:null}
    </div>
  );
}