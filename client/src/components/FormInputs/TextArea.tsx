import React, { Fragment } from 'react'
import { ErrorMessage } from "@hookform/error-message";

interface Props {
    fieldName: string;
    placeholder: string;
    type: string;
    className?: string;
    ref: any;
    errors?: any;
}

export const TextArea = (props: Props) => {
    return (
        <Fragment>
            <label htmlFor={props.fieldName}>Quantity</label>
            <input
            id={props.fieldName}
            name={props.fieldName}
            type={props.type}
            className={props.className}
            ref={props.ref}
            placeholder={props.placeholder}
            />
            {props.errors && <ErrorMessage errors={props.errors} name={props.fieldName} />}
        </Fragment>
    )
}      