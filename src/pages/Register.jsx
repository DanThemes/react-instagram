import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import * as Yup from "yup";
import { useState } from "react";

const createAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateUser = async (values) => {
    try {
      setErrorMessage("");
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      updateProfile(user.user, {
        displayName: values.username,
      });
      console.log(user);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use");
      } else if (error.code == "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        setErrorMessage("The password is too weak.");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={createAccountSchema}
        onSubmit={async (values) => {
          await handleCreateUser(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form-auth">
            <label htmlFor="username">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="form-error-message"
            />

            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              className="form-error-message"
            />

            <label htmlFor="username">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="form-error-message"
            />

            <label htmlFor="username">Confirm password:</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="form-error-message"
            />

            <button type="submit" disabled={isSubmitting}>
              Create account
            </button>

            {errorMessage && (
              <div className="form-error-message">{errorMessage}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
