import {
  AppBar,
  Drawer as DrawerMui,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, createStyles } from "@material-ui/styles";
import * as React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./configureStore";
import { HomePage, ProductPage } from "./pages";
import { withRoot } from "./withRoot";
import { PrivateRoute } from "./components/PrivateRoute";
import { connect } from "react-redux";
import { AuthenticationState } from "./reducers/authentication";

interface Props {
  authenticationState: AuthenticationState;
}

function Routes(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Route
        exact={true}
        path="/"
        component={() => (
          <HomePage authenticationState={props.authenticationState} />
        )}
      />
      <Route
        exact={true}
        path="/login"
        component={() => (
          <HomePage authenticationState={props.authenticationState} />
        )}
      />
      <PrivateRoute
        exact={true}
        path="/product"
        component={ProductPage}
      />
    </div>
  );
}

function App(props: Props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router history={history}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap={isMobile}>
                Inventory-Me
              </Typography>
            </Toolbar>
          </AppBar>

          <Hidden mdUp>
            <DrawerMui
              variant="temporary"
              anchor={"left"}
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            ></DrawerMui>
          </Hidden>
          <Hidden smDown>
            <DrawerMui
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            ></DrawerMui>
          </Hidden>
          <Routes {...props} />
        </div>
      </div>
    </Router>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
    },
    appFrame: {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "absolute",
    },
    navIconHide: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    drawerHeader: { ...theme.mixins.toolbar },
    drawerPaper: {
      width: 250,
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        position: "relative",
        height: "100%",
      },
    },
    content: {
      backgroundColor: theme.palette.background.default,
      width: "100%",
      height: "calc(100% - 56px)",
      marginTop: 56,
      [theme.breakpoints.up("sm")]: {
        height: "calc(100% - 64px)",
        marginTop: 64,
      },
    },
  })
);

export default connect((state: any) => ({
  authenticationState: state.authenticationState,
}))(withRoot(App));
