import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const createAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(3, "Username should be at least 3 characters long")
    .max(50, "Username should be at most 50 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .required("Required"),
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
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <Field type="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Create account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
