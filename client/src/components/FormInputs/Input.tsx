import React from "react";
import { ErrorMessage } from "@hookform/error-message";

interface InputClasses {
    formGroup: string;
    formControl: string;    
}

interface Props {
  fieldName: string;
  placeholder: string;
  type: string;
  className?: InputClasses;
  ref: any;
  errors?: any;
  fieldTitle: string;
  showSpan: boolean;
}

export const Input = (props: Props) => {
  return (
    <div className={props.className?.formGroup}>
      <label htmlFor={props.fieldName}>{props.fieldTitle}</label>
      <input
        id={props.fieldName}
        name={props.fieldName}
        type={props.type}
        className={props.className?.formControl}
        ref={props.ref}
        placeholder={props.placeholder}
      />
      {props.errors && (
        <ErrorMessage errors={props.errors} name={props.fieldName} />
          )}
        {props.showSpan && <span>This will be in all input components</span>}
    </div>
  );
};
