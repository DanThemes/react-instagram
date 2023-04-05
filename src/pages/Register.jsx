import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/AuthProvider";

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters")
    .required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const { createAccount } = useAuthContext();

  const handleRegister = async (values) => {
    const { email, username, password } = values;
    await createAccount(email, username, password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(handleRegister)} className="form-auth">
        <label htmlFor="username">Username:</label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <div className="form-error-message">{errors.username.message}</div>
        )}

        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <div className="form-error-message">{errors.email.message}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <div className="form-error-message">{errors.password.message}</div>
        )}

        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <div className="form-error-message">
            {errors.confirmPassword.message}
          </div>
        )}

        <button type="submit">Create account</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
