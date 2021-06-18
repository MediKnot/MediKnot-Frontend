import React, { useState, useEffect } from 'react';
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
import FindDoctor from './screens/FindDoctor';
import BG from './assets/images/bg.png'
import Fab from '@material-ui/core/Fab';
import SearchResults from './components/SearchResults';
import AddReport from './screens/AddReport';



const drawerWidth = 240;

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [flow, setFlow] = useState(0);
  const [show, setShow] = useState("");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setFlow(1);
      } else setFlow(0);
    } catch (e) { console.log(e); }
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setFlow(0);
  }


  const icons = [<DashboardIcon />, <FileCopyIcon />, <TimelineIcon />, <SearchIcon />, <AccountCircleIcon />, <AddBoxIcon/>, <ExitToAppIcon />];
  const routes = ["/", "/reports", "/", "/find", "/profile", "/add", "/login"]

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Dashboard', 'Reports', 'Report Analysis', 'Find Doctor', 'Profile', 'Add Report', 'Logout'].map((text, index) => {
          return (
            <Link to={routes[index]} style={{ textDecoration: 'none', color: 'inherit' }} onClick={text === "Logout" ? logout : null}>
              {text==='Logout' ? <Divider/> : null}
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
            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h6" noWrap>
                Mediknot
              </Typography>
              <Fab color="secondary" aria-label="add" className={classes.margin} size="small" onClick={() => setShow(true)}>
                <SearchIcon/>
              </Fab>
            </div>
          </Toolbar>
          {show ? <SearchResults setShow={setShow}/> : null}
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
          <main className={classes.content} style={{ backgroundImage: `url(${BG})` }}>
            <div className={classes.toolbar} />
            {children}
          </main>
      </div>
        )
  }

  const container = window !== undefined ? () => window().document.body : undefined;
        if (flow === 0) {
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
                <Dashboard />
              </Route>
              <Route path="/add">
                <AddReport />
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
