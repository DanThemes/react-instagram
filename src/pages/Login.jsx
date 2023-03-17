import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const createAccountSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={createAccountSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form-auth">
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              className="form-error-message"
            />

            <label htmlFor="username">Username:</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="form-error-message"
            />

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
