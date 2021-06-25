import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dashboard from './screens/Dashboard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TimelineIcon from '@material-ui/icons/Timeline';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/Signup';
import Profile from './screens/Profile';
import Reports from './screens/Reports';
// import FindDoctor from './screens/FindDoctor';
// import BG from './assets/images/bg.png'
import Fab from '@material-ui/core/Fab';
import SearchResults from './components/SearchResults';
import AddReport from './screens/AddReport';
import ReportAnalysis from './screens/ReportAnalysis';
import ReferPatient from './screens/ReferPatient';
import JitsiMeet from './screens/JitsiMeet';
import DoctorProfile from './screens/DoctorProfile';
import Loader from './components/Loader';
import Popup from './components/Popup'
import Event from './screens/Event';
import ChatBox from './components/chatbot/ChatBox';
import AndroidIcon from '@material-ui/icons/Android';
import { VideoCall } from '@material-ui/icons';



const drawerWidth = 240;

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [flow, setFlow] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const [patientref, setPatientref] = useState('');
  const [icons, setIcons] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_type = localStorage.getItem("user_type")

      if (user && user_type) {
        if (user_type === "doctor") {
          setFlow(2);
          setIsDoc(true);
        }
        else setFlow(1);
      } else setFlow(0);
    } catch (e) { console.log(e); }
  }, [])

  useEffect(() => {
    console.log(isDoc);
    if (isDoc) {
      setIcons([<DashboardIcon />, <FileCopyIcon />, <TimelineIcon />, <VideoCall />,<AccountCircleIcon />]);
      setRoutes(["/", "/reports", "analysis", "/call", "/"]);
      setLabels(["Patient\'s Dashboard", "General Reports", "Report Analysis", "Connect With Patient", "Refer Other Patient", ]);
    } else {
      setIcons([<DashboardIcon />, <FileCopyIcon />, <TimelineIcon />, <SearchIcon />, <AccountCircleIcon />, <AddBoxIcon />, <ExitToAppIcon />]);
      setRoutes(["/", "/reports", "/analysis", "/find", "/profile", "/events", "/login"]);
      setLabels(['Dashboard', 'General Reports', 'Report Analysis', 'Find Doctor', 'Profile', 'Medical Events', 'Logout']);
    }
  }, [flow])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const logout = () => {
    <Popup message="Successfully logged out!!" />
    localStorage.removeItem("user");
    localStorage.removeItem("user_type");
    setFlow(0);
    setIsDoc(false);
    setPatientref('');
  }

  const actionSelector = (label) => {
    switch (label) {
      case 'Logout':
        return logout();
      case 'Refer Other Patient':
        return referOther();
      default:
        return null;
    }
  }


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {labels.map((text, index) => {
          return (
            <Link to={routes[index]} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => actionSelector(text)}>
              {text === 'Logout' ? <Divider /> : null}
              <ListItem button key={text}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <p style={{ fontSize: 15, fontWeight: 'bold' }}>{text}</p>
              </ListItem>
            </Link>

          )
        })}
      </List>
    </div>
  );

  const referOther = () => {
    setFlow(2);
    setPatientref("");
  }

  function RespDrawer({ children }) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" noWrap>
                Mediknot
              </Typography>
              <div>
                <Fab color="secondary" aria-label="add" style={{marginRight: 30}} className={`${classes.margin}`} size="small" onClick={() => setShowBot(true)}>
                  <AndroidIcon />
                </Fab>
                <Fab color="secondary" aria-label="add" className={classes.margin} size="small" onClick={() => setShowSearch(true)}>
                  <SearchIcon />
                </Fab>
              </div>
            </div>
          </Toolbar>
          <SearchResults show={showSearch} setShow={setShowSearch} />
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} style={{ backgroundColor: '#e4ecfc' }}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  if (flow === undefined) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }} className="row ai-c jc-c">
        <Loader />
      </div>
    )
  }
  else if (flow === 0) {
    return (
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login setFlow={setFlow} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    )
  }
  else if (flow === 2) {
    return (
      <ReferPatient setFlow={setFlow} setPatientref={setPatientref} logout={logout} setIsDoc={setIsDoc} />
    );
  }
  else return (
    <Router>
      <RespDrawer>
        <Switch>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          {/* <Route path="/find">
                <FindDoctor />
              </Route> */}
          <Route path="/home">
            <div>
              <div style={{ position: 'absolute', backgroundColor: '#e4ecfc'}}>
                <Dashboard patientref={patientref} />
              </div>
              {showBot ? <div style={{ position: 'fixed', top: '57%', right: 0 }} className="shadow">
                <ChatBox setShowBot={setShowBot} />
              </div> : null} 
            </div>
          </Route>
          <Route path="/events/:eventId">
            <Event/>
          </Route>
          <Route path="/events">
            <AddReport />
          </Route>
          <Route path="/call">
            <JitsiMeet />
          </Route>
          <Route path="/analysis">
            <ReportAnalysis patientref={patientref} />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </RespDrawer>
    </Router>
  );

}

App.propTypes = {
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    textDecoration: 'none'
  }
}));


export default App;
