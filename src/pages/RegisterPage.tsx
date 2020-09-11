import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
};

export function RegisterPage() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div style={styles.container}>
      <h4>Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          style={{ ...styles.input, borderColor: errors.username && "red" }}
          placeholder="Username"
        />
        <input
          name="email"
          ref={register({
            required: true,
            validate: (input) => isEmail(input),
          })}
          style={{ ...styles.input, borderColor: errors.email && "red" }}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            minLength: 6,
          })}
          style={{ ...styles.input, borderColor: errors.password && "red" }}
          placeholder="Password"
        />
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
