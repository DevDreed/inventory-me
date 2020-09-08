import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { ProductDialog, ProductTable } from "../components";

export function ProductPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    setOpen(true);
  };

  return (
    <Grid container className={classes.root}>
      <ProductDialog open={open} onClose={handleClose} />
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <ProductTable />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    [theme.breakpoints.down("md")]: {
      paddingTop: 50,
      paddingLeft: 15,
      paddingRight: 15,
    },
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    marginBottom: 15,
  },
}));
