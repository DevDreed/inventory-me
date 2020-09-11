// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as ProductActions from "../actions/product";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProductDialog(props: Props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const [newProductText, setNewProductText] = React.useState("");
  const productActions = useActions(ProductActions);

  const handleClose = () => {
    productActions.addProduct({
      id: Math.random(),
      completed: false,
      text: newProductText,
    });
    onClose();

    // reset product text if user reopens the dialog
    setNewProductText("");
  };

  const handleChange = (event: any) => {
    setNewProductText(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new Product</DialogTitle>
      <TextField
        id="multiline-flexible"
        multiline
        value={newProductText}
        onChange={handleChange}
        className={classes.textField}
      />
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles({
  textField: {
    width: "80%",
    margin: 20,
  },
});
