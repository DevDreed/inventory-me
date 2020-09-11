// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import { Product } from "../model";
import { RootState } from "../reducers";
import * as ProductActions from "../actions/product";
import * as AuthenticationActions from "../actions/authentication";

export function ProductTable() {
  const classes = useStyles();
  const productList = useSelector((state: RootState) => state.productList);
  const productActions = useActions(ProductActions);
  const authenticationActions = useActions(AuthenticationActions);

  const onRowClick = (product: Product) => {
    // if (product.completed) {
    //   productActions.uncompleteProduct(product.id);
    // } else {
    //   productActions.completeProduct(product.id);
    // }
    // productActions.requestProducts();
  };

  return (
    <Paper className={classes.paper}>
      <Button
        onClick={() =>
          authenticationActions.fetchLogin({
            email: "example@gmail.com",
            password: "qwer1234",
          })
        }
      >
        Login
      </Button>
      <Button onClick={() => authenticationActions.requestLogout()}>
        Logout
      </Button>
      <Button onClick={() => productActions.fetchProducts()}>
        Fetch Products
      </Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Completed</TableCell>
            <TableCell padding="default">Text</TableCell>
            <TableCell padding="default">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((n: Product) => {
            return (
              <TableRow key={n.id} hover onClick={(event) => onRowClick(n)}>
                <TableCell padding="none">
                  {/* <Checkbox checked={n.completed} /> */}
                </TableCell>
                {/* <TableCell padding="none">{n.text}</TableCell> */}
                <TableCell padding="none">
                  <IconButton
                    aria-label="Delete"
                    color="default"
                    onClick={() => productActions.deleteProduct(n.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minWidth: 260,
    display: "inline-block",
  },
  table: {
    width: "100%",
  },
});
