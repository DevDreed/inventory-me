import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { HomeBox } from "../components";
import { RootState } from "../reducers";
import { Redirect, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { AuthenticationState } from "../reducers/authentication";

interface ComponentProps {
  authenticationState: AuthenticationState;
}

export function HomePage(props: ComponentProps) {
  const classes = useStyles();
  const [boxColor, setBoxColor] = React.useState("red");
  const productList = useSelector((state: RootState) => state.productList);

  const onButtonClick = () => setBoxColor(boxColor === "red" ? "blue" : "red");

  if (props.authenticationState && props.authenticationState.hasSession) {
    return <Redirect to={"/product"} />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        You have {productList.length} TODOs in your list!
      </Typography>
      <div className={classes.centerContainer}>
        <HomeBox size={300} color={boxColor} />
        <Button
          className={classes.button}
          onClick={onButtonClick}
          variant="outlined"
          color="primary"
        >
          Change Color
        </Button>

        <div>
          <Route
            exact={true}
            path={["/", "/login"]}
            render={() => (
              <LoginPage
                hasSession={
                  props.authenticationState
                    ? props.authenticationState.hasSession
                    : false
                }
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100%",
    textAlign: "center",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },

  centerContainer: {
    flex: 1,
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  button: {
    marginTop: 20,
  },
});
