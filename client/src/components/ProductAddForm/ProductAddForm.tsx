import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { Input } from "../FormInputs/Input";
import { useActions } from "../../actions";
import { ProductActions } from "../../model/product";

interface IFormInputs {
  email: string;
  password: string;
}

export const ProductAddForm = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onBlur",
  });

  const productActions = useActions(ProductActions);

  // TODO: replace with proper type instead of any
  const onSubmit = (formData: any) => {
    console.log("formData", formData);
    // productActions.createProduct(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="test" className="form-control" ref={register({
                required: "Description is required",
              })}/>
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="description"
              fieldTitle="Decription"
              type="text"
              placeholder="Enter description"
              ref={register({
                required: "Description is required",
              })}
              showSpan={true}
            />
            {/* TODO: Convert to Select Input */}
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="size"
              fieldTitle="Size"
              type="text"
              placeholder="Enter size"
              ref={register({
                required: "Size is required",
              })}
              showSpan={false}
            />
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="quantity"
              fieldTitle="Quantity"
              type="number"
              placeholder="Enter quantity"
              ref={register({
                required: "Quantity is required",
              })}
              showSpan={false}
            />
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="percent_markup"
              fieldTitle="Percent Markup"
              type="number"
              placeholder="Enter percent markup"
              ref={register({
                required: "Percent Markup is required",
              })}
              showSpan={false}
            />
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="price"
              fieldTitle="Price"
              type="number"
              placeholder="Enter price"
              ref={register({
                required: "Price is required",
              })}
              showSpan={false}
            />
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="price"
              fieldTitle="Price"
              type="number"
              placeholder="Enter price"
              ref={register({
                required: "Price is required",
              })}
              showSpan={false}
            />
            {/* TODO: Convert to Radio Input */}
            <Input
              className={{
                formGroup: "form-group",
                formControl: "form-control",
              }}
              fieldName="backordered"
              fieldTitle="Backordered"
              type="text"
              placeholder="Enter backordered"
              ref={register({
                required: "Backordered is required",
              })}
              showSpan={false}
            />
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
