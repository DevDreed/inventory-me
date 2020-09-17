import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useActions } from "../../actions";
import * as ProductActions from "../../actions/product";
import { Product } from "../../model";

interface IFormInputs {
  description: string;
  size: string;
  quantity: number;
  backordered: string;
  price: number;
  percent_markup: number;
}

export const ProductAddForm = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onBlur",
    defaultValues: {
      backordered: "false",
    },
  });

  const productActions = useActions(ProductActions);
  const onSubmit = (formData: IFormInputs) => {
    const product: Product = {
      description: formData.description,
      size: formData.size,
      quantity: Number(formData.quantity),
      percent_markup: Number(formData.percent_markup),
      price: Number(formData.price),
      backordered: Boolean(formData.backordered),
    };
    if (file) {
      const fileFormData = new FormData();
      fileFormData.append("file", file);
      productActions.createProduct(product, fileFormData);
    } else {
      productActions.createProduct(product);
    }
  };

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="description">Description address</label>
              <input
                id="description"
                name="description"
                type="text"
                className="form-control"
                ref={register({
                  required: "Description is required",
                })}
                placeholder="Enter description"
              />
              <ErrorMessage errors={errors} name="description" />
            </div>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                className="form-control"
                ref={register({
                  required: "Size is required",
                })}
              >
                <option>small</option>
                <option>medium</option>
                <option>large</option>
                <option>x-large</option>
                <option>xx-large</option>
              </select>
              <ErrorMessage errors={errors} name="size" />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                className="form-control"
                ref={register({
                  required: "Price is required",
                })}
                placeholder="Enter price"
                step="any"
              />
              <ErrorMessage errors={errors} name="price" />
            </div>
            <div className="form-group">
              <label htmlFor="percent_markup">Percent Markup</label>
              <input
                id="percent_markup"
                name="percent_markup"
                type="number"
                className="form-control"
                ref={register({
                  required: "Precent markup is required",
                })}
                placeholder="Enter percent markup"
                step="any"
              />
              <ErrorMessage errors={errors} name="percent_markup" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="form-control"
                ref={register({
                  required: "Quantity is required",
                })}
                placeholder="Enter quantity"
              />
              <ErrorMessage errors={errors} name="quantity" />
            </div>
            <div className="form-group">
              <label htmlFor="price">Backordered</label>
              <div className="form-check">
                <input
                  className="form-check-input radio-inline"
                  type="radio"
                  name="backordered"
                  id="backordered"
                  value="false"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="backordered">
                  No
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input radio-inline"
                  type="radio"
                  name="backordered"
                  id="backordered2"
                  ref={register}
                  value="true"
                />
                <label className="form-check-label" htmlFor="backordered2">
                  Yes
                </label>
              </div>
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formState.isSubmitting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
