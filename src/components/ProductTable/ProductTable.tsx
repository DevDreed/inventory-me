import React, { useEffect, useState } from "react";
import { useActions } from "../../actions";
import * as ProductActions from "../../actions/product";
import { Product } from "../../model";
import "./ProductTable.scss";

interface Props {}

const ProductTable = (props: Props) => {
  const [products, setProducts] = useState([]);
  const productActions = useActions(ProductActions);
  useEffect(() => {
    const fetchData = async () =>
      await productActions
        .fetchProducts()
        .then((result: any) => setProducts(result.payload.data));

    fetchData();
  }, [productActions]);

  console.log("products", products);
  return (
    <div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product: Product) => {
              return (
                <tr>
                  <td>{product.description}</td>
                  <td>
                    {product.images && product.images.length > 0
                      ? product.images.map((image: any) => {
                          return (
                            <img
                              key={image.id}
                              src={image.url}
                              alt={image.filename}
                            />
                          );
                        })
                      : null}
                  </td>
                  <td>
                    <button
                      className={"btn btn-secondary"}
                      onClick={() => productActions.deleteProduct(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
