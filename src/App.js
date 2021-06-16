import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dashboard from './screens/Dashboard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TimelineIcon from '@material-ui/icons/Timeline';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/Signup';
import Profile from './screens/Profile';
import Reports from './screens/Reports';

const drawerWidth = 240;

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [flow, setFlow] = useState(0);

  useEffect(() => {
    setFlow(0);
  }, [flow])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const icons = [<DashboardIcon />, <FileCopyIcon />, <TimelineIcon />, <SearchIcon />, <AccountCircleIcon />, <ExitToAppIcon />];
  const routes = ["/", "/reports", "/", "/find", "/profile", "/login"]

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />
      <List>
        {['Dashboard', 'Reports', 'Report Analysis', 'Find Doctor', 'Profile', 'Logout'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            {/* <ListItemText primary={text} className={classes.link} /> */}
            <Link to={routes[index]} style={{ textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontSize: 15, fontWeight: 'bold' }}>{text}</p>
            </Link>
          </ListItem>
        ))}
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
            <Typography variant="h6" noWrap>
              Mediknot
            </Typography>
          </Toolbar>
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
        <main className={classes.content}>
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
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
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
          <Route path="/">
            <Dashboard />
          </Route>
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
  // necessary for content to be below app bar
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
